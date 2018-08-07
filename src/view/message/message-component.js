import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import style from './message.less'
import PropTypes from 'prop-types'
import { NavBar } from 'antd-mobile';
import store from '../../store'


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class MessageComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageIndex: 1,
            noticeList: [],
            isMore: false,
            isLoadingMore: false,
        }
    }

    componentWillMount() {
        this.props.getNotices({
            pageIndex: 1,
        }, () => {
            this.setState({
                pageIndex: 1,
                noticeList: this.props.noticesList.PagedData,
                isMore: this.props.noticesList.HasNextPage
            })
        })
    }

    goDetail = (info) => {
        store.dispatch({
            type: "NOTICES_DETAIL",
            noticesDetail: info
        });

        this.props.goMessageDetail();
    }

    loadMoreDataFn = () => {
        this.setState({
            isLoadingMore: true,
            pageIndex: this.state.pageIndex + 1
        }, () => {
            this.props.getNotices({
                pageIndex: this.state.pageIndex,
            }, () => {
                this.setState({
                    isLoadingMore: false,
                    noticeList: this.state.noticeList.concat(this.props.noticesList.PagedData),
                    isMore: this.props.noticesList.HasNextPage,
                })

            })
        })


    }

    content = (list, isMore) => {
        if (list && list.length > 0) {
            return (
                <div styleName="listMain">
                    {list.map((item, index) => (
                        <div styleName="list-item" key={index} onClick={() => this.goDetail(item)}>
                            <div><img src={item.TitlePicUrl} alt="" /></div>
                            <div>
                                <p>{item.Title}</p>
                                <p>查看详情 》》</p>
                            </div>
                        </div>
                    ))}
                    {isMore ? <div styleName="loadMore" onClick={this.loadMoreDataFn.bind(this, this)}>点击加载更多</div> : <div styleName="loadMore">无更多</div>}
                </div>
            )
        } else {
            return (<div styleName="noInfo">暂无资讯公告</div>)
        }
    }

    render() {

        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                >资讯公告</NavBar>

                <div className="container">
                    <div styleName="header">
                        <img src="./img/info.png" />
                    </div>

                    {this.content(this.state.noticeList, this.state.isMore)}
                </div>

            </div>
        )
    }
}

MessageComponent.propTypes = {
    goMessageDetail: PropTypes.func,
}

export default MessageComponent
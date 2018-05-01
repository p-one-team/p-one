import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './rank.less'

import { NavBar, Icon, List } from 'antd-mobile';
import { Tabs } from 'antd-mobile';


const tabs2 = [
    { title: "周明灯", sub: '1' },
    { title: '周黑灯', sub: '2' }
];
const Item = List.Item;


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class RankComponentWrapper extends Component {
    constructor(props) {
        super(props)

        this.state = {
            phoneNumber: '',
            verificationCode: '',
            list1: [
                {
                    index: 1,
                    name: 'Rover',
                    LV: 33,
                    rate: '50%',
                    num: 23796
                },
                {
                    index: 2,
                    name: 'blue',
                    LV: 22,
                    rate: '50%',
                    num: 2222
                }],
            list2: [
                {
                    index: 1,
                    name: '皮皮',
                    LV: 33,
                    rate: '50%',
                    num: 23796
                },
                {
                    index: 2,
                    name: '皮蛋',
                    LV: 22,
                    rate: '50%',
                    num: 2222
                }]
        }

    }

    componentDidMount() {
        this.props.initData()
    }

    TabExample(list) {
        return list.map((item) => {
            return (<Item key={item.index}>
                <div>{item.index}</div>
                <div>{item.name}  </div>
                <div>{item.LV} </div>
                <div>{item.rate}</div>
                <div>{item.num}</div>
            </Item>)
        })



    }

    render() {

        // const { getFieldProps, getFieldError } = this.props.form;
        console.log(this.props)
        return (
            <div styleName="wrap">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >排名</NavBar>
                <div className="container">
                    <Tabs tabs={tabs2}
                        initialPage={1}
                        onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >

                        <List className="beacon-list">
                            {this.TabExample(this.state.list1)}
                        </List>

                        <List className="beacon-list">
                            {this.TabExample(this.state.list2)}
                        </List>
                    </Tabs>

                </div>

            </div>
        )
    }
}

RankComponentWrapper.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default RankComponentWrapper
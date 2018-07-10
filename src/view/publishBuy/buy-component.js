import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './buy.less'
import { NavBar, Icon, SearchBar } from 'antd-mobile';
import store from '../../store'


@CSSModules(style)
class BuyComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
            canBuyAlertShow: false,
            buyProduct: {},
            buyUnitPrice: 0,
            buyNumber: 0,
			value: '',
			pageIndex: this.props.paramPageIndex,
			shopList: [],
			isShopMore: false,
			isLoadingMore: false
		}
	}

	componentWillMount(){
		this.props.getShopList(this.props.paramAttributeId, this.props.paramAttributeValue, this.props.paramKeywords, this.props.paramPageIndex,()=>{
			this.setState({
				shopList: this.props.shopInfos.Ornaments,
				isShopMore: this.props.shopInfos.IsMore
			})
		})
	}

	onChange = (value) => {
		this.setState({ value });
	}

	componentDidMount() {
		window.addEventListener('scroll', () => {
			if (this.state.isLoadingMore) {
				return;
			}

			if (!this.wrapper) {
				return;
			}

			this.jugeHeight();

		}, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', () => {
			if (this.state.isLoadingMore) {
				return;
			}

			if (!this.wrapper) {
				return;
			}

			this.jugeHeight();

		}, false);
	}

	loadMoreDataFn() {
		this.setState({
			isLoadingMore: true,
			pageIndex: this.state.pageIndex + 1
		})

		this.props.getShopList(this.props.paramAttributeId, this.props.paramAttributeValue, this.props.paramKeywords, this.state.pageIndex, ()=>{
			this.setState({
				isLoadingMore: false,
				shopList: this.state.shopList.concat(this.props.shopInfos.Ornaments),
				isShopMore: this.props.shopInfos.IsMore
			})
		})
	}

	jugeHeight() {

		const top = this.wrapper.getBoundingClientRect().top;
		const windowHeight = window.screen.height;

		if (top && top < windowHeight) {
			// 当 wrapper 已经被滚动到页面可视范围之内触发
			this.loadMoreDataFn();
		}
	}

	clear = () => {
		this.setState({ value: '' });
	}

	handleClick = () => {
		this.manualFocusInst.focus();
    }
    
    showBuyAlert = (info) => {
        this.setState({
            canBuyAlertShow: true,
            buyProduct: info,
            buyUnitPrice: info.TPrice,
            buyNumber: 1
        })
    }

    closeBuyAlert = () => {
        this.setState({
            canBuyAlertShow: false,
            buyProduct: {},
            buyUnitPrice: 0,
            buyNumber: 0
        })
    }

    onChangePrice = (event) => {
        this.setState({
            buyUnitPrice: event.target.value
        })
    }

    onChangeNumber = (event) => {
        this.setState({
            buyNumber: event.target.value
        })
    }

    publishBuy = () => {
        this.props.publishBuy({
            PublishType: 2,
            MarketHashName: this.state.buyProduct.MarketHashName,
            OrnamentPrice: this.state.buyUnitPrice,
            OrnamentCount: this.state.buyNumber
        },() => {
            this.closeBuyAlert()
        })
    }

    buyAlert = () => (<div styleName="buyAlert">
        <div styleName="inner">
            <div styleName="close">
                <span className="iconfont icon-guanbi" onClick={()=>this.closeBuyAlert()}></span>
            </div>
            <div styleName="prodInfo">
                <div><img src={this.state.buyProduct.IconUrl}/></div>
                <div>
                    <p>{this.state.buyProduct.Name}</p>
                    <p>市场参考价：{this.state.buyProduct.TPrice} T豆</p>
                </div>
            </div>
            <div styleName="inputPart">求购单价：<input type="tel" value={this.state.buyUnitPrice} onChange={this.onChangePrice.bind(this)}/></div>
            <div styleName="inputPart">求购数量：<input type="tel" value={this.state.buyNumber} onChange={this.onChangeNumber.bind(this)}/></div>
            <div styleName="btn" onClick={()=>this.publishBuy()}>发布求购</div>
        </div>
    </div>)

	renderContent = () => {
		if (this.state.shopList) {
			return (
				<div style={{ backgroundColor: 'white', width: '100%', height: '100%', textAlign: 'center' }}>
					<ul styleName="item-list">
						{this.state.shopList.map((item, index) => (
							<li key={index}>
								<div styleName="item" onClick={() => this.showBuyAlert(item)}>
									<div styleName="item-img">
										<img src={item.IconUrl} alt="" />
										<p styleName="item-name">{item.Name}</p>
									</div>
									<div styleName="item-info">
										<p>
											<label styleName="now">{item.TPrice}T豆</label>
										</p>
										<p>已售: {item.SaleCount}件</p>
									</div>
								</div>
							</li>
						))}
					</ul>
					{!this.state.isShopMore
					?
					<div styleName="loadMore">无更多</div>
					:
					<div styleName="loadMore" ref={(c) => { this.wrapper = c; }} onClick={this.loadMoreDataFn.bind(this, this)}>加载更多...</div>
					}
				</div>
			)
		} else {
			return (<div styleName="noResult">无结果</div>)
		}
	}

	showGetMallList = () => {
		store.dispatch({
			type:"MALL_LIST_PARAM",
			paramAttributeId: this.props.paramAttributeId,
			paramAttributeValue: this.props.paramAttributeValue,
			paramKeywords: this.state.value,
			paramPageIndex: 1
		})

		this.props.getShopList(this.props.paramAttributeId, this.props.paramAttributeValue, this.state.value, 1,()=>{
			this.setState({
				pageIndex: 1,
				isLoadingMore: false,
				shopList: this.props.shopInfos.Ornaments,
				isShopMore: this.props.shopInfos.IsMore
			})
		})
	}

	searchCancel = () => {
		store.dispatch({
			type:"MALL_LIST_PARAM",
			paramAttributeId: this.props.paramAttributeId,
			paramAttributeValue: this.props.paramAttributeValue,
			paramKeywords: "",
			paramPageIndex: 1
		})

		this.props.getShopList(this.props.paramAttributeId, this.props.paramAttributeValue,"", 1,()=>{
			this.setState({
				pageIndex: 1,
				value: "",
				isLoadingMore: false,
				shopList: this.props.shopInfos.Ornaments,
				isShopMore: this.props.shopInfos.IsMore
			})
		})
	}


	render() {
		return (
			<div styleName="wrap">
				<NavBar
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.goBack()}
				>发布求购专区</NavBar>

				<div styleName="search_part">
					<div styleName="search">
						<SearchBar
							value={this.state.value}
							placeholder="输入您想查找的内容"
							onCancel={() => this.searchCancel()}
							maxLength={8}
							onChange={this.onChange}
						/>
					</div>
					<div styleName="search_btn" onClick={() => this.showGetMallList()}>搜索</div>
					<div styleName="select" onClick={() => this.props.select()}>筛选</div>
				</div>

				<div style={{ width: '100%', top: 0 }}>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
						{this.renderContent()}
					</div>
				</div>

                {this.state.canBuyAlertShow ? this.buyAlert() : ""}
			</div>
		)
	}
}

BuyComponent.propTypes = {
	goItemDetail: PropTypes.func,
}

export default BuyComponent
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './shop.less'
import { NavBar, Icon, SearchBar } from 'antd-mobile';


@CSSModules(style)
class ShopComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value: '',
			hidden: false,
			isSearch: false,
		}
	}

	onChange = (value) => {
		this.setState({ value });
	}

	clear = () => {
		this.setState({ value: '' });
	}

	handleClick = () => {
		this.manualFocusInst.focus();
	}

	renderContent = (tab, infos) => {
		if(infos.Ornaments){
			return (
				<div style={{ backgroundColor: 'white', width: '100%', height: '100%', textAlign: 'center' }}>
					<ul styleName="item-list">
					{infos.Ornaments.map((item,index)=>(
						<li key={index}>
							<div styleName="item" onClick={()=>this.props.goItemDetail(item.MarketHashName)}>
								<div styleName="item-img">
									<img src={item.IconUrl} alt="" />
									<p styleName="item-name">{item.Name}</p>
								</div>
								<div styleName="item-info">
									<p>
										<label styleName="now">{item.TPrice}T豆</label>
										{/* {item.isDiscount ? <label styleName="original">{item.prePrice}金币</label> : null} */}
									</p>
									<p>已售: {item.SaleCount}件</p>
								</div>
								{/* {item.isDiscount ? <div styleName="discount"><div></div><span>{item.discount}</span></div> : null} */}
							</div>
						</li>
					))}
					</ul>
				</div>
			)
		}else{
			return (<div styleName="noResult">无结果</div>)
		}
	}

	showGetMallList = () => {
		this.setState({
			isSearch: true
		})
		this.props.showGetMallList(this.state.value)
	}


	render() {
		return (
			<div styleName="wrap">
				<NavBar
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.goBack()}
				>商城</NavBar>

				<div styleName="search_part">
					<div styleName="search">
						<SearchBar
							value={this.state.value}
							placeholder="输入您想查找的内容"
							// onSubmit={value => console.log(value, 'onSubmit')}
							// onClear={value => console.log(value, 'onClear')}
							// onFocus={() => console.log('onFocus')}
							// onBlur={() => console.log('onBlur')}
							// onCancel={() => console.log('onCancel')}
							maxLength={8}
							onChange={this.onChange}
						/>
					</div>
					<div styleName="search_btn" onClick={()=>this.showGetMallList()}>搜索</div>
					<div styleName="select" onClick={()=>this.props.select()}>筛选</div>
				</div>

				

				<div style={{width: '100%', top: 0 }}>
					{/* <Tabs tabs={[{title:"出售"},{title:"求购"}]}
						initialPage={0}
						// onTabClick={(tab) => { this.props.changeGameInfo(tab)}}
					> */}
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
							{this.renderContent("sale",this.props.shopInfos)}
						</div>

						{/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
							{this.renderContent("buy",this.props.shopInfos)}
						</div> */}
                    {/* </Tabs> */}
					
				</div>
			</div>
		)
	}
}

ShopComponent.propTypes = {
	goItemDetail: PropTypes.func,
}

export default ShopComponent
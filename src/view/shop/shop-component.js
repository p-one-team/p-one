import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './shop.less'
import { NavBar, Icon, SearchBar, TabBar } from 'antd-mobile';
@CSSModules(style)
class ShopComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value: '',
			selectedTab: 'redTab',
			hidden: false,
			prodList: [
				{
					index: 1,
					prodName: "铭刻 守夜法印",
					imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png",
					price: 5000,
					prePrice: 7000,
					isDiscount: true,
					discount: "七折",
					soldoutNum: 10000
				},
				{
					index: 2,
					prodName: "烬爵披肩",
					imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png",
					price: 5000,
					prePrice: 5000,
					isDiscount: false,
					discount: "",
					soldoutNum: 10000
				},
				{
					index: 3,
					prodName: "铭刻 守夜法印",
					imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png",
					price: 5000,
					prePrice: 6000,
					isDiscount: true,
					discount: "八折",
					soldoutNum: 10000
				},
				{
					index: 4,
					prodName: "烬爵披肩",
					imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png",
					price: 5000,
					prePrice: 5000,
					isDiscount: false,
					discount: "",
					soldoutNum: 10000
				},
				{
					index: 5,
					prodName: "烬爵披肩",
					imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png",
					price: 5000,
					prePrice: 5000,
					isDiscount: false,
					discount: "",
					soldoutNum: 10000
				}
			]
		}
	}
	onChange = (value) => {
		this.setState({ value });
	};
	clear = () => {
		this.setState({ value: '' });
	};
	handleClick = () => {
		this.manualFocusInst.focus();
	}


	renderContent() {
		let list = this.state.prodList;
		let listDetail = list.map((item)=>{
			return (
				<li key={item.index}>
					<div styleName="item" onClick={(id) => this.props.goItemDetail(id)}>
						<div styleName="item-img">
							<img src={item.imgUrl} alt="" />
							<p styleName="item-name">{item.prodName}</p>
						</div>
						<div styleName="item-info">
							<p>
								<label styleName="now">{item.price}金币</label>
								{item.isDiscount ? <label styleName="original">{item.prePrice}金币</label> : null}
							</p>
							<p>已售: {item.soldoutNum}件</p>
						</div>
						{item.isDiscount ? <div styleName="discount"><div></div><span>{item.discount}</span></div> : null}
					</div>
				</li>
			)
		})
		return (
			<div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
				<ul styleName="item-list">
					{listDetail}
				</ul>
			</div>
		);
	}
	render() {
		return (
			<div styleName="wrap">
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.goBack()}
				>商城</NavBar>
				<SearchBar
					value={this.state.value}
					placeholder="输入您想查找的内容"
					onSubmit={value => console.log(value, 'onSubmit')}
					onClear={value => console.log(value, 'onClear')}
					onFocus={() => console.log('onFocus')}
					onBlur={() => console.log('onBlur')}
					onCancel={() => console.log('onCancel')}
					maxLength={8}
					onChange={this.onChange}
				/>

				<div style={{ height: '100%', width: '100%', top: 0 }}>
					<TabBar
						unselectedTintColor="#999"
						tintColor="#555"
						barTintColor="#fff"
						hidden={this.state.hidden}
					>
						<TabBar.Item
							title="推荐区"
							key="recommend"
							icon={<div style={{
								width: '40px',
								height: '40px',
								backgroundColor: '#fff',
								borderRadius: '25px',
								background: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526299598390&di=c4d2f120d20f3702e52b33e81b60e331&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F17%2F83%2F63E58PICtmF_1024.jpg) center center /  24px 24px no-repeat'
							}}/>}
							selectedIcon={<div style={{
								width: '40px',
								height: '40px',
								backgroundColor: '#555',
								borderRadius: '25px',
								background: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526299598390&di=c4d2f120d20f3702e52b33e81b60e331&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F17%2F83%2F63E58PICtmF_1024.jpg) center center /  24px 24px no-repeat'
							}}/>}
							selected={this.state.selectedTab === 'recommend'}
							onPress={() => {
								this.setState({
									selectedTab: 'recommend',
								});
							}}
						>
							{this.renderContent('Life')}
						</TabBar.Item>
						<TabBar.Item
							icon={<div style={{
								width: '40px',
								height: '40px',
								backgroundColor: '#fff',
								borderRadius: '25px',
								background: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526299598390&di=c4d2f120d20f3702e52b33e81b60e331&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F17%2F83%2F63E58PICtmF_1024.jpg) center center /  24px 24px no-repeat'
							}}/>}
							selectedIcon={<div style={{
								width: '40px',
								height: '40px',
								backgroundColor: '#555',
								borderRadius: '25px',
								background: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526299598390&di=c4d2f120d20f3702e52b33e81b60e331&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F17%2F83%2F63E58PICtmF_1024.jpg) center center /  24px 24px no-repeat'
							}}/>}
							title="打折区"
							key="sale"
							selected={this.state.selectedTab === 'sale'}
							onPress={() => {
								this.setState({
									selectedTab: 'sale',
								});
							}}
						>
							{this.renderContent('Koubei')}
						</TabBar.Item>
						<TabBar.Item
							icon={<div style={{
								width: '40px',
								height: '40px',
								backgroundColor: '#fff',
								borderRadius: '25px',
								background: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526299598390&di=c4d2f120d20f3702e52b33e81b60e331&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F17%2F83%2F63E58PICtmF_1024.jpg) center center /  24px 24px no-repeat'
							}}/>}
							selectedIcon={<div style={{
								width: '40px',
								height: '40px',
								backgroundColor: '#555',
								borderRadius: '25px',
								background: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526299598390&di=c4d2f120d20f3702e52b33e81b60e331&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F17%2F83%2F63E58PICtmF_1024.jpg) center center /  24px 24px no-repeat'
							}}/>}
							title="人气区"
							key="popularity"
							selected={this.state.selectedTab === 'popularity'}
							onPress={() => {
								this.setState({
									selectedTab: 'popularity',
								});
							}}
						>
							{this.renderContent('Friend')}
						</TabBar.Item>
						<TabBar.Item
							icon={<div style={{
								width: '40px',
								height: '40px',
								backgroundColor: '#fff',
								borderRadius: '25px',
								background: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526299598390&di=c4d2f120d20f3702e52b33e81b60e331&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F17%2F83%2F63E58PICtmF_1024.jpg) center center /  24px 24px no-repeat'
							}}/>}
							selectedIcon={<div style={{
								width: '40px',
								height: '40px',
								backgroundColor: '#555',
								borderRadius: '25px',
								background: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526299598390&di=c4d2f120d20f3702e52b33e81b60e331&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F17%2F83%2F63E58PICtmF_1024.jpg) center center /  24px 24px no-repeat'
							}}/>}
							title="求购区"
							key="ask"
							selected={this.state.selectedTab === 'ask'}
							onPress={() => {
								this.setState({
									selectedTab: 'ask',
								});
							}}
						>
							{this.renderContent('My')}
						</TabBar.Item>
					</TabBar>
				</div>
			</div>
		)
	}
}

ShopComponent.propTypes = {
	goBack: PropTypes.func
}

export default ShopComponent
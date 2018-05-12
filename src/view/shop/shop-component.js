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
			hidden: false
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
		return (
			<div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
				<ul styleName="item-list">
					<li>
						<div styleName="item" onClick={(id) => this.props.goItemDetail(id)}>
							<div styleName="item-img">
								<img src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=9153244c808ba61edfeecf29790ff037/b3fb43166d224f4a00c251950bf790529922d1d8.jpg" alt="" />
								<p styleName="item-name">纯正 热奋袭人</p>
							</div>
							<div styleName="item-info">
								<p>
									<label styleName="now">1000金币</label>
									<label styleName="original">12000金币</label>
								</p>
								<p>已售: 5051件</p>
							</div>
						</div>
						<div styleName="item">
							<div styleName="item-img">
								<img src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=9153244c808ba61edfeecf29790ff037/b3fb43166d224f4a00c251950bf790529922d1d8.jpg" alt="" />
								<p styleName="item-name">纯正 热奋袭人</p>
							</div>
							<div>
								<p>
									<label styleName="now">1000金币</label>
									<label styleName="original">12000金币</label>
								</p>
								<p>已售: 5051件</p>
							</div>
						</div>
					</li>
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
					placeholder="Search"
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
						unselectedTintColor="#949494"
						tintColor="#33A3F4"
						barTintColor="white"
						hidden={this.state.hidden}
					>
						<TabBar.Item
							title="推荐区"
							key="recommend"
							icon={<div style={{
								width: '22px',
								height: '22px',
								background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
							}}
							/>
							}
							selectedIcon={<div style={{
								width: '22px',
								height: '22px',
								background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
							}}
							/>
							}
							selected={this.state.selectedTab === 'recommend'}
							badge={1}
							onPress={() => {
								this.setState({
									selectedTab: 'recommend',
								});
							}}
							data-seed="logId"
						>
							{this.renderContent('Life')}
						</TabBar.Item>
						<TabBar.Item
							icon={
								<div style={{
									width: '22px',
									height: '22px',
									background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
								}}
								/>
							}
							selectedIcon={
								<div style={{
									width: '22px',
									height: '22px',
									background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
								}}
								/>
							}
							title="打折区"
							key="sale"
							selected={this.state.selectedTab === 'sale'}
							onPress={() => {
								this.setState({
									selectedTab: 'sale',
								});
							}}
							data-seed="logId1"
						>
							{this.renderContent('Koubei')}
						</TabBar.Item>
						<TabBar.Item
							icon={
								<div style={{
									width: '22px',
									height: '22px',
									background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
								}}
								/>
							}
							selectedIcon={
								<div style={{
									width: '22px',
									height: '22px',
									background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
								}}
								/>
							}
							title="人气区"
							key="popularity"
							dot
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
							icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
							selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
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
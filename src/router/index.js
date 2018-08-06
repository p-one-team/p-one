// import React, {Component} from 'react';
import { Route, Redirect } from 'react-router'
import React from 'react';
// import { Route } from 'react-router'
import { HashRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import { SlideTransition } from 'mo-transtion'
import store from '../store'

/*引入页面组件*/
import Login from '../view/login'
import signUp from '../view/signUp'
import Match from '../view/match'
import matchDetail from '../view/matchDetail'
import matchList from '../layout/match-list'
import GuessRank from '../view/guessRank'
import Inventory from '../view/inventory'
import myForecast from '../view/myForecast'
import Shop from '../view/shop'
import ShopItemDetail from '../view/shopItemDetail'
import UserDetail from '../view/userDetail'
import TradeHistory from '../view/tradeHistory'
import HelpSuggest from '../view/helpSuggest'
import ResetPassword from '../view/resetPassword'
import ShopSelect from '../view/shopSelect'
import Feedback from '../view/feedback'
import SteamInventory from '../view/steamInventory'
import MatchForecast from '../view/matchForecast'
import PublishBuy from '../view/publishBuy'
import SteamSetting from '../view/steamSetting'
import ExchangeCenter from '../view/exchangeCenter'
import ExchangeTbeans from '../view/exchangeTbeans'
import MessageDetail from '../view/messageDetail'
import Protocol from '../view/protocol'

/*引入路由切换样式*/
import style from './router.less'

/*引入全局样式*/
import '../styles/reset.less'
import '../styles/iconfont.css'

/* 做 vw vh 的降级处理 */
// require('viewport-units-buggyfill').init();


/*定义路由配置数组*/
const routes_config = [
	{
		path: '/',
		component: Match,
		isExact: true
	},
	// {
	// 	path: '/login',
	// 	component: Login,
	// },
	{
		path: '/signUp',
		component: signUp
	},
	{
		path: '/matchDetail',
		component: matchDetail
	},
	{
		path: '/matchList',
		component: matchList
	},
	{
		path: '/guessRank',
		component: GuessRank
	},
	{
		path: '/inventory',
		component: Inventory
	},
	{
		path: '/myForecast',
		component: myForecast
	},
	{
		path: '/shop',
		component: Shop
	},
	{
		path: '/shopItem',
		component: ShopItemDetail
	},
	{
		path: '/userDetail',
		component: UserDetail
	},
	{
		path: '/tradeHistory',
		component: TradeHistory
	},
	{
		path: '/helpSuggest',
		component: HelpSuggest
	},
	{
		path: '/resetPassword',
		component: ResetPassword
	},
	{
		path: '/shopSelect',
		component: ShopSelect
	},
	{
		path: '/feedback',
		component: Feedback
	},
	{
		path: '/steamInventory',
		component: SteamInventory
	},
	{
		path: '/steamSetting',
		component: SteamSetting
	},
	{
		path: '/matchForecast',
		component: MatchForecast
	},
	{
		path: '/publishBuy',
		component: PublishBuy
	},
	{
		path: '/exchangeCenter',
		component: ExchangeCenter
	},
	{
		path: '/exchangeTbeans',
		component: ExchangeTbeans
	},
	{
		path: '/messageDetail',
		component: MessageDetail
	},
	{
		path: '/protocol',
		component: Protocol
	}
]

import _ut from '../libs/my-util'
import { getCookie } from '../https'

const App = () => (
	<Provider store={store}>
		<HashRouter>
			<Route render={({ location }) =>
				<TransitionGroup component="main" >
					<SlideTransition key={location.pathname}>
						<section className={style.fill}>
							{/* <Switch location={location}>

								<Route path="/login" component={Login} />

								{routes_config.map(config =>(<Route key={config.path} path={config.path} exact={config.isExact} component={config.component} />))}
								
								<PrivateRoute key={'/'} path={'/'} exact={true} component={Match}/>
								
							</Switch> */}

							<Switch location={location}>
       
								<Route path="/login" component={Login} />

								{routes_config.map(config =>(<PrivateRoute key={config.path} path={config.path} exact={config.isExact} component={config.component} />))}
							
							</Switch>
						</section>
					</SlideTransition>
				</TransitionGroup>
			} />
		</HashRouter>
	</Provider>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest}
		render={props =>
			_ut.isEmpty(window.token)&&_ut.isEmpty(getCookie('token'))
			? (<Redirect
				to={{
					pathname: "/login",
				}}
			/>)
			: (<Component {...props} />)
		}
	/>
);


export default App
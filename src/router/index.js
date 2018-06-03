import React from 'react';
import { Route } from 'react-router'
import { HashRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import { SlideTransition } from 'mo-transtion'
import store from '../store'

/*引入页面组件*/
import Home from '../view/home'
import signUp from '../view/signUp'
import Match from '../view/match'
import matchDetail from '../view/matchDetail'
import matchList from '../layout/match-list'
import Rank from '../view/rank'
import Inventory from '../view/inventory'
import myForecast from '../view/myForecast'
import Shop from '../view/shop'
import ShopItemDetail from '../view/shopItemDetail'
import UserDetail from '../view/userDetail'
import TradeHistory from '../view/tradeHistory'
import HelpSuggest from '../view/helpSuggest'
import Message from '../view/message'
import ResetPassword from '../view/resetPassword'

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
		component: Home,
		isExact: true
	},
	{
		path: '/signUp',
		component: signUp
	},
	{
		path: '/match',
		component: Match
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
		path: '/rank',
		component: Rank
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
	}
	,
	{
		path: '/shopItem',
		component: ShopItemDetail
	}
	,
	{
		path: '/userDetail',
		component: UserDetail
	}
	,
	{
		path: '/tradeHistory',
		component: TradeHistory
	},
	{
		path: '/message',
		component: Message
	},
	{
		path: '/helpSuggest',
		component: HelpSuggest
	},
	{
		path: '/resetPassword',
		component: ResetPassword
	}
]


const App = () => (
	<Provider store={store}>
		<HashRouter>
			<Route render={({ location }) =>
				<TransitionGroup component="main" >
					<SlideTransition key={location.pathname}>
						<section className={style.fill}>
							<Switch location={location}>
								{
									routes_config.map(config =>
										<Route key={config.path} path={config.path} exact={config.isExact} component={config.component} />
									)
								}
							</Switch>
						</section>
					</SlideTransition>
				</TransitionGroup>
			} />
		</HashRouter>
	</Provider>
)


export default App
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
import List from '../view/list'
import Miao from '../view/miao'
import Match from '../view/match'
import matchDetail from '../view/matchDetail'
import matchList from '../layout/match-list'
import Rank from '../view/rank'
import Inventory from '../view/inventory'
import myForecast from '../view/myForecast'
import Shop from '../view/shop'
import ShopItemDetail from '../view/shopItemDetail'

/*引入路由切换样式*/
import style from './router.less'

/*引入全局样式*/
import '../styles/reset.less'

/* 做 vw vh 的降级处理 */
// require('viewport-units-buggyfill').init();


/*定义路由配置数组*/
const routes_config = [
	{
		path: '/',
		component: Home,
		isExact: true
	}, {
		path: '/signUp',
		component: signUp
	}, {
		path: '/list',
		component: List
	}, {
		path: '/miao',
		component: Miao
	}, {
		path: '/match',
		component: Match
	}, {
		path: '/matchDetail',
		component: matchDetail
	}, {
		path: '/matchList',
		component: matchList
	}, {
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
		path: '/shopItem/:itemId',
		component: ShopItemDetail
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


/*如果不需要页面过渡效果，参考下面更简单易懂的写法*/
/*const App = () => (
	<Provider store={ store }>
		<HashRouter history={CustomHistory}>
			<Switch> // import { Switch } from 'react-router'
				<Route exact path={'/home'} component={Home} />
				<Route path={'/list'} component={List} />
			</Switch>
		</HashRouter>
	</Provider>
) */


export default App
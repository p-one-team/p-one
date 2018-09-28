import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './exchange.less'
import { NavBar, Icon } from 'antd-mobile'
import store from '../../store'
import InventoryItem from '../../layout/inventory-item'


@CSSModules(style)
class ExchangeTbeansComponent extends Component {
    constructor(props) {
        super(props)

        store.dispatch({
            type: "DOTA_CHOSEN_EXCHANGE_INVENTORY",
            dotaChosenExchangeInventory: []
        })

        this.props.getInventory({
            GameType: "570",
            DateSort: 0,
            PriceSort: 0,
            QualitySort: 0,
            RaritySort: 0,
            StockType: 3
        })

        this.state = {
            canChoose: false
        }
    }

    changeBtnPart = () => {
        if (this.props.dotaChosenExchangeInventory.length > 0) {
            this.setState({
                canChoose: true
            })
        } else {
            this.setState({
                canChoose: false
            })
        }
    }

    ornamentPart = (info) => {
        if (info.Ornaments) {
            if (info.Ornaments && info.Ornaments.length == 0) {
                return (<div styleName="ornament_part">
                    <p styleName="title">选择饰品</p>
                    <div styleName="imgPart">
                        <div styleName="goStore" onClick={() => this.props.goStore()}>
                            <p className="iconfont icon-cart"></p>
                            <p>去商城购买</p>
                        </div>
                    </div>
                </div>)
            } else {
                return (<div styleName="ornament_part">
                    <p styleName="title">选择饰品</p>
                    <div styleName="imgPart">
                        <div styleName="goStore" onClick={() => this.props.goStore()}>
                            <p className="iconfont icon-cart"></p>
                            <p>去商城购买</p>
                        </div>
                        {info.Ornaments.map((item) => (
                            <InventoryItem
                                key={item.AssetId}
                                itemInfo={item}
                                usageType="exchange"
                                changeBtn={this.changeBtnPart}
                            />
                        ))}
                    </div>
                </div>)
            }

        } else {
            return (<div styleName="ornament_part">
                <p styleName="title">选择饰品</p>
                <div styleName="imgPart">
                    <div styleName="goStore" onClick={() => this.props.goStore()}>
                        <p className="iconfont icon-cart"></p>
                        <p>去商城购买</p>
                    </div>
                </div>
            </div>)
        }
    }

    exchange = () => {
        this.props.exchange({
            Ornaments: this.props.dotaChosenExchangeInventory
        },()=>{
            this.props.refreshUserInfo('',()=>{
                this.props.history.goBack()
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
                >T豆兑换</NavBar>

                <div styleName="container">
                    {this.ornamentPart(this.props.dotaInventory)}
                </div>

                {this.state.canChoose ? <div styleName="exchange" onClick={()=>this.exchange()}>兑换</div> : <div styleName="noExchange">兑换</div> }

                <div styleName="inventory" onClick={()=>this.props.goInventoryPage()}>管理我的库存</div>

            </div>
        )
    }
}

ExchangeTbeansComponent.propTypes = {
    goRankPage: PropTypes.func,
}

export default ExchangeTbeansComponent
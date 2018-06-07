import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './match.less'
import BottomTab from '../../layout/bottom-tab'
import { Grid } from 'antd-mobile'


@CSSModules(style)
class MatchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gridData: [
                {text: '我的库存'},
                {text: '收菜排行'},
                {text: '我的预测'},
                {text: '商城'}
            ]
        }
    }

    goPage(el, index) {
        switch (index) {
            case 0:
                this.props.goInventoryPage();
                break;
            case 1:
                this.props.goRankPage();
                break;
            case 2:
                this.props.goMyForecastPage();
                break;
            case 3:
                this.props.goShop();
                break;
        }
    }

    GridExample = () => (
        <div styleName="topMenu">
            <Grid 
                data={this.state.gridData} 
                hasLine={false}
                activeStyle={{backgroundColor:"#2c2c32","color":"#fff",fontSize:"3.2vw"}}
                onClick={(_el, index) => { this.goPage(_el, index) }} 
            />
        </div>
    )

    render() {
        return (
            <div styleName="wrap">
                {/* {this.GridExample()} */}
                <BottomTab goPage={(_el,index)=>this.goPage(_el,index)}goMatchDetail={(id) => this.props.goMatchDetail(id)} showGameDetail={(id) => this.props.showGameDetail(id)} />
            </div>
        )
    }
}

MatchComponent.propTypes = {
    goInventoryPage: PropTypes.func,
    goRankPage: PropTypes.func,
    goMyForecastPage: PropTypes.func,
    goShop: PropTypes.func,
    goMatchDetail: PropTypes.func,
    showGameDetail: PropTypes.func
}

export default MatchComponent
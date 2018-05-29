import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './match.less'
import BottomTab from '../../layout/bottom-tab'
import { Grid} from 'antd-mobile'


@CSSModules(style)

class MatchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gameTypes: [
                {GameCode: "570", GameName: "Dota2"},
                {GameCode: "730", GameName: "CSGO"},
                {GameCode: "578080", GameName: "PUBG"},
                {GameCode: "Sports", GameName: "体育"}
            ]
        }
    }

    componentDidMount(){
        // this.props.initData()
        // let gameTypes = this.props.getGameTypes();
        // console.log("componentDidMount:",gameTypes)
        // this.setState = {
        //     gameTypes: this.props.getGameTypes()
        // }
    }

    goPage(el, index) {

        switch (index) {
            case 0:
                this.props.goRankPage();
                break;
            case 1:
                this.props.goInventoryPage();
                break;
            case 2:
                this.props.goMyForecastPage();
                break;
            case 3:
                this.props.goShop();
                break;
        }
    }

    GridExample = () => {
        const data = [
            {
                icon: '排名',
                text: '排名'
            },
            {
                icon: '我的库存',
                text: '我的库存'
            },
            {
                icon: '我的预测',
                text: '我的预测'
            },
            {
                icon: '饰品商城',
                text: '饰品商城'
            },

        ]
        return (
            <div styleName="topMenu">
                <Grid data={data} hasLine={false} itemStyle={{ height: '50px', background: '#2c2c32', color: '#404439' }} onClick={(_el, index) => { this.goPage(_el, index) }} />
            </div>
        )
    };

    render() {
        // console.log("match-component-render:",this.state.gameTypes)
        return (
            <div styleName="wrap">
                {this.GridExample()}
                
                <BottomTab goMatchDetail={this.props.goMatchDetail} gameTypes={this.state.gameTypes} />

            </div>
        )
    }
}

MatchComponent.propTypes = {
    goBack: PropTypes.func
}

export default MatchComponent
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

        return (
            <div styleName="wrap">
                {this.GridExample()}
                <BottomTab goMatchDetail={this.props.goMatchDetail} />

            </div>
        )
    }
}

MatchComponent.propTypes = {
    goBack: PropTypes.func
}

export default MatchComponent
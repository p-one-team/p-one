import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './inventory.less'

import { Tabs, NavBar, Icon, Grid } from 'antd-mobile';

const tabs2 = [
    { title: 'Dota2', sub: '1' },
    { title: 'CS:GO', sub: '2' },
    { title: 'PUBG', sub: '3' },
];

const data = [
    {
        icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png',
        text: '不朽',
        rate: "0.39"
    },
    {
        icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png',
        text: '不朽',
        rate: "0.39"
    },
    {
        icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png',
        text: '不朽',
        rate: "0.39"
    },
    {
        icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png',
        text: '不朽',
        rate: "0.39"
    },
    {
        icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526290768043&di=9596619bd7c62cb81c21dc87a4bf4108&imgtype=0&src=http%3A%2F%2Fthumb.vpgcdn.com%2Fcrop%2F360x240%2Fitem-16599.png',
        text: '不朽',
        rate: "0.39"
    }
]

@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class InventoryComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.initData()
    }

    render() {

        // const { getFieldProps, getFieldError } = this.props.form;
        console.log(this.props)
        return (
            <div styleName="wrap">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >库存</NavBar>

                <Tabs tabs={tabs2}
                    initialPage={0}
                    tabBarPosition="top"
                    renderTab={tab => <span>{tab.title}</span>}
                >

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#fff' }}>
                        <Grid data={data}
                            columnNum={4}
                            renderItem={(item,index) => {
                                const test =  index == 0 ? (<div className="goStore" onClick={()=>this.props.goStore()}><p className="iconfont">&#xe705;</p><p>去商城购买</p></div>)
                                : (<div className="grid_item">
                                    <img src={item.icon} alt="" />
                                    <label>{item.rate}</label>                                    
                                    <span>{item.text}</span>
                                </div>)
                                return test
                                
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>Content of second tab</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>Content of third tab</div>
                </Tabs>
            </div>
        )
    }
}

InventoryComponent.propTypes = {
    phoneNumber: PropTypes.string,
    verificationCode: PropTypes.string
}

export default InventoryComponent
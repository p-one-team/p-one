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

const data = Array.from(new Array(9)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
}));

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
                    initialPage={1}
                    tabBarPosition="top"
                    renderTab={tab => <span>{tab.title}</span>}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#fff' }}>
                        <Grid data={data}
                            columnNum={4}
                            renderItem={dataItem => (
                                <div style={{ padding: '12.5px' }}>
                                    <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
                                    <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                        <span>I am title..</span>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of second tab
      </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of third tab
      </div>
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
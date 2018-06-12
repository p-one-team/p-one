import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './steam.less'
import { NavBar, Icon,  } from 'antd-mobile';
import InventoryItem from '../../layout/inventory-item'


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class SteamInventoryComponent extends Component {
    constructor(props) {
        super(props)

        this.props.getSteamInventory({
            GameCode: "570"
        })
    }

    transfer = () => {
        this.props.addToInventory({
            AppId: "570",
            Items: this.props.dotaChosenInventory
        })
    }

    content = (list) => (
        <div styleName="content">
            <p styleName="tips">如果交易失败，请检测您的steam交易链接是否正确，以及您的steam账户是否存在7天交易限制</p>
            <div styleName="inventory_part">
                {list.map((item,index)=>(
                    <InventoryItem
                        key={index}
                        itemInfo={item}
                        usageType="steam"
                    />
                ))}
            </div>
            <div styleName="transfer" onClick={()=>this.transfer()}>转入VIP库存</div>
        </div>
    )

    render() {
        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >STEAM库存</NavBar>

                {this.props.dotaSteamInventory.length == 0 ? <div styleName="nothing_content"><p>您的STEAM库存为空或者饰品不可交易</p></div> : this.content(this.props.dotaSteamInventory)}

            </div>
        )
    }
}

SteamInventoryComponent.propTypes = {
    dotaSteamInventory: PropTypes.array,
}

export default SteamInventoryComponent
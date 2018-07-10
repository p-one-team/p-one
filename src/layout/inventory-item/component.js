import React from 'react'
import CSSModules from 'react-css-modules'
import style from './inventory.less'
import store from '../../store'


@CSSModules(style)
class InventoryItemComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChosen: false
        }
    }

    steamChosen = (contextid,assetid) => {
        this.setState({
            isChosen: !this.state.isChosen
        },()=>{
            if(this.state.isChosen){
                let list = this.props.dotaChosenInventory;
                list.push({ContextId:contextid,AssetId:assetid})

                store.dispatch({
                    type: "DOTA_CHOSEN_INVENTORY",
                    dotaChosenInventory: list
                })
            }else{
                let list = this.props.dotaChosenInventory;
                let deleteId;
                list.map((item,index)=>{
                    if(item.AssetId==assetid){
                        deleteId = index
                    }
                })
                list.splice(deleteId,1)

                store.dispatch({
                    type: "DOTA_CHOSEN_INVENTORY",
                    dotaChosenInventory: list
                })
            }
        })
    }

    steamContent = (info) => (
        <div styleName="inventory_item" onClick={()=>this.steamChosen(info.contextid,info.assetid)}>
            <img src={info.icon_url} alt="" />
            {this.state.isChosen ? <div styleName="chosen"><i className="iconfont icon-gou_ico"></i></div> : null}
            <label>{info.price}</label>                                
            <span>{info.type.substr(0,2)}</span>
        </div>
    )

    vipChosen = (contextid,assetid) => {
        this.setState({
            isChosen: !this.state.isChosen
        },()=>{
            if(this.state.isChosen){
                let list = this.props.dotaChosenVipInventory;
                list.push({
                    ContextId:contextid,
                    AssetId:assetid
                })

                store.dispatch({
                    type: "DOTA_CHOSEN_VIP_INVENTORY",
                    dotaChosenVipInventory: list
                })
                this.props.changeBtn()

            }else{
                let list = this.props.dotaChosenVipInventory;
                let deleteId;
                list.map((item,index)=>{
                    if(item.AssetId==assetid){
                        deleteId = index
                    }
                })
                list.splice(deleteId,1)

                store.dispatch({
                    type: "DOTA_CHOSEN_VIP_INVENTORY",
                    dotaChosenVipInventory: list
                })
                this.props.changeBtn()

            }
        })
    }

    vipContent = (info) => (
        <div styleName="inventory_item" onClick={()=>this.vipChosen(info.ContextId,info.AssetId)}>
            <img src={info.IconUrl} alt="" />
            {this.state.isChosen ? <div styleName="chosen"><i className="iconfont icon-gou_ico"></i></div> : null}
            <label>{info.Price}</label>                                    
            <span>{info.Rarity}</span>
        </div>
    )

    forecastChosen = (ornamentId) => {
        this.setState({
            isChosen: !this.state.isChosen
        },()=>{
            if(this.state.isChosen){
                let list = this.props.dotaChosenForecastInventory;
                list.push(ornamentId)

                store.dispatch({
                    type: "DOTA_CHOSEN_FORECAST_INVENTORY",
                    dotaChosenForecastInventory: list
                })
                this.props.changeBtn()

            }else{
                let list = this.props.dotaChosenForecastInventory;
                let deleteId;
                list.map((item,index)=>{
                    if(item==ornamentId){
                        deleteId = index
                    }
                })
                list.splice(deleteId,1)

                store.dispatch({
                    type: "DOTA_CHOSEN_FORECAST_INVENTORY",
                    dotaChosenForecastInventory: list
                })
                this.props.changeBtn()

            }
        })
    }

    forecastContent = (info) => (
        <div styleName="inventory_item" onClick={()=>this.forecastChosen(info.UserOrnamentId)}>
            <img src={info.IconUrl} alt="" />
            {this.state.isChosen ? <div styleName="chosen"><i className="iconfont icon-gou_ico"></i></div> : null}
            <label>{info.Price}</label>                                    
            <span>{info.Rarity}</span>
        </div>
    )

    render() {
        let info = this.props.itemInfo;
        return this.props.usageType=="steam" 
            ? this.steamContent(info) 
            : (this.props.usageType=="vip"
                ? this.vipContent(info)
                : this.forecastContent(info)
            )
        
    }
}

export default InventoryItemComponent
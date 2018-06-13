import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './inventory.less'
import { Tabs, NavBar, Icon,  } from 'antd-mobile';
import InventoryItem from '../../layout/inventory-item'
import store from '../../store'


@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class InventoryComponent extends Component {
    constructor(props) {
        super(props)

        store.dispatch({
            type: "DOTA_CHOSEN_VIP_INVENTORY",
            dotaChosenVipInventory: []
        })

        this.props.getInventory({
            GameType: "570",
            DateSort: 0,
            PriceSort: 0,
            QualitySort: 0,
            RaritySort: 0
        })

        this.state = {
            tabs: [
                { title: 'Dota2', sub: '1' ,type: "570"},
                // { title: 'CS:GO', sub: '2' ,type: "730"},
                // { title: 'PUBG', sub: '3' ,type: "578080"},
                { title: 'G钻/T豆', sub: '4',type: "tbean" }
            ],
            dotaSort: {
                DateSort: 0,
                PriceSort: 0,
                QualitySort: 0,
                RaritySort: 0
            },
            csgoSort: {
                DateSort: 0,
                PriceSort: 0,
                QualitySort: 0,
                RaritySort: 0
            },
            pubgSort: {
                DateSort: 0,
                PriceSort: 0,
                QualitySort: 0,
                RaritySort: 0
            },
            isDotaCanSale: false
        }
    }

    changeBtnPart = () => {
        if(this.props.dotaChosenVipInventory.length>0){
            this.setState({
                isDotaCanSale: true
            })
        }else{
            this.setState({
                isDotaCanSale: false
            })
        }
    }

    changeDotaSort = (type) => {
        if(type==1){
            this.setState({
                dotaSort: {
                    DateSort: this.state.dotaSort.DateSort==0?1:0,
                    PriceSort: 0,
                    QualitySort: 0,
                    RaritySort: 0
                }
            },()=>{
                this.updateInventory("570")
            })
        }else if(type==2){
            this.setState({
                dotaSort: {
                    DateSort: 0,
                    PriceSort: this.state.dotaSort.PriceSort==0?1:0,
                    QualitySort: 0,
                    RaritySort: 0
                }
            },()=>{
                this.updateInventory("570")
            })
        }else if(type==3){
            this.setState({
                dotaSort: {
                    DateSort: 0,
                    PriceSort: 0,
                    QualitySort: this.state.dotaSort.QualitySort==0?1:0,
                    RaritySort: 0
                }
            },()=>{
                this.updateInventory("570")
            })
        }else if(type==4){
            this.setState({
                dotaSort: {
                    DateSort: 0,
                    PriceSort: 0,
                    QualitySort: 0,
                    RaritySort: this.state.dotaSort.RaritySort==0?1:0
                }
            },()=>{
                this.updateInventory("570")
            })
        }
    }

    changeCsgoSort = (type) => {
        if(type==1){
            this.setState({
                csgoSort: {
                    DateSort: this.state.csgoSort.DateSort==0?1:0,
                    PriceSort: 0,
                    QualitySort: 0,
                    RaritySort: 0
                }
            },()=>{
                this.updateInventory("730")
            })
        }else if(type==2){
            this.setState({
                csgoSort: {
                    DateSort: 0,
                    PriceSort: this.state.csgoSort.PriceSort==0?1:0,
                    QualitySort: 0,
                    RaritySort: 0
                }
            },()=>{
                this.updateInventory("730")
            })
        }
    }

    changePubgSort = (type) => {
        if(type==1){
            this.setState({
                pubgSort: {
                    DateSort: this.state.pubgSort.DateSort==0?1:0,
                    PriceSort: 0,
                    QualitySort: 0,
                    RaritySort: 0
                }
            },()=>{
                this.updateInventory("578080")
            })
        }else if(type==2){
            this.setState({
                pubgSort: {
                    DateSort: 0,
                    PriceSort: this.state.pubgSort.PriceSort==0?1:0,
                    QualitySort: 0,
                    RaritySort: 0
                }
            },()=>{
                this.updateInventory("578080")
            })
        }
    }

    updateInventory = (type) => {
        if(type=="570"){
            this.props.getInventory({
                GameType: "570",
                DateSort: this.state.dotaSort.DateSort,
                PriceSort: this.state.dotaSort.PriceSort,
                QualitySort: this.state.dotaSort.QualitySort,
                RaritySort: this.state.dotaSort.RaritySort
            })
        }else if(type=="730"){
            this.props.getInventory({
                GameType: "730",
                DateSort: this.state.csgoSort.DateSort,
                PriceSort: this.state.csgoSort.PriceSort,
                QualitySort: this.state.csgoSort.QualitySort,
                RaritySort: this.state.csgoSort.RaritySort
            })
        }else if(type=="578080"){
            this.props.getInventory({
                GameType: "578080",
                DateSort: this.state.pubgSort.DateSort,
                PriceSort: this.state.pubgSort.PriceSort,
                QualitySort: this.state.pubgSort.QualitySort,
                RaritySort: this.state.pubgSort.RaritySort
            })
        }
    }

    //dota从VIP库存取回至Steam
    getBackToSteam = () => {
        this.props.addVipToSteamInventory({
            AppId: "570",
            Items: this.props.dotaChosenVipInventory
        })
    }

    dotaContent = (info) => {
        if(info.Ornaments){
            let ornamentList;
            if(info.Ornaments && info.Ornaments.length==0){
                ornamentList = (<div styleName="go_buy">
                    <div onClick={()=>this.props.goStore()}>去商城购买<span className="iconfont icon-previewright"></span></div>
                    <div>去Steam存入<span className="iconfont icon-previewright"></span></div>
                </div>)

            }else{
                ornamentList = (<div styleName="imgPart">
                    <div styleName="goStore" onClick={()=>this.props.goStore()}>
                        <p className="iconfont icon-cart"></p>
                        <p>去商城购买</p>
                    </div>
                    {info.Ornaments.map((item,index)=>(
                        <InventoryItem
                            key={index}
                            itemInfo={item}
                            usageType="vip"
                            changeBtn={this.changeBtnPart}
                        />
                    ))}
                </div>)
            }

            return (<div>
                <div styleName="type_title">
                    <span onClick={()=>this.changeDotaSort(3)}>品质{this.state.dotaSort.QualitySort==0?<label className="iconfont icon-shang"></label>:<label className="iconfont icon-xia"></label>}</span>
                    <span onClick={()=>this.changeDotaSort(4)}>稀有度{this.state.dotaSort.RaritySort==0?<label className="iconfont icon-shang"></label>:<label className="iconfont icon-xia"></label>}</span>
                    <span onClick={()=>this.changeDotaSort(1)}>时间{this.state.dotaSort.DateSort==0?<label className="iconfont icon-shang"></label>:<label className="iconfont icon-xia"></label>}</span>
                    <span onClick={()=>this.changeDotaSort(2)}>价值{this.state.dotaSort.PriceSort==0?<label className="iconfont icon-shang"></label>:<label className="iconfont icon-xia"></label>}</span>
                </div>
                <div styleName="count_title">
                    <p>库存上限 <span>{info.Ornaments.length}</span>/300</p>
                    <p>总价值：{info.TotalCost}</p>
                </div>
                {ornamentList}
                <div styleName="btn_part">
                    <p>注：单次最多出售<span> 6 </span>件不同的饰品</p>
                    <div styleName="btn">
                        <div styleName="deposit_canclick" onClick={()=>this.props.goToSteamInventory()}>存入</div>
                        {this.state.isDotaCanSale ? <div styleName="getback_canclick" onClick={()=>this.getBackToSteam()}>取回</div> : <div>取回</div>}
                        {this.state.isDotaCanSale ? <div styleName="sale_canclick">出售</div> : <div>出售</div>}
                    </div>
                </div>
            </div>)
        }else{
            return ""
        }
    }

    csgoContent = (info) => {
        if(info.Ornaments){
            let ornamentList;
            if(info.Ornaments && info.Ornaments.length == 0){
                ornamentList = (<div styleName="go_buy">
                    <div onClick={()=>this.props.goStore()}>去商城购买<span className="iconfont icon-previewright"></span></div>
                    <div>去Steam存入<span className="iconfont icon-previewright"></span></div>
                </div>)
            }else{
                ornamentList = ""
            }

            return (<div>
                <div styleName="type_title">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span onClick={()=>this.changeCsgoSort(1)}>时间{this.state.csgoSort.DateSort==0?<label className="iconfont icon-shang"></label>:<label className="iconfont icon-xia"></label>}</span>
                    <span onClick={()=>this.changeCsgoSort(2)}>价值{this.state.csgoSort.PriceSort==0?<label className="iconfont icon-shang"></label>:<label className="iconfont icon-xia"></label>}</span>
                </div>
                <div styleName="count_title">
                    <p>库存上限 <span>0</span>/60</p>
                    <p>总价值：0.00</p>
                </div>
                {ornamentList}
                <div styleName="btn_part">
                    <div styleName="btn">
                        <div>存入</div>
                        <div>取回</div>
                        <div>出售</div>
                    </div>
                </div>
            </div>)
        }else{
            return ""
        }
    }

    pubgContent = (info) => {
        if(info.Ornaments){
            let ornamentList;
            if(info.Ornaments && info.Ornaments.length == 0){
                ornamentList = (<div styleName="go_buy">
                    <div onClick={()=>this.props.goStore()}>去商城购买<span className="iconfont icon-previewright"></span></div>
                </div>)
            }else{
                ornamentList = ""
            }

            return (<div>
                <div styleName="type_title">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span onClick={()=>this.changePubgSort(1)}>时间{this.state.pubgSort.DateSort==0?<label className="iconfont icon-shang"></label>:<label className="iconfont icon-xia"></label>}</span>
                    <span onClick={()=>this.changePubgSort(2)}>价值{this.state.pubgSort.PriceSort==0?<label className="iconfont icon-shang"></label>:<label className="iconfont icon-xia"></label>}</span>
                </div>
                <div styleName="count_title">
                    <p>库存上限 <span>0</span>/60</p>
                    <p>总价值：0.00</p>
                </div>
                {ornamentList}
                <div styleName="btn_part">
                    <div styleName="btn">
                        <div>存入</div>
                        <div>取回</div>
                        <div>补给箱</div>
                    </div>
                </div>
            </div>)
        }else{
            return ""
        }
    }


    tBeanContent = () => (<div>
        <div styleName="gzuan">
            <p styleName="title">
                <span>我的G钻</span>
                <label>明细</label>
            </p>
            <div styleName="detail">
                <p>G钻余额</p>
                <p>0</p>
                <div>购买G钻</div>
            </div>
        </div>
        <div styleName="tbean">
            <p styleName="title">
                <span>兑换T豆</span>
                <label>明细</label>
            </p>
            <div styleName="detail">
                <p>T豆余额</p>
                <p>0</p>
                <div>兑换T豆</div>
            </div>
        </div>
    </div>)

    onTabClick = (type) => {
        if(type=="tbean"){
            return false
        }else{
            this.props.getInventory({
                GameType: type,
                DateSort: 0,
                PriceSort: 0,
                QualitySort: 0,
                RaritySort: 0
            })
        }
    }

    render() {
        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >我的VIP库存</NavBar>

                <Tabs tabs={this.state.tabs}
                    initialPage={0}
                    tabBarPosition="top"
                    renderTab={tab => <span>{tab.title}</span>}
                    onTabClick={(tab) => { this.onTabClick(tab.type) }}
                >

                    <div styleName="dota_content">
                        {this.dotaContent(this.props.dotaInventory)}
                    </div>

                    {/* <div styleName="csgo_content">
                        {this.csgoContent(this.props.csgoInventory)}
                    </div>

                    <div styleName="pubg_content">
                        {this.pubgContent(this.props.pubgInventory)}
                    </div> */}

                    <div styleName="tbean_content">
                        {this.tBeanContent()}
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
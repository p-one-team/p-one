import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './inventory.less'
import { Tabs, NavBar, Icon,  } from 'antd-mobile';

@CSSModules(style, { handleNotFoundStyleName: 'ignore' })
class InventoryComponent extends Component {
    constructor(props) {
        super(props)

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
                { title: 'CS:GO', sub: '2' ,type: "730"},
                { title: 'PUBG', sub: '3' ,type: "578080"},
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
                this.props.getInventory({
                    GameType: "570",
                    DateSort: this.state.dotaSort.DateSort,
                    PriceSort: this.state.dotaSort.PriceSort,
                    QualitySort: this.state.dotaSort.QualitySort,
                    RaritySort: this.state.dotaSort.RaritySort
                })
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
                this.props.getInventory({
                    GameType: "570",
                    DateSort: this.state.dotaSort.DateSort,
                    PriceSort: this.state.dotaSort.PriceSort,
                    QualitySort: this.state.dotaSort.QualitySort,
                    RaritySort: this.state.dotaSort.RaritySort
                })
            })
        }
    }

    dotaContent = (info) => {
        if(info){
            let ornamentList;
            // if(info.Ornaments){
            //     ornamentList = (<div>
            //         <div styleName="goStore" onClick={()=>this.props.goStore()}>
            //             <p className="iconfont icon-cart"></p>
            //             <p>去商城购买</p>
            //         </div>
            //         {info.Ornaments.map((item,index)=>(
            //             <div key={index} styleName="grid_item">
            //                 <img src={item.icon} alt="" />
            //                 <label>{item.rate}</label>                                    
            //                 <span>{item.text}</span>
            //             </div>
            //         ))}
            //     </div>)
            // }else{
                ornamentList = (<div styleName="go_buy">
                    <div onClick={()=>this.props.goStore()}>去商城购买<span className="iconfont icon-previewright"></span></div>
                    <div>去Steam存入<span className="iconfont icon-previewright"></span></div>
                </div>)
            // }

            return (<div>
                <div styleName="type_title">
                    <span>品质</span>
                    <span>稀有度</span>
                    <span onClick={()=>this.changeDotaSort(1)}>时间{this.state.dotaSort.DateSort==0?<label className="iconfont icon-shang"></label>:<label className="iconfont icon-xia"></label>}</span>
                    <span onClick={()=>this.changeDotaSort(2)}>价值{this.state.dotaSort.PriceSort==0?<label className="iconfont icon-shang"></label>:<label className="iconfont icon-xia"></label>}</span>
                </div>
                <div styleName="count_title">
                    <p>库存上限 <span>0</span>/300</p>
                    <p>总价值：{info.TotalCost}</p>
                </div>
                {ornamentList}
                <div styleName="btn_part">
                    <p>注：单次最多出售<span> 6 </span>件不同的饰品</p>
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

    csgoContent = () => (<div>
        <div styleName="type_title">
            <span>类别</span>
            <span>外观</span>
            <span>时间</span>
            <span>价值</span>
        </div>
        <div styleName="count_title">
            <p>库存上限 <span>0</span>/60</p>
            <p>总价值：0.00</p>
        </div>

        <div styleName="go_buy">
            <div onClick={()=>this.props.goStore()}>去商城购买<span className="iconfont icon-previewright"></span></div>
            <div>去Steam存入<span className="iconfont icon-previewright"></span></div>
        </div>

        <div styleName="btn_part">
            <div styleName="btn">
                <div>存入</div>
                <div>取回</div>
                <div>出售</div>
            </div>
        </div>
    </div>)

    pubgContent = () => (<div>
        <div styleName="type_title">
            <span></span>
            <span></span>
            <span></span>
            <span>时间</span>
            <span>价值</span>
        </div>
        <div styleName="count_title">
            <p>库存上限 <span>0</span>/60</p>
            <p>总价值：0.00</p>
        </div>

        <div styleName="go_buy">
            <div onClick={()=>this.props.goStore()}>去商城购买<span className="iconfont icon-previewright"></span></div>
        </div>

        <div styleName="btn_part">
            <div styleName="btn">
                <div>存入</div>
                <div>取回</div>
                <div>补给箱</div>
            </div>
        </div>
    </div>)

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
        console.log(this.state.dotaSort.DateSort)
        console.log("dota",this.props.dotaInventory)
        console.log("csgo",this.props.csgoInventory)
        console.log("pubg",this.props.pubgInventory)
        return (
            <div styleName="wrap">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >我的库存</NavBar>

                <Tabs tabs={this.state.tabs}
                    initialPage={0}
                    tabBarPosition="top"
                    renderTab={tab => <span>{tab.title}</span>}
                    onTabClick={(tab) => { this.onTabClick(tab.type) }}
                >

                    <div styleName="dota_content">
                        {this.dotaContent(this.props.dotaInventory)}
                    </div>

                    <div styleName="csgo_content">
                        {this.csgoContent()}
                    </div>

                    <div styleName="pubg_content">
                        {this.pubgContent()}
                    </div>

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
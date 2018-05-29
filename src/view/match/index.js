import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'mo-dialog'
import MatchComponent from './match-component'
import axios from 'axios'
import {Toast} from 'antd-mobile'

const mapDispatchToProps = (dispatch, props) => {
    return {
        initData() {
            console.log('init index')

            // this.getGameInfo("570")
        },

        getGameTypes(){
            axios.post("/Game/GetGameTypes",{
                //无需参数
            })
            .then(function (res) {
                if(res){
                    console.log(res.Data.GameTypeModels)
                }
            })
            .catch(function (error) {
                Toast.fail('获取失败，请稍后重试！');
                console.log('error', error);
            });
        },

        getGameInfo(type){
            axios.post("/Game/GetGameInfos",{
                GameType: type
            })
            .then(function (res) {
                if(res){
                    console.log(res.Data)
                }
            })
            .catch(function (error) {
                Toast.fail('获取失败，请稍后重试！');
                console.log('error', error);
            });
        },

        goListPage() {
            props.history.push('/list')
        },

        goRankPage() {
            props.history.push('/rank')
        },
        goInventoryPage() {
            props.history.push('/inventory')
        },
        goMyForecastPage() {
            props.history.push('/myForecast')
        },
        goMiaoPage() {
            props.history.push('/miao')
        },
        goShop() {
            props.history.push('/shop')
        },
        openDialog() {
            Dialog.alert(<p>Hello from the <b style={{ color: "#f496ce" }}>Moon~</b></p>)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.HomeReducer
    }
}


const Match = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchComponent)

export default Match;
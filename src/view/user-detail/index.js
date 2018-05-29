import { connect } from 'react-redux'
import UserDetailComponent from './userdetail-component'
// import { withRouter } from 'react-router-dom'
import {Toast} from 'antd-mobile'
import axios from 'axios'


const mapDispatchToProps = (dispatch, props) => {

    return {

        initData() {
            console.log('init index')
        },

        logout(){
            axios.get("/User/Logout")
            .then(function (res) {
                if(res){
                    Toast.success('退出登录成功！');
                    //跳转到登录页
                    props.history.push('/')
				}
            })
            .catch(function (error) {
                Toast.fail('退出登录失败！');
                console.log('error', error)
            });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.HomeReducer
    }
}


const UserDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDetailComponent)

export default UserDetail;
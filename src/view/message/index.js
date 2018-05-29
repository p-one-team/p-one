import { connect } from 'react-redux'
import MessageComponent from './message-component'

const mapDispatchToProps = (dispatch, props) => {

    return {
        initData() {
            console.log('init index')
        },

        goListPage(){
            props.history.push('/list')
        }

    }
}


const Message = connect(
    null,
    mapDispatchToProps
)(MessageComponent)

export default Message;
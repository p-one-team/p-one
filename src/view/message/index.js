import { connect } from 'react-redux'
import MessageComponent from './message-component'

const mapDispatchToProps = (dispatch, props) => {

    console.log(props)
    return {

        initData() {
            console.log('init index')
        },

    }
}


const Message = connect(
    null,
    mapDispatchToProps
)(MessageComponent)

export default Message;
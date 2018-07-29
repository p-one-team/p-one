import { connect } from 'react-redux'
import MsgDetailComponent from './msgDetail-component'

const mapDispatchToProps = (dispatch, props) => {

    return {
        goListPage() {
            props.history.push('/list')
        }

    }
}

const mapStateToProps = (state) => {
    return {
        noticesDetail: state.UserReducer.noticesDetail,
    }
}

const MessageDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(MsgDetailComponent)

export default MessageDetail;
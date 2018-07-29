import { connect } from 'react-redux'
import MessageComponent from './message-component'
import { getNotices } from '../../reducers/user'
import { withRouter } from 'react-router-dom'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goMessageDetail() {
            props.history.push('/messageDetail');
        },

        getNotices(data, callback) {
            getNotices({
                Page: data.pageIndex,
                PageSize: 20,
            }, callback)
        },
    }
}

const mapStateToProps = (state) => {
    return {
        noticesList: state.UserReducer.noticesList,
    }
}

const Message = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageComponent))

export default Message;
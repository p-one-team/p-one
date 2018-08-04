import { connect } from 'react-redux'
import ProtocolComponent from './protocol-component'

const mapDispatchToProps = (dispatch, props) => {

    return {

        goListPage() {
            props.history.push('/list')
        }

    }
}


const Protocol = connect(
    null,
    mapDispatchToProps
)(ProtocolComponent)

export default Protocol;
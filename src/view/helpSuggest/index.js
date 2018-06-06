import { connect } from 'react-redux'
import HelpSuggestComponent from './help-component'

const mapDispatchToProps = (dispatch, props) => {

    return {

        goListPage(){
            props.history.push('/list')
        }

    }
}


const HelpSuggest = connect(
    null,
    mapDispatchToProps
)(HelpSuggestComponent)

export default HelpSuggest;
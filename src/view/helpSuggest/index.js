import { connect } from 'react-redux'
import HelpSuggestComponent from './help-component'

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


const HelpSuggest = connect(
    null,
    mapDispatchToProps
)(HelpSuggestComponent)

export default HelpSuggest;
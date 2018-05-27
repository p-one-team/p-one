import { connect } from 'react-redux'
import HelpSuggestComponent from './help-component'

const mapDispatchToProps = (dispatch, props) => {

    console.log(props)
    return {

        initData() {
            console.log('init index')
        },

    }
}


const HelpSuggest = connect(
    null,
    mapDispatchToProps
)(HelpSuggestComponent)

export default HelpSuggest;
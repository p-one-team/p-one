import { connect } from 'react-redux'
// import _ut from 'my-util'
import { changePage } from 'reducers/main'
import TabBarExample from './component.js'

const mapDispatchToProps = (dispatch) => {
    return {
        changePage(pageText) {
            dispatch(changePage(pageText))
        }

    }
}

const mapStateToProps = (state) => {

    // const BottomTab_state = {
    //     selectedTab: 'redTab',
    //     hidden: false,
    //     fullScreen: true,
    // }
    // const { screenSize, countValue } = state.UserReducer
    return {
        currentPage: state.MainInfoReducer.currentPage,
        hidden: false
    }
}

const BottomTab = connect(
    mapStateToProps,
    mapDispatchToProps
)(TabBarExample)

export default BottomTab;
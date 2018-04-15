import { connect } from 'react-redux'
// import _ut from 'my-util'
import { changePage } from 'reducers/main'
import MatchListWrapper from './component.js'
import { withRouter } from 'react-router-dom';


const mapDispatchToProps = (dispatch, props) => {
    console.log(props)
    return {
        changePage(pageText) {
            dispatch(changePage(pageText))
        },

        goPage(page) {
            console.log(props)
            switch (page) {
                case 'match-detail':
                    props.history.push('matchDetail');
            }

        }
    }
}

const mapStateToProps = (state) => {

    return {
        currentPage: state.MainInfoReducer.currentPage,
        hidden: false
    }
}

const MatchList = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchListWrapper))

export default MatchList;
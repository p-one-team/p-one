import { connect } from 'react-redux'
import RankComponentWrapper from './rank-component.js'
import { getRanking } from '../../reducers/rank'

const mapDispatchToProps = (dispatch, props) => {
    return {
        goListPage() {
            props.history.push('/list')
        },

        getRank(data){
            getRanking(data)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        rankTotal: state.RankReducer.rankTotal,
        rankWeek: state.RankReducer.rankWeek
    }
}


const Rank = connect(
    mapStateToProps,
    mapDispatchToProps
)(RankComponentWrapper)

export default Rank;
/*-----------------------------------------------------------------*/
/*Main Reducer*/
/*-----------------------------------------------------------------*/

const initMainInfo = {
    currentPage: 'lottery'
}

const MainInfoReducer = (state = initMainInfo, action) => {
    switch (action.type) {

        case 'CHANGE_PAGE':
            {
                console.log(action)
                return Object.assign({}, state, { currentPage: action.target })
            }
        default:
            return state
    }
}



/*-----------------------------------------------------------------*/
/*Main Action*/
/*-----------------------------------------------------------------*/
const changePage = (target) => ({
    type: 'CHANGE_PAGE',
    status: 'success',
    target,
})

const clearList = () => ({
    type: 'LIST_CLEAR'
})



/*-----------------------------------------------------------------*/
/*Async Main Action Depend on Redux-Thunk*/
/*-----------------------------------------------------------------*/



export {
    MainInfoReducer,
    changePage, clearList
}
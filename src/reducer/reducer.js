const Immutable = require('immutable')
const INITIAL_STATE = Immutable.fromJS({});

function reducer(state=INITIAL_STATE, action){
    switch(action.type){
        case 'GIT_REPO_SUCCESS': return state.merge({
                repoName : action.payload,
                success: true
            });
        case 'GIT_REPO_ERROR' : return state.merge({
                error : action.payload,
                success: false
            });
        default: return state;
    }
}

export default reducer;

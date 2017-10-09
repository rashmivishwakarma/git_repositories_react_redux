const Immutable = require('immutable')
const INITIAL_STATE = Immutable.fromJS({});

function reducer(state=INITIAL_STATE, action){
    switch(action.type){
        case 'GIT_REPO_SUCCESS': return state.merge({
                repoName : action.payload,
                NoRepo: '',
                error: ''
            });
        case 'GIT_REPO_SUCCESS_NO_REPO' : return state.merge({
                NoRepo : action.payload,
                repoName: '',
                error: ''
            });
        case 'GIT_REPO_ERROR' : return state.merge({
                error : action.payload,
                repoName: '',
                NoRepo: ''
            });
        default: return state;
    }
}

export default reducer;

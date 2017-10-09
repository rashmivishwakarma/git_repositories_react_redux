function displayGitRepo(username) {
    return dispatch => {
        return new Promise(function(resolve) {
            let req = new XMLHttpRequest();
            req.open("GET", 'https://api.github.com/users/'+username+'/repos');
            req.onload = function() {
                if (req.status === 200) {
                    resolve(req.response);
                    let repoArray = JSON.parse(req.response);
                    let unameArray = [];
                    if(repoArray.length > 0) {
                        for (let repoObj in repoArray) {
                            unameArray.push(repoArray[repoObj].name);
                        }
                        dispatch(succFun(unameArray))
                    }else if(repoArray.length == 0){
                        dispatch(succFunNoUser(unameArray))
                    }
                } else {
                    let error = req.statusText
                   dispatch(errFun(req.statusText))
                }
            };
             req.onerror = function() {
                reject(new Error("Network error"));
            };
            req.send();
        });
    }
}

const succFun = (unameArray) => ({
    type: 'GIT_REPO_SUCCESS',
    payload: {
        unameArray
    }
});

const succFunNoUser = (NoRepo) => ({
    type: 'GIT_REPO_SUCCESS_NO_REPO',
    payload: {
        NoRepo
    }
});

const errFun = (error) => ({
    type: 'GIT_REPO_ERROR',
    payload: {
        error
    }
});

export default displayGitRepo;

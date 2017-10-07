function displayGitRepo(username) {
    return dispatch => {
        return new Promise(function(resolve) {
            let req = new XMLHttpRequest();
            req.open("GET", 'https://api.github.com/users/'+username+'/repos');
            req.onload = function() {
                if (req.status === 200) {
                    resolve(req.response);
                    var repoArray = JSON.parse(req.response);
                    var unameArray = [];
                    if(repoArray.length > 0) {
                        for (var repoObj in repoArray) {
                            unameArray.push(repoArray[repoObj].name);
                        }
                    }
                    dispatch(succFun(unameArray))
                } else {
                    var error = req.statusText
                   dispatch(errFun(req.statusText))
                }
            };
             req.onerror = function() {
                  console.log('>>>>>>>>>> error network');
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

const errFun = (error) => ({
    type: 'GIT_REPO_ERROR',
    payload: {
        error
    }
});

export default displayGitRepo;

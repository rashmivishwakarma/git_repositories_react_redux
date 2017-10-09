import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import displayGitRepo from './../action/action';
import {bindActionCreators} from 'redux';

class GitRepoComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gitUserName : '',
            flag: true
        }
        this.getGitRepo = this.getGitRepo.bind(this);
        this.getGitUserName = this.getGitUserName.bind(this);
        this.disableButton = this.disableButton.bind(this);
    }

    getGitRepo(){
        this.props.displayGitRepo(this.state.gitUserName);
    }

    getGitUserName(event){
        this.setState({
            gitUserName: event.target.value
        })
    }

    disableButton(){
        if(this.state.gitUserName.length > 0){
            this.setState({
                flag: false
            })
        }else{
            this.setState({
                flag: true
            })
        }
    }

    render(){
        let responseData = " ";
        if(this.props.successData && this.props.success){
            let temp = this.props.successData.getIn(['unameArray']);
            if(temp.size > 0){
                responseData = temp.map((repo) => {
                    return <li key={repo}>{repo}</li>
                })
            } else {
                responseData = <li>You have 0 repo</li>
            }
        } else if (this.props.errorData && !this.props.success){
            responseData = <li>user not foundd</li>
        }

        return(
            <div> 
                <h3>Get Git Repositories</h3>
                <h1>Enter git username</h1>
                <input type="text" maxLength="20" value={this.state.gitUserName} onChange={this.getGitUserName} onKeyUp={this.disableButton}/>
                <button disabled={this.state.flag} onClick={this.getGitRepo}>Get git repo</button>
                <ul>
                    {responseData}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        successData: state.getIn(['repoName']),
        errorData: state.getIn(['error']),
        success: state.getIn(['success'])
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({displayGitRepo: displayGitRepo}, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(GitRepoComponent);
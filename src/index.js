import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer';
import GitRepoComponent from './component/gitRepoComponent';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk'

//SINGLE STORE 
const store = createStore(reducer, applyMiddleware(thunk,createLogger));

render( <Provider store={store}><GitRepoComponent /></Provider>, document.getElementById('root'));

export default store;
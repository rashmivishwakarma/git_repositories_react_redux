import React from 'react';
import {render} from 'react-dom';

const App = () =>
  <div>
       <h1>I am react component</h1>
  </div>;

render(<App />, document.getElementById('root'));

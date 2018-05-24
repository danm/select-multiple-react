import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './css/reithfont.css'
import './css/gel.css'

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TimeAgo from 'javascript-time-ago'
import fr from 'javascript-time-ago/locale/fr'

TimeAgo.addLocale(fr)
ReactDOM.render(<App />, document.getElementById('root'));

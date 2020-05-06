import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import axios from 'axios';
import path from 'path';

import App from './App';

let envFilePath = path.resolve(__dirname, ".env");
require('dotenv').config({path : envFilePath});

// axios.defaults.baseURL = process.env.YT_URI ;
axios.defaults.baseURL = "https://www.googleapis.com/youtube/v3/" ;
// import * as serviceWorker from './serviceWorker';


// STORE



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-select/dist/react-select.css'
import 'react-virtualized-select/styles.css'
import './customcss.css'
import Full from './Container/Full';

ReactDOM.render(< Full />, document.getElementById('root'));

{
    /*  If you want your app to work offline and load faster, you can change
     unregister() to register() below. Note this comes with some pitfalls.
     Learn more about service workers: https://bit.ly/CRA-PWA */
}
serviceWorker.unregister();
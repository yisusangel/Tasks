import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import allReducer from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter } from'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowsAlt, faAngleDown, faPencilAlt, faTrashAlt, faPlus, faUpload, faAngleLeft, faAngleDoubleLeft, faAngleRight, faAngleDoubleRight, faQuestionCircle, faDownload, faTimes, faPaperPlane, faSignOutAlt, faMinus, faSearch, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowsAlt, faAngleDown, faPencilAlt, faTrashAlt, faPlus, faUpload, faAngleLeft, faAngleDoubleLeft, faAngleRight, faAngleDoubleRight, faQuestionCircle, faDownload, faTimes, faPaperPlane, faSignOutAlt, faMinus, faSearch, faInfoCircle )

const store = createStore(allReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

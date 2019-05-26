import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import reducer from './redux/Reducer/reducer';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

let store = createStore(reducer,  applyMiddleware(apiMiddleware, thunk))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	 document.getElementById('root'));
registerServiceWorker();



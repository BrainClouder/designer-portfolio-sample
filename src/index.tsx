import React from 'react';
import ReactDOM from 'react-dom';
import './css/tailwind.css';
import './css/main.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/reducers/main';
import { BrowserRouter as Router } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';


ReactDOM.render(
	<Provider store={store}>
		<ParallaxProvider>
			<Router>
				<App />
			</Router>
		</ParallaxProvider>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

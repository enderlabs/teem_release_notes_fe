import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers/index';
import { IntlProvider } from 'react-intl';


const store = createStore(reducers, applyMiddleware(thunkMiddleware));
const locale = 'en-US';
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale={locale}>
            <App />
        </IntlProvider>
    </Provider>,
    document.getElementById('teem-add-in'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


// export default connect(mapStateToProps, notesActionsToProps)(App);
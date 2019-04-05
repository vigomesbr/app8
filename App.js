import React, { Component } from 'react';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import firebase from '@firebase/app';
import ReduxThunk from 'redux-thunk';

class App extends Component {

    componentWillMount() {

        var config = {
            apiKey: "AIzaSyB7fe8NeKj4CIz_laB5D7fUJZQX0Vt4rZo",
            authDomain: "whatsapp-clone-41553.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-41553.firebaseio.com",
            projectId: "whatsapp-clone-41553",
            storageBucket: "whatsapp-clone-41553.appspot.com",
            messagingSenderId: "819087952981"
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk) )}>
                <Routes />
            </Provider>
        );
    }
}

export default App;

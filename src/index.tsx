import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './store/store';
import { createStore } from './store/root';

const rootStore = createStore();

const Root: FC<{}> = () => (
    <StoreProvider value={rootStore}>
        <App />
    </StoreProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/store';
import App from './App';
import I18nSuspense from './components/suspense/i18nSuspense';
import './i18n';
import './firebase';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <Suspense fallback={<I18nSuspense />}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Suspense>
    </Provider>
);

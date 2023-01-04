import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
import I18nSuspense from './components/suspense/i18nSuspense';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Suspense fallback={<I18nSuspense />}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Suspense>
);

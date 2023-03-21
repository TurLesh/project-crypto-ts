import React, { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './services/hooks/useAuth';
import { listOfPaths } from './configs/listOfPaths';
import { useAppDispatch } from './services/hooks/useTypedSelector';
import { checkAuth } from './services/store/slices/userSlice';
import Layout from './components/layout/Layout';
import Analytics from './pages/analytics/AnalyticsPage';
import CryptocurrencyPage from './pages/cryptocurrency/CryptocurrencyPage';
import Error from './pages/error/ErrorPage';
import Exchanges from './pages/exchanges/ExchangesPage';
import Learn from './pages/learn/LearnPage';
import News from './pages/news/NewsPage';
import AccountPage from './pages/account/AccountPage';
import WatchlistPage from './pages/watchlist/WatchlistPage';
import ThemeProvider from './providers/ThemeProvider';

import TestPage from './pages/test/TestPage';

const App: FC = () => {
    const { i18n } = useTranslation();
    const dispatch = useAppDispatch();

    //temporary
    const { isAuth, email } = useAuth();

    useEffect(() => {
        if (isAuth) {
            console.log('Welcome', email, 'you have successfully loged in!');
        } else {
            console.log('You haven`t logged in!');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);

    //temporary

    useEffect(() => {
        const arrayOfPaths = Object.values(listOfPaths);
        const splitedPath = window.location.pathname.split('/');
        const languageFromUrl = splitedPath[1];
        if (!i18n.languages.includes(languageFromUrl)) {
            if (arrayOfPaths.includes(languageFromUrl)) {
                window.location.replace(`/${i18n.language}${window.location.pathname}`);
            } else {
                window.location.replace(`/${i18n.language}`);
            }
        }

        const activeCurrency = localStorage.getItem('activeCurrency');
        if (!activeCurrency) {
            localStorage.setItem('activeCurrency', 'usd');
        }
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(checkAuth(token));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        {/* startpoint redirects */}
                        <Route
                            path={`/${i18n.language}`}
                            element={<Navigate to={`/${i18n.language}/${listOfPaths.cryptocurrencyPath}`} />}
                        />
                        <Route
                            path={`/${i18n.language}/`}
                            element={<Navigate to={`/${i18n.language}/${listOfPaths.cryptocurrencyPath}`} />}
                        />
                        <Route
                            path={`/${i18n.language}/home`}
                            element={<Navigate to={`/${i18n.language}/${listOfPaths.cryptocurrencyPath}`} />}
                        />
                        {/* endpoint routes */}
                        <Route path={`/:param/${listOfPaths.cryptocurrencyPath}`} element={<CryptocurrencyPage />} />
                        <Route path={`/:param/${listOfPaths.exchangesPath}`} element={<Exchanges />} />
                        <Route path={`/:param/${listOfPaths.analyticsPath}`} element={<Analytics />} />
                        <Route path={`/:param/${listOfPaths.newsPath}`} element={<News />} />
                        <Route path={`/:param/${listOfPaths.learnPath}`} element={<Learn />} />
                        <Route path={`/:param/${listOfPaths.accountPath}`} element={<AccountPage />} />
                        <Route path={`/:param/${listOfPaths.watchlistPath}`} element={<WatchlistPage />} />

                        <Route path={`/:param/test`} element={<TestPage />} />

                        <Route path="*" element={<Error />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;

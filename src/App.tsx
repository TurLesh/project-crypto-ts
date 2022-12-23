import React, { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout/Layout';
import Analytics from './pages/analytics/AnalyticsPage';
import CryptocurrencyPageHardcode from './pages/cryptocurrency/CryptocurrencyPageHardcode';
// import CryptocurrencyPageWithApi from './pages/cryptocurrency/CryptocurrencyPageWithApi';
import Error from './pages/error/ErrorPage';
import Exchanges from './pages/exchanges/ExchangesPage';
import Learn from './pages/learn/LearnPage';
import News from './pages/news/NewsPage';
import ThemeProvider from './providers/ThemeProvider';

const App: FC = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const splitedPath = window.location.pathname.split('/');
        const languageFromUrl = splitedPath[1];
        if (!i18n.languages.includes(languageFromUrl)) {
            window.location.replace(`/${i18n.language}`);
        }
    });

    return (
        <ThemeProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        {/* startpoint redirects */}
                        <Route path={`/${i18n.language}`} element={<Navigate to={`/${i18n.language}/cryptocurrency`} />} />
                        <Route path={`/${i18n.language}/`} element={<Navigate to={`/${i18n.language}/cryptocurrency`} />} />
                        <Route path={`/${i18n.language}/home`} element={<Navigate to={`/${i18n.language}/cryptocurrency`} />} />
                        {/* endpoint routes */}
                        <Route path="/:param/cryptocurrency" element={<CryptocurrencyPageHardcode />} />
                        <Route path="/:param/exchanges" element={<Exchanges />} />
                        <Route path="/:param/analytics" element={<Analytics />} />
                        <Route path="/:param/news" element={<News />} />
                        <Route path="/:param/learn" element={<Learn />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;

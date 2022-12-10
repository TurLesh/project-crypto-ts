import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout/Layout';
import Analytics from './pages/analytics/AnalyticsPage';
import CryptocurrencyPage from './pages/cryptocurrency/CryptocurrencyPage';
import Error from './pages/error/ErrorPage';
import Exchanges from './pages/exchanges/ExchangesPage';
import Learn from './pages/learn/LearnPage';
import News from './pages/news/NewsPage';
import ThemeProvider from './providers/ThemeProvider';

const App: FC = () => {
    const { i18n } = useTranslation();

    return (
        <ThemeProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        {/* startpoint redirects */}
                        <Route path={'/'} element={<Navigate to={`/${i18n.language}/cryptocurrency`} />} />
                        <Route path={'/home'} element={<Navigate to={`/${i18n.language}/cryptocurrency`} />} />
                        <Route path={`/${i18n.language}`} element={<Navigate to={`/${i18n.language}/cryptocurrency`} />} />
                        <Route path={`/${i18n.language}/`} element={<Navigate to={`/${i18n.language}/cryptocurrency`} />} />
                        {/* redirect for case with no language parameter in url */}
                        <Route path={'/cryptocurrency'} element={<Navigate to={`/${i18n.language}/cryptocurrency`} />} />
                        <Route path={'/exchanges'} element={<Navigate to={`/${i18n.language}/exchanges`} />} />
                        <Route path={'/analytics'} element={<Navigate to={`/${i18n.language}/analytics`} />} />
                        <Route path={'/news'} element={<Navigate to={`/${i18n.language}/news`} />} />
                        <Route path={'/learn'} element={<Navigate to={`/${i18n.language}/learn`} />} />
                        {/* endpoint routes */}
                        <Route path="/:param/cryptocurrency" element={<CryptocurrencyPage />} />
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

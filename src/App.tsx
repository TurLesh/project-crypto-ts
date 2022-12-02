import React, { FC, useEffect, useState } from 'react';
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
    const [language, setLanguage] = useState(i18n.language);

    useEffect(() => {
        setLanguage(i18n.language);
    }, [i18n.language]);

    // console.log('useState value changed to', language);

    return (
        <ThemeProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        {/* startpoint redirects */}
                        <Route path={'/'} element={<Navigate to={`/${language}/cryptocurrency`} />} />
                        <Route path={'/home'} element={<Navigate to={`/${language}/cryptocurrency`} />} />
                        <Route path={`/${language}`} element={<Navigate to={`/${language}/cryptocurrency`} />}></Route>
                        {/* redirect for case with no language parameter in url */}
                        <Route path={'/cryptocurrency'} element={<Navigate to={`/${language}/cryptocurrency`} />} />
                        <Route path={'/exchanges'} element={<Navigate to={`/${language}/exchanges`} />} />
                        <Route path={'/analytics'} element={<Navigate to={`/${language}/analytics`} />} />
                        <Route path={'/news'} element={<Navigate to={`/${language}/news`} />} />
                        <Route path={'/learn'} element={<Navigate to={`/${language}/learn`} />} />
                        {/* endpoint routes */}
                        <Route path={`/${language}/cryptocurrency`} element={<CryptocurrencyPage />} />
                        <Route path={`/${language}/exchanges`} element={<Exchanges />} />
                        <Route path={`/${language}/analytics`} element={<Analytics />} />
                        <Route path={`/${language}/news`} element={<News />} />
                        <Route path={`/${language}/learn`} element={<Learn />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;

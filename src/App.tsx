import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Analytics from './pages/analytics/AnalyticsPage';
import CryptocurrencyPage from './pages/cryptocurrency/CryptocurrencyPage';
import Error from './pages/error/ErrorPage';
import Exchanges from './pages/exchanges/ExchangesPage';
import Learn from './pages/learn/LearnPage';
import News from './pages/news/NewsPage';
import ThemeProvider from './providers/ThemeProvider';

const App: FC = () => {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/cryptocurrency" />} />
                        <Route path="/home" element={<Navigate to="/cryptocurrency" />} />
                        <Route path="/cryptocurrency" element={<CryptocurrencyPage />} />
                        <Route path="/exchanges" element={<Exchanges />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/learn" element={<Learn />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;

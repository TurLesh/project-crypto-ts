import { FC, ReactNode } from 'react';
import Footer from './footer/FooterComponent';
import Header from './header/HeaderComponent';
import './LayoutStyle.css';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <main className="layout-wrapper">
            <Header />
            <div className="page-content-wrapper">{children}</div>
            <Footer />
        </main>
    );
};

export default Layout;

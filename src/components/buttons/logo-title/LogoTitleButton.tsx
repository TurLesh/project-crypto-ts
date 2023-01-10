import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../../services/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import logoYellow from '../../../assets/images/crypto-logo-yellow.png';
import logoAliceblue from '../../../assets/images/crypto-logo-aliceblue.png';
import './LogoTitleButtonStyle.css';

const LogoTitleButton: FC = () => {
    const { currentTheme } = useTheme();
    const { i18n } = useTranslation();
    const lang = i18n.language;

    return (
        <div className="logo-title-container">
            <div className="logo-container">
                <NavLink to={`/${lang}/cryptocurrency`} className="logo-nav">
                    {currentTheme === 'light' ? <img src={logoYellow} alt="logo" className="logo" /> : <img src={logoAliceblue} alt="logo" className="logo" />}
                </NavLink>
            </div>
            <div className="title-container">
                <NavLink to={`/${lang}/cryptocurrency`} className="title">
                    ProjectTitle
                </NavLink>
            </div>
        </div>
    );
};

export default LogoTitleButton;

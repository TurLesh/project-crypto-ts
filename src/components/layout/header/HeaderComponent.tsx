import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import LanguageDropDown from '../../buttons/language-dd/LanguageDropDown';
import CurrencyDropDown from '../../buttons/currency-dd/CurrencyDropDown';
import LogInModal from '../../modals/login-modal/LogInModal';
import SignUpModal from '../../modals/signup-modal/SignUpModal';
import AuthNavBar from '../../modals/auth-navbar/AuthNavBar';
import LogInButton from '../../buttons/log-in/LogInButton';
import SignUpButton from '../../buttons/sign-up/SignUpButton';
import DarkModeButton from '../../buttons/dark-mode/DarkModeButton';
import LogoTitleButton from '../../buttons/logo-title/LogoTitleButton';
import CoinSearchField from '../../searchfields/coin-searchfield/CoinSearchField';
import './HeaderComponentStyle.css';

const Header: FC = () => {
    const [isOpenedModalLogIn, setOpenedModalLogIn] = useState(false);
    const [isOpenedModalSignUp, setOpenedModalSignUp] = useState(false);

    const { i18n, t } = useTranslation();
    const lang = i18n.language;

    const { currentTheme, changeCurrentTheme } = useTheme();

    const changeThemeHandler = () => {
        changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    };

    // modal open / close event handlers
    const modalOnOpenLogInHandler = () => {
        setOpenedModalLogIn(true);
    };

    const modalOnOpenSignUpHandler = () => {
        setOpenedModalSignUp(true);
    };

    const modalOnCloseHandler = () => {
        isOpenedModalLogIn === true ? setOpenedModalLogIn(false) : setOpenedModalSignUp(false);
    };

    // modal navigate through event handlers
    const modalNavigateToLogIn = () => {
        setOpenedModalSignUp(false);
        setOpenedModalLogIn(true);
    };

    const modalNavigateToSignUp = () => {
        setOpenedModalLogIn(false);
        setOpenedModalSignUp(true);
    };

    return (
        <header>
            <div className="top-container">
                <LogoTitleButton />
                <CoinSearchField />
                <div className="header-buttons-container">
                    <LanguageDropDown />
                    <CurrencyDropDown />
                    <hr className="header-top-hr" />
                    <LogInButton modalOnOpenLogInHandler={modalOnOpenLogInHandler} />
                    <SignUpButton modalOnOpenSignUpHandler={modalOnOpenSignUpHandler} />
                    {isOpenedModalLogIn && (
                        <div>
                            <div className="modal-overlay-div" />
                            <div className="auth-modal-body">
                                <AuthNavBar
                                    modalLogInState={isOpenedModalLogIn}
                                    navigateToLogInHandler={modalNavigateToLogIn}
                                    modalSignUpState={isOpenedModalSignUp}
                                    navigateToSignUpHandler={modalNavigateToSignUp}
                                    modalOnCloseHandler={modalOnCloseHandler}
                                />
                                <LogInModal />
                            </div>
                        </div>
                    )}
                    {isOpenedModalSignUp && (
                        <div>
                            <div className="modal-overlay-div" />
                            <div className="auth-modal-body">
                                <AuthNavBar
                                    modalLogInState={isOpenedModalLogIn}
                                    navigateToLogInHandler={modalNavigateToLogIn}
                                    modalSignUpState={isOpenedModalSignUp}
                                    navigateToSignUpHandler={modalNavigateToSignUp}
                                    modalOnCloseHandler={modalOnCloseHandler}
                                />
                                <SignUpModal />
                            </div>
                        </div>
                    )}
                    <DarkModeButton changeThemeHandler={changeThemeHandler} />
                </div>
            </div>

            <div className="bottom-container">
                <div className="header-nav-list">
                    <div className="cryptocurrency-nav">
                        <NavLink to={`/${lang}/cryptocurrency`} className={({ isActive }) => (isActive ? 'active-item' : 'not-active-item')}>
                            {t('cryptocurrency')}
                        </NavLink>
                    </div>
                    <div className="exchanges-nav">
                        <NavLink to={`/${lang}/exchanges`} className={({ isActive }) => (isActive ? 'active-item' : 'not-active-item')}>
                            {t('exchanges')}
                        </NavLink>
                    </div>
                    <div className="analytics-nav">
                        <NavLink to={`/${lang}/analytics`} className={({ isActive }) => (isActive ? 'active-item' : 'not-active-item')}>
                            {t('analytics')}
                        </NavLink>
                    </div>
                    <div className="news-nav">
                        <NavLink to={`/${lang}/news`} className={({ isActive }) => (isActive ? 'active-item' : 'not-active-item')}>
                            {t('news')}
                        </NavLink>
                    </div>
                    <div className="learn-nav">
                        <NavLink to={`/${lang}/learn`} className={({ isActive }) => (isActive ? 'active-item' : 'not-active-item')}>
                            {t('learn')}
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

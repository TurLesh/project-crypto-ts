import { FC, ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GoogleIcon from '../../../assets/images/google-icon.png';
import './LoginModalStyle.css';

const LogInModal: FC = () => {
    const { t } = useTranslation();

    const [valuesLogIn, setValuesLogIn] = useState<{ emailLogIn: string; passwordLogIn: string }>({
        emailLogIn: '',
        passwordLogIn: ''
    });

    const [isFocusedOnPassInput, setIsFocusedOnPassInput] = useState(false);

    const [wasFocusedOnEmailInput, setWasFocusedOnEmailInput] = useState(false);
    const [wasFocusedOnPassInput, setWasFocusedOnPassInput] = useState(false);

    const [isHoveringEmailIcon, setIsHoveringEmailIcon] = useState(false);
    const [isHoveringPassIcon, setIsHoveringPassIcon] = useState(false);

    const [inputPasswordType, setInputPasswordType] = useState('password');
    const [isPassVisible, setPassVisible] = useState(false);

    const [isEmailInputValid, setIsEmailInputValid] = useState(true);
    const [isPassInputValid, setIsPassInputValid] = useState(true);

    //functions to track input.validity.valid values (true/false); it was used for displaying error icons
    const emailInputValidity = () => {
        const emailInput = document.getElementById('username') as HTMLInputElement | null;
        if (emailInput != null) {
            const emailInputValid = emailInput.validity.valid;
            setIsEmailInputValid(emailInputValid);
        }
    };

    const passInputValidity = () => {
        const passInput = document.getElementById('password') as HTMLInputElement | null;
        if (passInput != null) {
            const passInputValid = passInput.validity.valid;
            setIsPassInputValid(passInputValid);
        }
    };

    //input focus event handler
    const passInputOnFocusHandler = () => {
        setIsFocusedOnPassInput(true);
    };

    //input values change event handlers
    const emailInputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesLogIn({ ...valuesLogIn, emailLogIn: event.target.value });
        if (wasFocusedOnEmailInput) {
            emailInputValidity();
        }
    };

    const passInputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesLogIn({ ...valuesLogIn, passwordLogIn: event.target.value });
        if (wasFocusedOnPassInput) {
            passInputValidity();
        }
    };

    // input blur event handlers
    const emailInputOnBlurHandler = () => {
        setWasFocusedOnEmailInput(true);
        emailInputValidity();
    };

    const passInputOnBlurHandler = () => {
        setWasFocusedOnPassInput(true);
        setIsFocusedOnPassInput(false);
        passInputValidity();
    };

    // error icons event handlers
    const emailErrorIconOnMouseOverHandler = () => {
        setIsHoveringEmailIcon(true);
    };

    const passErrorIconOnMouseOverHandler = () => {
        setIsHoveringPassIcon(true);
    };

    const emailErrorIconOnMouseOutHandler = () => {
        setIsHoveringEmailIcon(false);
    };

    const passErrorIconOnMouseOutHandler = () => {
        setIsHoveringPassIcon(false);
    };

    // password visibility toggle handler (on eye icon click)
    const eyeOnClickHandler = () => {
        setPassVisible((current) => !current);
    };

    useEffect(() => {
        isPassVisible === true ? setInputPasswordType('text') : setInputPasswordType('password'); // useState is asynchronous -> useEffect hook required in this case!
    }, [isPassVisible]);

    // classNames with conditional(ternary) operator
    const passInputWrapperClassName: string = isFocusedOnPassInput ? 'pass-input-wrapper pass-input-wrapper-focused' : 'pass-input-wrapper';

    //input placeholders with i18n
    const emailInputPlaceholder: string = t('modal_login_signup.email_input_placeholder');
    const passInputPlaceholder: string = t('modal_login_signup.pass_input_placeholder');

    return (
        <div className="login-modal-wrapper">
            <div className="modal-form-container">
                <form id="login" className="login-form">
                    {/* onSubmit={(e) => submitHandler(e)} */}
                    <label htmlFor="email" className="email-lable">
                        {t('modal_login_signup.email')}
                        {!isEmailInputValid && <InfoOutlinedIcon className="email-err-icon" onMouseOver={emailErrorIconOnMouseOverHandler} onMouseOut={emailErrorIconOnMouseOutHandler} />}
                        <div>
                            {isHoveringEmailIcon && (
                                <div className="email-error">
                                    <p className="email-error-msg">It should be a valid email address!</p>
                                </div>
                            )}
                        </div>
                    </label>
                    <input
                        onChange={emailInputOnChangeHandler}
                        onBlur={emailInputOnBlurHandler}
                        className="email-input"
                        type="email"
                        placeholder={emailInputPlaceholder}
                        id="username"
                        name="username"
                        autoComplete="username"
                        value={valuesLogIn.emailLogIn}
                        required
                    />
                    <div className="pass-top-info">
                        <label htmlFor="password" className="pass-lable">
                            {t('modal_login_signup.pass')}
                            {!isPassInputValid && <InfoOutlinedIcon className="pass-err-icon" onMouseOver={passErrorIconOnMouseOverHandler} onMouseOut={passErrorIconOnMouseOutHandler} />}
                            <div>
                                {isHoveringPassIcon && (
                                    <div className="pass-error">
                                        <p className="pass-error-msg">8-20 characters, only letters and numbers, both required</p>
                                    </div>
                                )}
                            </div>
                        </label>
                        <button className="pass-forgot">{t('modal_login_signup.pass_forgot')}</button>
                    </div>
                    <div className={passInputWrapperClassName}>
                        <input
                            onFocus={passInputOnFocusHandler}
                            onChange={passInputOnChangeHandler}
                            onBlur={passInputOnBlurHandler}
                            className="pass-input"
                            type={inputPasswordType}
                            autoComplete="current-password"
                            placeholder={passInputPlaceholder}
                            id="password"
                            name="password"
                            value={valuesLogIn.passwordLogIn}
                            pattern="^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,20}$"
                            required
                        />
                        {isPassVisible ? <VisibilityIcon onClick={eyeOnClickHandler} className="icon-visibility" /> : <VisibilityOffIcon onClick={eyeOnClickHandler} className="icon-visibility" />}
                    </div>
                    <button type="submit" className="submit-login-form-button">
                        Log In
                    </button>
                </form>
            </div>
            <div className="modal-continuewith-container">
                <p className="continue-with-or">{t('modal_login_signup.or')}</p>
                <button className="continue-with-button">
                    <img src={GoogleIcon} className="continue-with-icon" alt="continue-with-icon" />
                    {t('modal_login_signup.continue_with')}
                </button>
            </div>
        </div>
    );
};

export default LogInModal;

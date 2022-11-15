import { FC, ChangeEvent, useState, useEffect } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GoogleIcon from '../../../assets/images/google-icon.png';
import './LoginModalStyle.css';

const LogInModal: FC = () => {
    const [valuesLogIn, setValuesLogIn] = useState<{ emailLogIn: string; passwordLogIn: string }>({
        emailLogIn: '',
        passwordLogIn: ''
    });

    const [wasFocusedOnEmailInput, setWasFocusedOnEmailInput] = useState(false);
    const [wasFocusedOnPassInput, setWasFocusedOnPassInput] = useState(false);

    const [isHoveringEmailIcon, setIsHoveringEmailIcon] = useState(false);
    const [isHoveringPassIcon, setIsHoveringPassIcon] = useState(false);

    const [inputPasswordType, setInputPasswordType] = useState('password');
    const [isPassVisible, setPassVisible] = useState(false);

    //input values change event handlers
    const emailInputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesLogIn({ ...valuesLogIn, emailLogIn: event.target.value });
    };

    const passInputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesLogIn({ ...valuesLogIn, passwordLogIn: event.target.value });
    };

    // input blur event handlers
    const emailInputOnBlurHandler = () => {
        setWasFocusedOnEmailInput(true);
    };

    const passInputOnBlurHandler = () => {
        setWasFocusedOnPassInput(true);
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
    const emailInputClassName: string = wasFocusedOnEmailInput ? 'email-input login-email-valid' : 'email-input';
    const passInputClassName: string = wasFocusedOnPassInput ? 'pass-input login-pass-valid' : 'pass-input';

    return (
        <div className="login-modal-wrapper">
            <div className="modal-form-container">
                <form id="login" className="login-form">
                    {/* onSubmit={(e) => submitHandler(e)} */}
                    <label htmlFor="email" className="email-lable">
                        Email Address
                    </label>
                    <input
                        onChange={emailInputOnChangeHandler}
                        onBlur={emailInputOnBlurHandler}
                        className={emailInputClassName}
                        type="email"
                        placeholder="Enter your email"
                        id="username"
                        name="username"
                        autoComplete="username"
                        value={valuesLogIn.emailLogIn}
                        required
                    />
                    <InfoOutlinedIcon onMouseOver={emailErrorIconOnMouseOverHandler} onMouseOut={emailErrorIconOnMouseOutHandler} className="login-email-err-icon" />
                    {isHoveringEmailIcon && (
                        <div className="email-error">
                            <p className="email-error-msg">It should be a valid email address!</p>
                        </div>
                    )}
                    <div className="pass-top-info">
                        <label htmlFor="password" className="pass-lable">
                            Password
                        </label>
                        <button className="pass-forgot">Forgot password?</button>
                    </div>
                    <input
                        onChange={passInputOnChangeHandler}
                        onBlur={passInputOnBlurHandler}
                        className={passInputClassName}
                        type={inputPasswordType}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        id="password"
                        name="password"
                        value={valuesLogIn.passwordLogIn}
                        pattern="^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,20}$"
                        required
                    />
                    <InfoOutlinedIcon onMouseOver={passErrorIconOnMouseOverHandler} onMouseOut={passErrorIconOnMouseOutHandler} className="login-pass-err-icon" />
                    {isHoveringPassIcon && (
                        <div className="pass-error">
                            <p className="pass-error-msg">8-20 characters, 1 letter and 1 number at least</p>
                        </div>
                    )}
                    <div onClick={eyeOnClickHandler} className="eye-icon-container">
                        {isPassVisible ? <VisibilityIcon className="icon-visiblity visible-true" /> : <VisibilityOffIcon className="icon-visiblity visible-false" />}
                    </div>
                    <button type="submit" className="submit-login-form-button">
                        Log In
                    </button>
                </form>
            </div>
            <div className="modal-continuewith-container">
                <p className="continue-with-or">OR</p>
                <button className="continue-with-button">
                    <img src={GoogleIcon} className="continue-with-icon" alt="continue-with-icon" />
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default LogInModal;

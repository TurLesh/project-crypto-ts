import { FC, ChangeEvent, useState, useEffect } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GoogleIcon from '../../../assets/images/google-icon.png';
import './SignUpModalStyle.css';

const SignUpModal: FC = () => {
    const [valuesSignUp, setValuesSignUp] = useState<{ emailSignUp: string; passwordSignUp: string; confirmSignUp: string }>({
        emailSignUp: '',
        passwordSignUp: '',
        confirmSignUp: ''
    });

    const [wasFocusedOnEmailInput, setWasFocusedOnEmailInput] = useState(false);
    const [wasFocusedOnPassInput, setWasFocusedOnPassInput] = useState(false);
    const [isFocusedOnConfirmInput, setIsFocusedOnConfirmInput] = useState(false);

    const [isHoveringEmailIcon, setIsHoveringEmailIcon] = useState(false);
    const [isHoveringPassIcon, setIsHoveringPassIcon] = useState(false);
    const [isHoveringConfirmIcon, setIsHoveringConfirmIcon] = useState(false);

    const [inputPasswordType, setInputPasswordType] = useState('password');
    const [isPassVisible, setPassVisible] = useState(false);

    // input values change event handlers
    const emailInputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesSignUp({ ...valuesSignUp, emailSignUp: event.target.value });
    };

    const passInputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesSignUp({ ...valuesSignUp, passwordSignUp: event.target.value });
    };

    const confirmInputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesSignUp({ ...valuesSignUp, confirmSignUp: event.target.value });
    };

    // input blur event handlers; confirm input focus event handler
    const emailInputOnBlurHandler = () => {
        setWasFocusedOnEmailInput(true);
    };

    const passInputOnBlurHandler = () => {
        setWasFocusedOnPassInput(true);
    };

    const confirmInputOnFocusHandler = () => {
        setIsFocusedOnConfirmInput(true);
    };

    // error icons event handlers
    const emailErrorIconOnMouseOverHandler = () => {
        setIsHoveringEmailIcon(true);
    };

    const passErrorIconOnMouseOverHandler = () => {
        setIsHoveringPassIcon(true);
    };

    const confirmErrorIconOnMouseOverHandler = () => {
        setIsHoveringConfirmIcon(true);
    };

    const emailErrorIconOnMouseOutHandler = () => {
        setIsHoveringEmailIcon(false);
    };

    const passErrorIconOnMouseOutHandler = () => {
        setIsHoveringPassIcon(false);
    };

    const confirmErrorIconOnMouseOutHandler = () => {
        setIsHoveringConfirmIcon(false);
    };

    // password visibility toggle handler (on eye icon click)
    const eyeOnClickHandler = () => {
        setPassVisible((current) => !current);
    };

    useEffect(() => {
        isPassVisible === true ? setInputPasswordType('text') : setInputPasswordType('password'); // useState is asynchronous -> useEffect hook required in this case!
    }, [isPassVisible]);

    // classNames with conditional(ternary) operator
    const emailInputClassName: string = wasFocusedOnEmailInput ? 'email-input signup-email-valid' : 'email-input';
    const passInputClassName: string = wasFocusedOnPassInput ? 'pass-input signup-pass-valid' : 'pass-input';
    const confirmInputClassName: string = isFocusedOnConfirmInput ? 'pass-input signup-confirm-valid' : 'pass-input';

    return (
        <div className="signup-modal-wrapper">
            <div className="modal-form-container">
                {/* watch scss!!! */}
                <form id="signup" className="signup-form">
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
                        value={valuesSignUp.emailSignUp}
                        required
                    />
                    <InfoOutlinedIcon className="signup-email-err-icon" onMouseOver={emailErrorIconOnMouseOverHandler} onMouseOut={emailErrorIconOnMouseOutHandler} />
                    {isHoveringEmailIcon && (
                        <div className="email-error">
                            <p className="email-error-msg">It should be a valid email address!</p>
                        </div>
                    )}
                    <label htmlFor="password" className="pass-lable">
                        Password
                    </label>
                    <input
                        onChange={passInputOnChangeHandler}
                        onBlur={passInputOnBlurHandler}
                        className={passInputClassName}
                        type={inputPasswordType}
                        autoComplete="new-password"
                        placeholder="Enter your password"
                        id="new-password"
                        name="new-password"
                        value={valuesSignUp.passwordSignUp}
                        pattern="^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,20}$"
                        required
                    />
                    <InfoOutlinedIcon className="signup-pass-err-icon" onMouseOver={passErrorIconOnMouseOverHandler} onMouseOut={passErrorIconOnMouseOutHandler} />
                    {isHoveringPassIcon && (
                        <div className="pass-error">
                            <p className="pass-error-msg">8-20 characters, 1 letter and 1 number at least</p>
                        </div>
                    )}
                    <div onClick={eyeOnClickHandler} className="eye-icon-container">
                        {isPassVisible ? <VisibilityIcon className="icon-visiblity visible-true" /> : <VisibilityOffIcon className="icon-visiblity visible-false" />}
                    </div>
                    <label htmlFor="password" className="pass-lable">
                        Confirm password
                    </label>
                    <input
                        onChange={confirmInputOnChangeHandler}
                        onFocus={confirmInputOnFocusHandler}
                        className={confirmInputClassName}
                        type={inputPasswordType}
                        autoComplete="new-password"
                        placeholder="Confirm your password"
                        id="new-password-repeat"
                        name="new-password-repeat"
                        value={valuesSignUp.confirmSignUp}
                        pattern={valuesSignUp.passwordSignUp}
                        required
                    />
                    <InfoOutlinedIcon className="signup-confirm-err-icon" onMouseOver={confirmErrorIconOnMouseOverHandler} onMouseOut={confirmErrorIconOnMouseOutHandler} />
                    {isHoveringConfirmIcon && (
                        <div className="confirm-error">
                            <p className="confirm-error-msg">Passwords don't match!</p>
                        </div>
                    )}
                    <div onClick={eyeOnClickHandler} className="eye-icon-container-confirm">
                        {isPassVisible ? <VisibilityIcon className="icon-visiblity visible-true" /> : <VisibilityOffIcon className="icon-visiblity visible-false" />}
                    </div>
                    <button type="submit" className="submit-signup-form-button">
                        Sign Up
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

export default SignUpModal;

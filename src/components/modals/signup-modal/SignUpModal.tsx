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

    const [isFocusedOnPassInput, setIsFocusedOnPassInput] = useState(false);
    const [isFocusedOnConfirmInput, setIsFocusedOnConfirmInput] = useState(false);
    const [isFocusedOnConfirmInputWrapper, setIsFocusedOnConfirmInputWrapper] = useState(false);

    const [wasFocusedOnEmailInput, setWasFocusedOnEmailInput] = useState(false);
    const [wasFocusedOnPassInput, setWasFocusedOnPassInput] = useState(false);

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

    //inputs focus event handlers
    const passInputOnFocusHandler = () => {
        setIsFocusedOnPassInput(true);
    };

    const confirmInputOnFocusHandler = () => {
        setIsFocusedOnConfirmInput(true);
        setIsFocusedOnConfirmInputWrapper(true);
    };

    // input blur event handlers
    const emailInputOnBlurHandler = () => {
        setWasFocusedOnEmailInput(true);
    };

    const passInputOnBlurHandler = () => {
        setWasFocusedOnPassInput(true);
        setIsFocusedOnPassInput(false);
    };

    const confirmInputOnBlurHandler = () => {
        setIsFocusedOnConfirmInputWrapper(false);
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
    const passInputWrapperClassName: string = isFocusedOnPassInput ? 'pass-input-wrapper pass-input-wrapper-focused' : 'pass-input-wrapper';
    const passInputClassName: string = wasFocusedOnPassInput ? 'pass-input signup-pass-valid' : 'pass-input';
    const confirmInputWrapperClassName: string = isFocusedOnConfirmInputWrapper ? 'confirm-input-wrapper confirm-input-wrapper-focused' : 'confirm-input-wrapper';
    const confirmInputClassName: string = isFocusedOnConfirmInput ? 'confirm-input signup-confirm-valid' : 'confirm-input';

    return (
        <div className="signup-modal-wrapper">
            <div className="modal-form-container">
                <form id="signup" className="signup-form">
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
                    <div className={passInputWrapperClassName}>
                        <input
                            onChange={passInputOnChangeHandler}
                            onFocus={passInputOnFocusHandler}
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
                        {isPassVisible ? <VisibilityIcon onClick={eyeOnClickHandler} className="icon-visibility" /> : <VisibilityOffIcon onClick={eyeOnClickHandler} className="icon-visibility" />}
                        <InfoOutlinedIcon className="signup-pass-err-icon" onMouseOver={passErrorIconOnMouseOverHandler} onMouseOut={passErrorIconOnMouseOutHandler} />
                        {isHoveringPassIcon && (
                            <div className="pass-error">
                                <p className="pass-error-msg">8-20 characters, only letters and numbers</p>
                            </div>
                        )}
                    </div>
                    <label htmlFor="password" className="pass-lable">
                        Confirm password
                    </label>
                    <div className={confirmInputWrapperClassName}>
                        <input
                            onChange={confirmInputOnChangeHandler}
                            onFocus={confirmInputOnFocusHandler}
                            onBlur={confirmInputOnBlurHandler}
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
                        {isPassVisible ? <VisibilityIcon onClick={eyeOnClickHandler} className="icon-visibility" /> : <VisibilityOffIcon onClick={eyeOnClickHandler} className="icon-visibility" />}
                        <InfoOutlinedIcon className="signup-confirm-err-icon" onMouseOver={confirmErrorIconOnMouseOverHandler} onMouseOut={confirmErrorIconOnMouseOutHandler} />
                        {isHoveringConfirmIcon && (
                            <div className="confirm-error">
                                <p className="confirm-error-msg">Passwords don't match!</p>
                            </div>
                        )}
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

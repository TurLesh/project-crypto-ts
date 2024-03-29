import { FC, ChangeEvent, useState, useEffect, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GoogleIcon from '../../../assets/images/google-icon.png';
import SuccessGif from '../../../assets/images/success.gif';
import './SignUpModalStyle.css';

interface ISignUpModal {
    isAuth: boolean;
    closeModal: () => void;
}

interface ISignUpData {
    emailSignUp: string;
    passwordSignUp: string;
    confirmSignUp: string;
}

const SignUpModal: FC<ISignUpModal> = (props) => {
    const { isAuth, closeModal } = props;
    const { t } = useTranslation();

    const [valuesSignUp, setValuesSignUp] = useState<ISignUpData>({
        emailSignUp: '',
        passwordSignUp: '',
        confirmSignUp: ''
    });

    const [isFocusedOnPassInput, setIsFocusedOnPassInput] = useState(false);
    const [isFocusedOnConfirmInput, setIsFocusedOnConfirmInput] = useState(false);

    const [wasFocusedOnEmailInput, setWasFocusedOnEmailInput] = useState(false);
    const [wasFocusedOnPassInput, setWasFocusedOnPassInput] = useState(false);
    const [wasFocusedOnConfirmInput, setWasFocusedOnConfirmInput] = useState(false);

    const [isHoveringEmailIcon, setIsHoveringEmailIcon] = useState(false);
    const [isHoveringPassIcon, setIsHoveringPassIcon] = useState(false);
    const [isHoveringConfirmIcon, setIsHoveringConfirmIcon] = useState(false);

    const [inputPasswordType, setInputPasswordType] = useState('password');
    const [isPassVisible, setPassVisible] = useState(false);

    const [isEmailInputValid, setIsEmailInputValid] = useState(true);
    const [isPassInputValid, setIsPassInputValid] = useState(true);
    const [isConfirmInputValid, setIsConfirmInputValid] = useState(true);

    const [showSuccessSignUp, setShowSuccessSignUp] = useState(false);

    // use effect to show gif and close modal every time user sign up
    useEffect(() => {
        if (isAuth) {
            setShowSuccessSignUp(true);
            const timer = setTimeout(() => {
                closeModal();
                setShowSuccessSignUp(false);
            }, 1000);
            return () => clearTimeout(timer);
        }

        if (!isAuth) {
            setShowSuccessSignUp(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);

    // sign up handler
    const handleSignUp = (e: SyntheticEvent, email: string, password: string) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log('registered user: ', user);
                //////////////////////////////////////////////////////////////////////
            })
            .catch(console.error);
    };

    // sign up with google handler
    const signUpWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(({ user }) => {
                console.log('google signed in user: ', user);
                //////////////////////////////////////////////////////////////////////
            })
            .catch(console.error);
    };

    //functions to track input.validity.valid values (true/false); it was used for displaying error icons
    const emailInputValidity = () => {
        const emailInput = document.getElementById('username') as HTMLInputElement | null;
        if (emailInput != null) {
            const emailInputValid = emailInput.validity.valid;
            setIsEmailInputValid(emailInputValid);
        }
    };

    const passInputValidity = () => {
        const passInput = document.getElementById('new-password') as HTMLInputElement | null;
        if (passInput != null) {
            const passInputValid = passInput.validity.valid;
            setIsPassInputValid(passInputValid);
        }
    };

    const confirmInputValidity = () => {
        const confirmInput = document.getElementById('new-password-confirm') as HTMLInputElement | null;
        if (confirmInput != null) {
            const confirmInputValid = confirmInput.validity.valid;
            setIsConfirmInputValid(confirmInputValid);
        }
    };

    // input values change event handlers
    const emailInputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesSignUp({ ...valuesSignUp, emailSignUp: event.target.value });
        if (wasFocusedOnEmailInput) {
            emailInputValidity();
        }
    };

    const passInputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesSignUp({ ...valuesSignUp, passwordSignUp: event.target.value });
        if (wasFocusedOnPassInput) {
            passInputValidity();
        }
        const passInput = document.getElementById('new-password') as HTMLInputElement | null;
        const passInputValue = passInput?.value;
        const confirmInput = document.getElementById('new-password-confirm') as HTMLInputElement | null;
        const confirmInputValue = confirmInput?.value;
        if (wasFocusedOnConfirmInput) {
            if (passInputValue !== confirmInputValue) {
                setIsConfirmInputValid(false);
            } else {
                setIsConfirmInputValid(true);
            }
        }
    };

    const confirmInputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesSignUp({ ...valuesSignUp, confirmSignUp: event.target.value });
        confirmInputValidity();
    };

    //inputs focus event handlers
    const passInputOnFocusHandler = () => {
        setIsFocusedOnPassInput(true);
    };

    const confirmInputOnFocusHandler = () => {
        setIsFocusedOnConfirmInput(true);
        confirmInputValidity();
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

    const confirmInputOnBlurHandler = () => {
        setIsFocusedOnConfirmInput(false);
        setWasFocusedOnConfirmInput(true);
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
    const passInputWrapperClassName: string = isFocusedOnPassInput
        ? 'pass-input-wrapper pass-input-wrapper-focused'
        : 'pass-input-wrapper';
    const confirmInputWrapperClassName: string = isFocusedOnConfirmInput
        ? 'confirm-input-wrapper confirm-input-wrapper-focused'
        : 'confirm-input-wrapper';

    //input placeholders with i18n
    const emailInputPlaceholder: string = t('modal_login_signup.email_input_placeholder');
    const passInputPlaceholder: string = t('modal_login_signup.pass_input_placeholder');
    const confirmInputPlaceholder: string = t('modal_login_signup.pass_confirm_placeholder');

    return (
        <div className="signup-modal-wrapper">
            {showSuccessSignUp ? (
                <div className="modal-success-wrapper">
                    <img src={SuccessGif} className="to-the-moon-gif" alt="to-the-moon-gif" />
                </div>
            ) : (
                <div className="modal-form-wrapper">
                    <div className="modal-form-container">
                        <form
                            id="signup"
                            className="signup-form"
                            onSubmit={(e) => handleSignUp(e, valuesSignUp.emailSignUp, valuesSignUp.passwordSignUp)}
                        >
                            <label htmlFor="email" className="email-lable">
                                {t('modal_login_signup.email')}
                                {!isEmailInputValid && (
                                    <InfoOutlinedIcon
                                        className="email-err-icon"
                                        onMouseOver={emailErrorIconOnMouseOverHandler}
                                        onMouseOut={emailErrorIconOnMouseOutHandler}
                                    />
                                )}
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
                                value={valuesSignUp.emailSignUp}
                                required
                            />
                            <label htmlFor="password" className="pass-lable">
                                {t('modal_login_signup.pass')}
                                {!isPassInputValid && (
                                    <InfoOutlinedIcon
                                        className="pass-err-icon"
                                        onMouseOver={passErrorIconOnMouseOverHandler}
                                        onMouseOut={passErrorIconOnMouseOutHandler}
                                    />
                                )}
                                <div>
                                    {isHoveringPassIcon && (
                                        <div className="pass-error">
                                            <p className="pass-error-msg">
                                                8-20 characters, only letters and numbers, both required
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </label>
                            <div className={passInputWrapperClassName}>
                                <input
                                    onChange={passInputOnChangeHandler}
                                    onFocus={passInputOnFocusHandler}
                                    onBlur={passInputOnBlurHandler}
                                    className="pass-input"
                                    type={inputPasswordType}
                                    autoComplete="new-password"
                                    placeholder={passInputPlaceholder}
                                    id="new-password"
                                    name="new-password"
                                    value={valuesSignUp.passwordSignUp}
                                    pattern="^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,20}$"
                                    required
                                />
                                {isPassVisible ? (
                                    <VisibilityIcon onClick={eyeOnClickHandler} className="icon-visibility" />
                                ) : (
                                    <VisibilityOffIcon onClick={eyeOnClickHandler} className="icon-visibility" />
                                )}
                            </div>
                            <label htmlFor="password" className="confirm-lable">
                                {t('modal_login_signup.pass_confirm')}
                                {!isConfirmInputValid && (
                                    <InfoOutlinedIcon
                                        className="confirm-err-icon"
                                        onMouseOver={confirmErrorIconOnMouseOverHandler}
                                        onMouseOut={confirmErrorIconOnMouseOutHandler}
                                    />
                                )}
                                <div>
                                    {isHoveringConfirmIcon && (
                                        <div className="confirm-error">
                                            <p className="confirm-error-msg">Passwords don't match!</p>
                                        </div>
                                    )}
                                </div>
                            </label>
                            <div className={confirmInputWrapperClassName}>
                                <input
                                    onChange={confirmInputOnChangeHandler}
                                    onFocus={confirmInputOnFocusHandler}
                                    onBlur={confirmInputOnBlurHandler}
                                    className="confirm-input"
                                    type={inputPasswordType}
                                    autoComplete="new-password"
                                    placeholder={confirmInputPlaceholder}
                                    id="new-password-confirm"
                                    name="new-password-confirm"
                                    value={valuesSignUp.confirmSignUp}
                                    pattern={valuesSignUp.passwordSignUp}
                                    required
                                />
                                {isPassVisible ? (
                                    <VisibilityIcon onClick={eyeOnClickHandler} className="icon-visibility" />
                                ) : (
                                    <VisibilityOffIcon onClick={eyeOnClickHandler} className="icon-visibility" />
                                )}
                            </div>
                            <button className="submit-signup-form-button" type="submit">
                                Sign Up
                            </button>
                        </form>
                    </div>
                    <div className="modal-continuewith-container">
                        <p className="continue-with-or">{t('modal_login_signup.or')}</p>
                        <button className="continue-with-button" onClick={() => signUpWithGoogle()}>
                            <img src={GoogleIcon} className="continue-with-icon" alt="continue-with-icon" />
                            {t('modal_login_signup.continue_with')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUpModal;

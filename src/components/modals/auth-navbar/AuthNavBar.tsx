import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './AuthNavBarStyle.css';

type Props = {
    modalLogInState: boolean;
    navigateToLogInHandler: () => void;
    modalSignUpState: boolean;
    navigateToSignUpHandler: () => void;
    modalOnCloseHandler: () => void;
};

const AuthNavBar: FC<Props> = ({ modalLogInState, navigateToLogInHandler, modalSignUpState, navigateToSignUpHandler, modalOnCloseHandler }) => {
    const modalNavBarLogInClassName: string = modalLogInState ? 'modal-nav-login' : 'modal-nav-login-unactive';
    const modalNavBarSignUpClassName: string = modalSignUpState ? 'modal-nav-signup' : 'modal-nav-signup-unactive';

    return (
        <div className="modal-nav-container">
            <button onClick={navigateToLogInHandler} className={modalNavBarLogInClassName}>
                Log In
            </button>
            <button onClick={navigateToSignUpHandler} className={modalNavBarSignUpClassName}>
                Sign Up
            </button>
            <CloseIcon className="modal-nav-close" onClick={modalOnCloseHandler} />
        </div>
    );
};

export default AuthNavBar;

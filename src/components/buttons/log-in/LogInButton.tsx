import { FC } from 'react';
import './LogInButtonStyle.css';

type Props = {
    modalOnOpenLogInHandler: () => void;
};

const LogInButton: FC<Props> = ({ modalOnOpenLogInHandler }) => {
    return (
        <button onClick={modalOnOpenLogInHandler} className="login-button-body">
            Log In
        </button>
    );
};

export default LogInButton;

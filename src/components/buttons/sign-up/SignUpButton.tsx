import { FC } from 'react';
import './SignUpButtonStyle.css';

type Props = {
    modalOnOpenSignUpHandler: () => void;
};

const SignUpButton: FC<Props> = ({ modalOnOpenSignUpHandler }) => {
    return (
        <button onClick={modalOnOpenSignUpHandler} className="signup-button-body">
            Sign Up
        </button>
    );
};

export default SignUpButton;

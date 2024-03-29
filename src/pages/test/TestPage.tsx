import { useState, ChangeEvent, FC, SyntheticEvent } from 'react';
import { useAuth } from '../../services/hooks/useAuth';
import AuthActions from '../../services/auth/AuthActions';
import { useAppDispatch } from '../../services/hooks/useTypedSelector';
import { SET_USER, REMOVE_USER } from '../../services/store/reducers/userReducer';

interface ILogInData {
    emailLogIn: string;
    passwordLogIn: string;
}

interface ISignUpData {
    emailSignUp: string;
    passwordSignUp: string;
}

const TestPage: FC = () => {
    const { isAuth, email } = useAuth();
    const dispatch = useAppDispatch();

    const [valuesLogIn, setValuesLogIn] = useState<ILogInData>({
        emailLogIn: '',
        passwordLogIn: ''
    });

    const [valuesSignUp, setValuesSignUp] = useState<ISignUpData>({
        emailSignUp: '',
        passwordSignUp: ''
    });

    const logOutHandler = () => {
        // AuthActions('logout');
        dispatch({ type: REMOVE_USER });
    };

    //log in data change handlers
    const logInEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesLogIn({ ...valuesLogIn, emailLogIn: event.target.value });
    };

    const logInPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesLogIn({ ...valuesLogIn, passwordLogIn: event.target.value });
    };

    //sign up data change handlers
    const signUpEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesSignUp({ ...valuesSignUp, emailSignUp: event.target.value });
    };

    const signUpPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesSignUp({ ...valuesSignUp, passwordSignUp: event.target.value });
    };

    const handleLogIn = (e: SyntheticEvent, email: string, password: string) => {
        e.preventDefault();
        const user = {
            email: 'login123@gmail.com',
            token: 'huyhuyhuytoken',
            id: '228228'
        };
        dispatch({ type: SET_USER, payload: user });
        // AuthActions('login', email, password);
    };

    const handleSignUp = (e: SyntheticEvent, email: string, password: string) => {
        e.preventDefault();
        // const user = {
        //     email: 'signedup123@gmail.com',
        //     token: 'huyhuyhuytoken',
        //     id: '123123'
        // };
        // dispatch({ type: SET_USER, payload: user });
        AuthActions('signup', email, password);
    };

    return (
        <div>
            {isAuth ? (
                <div>
                    <div>Welcome, {email} </div> <button onClick={logOutHandler}>Sign out</button>
                </div>
            ) : (
                <div>You are not logged in!</div>
            )}
            <div>
                <div>Log In Form</div>
                <form
                    id="login"
                    className="login-form"
                    onSubmit={(e) => handleLogIn(e, valuesLogIn.emailLogIn, valuesLogIn.passwordLogIn)}
                >
                    <input placeholder="Email" onChange={logInEmailChangeHandler} />
                    <input placeholder="Password" onChange={logInPasswordChangeHandler} />
                    <button type="submit">Log In</button>
                </form>
            </div>
            <div>
                <div>Sign Up Form</div>
                <form
                    id="signup"
                    className="signup-form"
                    onSubmit={(e) => handleSignUp(e, valuesSignUp.emailSignUp, valuesSignUp.passwordSignUp)}
                >
                    <input placeholder="Email" onChange={signUpEmailChangeHandler} />
                    <input placeholder="Password" onChange={signUpPasswordChangeHandler} />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default TestPage;

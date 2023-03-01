import { useState, ChangeEvent, FC, SyntheticEvent } from 'react';
import { useAuth } from '../../services/hooks/useAuth'; /////////////////////////////////
import { useAppDispatch } from '../../services/hooks/useTypedSelector';
import { loginUser, signupUser, logoutUser } from '../../services/store/slices/userSlice';
import _ from 'lodash';

interface ILogInData {
    emailLogIn: string;
    passwordLogIn: string;
}

interface ISignUpData {
    emailSignUp: string;
    passwordSignUp: string;
}

const TestPage: FC = () => {
    const dispatch = useAppDispatch();
    const { isAuth, email, status, error } = useAuth();

    const [valuesLogIn, setValuesLogIn] = useState<ILogInData>({
        emailLogIn: '',
        passwordLogIn: ''
    });

    const [valuesSignUp, setValuesSignUp] = useState<ISignUpData>({
        emailSignUp: '',
        passwordSignUp: ''
    });

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
        //can only pass 1 prop into user actions, so cover multiple into object
        const userData = {
            email,
            password
        };
        dispatch(loginUser(userData));
        // AuthActions('login', email, password);
    };

    const handleSignUp = (e: SyntheticEvent, email: string, password: string) => {
        e.preventDefault();
        //can only pass 1 prop into user actions, so cover multiple into object
        const userData = {
            email,
            password
        };
        dispatch(signupUser(userData));
        // AuthActions('signup', email, password);
    };

    const handleLogOut = () => {
        dispatch(logoutUser());
        // AuthActions('logout');
    };

    return (
        <div>
            {isAuth ? (
                <div>
                    <div>Welcome, {email} </div> <button onClick={handleLogOut}>Sign out</button>
                </div>
            ) : (
                <div>You are not logged in!</div>
            )}
            {status === 'pending' && <h2>Loading...</h2>}
            {!_.isEmpty(error) && <h2>Error occured: {error}</h2>}
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

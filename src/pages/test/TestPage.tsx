import { useState, ChangeEvent, FC, SyntheticEvent } from 'react';
import { useAppDispatch } from '../../services/hooks/useTypedSelector';
import { useAuth } from '../../services/hooks/useAuth';
import { removeUser, setUser } from '../../services/store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

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

    const { isAuth, email } = useAuth();

    const [valuesLogIn, setValuesLogIn] = useState<ILogInData>({
        emailLogIn: '',
        passwordLogIn: ''
    });

    const [valuesSignUp, setValuesSignUp] = useState<ISignUpData>({
        emailSignUp: '',
        passwordSignUp: ''
    });

    const signOutHandler = () => {
        dispatch(removeUser());
    };

    //log in handlers
    const logInEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesLogIn({ ...valuesLogIn, emailLogIn: event.target.value });
    };

    const logInPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesLogIn({ ...valuesLogIn, passwordLogIn: event.target.value });
    };

    //signup handlers
    const signUpEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesSignUp({ ...valuesSignUp, emailSignUp: event.target.value });
    };

    const signUpPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValuesSignUp({ ...valuesSignUp, passwordSignUp: event.target.value });
    };

    console.log('log in data: ', valuesLogIn);
    console.log('sign up data: ', valuesSignUp);

    const handleLogIn = (e: SyntheticEvent, email: string, password: string) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log('logged in as: ', user);
                dispatch(
                    setUser({
                        email: user.email,
                        token: user.refreshToken,
                        id: user.uid
                    })
                );
            })
            .catch(console.error);
    };

    const handleSignUp = (e: SyntheticEvent, email: string, password: string) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log('registered user: ', user);
                dispatch(
                    setUser({
                        email: user.email,
                        token: user.refreshToken,
                        id: user.uid
                    })
                );
            })
            .catch(console.error);
    };

    return (
        <div>
            {isAuth ? (
                <div>
                    <div>Welcome, {email} </div> <button onClick={() => signOutHandler()}>Sign out</button>
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

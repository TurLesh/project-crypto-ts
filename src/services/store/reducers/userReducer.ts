interface IUserAction {
    type: string;
    payload?: any;
}

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

const defaultState = {
    user: {
        email: '',
        token: '',
        id: ''
    }
};

const emptyUser = {
    email: '',
    token: '',
    id: ''
};

export const userReducer = (state = defaultState, action: IUserAction) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: emptyUser };
        default:
            return state;
    }
};

interface ICategoriesAction {
    type: string;
    payload?: any;
}

export const CHANGE_SELECTED_CATEGORY = 'CHANGE_SELECTED_CATEGORY';
export const REMOVE_SELECTED_CATEGORY = 'REMOVE_SELECTED_CATEGORY';

const defaultState = {
    selectedCategory: {
        category_id: '',
        category_name: ''
    }
};

export const categoriesReducer = (state = defaultState, action: ICategoriesAction) => {
    switch (action.type) {
        case CHANGE_SELECTED_CATEGORY:
            return { ...state, selectedCategory: action.payload };
        case REMOVE_SELECTED_CATEGORY:
            return { ...state, selectedCategory: { category_id: '', category_name: '' } };
        default:
            return state;
    }
};

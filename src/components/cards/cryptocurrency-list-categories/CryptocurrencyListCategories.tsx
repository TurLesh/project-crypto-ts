import { FC } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import './CryptocurrencyListCategoriesStyle.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/store';
import { CHANGE_SELECTED_CATEGORY } from '../../../services/store/reducers/categoriesReducer';

interface ICategoryState {
    category_id: string;
    category_name: string;
}

const CryptocurrencyListCategories: FC = () => {
    //get selected category value from storage
    const selectedCategoryObject = useSelector((state: RootState) => state.selectedCategory);
    const selectedCategoryState: ICategoryState = selectedCategoryObject.selectedCategory;
    const selectedCategoryName: string = selectedCategoryState.category_name;

    const dispatch: AppDispatch = useDispatch();

    const removeSelectedCategory = () => {
        const emptyCategoryObject = {
            category_id: '',
            category_name: ''
        };

        dispatch({ type: CHANGE_SELECTED_CATEGORY, payload: emptyCategoryObject });
    };

    return (
        <div className="selected-categories-list-wrapper">
            Selected Category:{' '}
            <button className="category-remove-btn">
                {selectedCategoryName}
                <div className="remove-icon-container" onClick={removeSelectedCategory}>
                    <CancelIcon className="remove-icon" />
                </div>
            </button>
        </div>
    );
};

export default CryptocurrencyListCategories;

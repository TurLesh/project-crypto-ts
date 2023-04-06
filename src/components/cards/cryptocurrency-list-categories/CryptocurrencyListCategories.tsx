import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';
import { useAppDispatch } from '../../../services/hooks/useTypedSelector';
import { REMOVE_SELECTED_CATEGORY } from '../../../services/store/reducers/categoriesReducer';
import CancelIcon from '@mui/icons-material/Cancel';
import './CryptocurrencyListCategoriesStyle.css';

interface ICategoryState {
    category_id: string;
    category_name: string;
}

const CryptocurrencyListCategories: FC = () => {
    const dispatch = useAppDispatch();

    //get selected category value from storage
    const selectedCategoryObject = useSelector((state: RootState) => state.selectedCategory);
    const selectedCategoryState: ICategoryState = selectedCategoryObject.selectedCategory;
    const selectedCategoryName: string = selectedCategoryState.category_name;

    const removeSelectedCategory = () => {
        dispatch({ type: REMOVE_SELECTED_CATEGORY });
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

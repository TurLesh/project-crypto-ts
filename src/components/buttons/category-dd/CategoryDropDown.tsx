import { FC, useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ICategoriesList } from '../../../configs/interfaces/CryptocurrencyPageInterfaces';
import CategorySearchField from '../../searchfields/category-searchfield/CategorySearchField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './CategoryDropDownStyle.css';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/store';
import { CHANGE_SELECTED_CATEGORY } from '../../../services/store/categoriesReducer';

interface ICategoriesDD {
    categoriesListData: ICategoriesList[];
}

const CategoryDropDown: FC<ICategoriesDD> = (props) => {
    const { categoriesListData } = props;

    const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
    const categoryDropDownRef = useRef<HTMLDivElement>(null);

    // close dd on click out of dd panel
    useEffect(() => {
        if (isCategoryExpanded === true) {
            const handleClickOutside = (event: any) => {
                if (categoryDropDownRef.current && !categoryDropDownRef.current.contains(event.target)) {
                    setIsCategoryExpanded(false);
                }
            };
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }
    }, [isCategoryExpanded]);

    const dispatch: AppDispatch = useDispatch();

    // set selected category to state and close panel on item click inside panel
    const selectCategory = (category_id: string, name: string) => {
        setIsCategoryExpanded(false);

        const selectedCategoryObject = {
            category_id: category_id,
            category_name: name
        };

        //set value to storage
        dispatch({ type: CHANGE_SELECTED_CATEGORY, payload: selectedCategoryObject });
    };

    //on category dd button click handler
    const expandCategoryHandler = () => {
        setIsCategoryExpanded((prevValue) => !prevValue);
    };

    //categories tiles map inside panel container
    const categoryItemMap = categoriesListData.map(({ category_id, name }) => {
        return (
            <div key={category_id}>
                <div className="category-dd-panel-tile">
                    <button onClick={() => selectCategory(category_id, name)} className="category-dd-panel-btn">
                        <p className="category-dd-panel-btn-text">{name}</p>
                    </button>
                </div>
            </div>
        );
    });

    const categoryArrow = isCategoryExpanded ? (
        <ArrowDropUpIcon className="category-dd-arrow" />
    ) : (
        <ArrowDropDownIcon className="category-dd-arrow" />
    );

    return (
        <div ref={categoryDropDownRef} className="category-dd-wrapper">
            <button className="category-dd-btn" onClick={expandCategoryHandler}>
                Category {categoryArrow}
            </button>
            <CSSTransition in={isCategoryExpanded} timeout={200} classNames="display" unmountOnExit>
                <div className="category-dd-panel-wrapper">
                    <div className="category-dd-panel-triangle" />
                    <div className="category-dd-panel-container">
                        <CategorySearchField />
                        {categoryItemMap}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default CategoryDropDown;

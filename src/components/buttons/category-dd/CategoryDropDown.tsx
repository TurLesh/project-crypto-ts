import { FC, useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/store';
import { CHANGE_SELECTED_CATEGORY } from '../../../services/store/reducers/categoriesReducer';
import { ICategoriesList } from '../../../configs/interfaces/CryptocurrencyPageInterfaces';
import CategorySearchField from '../../searchfields/category-searchfield/CategorySearchField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LoadingAnimation from '../../../assets/css-animations/loading-animation/LoadingAnimation';
import './CategoryDropDownStyle.css';

interface ICategoriesDD {
    categoriesListData: ICategoriesList[];
    categoriesListDataGetError: {
        isError: boolean;
        message: string;
    };
}

const CategoryDropDown: FC<ICategoriesDD> = (props) => {
    const { categoriesListData, categoriesListDataGetError } = props;

    const [categoriesList, setCategoriesList] = useState<ICategoriesList[]>(categoriesListData);
    const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
    const categoryDropDownRef = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [categoriesListJSX, setCategoriesListJSX] = useState<JSX.Element[]>([]);

    useEffect(() => {
        // error occured
        if (_.isEmpty(categoriesListData) && categoriesListDataGetError.isError) {
            setIsError(true);
            setIsLoading(false);
        }

        // data loaded successfuly
        if (!_.isEmpty(categoriesListData) && !categoriesListDataGetError.isError) {
            setIsError(false);
            setIsLoading(false);
            setCategoriesListJSX(categoriesItemsMapFunc(categoriesListData));
        }

        // data is loading
        if (_.isEmpty(categoriesListData) && !categoriesListDataGetError.isError) {
            setIsError(false);
            setIsLoading(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoriesListData, categoriesListDataGetError]);

    useEffect(() => {
        setCategoriesListJSX(categoriesItemsMapFunc(categoriesList));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoriesList]);

    const categoriesItemsMapFunc = (list: ICategoriesList[]) => {
        //categories tiles map inside panel container
        const categoriesItemsMap = list.map(({ category_id, name }) => {
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

        return categoriesItemsMap;
    };

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

    ///////////// FILTERING BLOCK STARTS HERE /////////////
    //input text state (for child input component)
    const [inputText, setInputText] = useState<string>('');

    // listen to input value change + set input value to 'inputText' state (passed to child component to set state in parent component)
    const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value);
    };

    // function to filter data using includes() if input text is not empty
    const filterCatgories = (inputText: string, categoriesListData: ICategoriesList[]) => {
        if (inputText === '') {
            return categoriesListData;
        }
        return categoriesListData.filter(({ name }) => name.toLowerCase().includes(inputText.toLowerCase()));
    };

    // useEffect to call filter function on inputText state change and write filtered categories list to 'categoriesList' state
    useEffect(() => {
        const filteredCategories = filterCatgories(inputText, categoriesListData);
        setCategoriesList(filteredCategories);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputText]);

    const categoryArrow = isCategoryExpanded ? (
        <ArrowDropUpIcon className="category-dd-arrow" />
    ) : (
        <ArrowDropDownIcon className="category-dd-arrow" />
    );

    const panelContainerClassName = isLoading
        ? 'category-dd-panel-container-loading'
        : isError
        ? 'category-dd-panel-container-error'
        : 'category-dd-panel-container';

    return (
        <div ref={categoryDropDownRef} className="category-dd-wrapper">
            <button className="category-dd-btn" onClick={expandCategoryHandler}>
                Category {categoryArrow}
            </button>
            <CSSTransition in={isCategoryExpanded} timeout={200} classNames="display" unmountOnExit>
                <div className="category-dd-panel-wrapper">
                    <div className="category-dd-panel-triangle" />
                    <div className={panelContainerClassName}>
                        {isLoading ? (
                            <LoadingAnimation />
                        ) : (
                            <>
                                {isError ? (
                                    categoriesListDataGetError.message
                                ) : (
                                    <>
                                        <CategorySearchField inputText={inputText} setInputText={inputChangeHandler} />
                                        {categoriesListJSX}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default CategoryDropDown;

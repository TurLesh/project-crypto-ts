import { FC, useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { categoryConfigs } from '../../../configs/ddConfigs';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './CategoryDropDownStyle.css';

type categoryListType = {
    category_id: string;
    name: string;
};

const CategoryDropDown: FC = () => {
    const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
    const categoryDropDownRef = useRef<HTMLDivElement>(null);
    const categoryList: categoryListType[] = categoryConfigs;

    // temporary
    const [selectedCategory, setSelectedCategory] = useState('');
    console.log(selectedCategory);

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

    // close dd after category select
    useEffect(() => {
        setIsCategoryExpanded(false);
    }, [selectedCategory]);

    //on category button click handler
    const expandCategoryHandler = () => {
        setIsCategoryExpanded((prevValue) => !prevValue);
    };

    //categories tiles map inside panel container
    const categoryItemMap = categoryList.map(({ category_id, name }) => {
        return (
            <div key={category_id}>
                <div className="category-dd-panel-tile">
                    <button onClick={() => setSelectedCategory(category_id)} className="category-dd-panel-btn">
                        <p className="category-dd-panel-btn-text">{name}</p>
                    </button>
                </div>
            </div>
        );
    });

    const categoryArrow = isCategoryExpanded ? <ArrowDropUpIcon className="category-dd-arrow" /> : <ArrowDropDownIcon className="category-dd-arrow" />;

    return (
        <div ref={categoryDropDownRef} className="category-dd-wrapper">
            <button className="category-dd-btn" onClick={expandCategoryHandler}>
                Category {categoryArrow}
            </button>
            <CSSTransition in={isCategoryExpanded} timeout={200} classNames="display" unmountOnExit>
                <div className="category-dd-panel-wrapper">
                    <div className="category-dd-panel-triangle" />
                    <div className="category-dd-panel-container">{categoryItemMap}</div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default CategoryDropDown;

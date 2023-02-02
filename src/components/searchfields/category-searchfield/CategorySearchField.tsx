import { FC, useState } from 'react';
import './CategorySearchFieldStyle.css';

const CategorySearchField: FC = () => {
    const [isFocusedCategorySearchField, setIsFocusedCategorySearchField] = useState(false);
    const [inputText, setInputText] = useState('');

    const inputFocusAndBlurHandler = () => {
        setIsFocusedCategorySearchField((prevIsFocusedCategorySearchField) => !prevIsFocusedCategorySearchField);
    };

    // listen to input value change + set input value to 'inputText' state
    const inputChangeHandler = () => {
        const input = document.getElementById('category-input') as HTMLInputElement | null;
        if (input != null) {
            input?.addEventListener('input', function (event) {
                const target = event.target as HTMLInputElement;
                setInputText(target.value);
            });
        }
    };

    const inputPlaceholder: string | undefined = isFocusedCategorySearchField ? undefined : 'Find category...';

    return (
        <div className="category-searchfield-wrapper">
            <input
                className="category-searchfield"
                id="category-input"
                onFocus={inputFocusAndBlurHandler}
                onBlur={inputFocusAndBlurHandler}
                onChange={inputChangeHandler}
                placeholder={inputPlaceholder}
            />
        </div>
    );
};

export default CategorySearchField;

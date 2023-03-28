import { FC, useState } from 'react';
import './CategorySearchFieldStyle.css';

interface IInputChange {
    inputText: string;
    setInputText: (e: React.FormEvent<HTMLInputElement>) => void;
}

const CategorySearchField: FC<IInputChange> = (props) => {
    const { inputText, setInputText } = props;
    const [isFocusedCategorySearchField, setIsFocusedCategorySearchField] = useState(false);

    const inputFocusAndBlurHandler = () => {
        setIsFocusedCategorySearchField((prevIsFocusedCategorySearchField) => !prevIsFocusedCategorySearchField);
    };

    const inputPlaceholder: string | undefined = isFocusedCategorySearchField ? undefined : 'Find category...';

    return (
        <div className="category-searchfield-wrapper">
            <input
                className="category-searchfield"
                id="category-input"
                value={inputText}
                onFocus={inputFocusAndBlurHandler}
                onBlur={inputFocusAndBlurHandler}
                onChange={setInputText}
                placeholder={inputPlaceholder}
            />
        </div>
    );
};

export default CategorySearchField;

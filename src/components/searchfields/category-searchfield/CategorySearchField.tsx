import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CategorySearchFieldStyle.css';

interface IInputChange {
    inputText: string;
    setInputText: (e: React.FormEvent<HTMLInputElement>) => void;
}

const CategorySearchField: FC<IInputChange> = (props) => {
    const { inputText, setInputText } = props;
    const { t } = useTranslation();
    const [isFocusedCategorySearchField, setIsFocusedCategorySearchField] = useState(false);

    const inputFocusAndBlurHandler = () => {
        setIsFocusedCategorySearchField((prevIsFocusedCategorySearchField) => !prevIsFocusedCategorySearchField);
    };

    const inputPlaceholderText = t('cryptocurrency-filters-panel.categories.categories-input-placeholder');
    const inputPlaceholder: string | undefined = isFocusedCategorySearchField ? undefined : inputPlaceholderText;

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

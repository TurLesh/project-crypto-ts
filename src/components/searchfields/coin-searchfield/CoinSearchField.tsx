import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import './CoinSearchFieldStyle.css';

const CoinSearchField: FC = () => {
    const [isFocusedCoinSearchField, setIsFocusedCoinSearchField] = useState(false);

    const { t } = useTranslation();

    const inputFocusAndBlurHandler = () => {
        setIsFocusedCoinSearchField((prevIsFocusedCoinSearchField) => !prevIsFocusedCoinSearchField);
    };

    const placeholderTranslation = t('coin-searchfield');

    //classNames with conditional(ternary) operator
    const containerClassName: string = isFocusedCoinSearchField
        ? 'coin-searchfield-container searchfield-active'
        : 'coin-searchfield-container';
    const searchIconClassName: string = isFocusedCoinSearchField
        ? 'coin-seach-icon coin-search-icon-active'
        : 'coin-seach-icon';
    const inputPlaceholder: string | undefined = isFocusedCoinSearchField ? undefined : placeholderTranslation;

    return (
        <div className={containerClassName}>
            <input
                className="coin-searchfield"
                placeholder={inputPlaceholder}
                onFocus={inputFocusAndBlurHandler}
                onBlur={inputFocusAndBlurHandler}
            />
            <SearchIcon className={searchIconClassName} />
        </div>
    );
};

export default CoinSearchField;

import { FC, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './CoinSearchFieldStyle.css';

const CoinSearchField: FC = () => {
    const [isFocusedCoinSearchField, setIsFocusedCoinSearchField] = useState(false);

    const inputFocusAndBlurHandler = () => {
        setIsFocusedCoinSearchField((prevIsFocusedCoinSearchField) => !prevIsFocusedCoinSearchField);
    };

    //classNames with conditional(ternary) operator
    const containerClassName: string = isFocusedCoinSearchField ? 'coin-searchfield-container searchfield-active' : 'coin-searchfield-container';
    const searchIconClassName: string = isFocusedCoinSearchField ? 'coin-seach-icon coin-search-icon-active' : 'coin-seach-icon';
    const inputPlaceholder: string | undefined = isFocusedCoinSearchField ? undefined : 'Search for my coin...';

    return (
        <div className={containerClassName}>
            <input className="coin-searchfield" placeholder={inputPlaceholder} onFocus={inputFocusAndBlurHandler} onBlur={inputFocusAndBlurHandler} />
            <SearchIcon className={searchIconClassName} />
        </div>
    );
};

export default CoinSearchField;

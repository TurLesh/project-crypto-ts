import { FC, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './CryptocurrencyListFiltersStyle.css';

const CryptocurrencyListFilters: FC = () => {
    const [isShowRowsOpened, setIsShowRowsOpened] = useState(false);

    const openShowRowsHandler = () => {
        setIsShowRowsOpened((prevValue) => !prevValue);
    };

    const showRowsArrow = isShowRowsOpened ? <ArrowDropUpIcon className="show-rows-dd-icon" /> : <ArrowDropDownIcon className="show-rows-dd-icon" />;

    return (
        <div className="filters-wrapper">
            <div className="filter-button filter-watchlist">
                <div className="watchlist-star-icon-container">
                    <StarIcon className="watchlist-star-icon" />
                </div>
                <div className="watchlist-text">Watchlist</div>
            </div>
            <div className="filter-dd filter-show-rows-wrapper">
                <div className="show-rows-text">Show rows: </div>
                <button className="show-rows-dd-wrapper" onClick={openShowRowsHandler}>
                    <div className="show-rows-dd-number">20</div>
                    <div className="show-rows-dd-icon-container">{showRowsArrow}</div>
                </button>
            </div>
            <div className="filter-dd">someshit2</div>
        </div>
    );
};

export default CryptocurrencyListFilters;

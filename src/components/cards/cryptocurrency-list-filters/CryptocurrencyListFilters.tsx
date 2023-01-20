import { FC } from 'react';
import WatchlistButton from '../../buttons/watchlist/WatchlistButton';
import ShowRowsDropDown from '../../buttons/show-rows-dd/ShowRowsDropDown';
import ChartTypeDropDown from '../../buttons/chart-type-dd/ChartTypeDropDown';
import CategoryDropDown from '../../buttons/category-dd/CategoryDropDown';
import './CryptocurrencyListFiltersStyle.css';

const CryptocurrencyListFilters: FC = () => {
    return (
        <div className="filters-wrapper">
            <div className="filters-left-panel">
                <WatchlistButton />
            </div>
            <div className="filters-right-panel">
                <div className="right-panel-item">
                    <CategoryDropDown />
                </div>
                <div className="right-panel-item">
                    <ShowRowsDropDown />
                </div>
                <div className="right-panel-item">
                    <ChartTypeDropDown />
                </div>
            </div>
        </div>
    );
};

export default CryptocurrencyListFilters;

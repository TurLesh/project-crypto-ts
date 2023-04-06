import { FC } from 'react';
import { ICategoriesList } from '../../../configs/interfaces/CryptocurrencyPageInterfaces';
import WatchlistButton from '../../buttons/watchlist/WatchlistButton';
import ShowRowsDropDown from '../../buttons/show-rows-dd/ShowRowsDropDown';
import ChartTypeDropDown from '../../buttons/chart-type-dd/ChartTypeDropDown';
import CategoryDropDown from '../../buttons/category-dd/CategoryDropDown';
import './CryptocurrencyListFiltersStyle.css';

interface IFiltersList {
    categoriesListData: ICategoriesList[];
    categoriesListDataGetError: {
        isError: boolean;
        message: string;
    };
    triggerShowWatchlist: () => void;
    isShowWatchlist: boolean;
    setShowWatchlistToFalse: () => void;
}

const CryptocurrencyListFilters: FC<IFiltersList> = (props) => {
    const {
        categoriesListData,
        categoriesListDataGetError,
        triggerShowWatchlist,
        isShowWatchlist,
        setShowWatchlistToFalse
    } = props;

    return (
        <div className="filters-wrapper">
            <div className="filters-left-panel">
                <WatchlistButton triggerShowWatchlist={triggerShowWatchlist} isShowWatchlist={isShowWatchlist} />
            </div>
            <div className="filters-right-panel">
                <div className="right-panel-item">
                    <CategoryDropDown
                        categoriesListData={categoriesListData}
                        categoriesListDataGetError={categoriesListDataGetError}
                        isShowWatchlist={isShowWatchlist}
                        setShowWatchlistToFalse={setShowWatchlistToFalse}
                    />
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

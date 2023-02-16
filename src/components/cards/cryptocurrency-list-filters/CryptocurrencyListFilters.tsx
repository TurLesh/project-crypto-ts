import { FC, useEffect, useState } from 'react';
import _ from 'lodash';
import { ICategoriesList } from '../../../configs/interfaces/CryptocurrencyPageInterfaces';
import WatchlistButton from '../../buttons/watchlist/WatchlistButton';
import ShowRowsDropDown from '../../buttons/show-rows-dd/ShowRowsDropDown';
import ChartTypeDropDown from '../../buttons/chart-type-dd/ChartTypeDropDown';
import CategoryDropDown from '../../buttons/category-dd/CategoryDropDown';
import './CryptocurrencyListFiltersStyle.css';

interface IFiltersList {
    categoriesListData: ICategoriesList[];
}

const CryptocurrencyListFilters: FC<IFiltersList> = (props) => {
    const { categoriesListData } = props;
    const [isCategoriesArrayEmpty, setIsCategoriesArrayEmpty] = useState<boolean>();

    useEffect(() => {
        if (!_.isEmpty(categoriesListData)) {
            setIsCategoriesArrayEmpty(false);
        } else {
            setIsCategoriesArrayEmpty(true);
        }
    }, [categoriesListData]);

    return (
        <div className="filters-wrapper">
            <div className="filters-left-panel">
                <WatchlistButton />
            </div>
            <div className="filters-right-panel">
                <div className="right-panel-item">
                    {!isCategoriesArrayEmpty && <CategoryDropDown categoriesListData={categoriesListData} />}
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

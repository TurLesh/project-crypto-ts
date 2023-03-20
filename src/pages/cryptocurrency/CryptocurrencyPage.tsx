import { FC, useState, useEffect } from 'react';
import _ from 'lodash';
import { ICoinListData } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import { ICategoriesList } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import { ICategoryState } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import { IResultObject } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import { getCoinListData } from '../../services/requests/GetCoinListData';
import { getCandlestickChartData } from '../../services/requests/GetCandlestickData';
import { getCategoriesList } from '../../services/requests/GetCategoriesList';
import { getCategoryData } from '../../services/requests/GetCategoryData';
import CryptocurrencySliderContainer from '../../components/containers/cryptocurrency-page/CryptocurrencySliderContainer';
import CryptocurrencyListFilters from '../../components/cards/cryptocurrency-list-filters/CryptocurrencyListFilters';
import CryptocurrencyListCategories from '../../components/cards/cryptocurrency-list-categories/CryptocurrencyListCategories';
import CryptocurrencyListInfo from '../../components/cards/cryptocurrency-list-cards/info-card/CryptocurrencyListInfo';
import CryptocurrencyListContainer from '../../components/containers/cryptocurrency-page/CryptocurrencyListContainer';
import './CryptocurrencyPageStyle.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

const CryptocurrencyPage: FC = () => {
    const [coinListData, setCoinListData] = useState<ICoinListData[]>([]);
    const [candlestickSeriesData, setCandlestickSeriesData] = useState<object[]>([]);
    const [categoriesListData, setCategoriesListData] = useState<ICategoriesList[]>([]);
    const [categoryData, setCategoryData] = useState<ICoinListData[]>([]);
    const [isCategorySelected, setIsCategorySelected] = useState(false);

    const [dataGetError, setDataGetError] = useState(false);

    //get active currency value from storage
    const activeCurrencyStateObject = useSelector((state: RootState) => state.currency);
    const activeCurrencyState: string = activeCurrencyStateObject.activeCurrency;

    //get selected category value from storage
    const selectedCategoryObject = useSelector((state: RootState) => state.selectedCategory);
    const selectedCategoryState: ICategoryState = selectedCategoryObject.selectedCategory;

    //get selected rows amount value from storage
    const activeRowsAmountObject = useSelector((state: RootState) => state.rowsAmount);
    const activeRowsAmountState: number = activeRowsAmountObject.rowsAmount;

    //get chart type value from storage
    const activeChartTypeObject = useSelector((state: RootState) => state.chartType);
    const activeChartTypeState: string = activeChartTypeObject.selectedChartType;

    /////////////////////// CATEGORIES LIST GET BLOCK STARTS HERE ///////////////////////////////

    //get Categories List only at first render and pass value to 'categoriesListData' state
    useEffect(() => {
        async function getCategoriesList() {
            const categoriesListResponseData = await resolveCategoriesListResponse();
            if (categoriesListResponseData !== undefined) {
                setCategoriesListData(categoriesListResponseData.data);
            }
        }

        getCategoriesList();
    }, []);

    //resolve categories list response
    const resolveCategoriesListResponse = async () => {
        const categoriesListDataGet = getCategoriesList();
        return Promise.resolve(categoriesListDataGet);
    };

    /////////////////////// CANDLESTICK DATA GET BLOCK STARTS HERE ///////////////////////////////

    // useEffect to get new candlestick chart data every time chart type changes to 'candlestick'
    useEffect(() => {
        async function getCandlestickChartData(activeCurrency: any) {
            const candlestickDataGet = await getCandlestickDataByCurrency(activeCurrency);
            if (candlestickDataGet !== undefined) {
                dataTransformCaller(candlestickDataGet.data);
            }
        }

        if (activeChartTypeState === 'candlestick') {
            getCandlestickChartData(activeCurrencyState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChartTypeState]);

    // useCallback used here to call function only after 'candlestickChartData' state changed
    const dataTransformCaller = (data: []) => {
        const getCandlestickSeriesData = convertIntoArrayOfObjects(data);
        setCandlestickSeriesData(getCandlestickSeriesData);
    };

    //get candlestick data by active chart currency value
    const getCandlestickDataByCurrency = async (activeCurrency: string) => {
        const candlestickDataGet = getCandlestickChartData(activeCurrency);
        return Promise.resolve(candlestickDataGet);
    };

    /////////////////////// DATA TRANSFORM BLOCK STARTS HERE ///////////////////////////////

    const convertIntoArrayOfObjects = (data: number[][]) => {
        const testFinalObject: object[] = [];

        data.forEach((element, index) => {
            const ohlcData = _.tail(element);

            const testObject: IResultObject = {
                x: element[0],
                y: ohlcData
            };

            testFinalObject.push(testObject);
        });

        return testFinalObject;
    };

    /////////////////////// LIST DATA GET BLOCK STARTS HERE ///////////////////////////////

    // useEffect to get new data every time active currency or selected rows amount changes
    useEffect(() => {
        async function getData(activeCurrency: string, activeRowsAmount: number) {
            const rowsAmountStr = activeRowsAmount.toString();
            const coinListData = await getDataByCurrency(activeCurrency, rowsAmountStr);
            setCoinListData(coinListData);
        }

        getData(activeCurrencyState, activeRowsAmountState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCurrencyState, activeRowsAmountState]);

    //get data by active currency value and rows amount value
    const getDataByCurrency = async (activeCurrency: string, rowsAmountStr: string) => {
        try {
            const coinListDataResponse = await getCoinListData(activeCurrency, rowsAmountStr);
            const coinListData = coinListDataResponse.data;
            return coinListData;
        } catch (error) {
            setDataGetError(true);
            return [];
        }
    };

    /////////////////////// CATEGORIES BLOCK STARTS HERE ///////////////////////////////

    // useEffect to change isCategorySelected state every time selectedCategoryState change (if no category -> false...)
    useEffect(() => {
        const selectedCategoryName: string = selectedCategoryState.category_name;
        const selectedCategoryId: string = selectedCategoryState.category_id;

        async function getCategoryDataFunc(
            selectedCategoryId: string,
            activeCurrency: string,
            activeRowsAmount: number
        ) {
            const rowsAmountStr = activeRowsAmount.toString();
            const categoryResponseData = await resolveCategoryDataResponse(
                selectedCategoryId,
                activeCurrency,
                rowsAmountStr
            );
            if (categoryResponseData !== undefined) {
                setCategoryData(categoryResponseData.data);
            }
        }

        if (selectedCategoryName !== '') {
            setIsCategorySelected(true);
            getCategoryDataFunc(selectedCategoryId, activeCurrencyState, activeRowsAmountState);
        } else {
            setCategoryData([]);
            setIsCategorySelected(false);
        }
    }, [selectedCategoryState, activeCurrencyState, activeRowsAmountState]);

    //resolve categories list response
    const resolveCategoryDataResponse = async (
        selectedCategoryId: string,
        activeCurrency: string,
        activeRowsAmount: string
    ) => {
        const categoryDataGet = getCategoryData(selectedCategoryId, activeCurrency, activeRowsAmount);
        return Promise.resolve(categoryDataGet);
    };

    return (
        <div className="cryptocurrency-page-wrapper">
            <div className="slider-wrapper">
                <div className="currency-slider-container">
                    <CryptocurrencySliderContainer coinListData={coinListData} activeCurrency={activeCurrencyState} />
                </div>
            </div>
            <div className="list-filters-wrapper">
                <CryptocurrencyListFilters categoriesListData={categoriesListData} />
                {isCategorySelected && <CryptocurrencyListCategories />}
            </div>
            <div className="content-wrapper">
                <div className="cryptocurrency-list-info-container">
                    <CryptocurrencyListInfo />
                </div>
                <div className="cryptocurrency-list-container">
                    <CryptocurrencyListContainer
                        coinListData={coinListData}
                        candlestickChartData={candlestickSeriesData}
                        chartType={activeChartTypeState}
                        isCategorySelected={isCategorySelected}
                        categoryData={categoryData}
                    />
                </div>
            </div>
        </div>
    );
};

export default CryptocurrencyPage;

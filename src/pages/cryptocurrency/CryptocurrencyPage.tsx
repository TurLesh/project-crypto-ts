import { FC, useState, useEffect } from 'react';
import _ from 'lodash';
import { AxiosError } from 'axios';
import { ICoinListData } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import { ICategoriesList } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import { ICategoryState } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import { IResultObject } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import { getCoinListData } from '../../services/requests/GetCoinListData';
import { getCandlestickChartData } from '../../services/requests/GetCandlestickData';
import { getCategoriesList } from '../../services/requests/GetCategoriesList';
import { getCategoryData } from '../../services/requests/GetCategoryData';
import CryptocurrencySliderContainer from '../../components/containers/cryptocurrency-page/cryptocurrency-slider-container';
import CryptocurrencyListFilters from '../../components/cards/cryptocurrency-list-filters/CryptocurrencyListFilters';
import CryptocurrencyListCategories from '../../components/cards/cryptocurrency-list-categories/CryptocurrencyListCategories';
import CryptocurrencyListInfo from '../../components/cards/cryptocurrency-list-cards/info-card/CryptocurrencyListInfo';
import CryptocurrencyListContainer from '../../components/containers/cryptocurrency-page/cryptocurrency-list-container';
import './CryptocurrencyPageStyle.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

const CryptocurrencyPage: FC = () => {
    const [coinListData, setCoinListData] = useState<ICoinListData[]>([]);
    const [candlestickSeriesData, setCandlestickSeriesData] = useState<object[]>([]);
    const [categoriesListData, setCategoriesListData] = useState<ICategoriesList[]>([]);
    const [categoryData, setCategoryData] = useState<ICoinListData[]>([]);
    const [isCategorySelected, setIsCategorySelected] = useState(false);

    const [dataGetError, setDataGetError] = useState({
        isError: false,
        message: ''
    });

    const [candlestickDataGetError, setCandlestickDataGetError] = useState({
        isError: false,
        message: ''
    });

    const [categoriesListDataGetError, setCategoriesListDataGetError] = useState({
        isError: false,
        message: ''
    });

    const [selectedCategoryDataGetError, setSelectedCategoryDataGetError] = useState({
        isError: false,
        message: ''
    });

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
        async function getCategoriesListData() {
            const categoriesListData: [] = await resolveCategoriesListResponse();
            if (categoriesListData.length !== 0) {
                const errorInfo = {
                    isError: false,
                    message: ''
                };
                setCategoriesListDataGetError(errorInfo);
            }
            setCategoriesListData(categoriesListData);
        }

        getCategoriesListData();
    }, []);

    //resolve categories list response
    const resolveCategoriesListResponse = async () => {
        try {
            const categoriesListDataGet = await getCategoriesList();
            const categoriesListData = categoriesListDataGet.data;
            return categoriesListData;
        } catch (error) {
            const err = error as AxiosError;
            const errorInfo = {
                isError: true,
                message: err.message
            };
            setCategoriesListDataGetError(errorInfo);
            return [];
        }
    };

    /////////////////////// DATA GET DEPENDING ON CHART TYPE BLOCK STARTS HERE ///////////////////////////////

    // useEffect to get new candlestick chart data every time chart type changes to 'candlestick'
    // useEffect to get new line chart data if it was arror before and chart type changed to 'line'
    useEffect(() => {
        async function getCandlestickChartData(activeCurrency: string) {
            await getCandlestickChartDataFunc(activeCurrency);
        }

        async function getLineChartData(activeCurrency: string, activeRowsAmount: number) {
            await getDataFunc(activeCurrency, activeRowsAmount);
        }

        if (activeChartTypeState === 'candlestick') {
            getCandlestickChartData(activeCurrencyState);
        }

        // use this if u want to prevent getting fresh data from api every time u change chart type
        // if (dataGetError.isError) {
        //     if (activeChartTypeState === 'line') {
        //         getLineChartData(activeCurrencyState, activeRowsAmountState);
        //     }
        // }
        if (!isCategorySelected && activeChartTypeState === 'line') {
            getLineChartData(activeCurrencyState, activeRowsAmountState);
        }

        if (isCategorySelected && activeChartTypeState === 'line') {
            getCategoryDataFunc(selectedCategoryState.category_id, activeCurrencyState, activeRowsAmountState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChartTypeState]);

    async function getCandlestickChartDataFunc(activeCurrency: string) {
        const candlestickData: [] = await getCandlestickDataByCurrency(activeCurrency);
        if (candlestickData.length !== 0) {
            dataTransformCaller(candlestickData);
            const errorInfo = {
                isError: false,
                message: ''
            };
            setCandlestickDataGetError(errorInfo);
        } else {
            setCandlestickSeriesData([
                { x: 1, y: [100, 105, 90, 95] },
                { x: 2, y: [95, 100, 85, 90] },
                { x: 3, y: [90, 95, 80, 85] },
                { x: 4, y: [85, 90, 75, 80] },
                { x: 5, y: [80, 85, 70, 75] },
                { x: 6, y: [75, 80, 65, 70] },
                { x: 7, y: [70, 75, 60, 65] }
            ]);
        }
    }

    // useCallback used here to call function only after 'candlestickChartData' state changed
    const dataTransformCaller = (data: []) => {
        const getCandlestickSeriesData = convertIntoArrayOfObjects(data);
        setCandlestickSeriesData(getCandlestickSeriesData);
    };

    //get candlestick data by active chart currency value
    const getCandlestickDataByCurrency = async (activeCurrency: string) => {
        try {
            const candlestickDataGetResponse = await getCandlestickChartData(activeCurrency);
            const candlestickData = candlestickDataGetResponse.data;
            return candlestickData;
        } catch (error) {
            const err = error as AxiosError;
            const errorInfo = {
                isError: true,
                message: err.message
            };
            setCandlestickDataGetError(errorInfo);
            return [];
        }
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
            await getDataFunc(activeCurrency, activeRowsAmount);
        }

        getData(activeCurrencyState, activeRowsAmountState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCurrencyState, activeRowsAmountState]);

    async function getDataFunc(activeCurrency: string, activeRowsAmount: number) {
        const rowsAmountStr = activeRowsAmount.toString();
        const coinListData: [] = await getDataByCurrency(activeCurrency, rowsAmountStr);
        if (coinListData.length !== 0) {
            const errorInfo = {
                isError: false,
                message: ''
            };
            setDataGetError(errorInfo);
        }
        setCoinListData(coinListData);
    }

    //get data by active currency value and rows amount value
    const getDataByCurrency = async (activeCurrency: string, rowsAmountStr: string) => {
        try {
            const coinListDataResponse = await getCoinListData(activeCurrency, rowsAmountStr);
            const coinListData = coinListDataResponse.data;
            return coinListData;
        } catch (error) {
            const err = error as AxiosError;
            const errorInfo = {
                isError: true,
                message: err.message
            };
            setDataGetError(errorInfo);
            return [];
        }
    };

    /////////////////////// CATEGORIES BLOCK STARTS HERE ///////////////////////////////

    // useEffect to change isCategorySelected state every time selectedCategoryState change (if no category -> false...)
    // useEffect to get coins data depend on category selected
    useEffect(() => {
        const selectedCategoryName: string = selectedCategoryState.category_name;
        const selectedCategoryId: string = selectedCategoryState.category_id;

        async function getCategoryData(selectedCategoryId: string, activeCurrency: string, activeRowsAmount: number) {
            await getCategoryDataFunc(selectedCategoryId, activeCurrency, activeRowsAmount);
        }

        if (selectedCategoryName !== '') {
            setIsCategorySelected(true);
            getCategoryData(selectedCategoryId, activeCurrencyState, activeRowsAmountState);
        } else {
            setCategoryData([]);
            setIsCategorySelected(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategoryState, activeCurrencyState, activeRowsAmountState]);

    // useEffect to get fresh data every time selected category removed
    useEffect(() => {
        async function getCandlestickChartData(activeCurrency: string) {
            await getCandlestickChartDataFunc(activeCurrency);
        }

        async function getLineChartData(activeCurrency: string, activeRowsAmount: number) {
            await getDataFunc(activeCurrency, activeRowsAmount);
        }

        if (!isCategorySelected) {
            if (activeChartTypeState === 'line') {
                getLineChartData(activeCurrencyState, activeRowsAmountState);
            }

            if (activeChartTypeState === 'candlestick') {
                getCandlestickChartData(activeCurrencyState);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCategorySelected]);

    async function getCategoryDataFunc(selectedCategoryId: string, activeCurrency: string, activeRowsAmount: number) {
        const rowsAmountStr = activeRowsAmount.toString();
        const categoryResponseData: [] = await resolveCategoryDataResponse(
            selectedCategoryId,
            activeCurrency,
            rowsAmountStr
        );
        if (categoryResponseData.length !== 0) {
            const errorInfo = {
                isError: false,
                message: ''
            };
            setSelectedCategoryDataGetError(errorInfo);
        }
        setCategoryData(categoryResponseData);
    }

    //resolve categories list response
    const resolveCategoryDataResponse = async (
        selectedCategoryId: string,
        activeCurrency: string,
        activeRowsAmount: string
    ) => {
        try {
            const categoryDataGet = await getCategoryData(selectedCategoryId, activeCurrency, activeRowsAmount);
            const categoryData = categoryDataGet.data;
            return categoryData;
        } catch (error) {
            const err = error as AxiosError;
            const errorInfo = {
                isError: true,
                message: err.message
            };
            setSelectedCategoryDataGetError(errorInfo);
            return [];
        }
    };

    return (
        <div className="cryptocurrency-page-wrapper">
            <div className="slider-wrapper">
                <div className="currency-slider-container">
                    <CryptocurrencySliderContainer
                        coinListData={coinListData}
                        activeCurrency={activeCurrencyState}
                        dataGetError={dataGetError}
                    />
                </div>
            </div>
            <div className="list-filters-wrapper">
                <CryptocurrencyListFilters
                    categoriesListData={categoriesListData}
                    categoriesListDataGetError={categoriesListDataGetError}
                />
                {isCategorySelected && <CryptocurrencyListCategories />}
            </div>
            <div className="content-wrapper">
                <div className="cryptocurrency-list-info-container">
                    <CryptocurrencyListInfo chartType={activeChartTypeState} />
                </div>
                <div className="cryptocurrency-list-container">
                    <CryptocurrencyListContainer
                        coinListData={coinListData}
                        candlestickChartData={candlestickSeriesData}
                        candlestickDataGetError={candlestickDataGetError}
                        chartType={activeChartTypeState}
                        isCategorySelected={isCategorySelected}
                        selectedCategoryDataGetError={selectedCategoryDataGetError}
                        categoryData={categoryData}
                        dataGetError={dataGetError}
                        activeCurrency={activeCurrencyState}
                    />
                </div>
            </div>
        </div>
    );
};

export default CryptocurrencyPage;

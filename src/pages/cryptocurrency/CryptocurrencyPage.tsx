import { FC, useState, useEffect } from 'react';
import _ from 'lodash';
import { ICoinListData } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import { IResultObject } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import { getCoinListData } from '../../services/requests/GetCoinListData';
import { getCandlestickChartData } from '../../services/requests/GetCandlestickData';
import CryptocurrencySliderContainer from '../../components/containers/cryptocurrency-page/CryptocurrencySliderContainer';
import CryptocurrencyListFilters from '../../components/cards/cryptocurrency-list-filters/CryptocurrencyListFilters';
import CryptocurrencyListInfo from '../../components/cards/cryptocurrency-list-cards/info-card/CryptocurrencyListInfo';
import CryptocurrencyListContainer from '../../components/containers/cryptocurrency-page/CryptocurrencyListContainer';
import './CryptocurrencyPageStyle.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

const CryptocurrencyPage: FC = () => {
    const [coinListData, setCoinListData] = useState<ICoinListData[]>([]);
    const [activeCurrency, setActiveCurrency] = useState('');

    const [selectedChartType, setSelectedChartType] = useState('');
    const [candlestickSeriesData, setCandlestickSeriesData] = useState<object[]>([]);

    /////////////////////// CANDLESTICK DATA GET BLOCK STARTS HERE ///////////////////////////////

    // useEffect to get new candlestick chart data every time chart type changes to 'candlestick'
    useEffect(() => {
        async function getCandlestickChartData(activeCurrency: any) {
            const candlestickDataGet = await getCandlestickDataByCurrency(activeCurrency);
            if (candlestickDataGet !== undefined) {
                dataTransformCaller(candlestickDataGet.data);
            }
        }

        if (selectedChartType === 'candlestick') {
            getCandlestickChartData(activeCurrency);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChartType]);

    // useCallback used here to call function only after 'candlestickChartData' state changed
    const dataTransformCaller = (data: []) => {
        const getCandlestickSeriesData = convertIntoArrayOfObjects(data);
        setCandlestickSeriesData(getCandlestickSeriesData);
    };

    //get chart type value from storage
    const activeChartTypeObject = useSelector((state: RootState) => state.chartType);
    const activeChartTypeState: string = activeChartTypeObject.selectedChartType;

    if (activeChartTypeState !== selectedChartType) {
        setSelectedChartType(activeChartTypeState);
    }

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

    // useEffect to get new data every time active currency changes
    useEffect(() => {
        async function getData(activeCurrency: any) {
            const coinListDataGet = await getDataByCurrency(activeCurrency);
            if (coinListDataGet !== undefined) {
                setCoinListData(coinListDataGet.data);
            }
        }

        getData(activeCurrency);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCurrency]);

    //get value from storage
    const activeCurrencyStateObject = useSelector((state: RootState) => state.currency);
    const activeCurrencyState: string = activeCurrencyStateObject.activeCurrency;

    if (activeCurrencyState !== activeCurrency) {
        setActiveCurrency(activeCurrencyState);
    }

    //get data by active currency value
    const getDataByCurrency = async (activeCurrency: string) => {
        const coinListDataGet = getCoinListData(activeCurrency);
        return Promise.resolve(coinListDataGet);
    };

    return (
        <div className="cryptocurrency-page-wrapper">
            <div className="slider-wrapper">
                <div className="currency-slider-container">
                    <CryptocurrencySliderContainer coinListData={coinListData} />
                </div>
            </div>
            <div className="list-filters-wrapper">
                <CryptocurrencyListFilters />
            </div>
            <div className="content-wrapper">
                <div className="cryptocurrency-list-info-container">
                    <CryptocurrencyListInfo />
                </div>
                <div className="cryptocurrency-list-container">
                    <CryptocurrencyListContainer
                        coinListData={coinListData}
                        candlestickChartData={candlestickSeriesData}
                        chartType={selectedChartType}
                    />
                </div>
            </div>
        </div>
    );
};

export default CryptocurrencyPage;

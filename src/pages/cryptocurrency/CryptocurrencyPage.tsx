import { FC, useState, useEffect } from 'react';
import { ICoinListData } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import { getCoinListData } from '../../services/requests/GetCoinListData';
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
                    <CryptocurrencyListContainer coinListData={coinListData} />
                </div>
            </div>
        </div>
    );
};

export default CryptocurrencyPage;

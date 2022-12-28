import { FC, useState } from 'react';
import { ICoinListData } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import GetCoinListData from '../../services/requests/GetCoinListData';
import CryptocurrencySliderContainer from '../../components/containers/cryptocurrency-page/CryptocurrencySliderContainer';
import CryptocurrencyListContainer from '../../components/containers/cryptocurrency-page/CryptocurrencyListContainer';
import './CryptocurrencyPageStyle.css';

const CryptocurrencyPage: FC = () => {
    const [coinListData, setCoinListData] = useState<ICoinListData[]>([]);
    const coinListDataGet = GetCoinListData();

    if (coinListDataGet && coinListData !== coinListDataGet) {
        setCoinListData(coinListDataGet);
    }

    console.log(coinListData);

    return (
        <div className="cryptocurrency-page-wrapper">
            <div className="slider-wrapper">
                <div className="currency-slider-container">
                    <CryptocurrencySliderContainer coinListData={coinListData} />
                </div>
            </div>
            <div className="content-wrapper">
                <CryptocurrencyListContainer coinListData={coinListData} />
            </div>
        </div>
    );
};

export default CryptocurrencyPage;

import { FC, useState, useRef, useEffect } from 'react';
import AvailableOptions from '../../../data/available-options.json';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './CurrencyDropDownStyle.css';

type CurrencyDropDownOptionsType = {
    id: string;
    symbol: string;
    name: string;
    isAvailable: boolean;
    isActive: boolean;
};

const CurrencyDropDown: FC = () => {
    const [isCurrencyExpanded, setIsCurrencyExpanded] = useState(false);
    const currencyDropDownRef = useRef<HTMLDivElement>(null);

    const currencyDropDownOnClickHandler = () => {
        setIsCurrencyExpanded((current) => !current);
    };

    useEffect(() => {
        if (isCurrencyExpanded === true) {
            const handleClickOutside = (event: any) => {
                if (currencyDropDownRef.current && !currencyDropDownRef.current.contains(event.target)) {
                    setIsCurrencyExpanded(false);
                }
            };
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }
    }, [isCurrencyExpanded]);

    const currencyData: CurrencyDropDownOptionsType[] = AvailableOptions.AvailibleCurrencies;

    const currencyPannelMapFunc = currencyData.map(({ isAvailable, isActive, id, symbol }) => {
        return (
            <div key={id}>
                {isActive === false && (
                    <div className="currency-dd-panel-tile">
                        <button className="currency-dd-panel-btn">{isAvailable && <p className="currency-dd-panel-btn-text">{symbol}</p>}</button>
                    </div>
                )}
            </div>
        );
    });

    return (
        <div ref={currencyDropDownRef} className="currency-dd-wrapper">
            <button onClick={currencyDropDownOnClickHandler} className="currency-button-body">
                <div className="currency-text-container">
                    <p className="currency-text">USD</p>
                </div>
                <div className="currency-arrow-cointainer">{isCurrencyExpanded ? <ArrowDropUpIcon className="currency-arrow-expand" /> : <ArrowDropDownIcon className="currency-arrow-expand" />}</div>
            </button>
            {isCurrencyExpanded && (
                <div className="currency-dd-panel-wrapper">
                    <div className="currency-dd-panel-triangle" />
                    <div className="currency-dd-panel-container">{currencyPannelMapFunc}</div>
                </div>
            )}
        </div>
    );
};

export default CurrencyDropDown;

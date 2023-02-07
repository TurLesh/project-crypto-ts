import { FC, useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { currencyConfigs } from '../../../configs/ddConfigs';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './CurrencyDropDownStyle.css';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/store';
import { CHANGE_ACTIVE_CURRENCY } from '../../../services/store/reducers/currencyReducer';

type CurrencyListType = {
    code: string;
    name: string;
};

const CurrencyDropDown: FC = () => {
    const [isCurrencyExpanded, setIsCurrencyExpanded] = useState(false);

    const currencyDropDownRef = useRef<HTMLDivElement>(null);

    const currencyList: CurrencyListType[] = currencyConfigs;
    const activeCurrency = localStorage.getItem('activeCurrency');

    const findNameByCode = (code: string) => {
        return Object.values(currencyList).find((obj) => obj.code === code)?.name;
    };

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

    const dispatch: AppDispatch = useDispatch();

    const changeCurrencyHandler = (currency: string) => {
        localStorage.setItem('activeCurrency', currency);
        setIsCurrencyExpanded((current) => !current);

        //set value to storage
        dispatch({ type: CHANGE_ACTIVE_CURRENCY, payload: currency });
    };

    const currencyItemMap = currencyList.map(({ code, name }) => {
        return (
            <div key={code}>
                {activeCurrency !== code && (
                    <div className="currency-dd-panel-tile">
                        <button onClick={() => changeCurrencyHandler(code)} className="currency-dd-panel-btn">
                            <p className="currency-dd-panel-btn-text">{name}</p>
                        </button>
                    </div>
                )}
            </div>
        );
    });

    return (
        <div ref={currencyDropDownRef} className="currency-dd-wrapper">
            <button onClick={currencyDropDownOnClickHandler} className="currency-button-body">
                <div className="currency-text-container">
                    <p className="currency-text">{activeCurrency ? findNameByCode(activeCurrency) : 'ERR'}</p>
                </div>
                <div className="currency-arrow-cointainer">
                    {isCurrencyExpanded ? (
                        <ArrowDropUpIcon className="currency-arrow-expand" />
                    ) : (
                        <ArrowDropDownIcon className="currency-arrow-expand" />
                    )}
                </div>
            </button>
            <CSSTransition in={isCurrencyExpanded} timeout={200} classNames="display" unmountOnExit>
                <div className="currency-dd-panel-wrapper">
                    <div className="currency-dd-panel-triangle" />
                    <div className="currency-dd-panel-container">{currencyItemMap}</div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default CurrencyDropDown;

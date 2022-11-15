import { FC } from 'react';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './CurrencyDropDownStyle.css';

const CurrencyDropDown: FC = () => {
    return (
        <div className="currency-button-body">
            <div className="currency-text-container">
                <p className="currency-text">USD</p>
            </div>
            <div className="currency-arrow-cointainer">
                <ArrowDropDownIcon className="currency-arrow-expand" />
            </div>
        </div>
    );
};

export default CurrencyDropDown;

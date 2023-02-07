import { FC, useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../../services/hooks/useTypedSelector';
import { removeUser } from '../../../services/store/slices/userSlice';
import { CSSTransition } from 'react-transition-group';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import LogoutIcon from '@mui/icons-material/Logout';
import './AccountDropDownStyle.css';

interface IAccountDropDown {
    email: string;
}

const AccountDropDown: FC<IAccountDropDown> = (props) => {
    const { email } = props;
    const userName = email.substring(0, email.indexOf('@'));

    const accountDropDownRef = useRef<HTMLDivElement>(null);
    const [isAccountExpanded, setIsAccountExpanded] = useState(false);

    const dispatch = useAppDispatch();

    //logout on btn click
    const logOutHandler = () => {
        dispatch(removeUser());
    };

    // close dd on click out of dd panel
    useEffect(() => {
        if (isAccountExpanded === true) {
            const handleClickOutside = (event: any) => {
                if (accountDropDownRef.current && !accountDropDownRef.current.contains(event.target)) {
                    setIsAccountExpanded(false);
                }
            };
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }
    }, [isAccountExpanded]);

    //on account dd button click handler
    const expandAccountHandler = () => {
        setIsAccountExpanded((prevValue) => !prevValue);
    };

    const accountArrow = isAccountExpanded ? (
        <ArrowDropUpIcon className="account-dd-arrow" />
    ) : (
        <ArrowDropDownIcon className="account-dd-arrow" />
    );

    return (
        <div ref={accountDropDownRef} className="account-dd-wrapper">
            <button className="account-dd-btn" onClick={expandAccountHandler}>
                Account {accountArrow}
            </button>
            <CSSTransition in={isAccountExpanded} timeout={200} classNames="display" unmountOnExit>
                <div className="account-dd-panel-wrapper">
                    <div className="account-dd-panel-triangle" />
                    <div className="account-dd-panel-container">
                        <div className="account-info-tile">
                            <AccountCircleIcon className="account-info-icon" />
                            {userName}
                        </div>
                        <div className="account-dd-panel-tile">
                            <button className="account-dd-panel-btn">
                                <p className="account-dd-panel-btn-text">
                                    My watchlist
                                    <StarIcon className="account-dd-panel-btn-icon" />
                                </p>
                            </button>
                        </div>
                        <div className="account-dd-panel-tile">
                            <button className="account-dd-panel-btn" onClick={() => logOutHandler()}>
                                <p className="account-dd-panel-btn-text">
                                    Log Out
                                    <LogoutIcon className="account-dd-panel-btn-icon" />
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default AccountDropDown;

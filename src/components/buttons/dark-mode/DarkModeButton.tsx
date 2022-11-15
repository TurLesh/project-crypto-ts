import { FC } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import './DarkModeButtonStyle.css';

type Props = {
    changeThemeHandler: () => void;
};

const DarkModeButton: FC<Props> = ({ changeThemeHandler }) => {
    return (
        <button onClick={changeThemeHandler} className="dark-mode-btn">
            <DarkModeIcon className="dark-mode-icon" />
        </button>
    );
};

export default DarkModeButton;

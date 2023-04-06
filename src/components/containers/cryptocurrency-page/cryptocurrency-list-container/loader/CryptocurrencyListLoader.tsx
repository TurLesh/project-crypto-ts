import LoadingAnimation from '../../../../../assets/css-animations/loading-animation/LoadingAnimation';
import './CryptocurrencyListLoaderStyle.css';

const CryptocurrencyListLoader = () => {
    return (
        <div className="list-loader-wrapper">
            <LoadingAnimation />
        </div>
    );
};

export default CryptocurrencyListLoader;

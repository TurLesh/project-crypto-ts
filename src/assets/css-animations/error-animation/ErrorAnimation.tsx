import './ErrorAnimationStyle.css';

const ErrorAnimation = () => {
    return (
        <div className="error-animation-wrapper">
            <div className="container">
                <div className="circle-border"></div>
                <div className="circle">
                    <div className="error"></div>
                </div>
            </div>
        </div>
    );
};

export default ErrorAnimation;

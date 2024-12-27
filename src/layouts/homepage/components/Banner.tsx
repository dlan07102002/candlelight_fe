import { memo } from "react";
function Banner() {
    return (
        <div className="p-2 banner">
            <div className="container-fluid py-5  d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h3 className="display-5 fw-bold ">ALL PRODUCTS</h3>
                    <p className="lead">
                        Transform your home into a sanctuary of soothing aromas.
                    </p>
                    <button className="btn btn-lg text-white mt-3 banner-btn">
                        Discover Your Perfect Candle at CandleLight.com
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(Banner);

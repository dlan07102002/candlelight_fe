import React from "react";

function Banner() {
    return (
        <div className="p-2 mb-2 bg-dark">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h3 className="display-5 fw-bold">
                        Illuminate Your Space with Our Premium Scented Candles{" "}
                        <br />
                        Embrace Tranquility and Joy in Every Flicker
                    </h3>
                    <p className="lead">
                        Transform your home into a sanctuary of soothing aromas.
                    </p>
                    <button className="btn btn-primary btn-lg text-white mt-3">
                        Discover Your Perfect Candle at CandleLight.com
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Banner;

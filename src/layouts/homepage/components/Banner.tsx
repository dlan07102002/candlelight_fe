function Banner() {
    return (
        <div style={{ backgroundColor: "#d7b27a" }} className="p-2 mb-2 ">
            <div className="container-fluid py-5  d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h3 className="display-5 fw-bold">
                        Illuminate Your Space with Our Premium Scented Candles{" "}
                        <br />
                        Embrace Tranquility and Joy in Every Flicker
                    </h3>
                    <p className="lead">
                        Transform your home into a sanctuary of soothing aromas.
                    </p>
                    <button
                        style={{
                            backgroundColor: "#20575d",
                        }}
                        className="btn text-white btn-lg mt-3"
                    >
                        Discover Your Perfect Candle at CandleLight.com
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Banner;

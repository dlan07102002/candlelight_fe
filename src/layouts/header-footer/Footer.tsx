import { memo } from "react";
function Footer() {
    return (
        <div className="container">
            <footer className="py-5">
                <div className="row">
                    <div className="col-6 col-md-2 mb-3">
                        <h5>Products</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Scented Candles
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Gift Sets
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Candle Accessories
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>About Us</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Our Story
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Sustainability
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Press
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Support</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    FAQs
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Shipping & Returns
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a
                                    href="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-5 offset-md-1 mb-3">
                        <form>
                            <h5>Subscribe to CandleLight</h5>
                            <p>
                                Stay updated with our latest products and
                                offers.
                            </p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2 mt-3">
                                <input
                                    id="newsletter1"
                                    type="text"
                                    className="form-control"
                                    placeholder="Email address"
                                />

                                <button
                                    className="btn btn-primary"
                                    type="button"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>© 2024 CandleLight, All rights reserved.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3">
                            <a className="link-body-emphasis" href="#">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="link-body-emphasis" href="#">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="link-body-emphasis" href="#">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default memo(Footer);

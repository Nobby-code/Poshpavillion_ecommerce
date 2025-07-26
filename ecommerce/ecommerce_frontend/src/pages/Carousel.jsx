import React from "react";

const Carousel = () => {
  return (
    <div
      id="mainCarousel"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide-to="0"
          className="active"
        ></button>
        <button
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide-to="1"
        ></button>
        <button
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide-to="2"
        ></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div
            className="d-flex align-items-center"
            style={{ height: "700px", backgroundColor: "#f8f9fa" }}
          >
            {/* Left: Info Overlay */}
            <div className="w-50 p-5 d-flex flex-column justify-content-center text-start carousel-caption-custom">
              <h2 className="mb-3 item-name">Denim shoes</h2>
              <p className="mb-2">
                This is a great product with excellent quality and comfort casual shoes.
              </p>
              <h4>Offers are limited. Don't miss!</h4>
              <p>
                <span className="text-danger fs-4 fw-bold me-2">Kes 1800</span>
                <span className="text-muted text-decoration-line-through">
                  Kes 2500
                </span>
              </p>
              <button className="btn btn-primary mt-3">Shop Now</button>
            </div>

            {/* Right: Image */}
            <div className="w-50 h-100">
              <img
                src="/images/banner5.png"
                alt="Slide 1"
                className="w-80 h-80"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div
            className="d-flex align-items-center"
            style={{ height: "700px", backgroundColor: "#f8f9fa" }}
          >
            {/* Left: Info Overlay */}
            <div className="w-50 p-5 d-flex flex-column justify-content-center text-start">
              <h2 className="mb-3">Women Dress</h2>
              <p className="mb-2">
                This is a great product with excellent quality and comfort.
              </p>
              <h4>Offers are limited. Don't miss!</h4>
              <p>
                <span className="text-danger fs-4 fw-bold me-2">Kes 1000</span>
                <span className="text-muted text-decoration-line-through">
                  Kes 1500
                </span>
              </p>
              <button className="btn btn-primary mt-3">Shop Now</button>
            </div>

            {/* Right: Image */}
            <div className="w-50 h-100">
              <img
                src="/images/banner2.png"
                alt="Slide 1"
                className="w-80 h-80"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          {/* <img
            src="/images/banner3.jpeg"
            className="d-block w-100"
            alt="Slide 3"
            style={{ height: "700px" }}
          /> */}
          <div
            className="d-flex align-items-center"
            style={{ height: "700px", backgroundColor: "#f8f9fa" }}
          >
            {/* Left: Info Overlay */}
            <div className="w-50 p-5 d-flex flex-column justify-content-center text-start">
              <h2 className="mb-3">Women Handbag</h2>
              <p className="mb-2">
                This is a great product with excellent quality and comfort.  For the modern fashionista.
              </p>
              <h4>Offers are limited. Don't miss!</h4>
              <p>
                <span className="text-danger fs-4 fw-bold me-2">Kes 1500</span>
                <span className="text-muted text-decoration-line-through">
                  Kes 2000
                </span>
              </p>
              <button className="btn btn-primary mt-3">Shop Now</button>
            </div>

            {/* Right: Image */}
            <div className="w-50 h-100">
              <img
                src="/images/banner3.png"
                alt="Slide 1"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        {/* <div className="carousel-item">
          <img src="/images/banner3.jpeg" className="d-block w-100" alt="Slide 3" style={{ height: '700px', objectFit: 'cover' }} />
        </div> */}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;

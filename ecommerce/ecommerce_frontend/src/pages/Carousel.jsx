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
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
          ></button>
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {[
          {
            title: "Denim shoes",
            description:
              "This is a great product with excellent quality and comfort casual shoes.",
            price: "1800",
            original: "2500",
            image: "/images/banner5.png",
          },
          {
            title: "Women Dress",
            description: "This is a great product with excellent quality and comfort.",
            price: "1000",
            original: "1500",
            image: "/images/banner2.png",
          },
          {
            title: "Women Handbag",
            description:
              "This is a great product with excellent quality and comfort. For the modern fashionista.",
            price: "1500",
            original: "2000",
            image: "/images/banner3.png",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div
              className="container-fluid d-flex align-items-center justify-content-center flex-column flex-md-row"
              style={{
                minHeight: "500px",
                backgroundColor: "#f8f9fa",
              }}
            >
              {/* Text Content */}
              <div className="col-md-6 p-5 text-start">
                <h2 className="mb-3">{item.title}</h2>
                <p className="mb-2">{item.description}</p>
                <h4>Offers are limited. Don't miss!</h4>
                <p>
                  <span className="text-danger fs-4 fw-bold me-2">
                    Kes {item.price}
                  </span>
                  <span className="text-muted text-decoration-line-through">
                    Kes {item.original}
                  </span>
                </p>
                <button className="btn btn-primary mt-3">Shop Now</button>
              </div>

              {/* Image */}
              <div className="col-md-6 h-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        ))}
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
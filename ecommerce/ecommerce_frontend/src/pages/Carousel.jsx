import React from "react";

const Carousel = () => {
  return (
    <div id="mainCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
      {/* Indicators */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/banner1.jpg" className="d-block w-100" alt="Slide 1" style={{ height: '800px', objectFit: 'cover' }} />
        </div>
        <div className="carousel-item">
          <img src="/images/banner2.jpg" className="d-block w-100" alt="Slide 2" style={{ height: '800px', objectFit: 'cover' }} />
        </div>
        <div className="carousel-item">
          <img src="/images/banner3.jpg" className="d-block w-100" alt="Slide 3" style={{ height: '800px', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
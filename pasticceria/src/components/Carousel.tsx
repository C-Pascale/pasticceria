import { useEffect, useRef } from "react";
import { Carousel } from "bootstrap";

export default function CarouselHome() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      new Carousel(carouselRef.current, {
        interval: 3000,
        ride: "carousel",
        pause: false,
        wrap: true,
      });
    }
  }, []);

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide mb-4 h-25"
      ref={carouselRef}
    >
      {/*Indicatori*/}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
        />
      </div>

      {/*Slide*/}
      <div className="carousel-inner shadow-lg rounded-pill overflow-hidden">
        {/*Slide-1*/}
        <div
          className="carousel-item active"
          style={{
            backgroundImage: 'url("Slide-1.jpg")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "400px",
          }}
        >
          {/*Caption Slide-1*/}
          <div className="carousel-caption d-flex h-100 align-items-center justify-content-center">
            <div className="bg-dark bg-opacity-50 p-4 rounded">
              <h2 className="text-light fw-bold">Pasticcini artigianali</h2>
              <p className="text-light mb-0">
                Dolci creati con passione e ingredienti genuini.
              </p>
            </div>
          </div>
        </div>

        {/*Slide-2*/}
        <div
          className="carousel-item"
          style={{
            backgroundImage: 'url("Slide-2.jpg")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "400px",
          }}
        >
          {/*Caption Slide-3*/}
          <div className="carousel-caption d-flex h-100 align-items-center justify-content-center">
            <div className="bg-dark bg-opacity-50 p-4 rounded">
              <h2 className="text-light fw-bold">Torte su misura</h2>
              <p className="text-light mb-0">
                Personalizzate per ogni occasione speciale.
              </p>
            </div>
          </div>
        </div>

        {/*Slide-3*/}
        <div
          className="carousel-item"
          style={{
            backgroundImage: 'url("Slide-3.jpg")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "400px",
          }}
        >
          {/*Caption Slide-3*/}
          <div className="carousel-caption d-flex h-100 align-items-center justify-content-center">
            <div className="bg-dark bg-opacity-50 p-4 rounded">
              <h2 className="text-light fw-bold">Caffetteria accogliente</h2>
              <p className="text-light mb-0">
                Un luogo dove ogni dolce ha una storia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*Controlli*/}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

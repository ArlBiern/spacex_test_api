import React, { useRef, useState } from "react";
import CarouselArrow from "./CarouselArrow";

const Carousel = ({ launch }) => {
  const mainDiv = useRef();

  const [currentActiveImage, setCurrentActiveImg] = useState(1);
  let picturesCount;

  const slideChange = (e) => {
    setCurrentActiveImg(
      currentActiveImage + parseInt(e.target.dataset.direction)
    );

    if (e.target.dataset.direction === "1" && currentActiveImage >= 3) {
      mainDiv.current.style.setProperty(
        "--transition-value",
        `${(currentActiveImage - 2) * 20}%`
      );
    }

    if (e.target.dataset.direction === "-1" && currentActiveImage > 3) {
      mainDiv.current.style.setProperty(
        "--transition-value",
        `${(currentActiveImage - 4) * 20}%`
      );
    }
  };

  const renderMainPic = () => {
    if (launch && launch.links.flickr.original[0]) {
      return (
        <img
          className="carousel_bigPic"
          src={launch.links.flickr.original[currentActiveImage - 1]}
          alt={`Zdjęcie rakiety ${launch.name}`}
        />
      );
    } else {
      return <div className="no_picture">Brak zdjęć dla tego lotu</div>;
    }
  };

  const renderMinPictures = () => {
    if (launch && launch.links.flickr.original[0]) {
      let pictures = launch.links.flickr.original;
      picturesCount = pictures.length;

      return pictures.map((picture, index) => {
        return (
          <div
            className={
              "carouselMinPic_div" +
              `${currentActiveImage === 1 + index ? " active" : ""}`
            }
            key={index}
          >
            <img
              className="carouselMinPic_img"
              src={picture}
              alt={launch.name + " picture"}
            />
          </div>
        );
      });
    }
  };

  const renderNavigation = () => {
    if (launch && launch.links.flickr.original[0]) {
      return (
        <div className="carousel_navigationCnt">
          <CarouselArrow
            slideChange={slideChange}
            currentActiveImage={currentActiveImage}
            directionClass=""
            direction={-1}
            inactiveReason={1}
          />
          <div className="carousel_minPicCnt">
            <div className="carousel_minPicArea">{renderMinPictures()}</div>
          </div>
          <CarouselArrow
            slideChange={slideChange}
            currentActiveImage={currentActiveImage}
            directionClass="arrow_right"
            direction={1}
            inactiveReason={picturesCount}
          />
        </div>
      );
    } else {
      return <div className="carousel_navigationCnt"></div>;
    }
  };

  return (
    <div className="detailCarousel_cnt" ref={mainDiv}>
      {renderMainPic()}
      {renderNavigation()}
      <p className="carousel_slidesCount">
        {launch && launch.links.flickr.original[0]
          ? `${currentActiveImage} / ${picturesCount}`
          : ""}
      </p>
    </div>
  );
};

export default Carousel;

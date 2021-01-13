import React, { useState } from "react";
import { PropTypes } from "prop-types";
import Slider from "react-slick";
import {
  CloseButton,
  Global,
  Header,
  ImageWrapper,
  Indicator,
  Overlay,
  SliderWrapper,
} from "./styles";
const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log(Slider);

  return (
    <Overlay>
      <Header>
        <h1>상세 이미지</h1>
        <CloseButton onClick={onClose} />
      </Header>
      <SliderWrapper>
        <Global />
        <Slider
          initialSlide={0}
          // afterChange : 이미지 다 로딩 되어야 보여줌/ beforeChange: 좀빨리 보여줌
          beforeChange={(slide) => setCurrentSlide(slide)}
          infinite
          arrows={false}
          slidesToShow={1}
        >
          {images.map((image) => (
            <ImageWrapper key={image.src}>
              <img src={image.src} alt={image.src} />
            </ImageWrapper>
          ))}
        </Slider>
        <Indicator>
          <div>
            {currentSlide + 1} /{images.length}
          </div>
        </Indicator>
      </SliderWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;

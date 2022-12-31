import React from "react";

import Slider from "react-slick";

import { ICenterModeProps } from "./CenterMode.props";

import { SimpleNextArrow, SimplePrevArrow } from "../CustomArrows";
import Title from "../../../atoms/Title";

const CenterModeSlider = ({ speed, slidesToShow, title, children }: ICenterModeProps) => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: false,
        centerPadding: "0px",
        slidesToShow: slidesToShow || 3,
        speed: speed || 500,
        nextArrow: <SimpleNextArrow />,
        prevArrow: <SimplePrevArrow />,
    };
    return (
        <>
            <Title variant="h2" className="py-4 text-center">
                {title}
            </Title>
            <Slider {...settings}>{children}</Slider>
        </>
    );
};

export default CenterModeSlider;

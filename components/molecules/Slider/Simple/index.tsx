import React from "react";
import Slider from "react-slick";
import Title from "../../../atoms/Title";

import { ISimpleSliderProps } from "./SimpleSlider.props";

const SimpleSlider = ({
    title,
    slidesToShow,
    slidesToScroll,
    children,
    vertical = false,
    verticalSwiping = false,
    nextArrow,
    prevArrow,
}: ISimpleSliderProps) => {
    const settings = {
        infinite: true,
        speed: 500,
        vertical,
        verticalSwiping,
        slidesToShow: slidesToShow || 2,
        slidesToScroll: slidesToScroll || 1,
        nextArrow,
        prevArrow,
    };
    return (
        <>
            {title && (
                <Title variant="h2" className="py-4 text-center">
                    {title}
                </Title>
            )}
            <Slider {...settings}>{children}</Slider>
        </>
    );
};

export default SimpleSlider;

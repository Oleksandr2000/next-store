import cn from "classnames";
import React from "react";

import { ITabsProps } from "./Tabs.props";

import SimpleSlider from "../Slider/Simple";
import { SimpleNextArrow, SimplePrevArrow } from "../Slider/CustomArrows";

const Tabs = ({
    list,
    oriental,
    divider,
    className,
    activeStyle,
    sliderList = false,
    slidesToShow = 3,
}: ITabsProps) => {
    const [value, setValue] = React.useState(0);

    const isVertical = oriental === "right" || oriental === "left";

    return (
        <div
            className={cn("flex", className, {
                "flex-row": oriental === "right",
                "flex-row-reverse": oriental === "left",
                "flex-col": oriental === "top",
                "flex-col-reverse": oriental === "bottom",
            })}
        >
            {sliderList ? (
                <div
                    className={cn("", {
                        "h-full  w-1/4": oriental === "right" || oriental === "left",
                        "h-1/4 w-full py-3": oriental === "top" || oriental === "bottom",
                    })}
                >
                    <SimpleSlider
                        slidesToShow={slidesToShow}
                        slidesToScroll={1}
                        vertical={isVertical}
                        verticalSwiping={isVertical}
                        nextArrow={isVertical ? null : <SimpleNextArrow />}
                        prevArrow={isVertical ? null : <SimplePrevArrow />}
                    >
                        {list.map((item: any, index: number) => (
                            <div
                                key={index}
                                onClick={() => setValue(index)}
                                className={cn("w-fit", {
                                    "border-b-4 border-b-red-900": value === index && activeStyle === "bottom",
                                    "border-t-4 border-t-red-900": value === index && activeStyle === "top",
                                    "border-l-4 border-l-red-900": value === index && activeStyle === "left",
                                    "border-r-4 border-r-red-900": value === index && activeStyle === "right",
                                    "border-4 border-red-900": value === index && activeStyle === "all",
                                })}
                            >
                                {item.label}
                            </div>
                        ))}
                    </SimpleSlider>
                </div>
            ) : (
                <div
                    className={cn("flex", {
                        "h-full w-1/4 flex-col justify-between px-5": oriental === "right" || oriental === "left",
                        "h-1/4 w-full flex-row justify-between pt-3": oriental === "top" || oriental === "bottom",
                    })}
                >
                    {list.map((item: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => setValue(index)}
                            className={cn("w-fit", {
                                "border-b-4 border-b-red-900": value === index && activeStyle === "bottom",
                                "border-t-4 border-t-red-900": value === index && activeStyle === "top",
                                "border-l-4 border-l-red-900": value === index && activeStyle === "left",
                                "border-r-4 border-r-red-900": value === index && activeStyle === "right",
                                "border-4 border-red-900": value === index && activeStyle === "all",
                            })}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
            {list.map((item: any, index: number) => {
                if (value === index) {
                    return (
                        <div
                            key={index}
                            className={cn("flex items-center justify-center", {
                                "h-full w-3/4": oriental === "right" || oriental === "left",
                                "h-3/4 w-full": oriental === "top" || oriental === "bottom",
                                "border-l border-gray-300": divider && oriental === "right",
                                "border-r border-gray-300": divider && oriental === "left",
                                "border-t border-gray-300": divider && oriental === "top",
                                "border-b border-gray-300": divider && oriental === "bottom",
                            })}
                        >
                            {item.content}
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default Tabs;

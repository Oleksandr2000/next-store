import React from "react";
import { getTrackBackground, Range } from "react-range";

import { ITwoThumbsRangepRrops } from "./Range.props";

const MIN = 0;
const MAX = 5000;

const TwoThumbsRange = ({ values, setValues }: ITwoThumbsRangepRrops) => (
    <div className="my-5">
        <div className="flex flex-row items-center py-5 text-base font-medium">
            <b className="mr-3 text-lg">Ціна</b>
            <div className="mx-3 flex flex-row items-center font-normal text-gray-400">
                <span className="px-2">Від</span>
                <span>{values[0].toFixed(0)}</span>
            </div>
            <div className="flex flex-row items-center font-normal text-gray-400">
                <span className="px-2">До</span>
                <span>{values[1].toFixed(0)}</span>
            </div>
        </div>
        <Range
            values={values}
            min={MIN}
            max={MAX}
            onChange={(values) => {
                setValues(values);
            }}
            renderTrack={({ props, children }) => (
                <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                        ...props.style,
                        height: "20px",
                        display: "flex",
                        width: "100%",
                    }}
                >
                    <div
                        ref={props.ref}
                        style={{
                            height: "4px",
                            width: "100%",
                            margin: "0 12px",
                            borderRadius: "4px",
                            background: getTrackBackground({
                                values,
                                colors: ["#ccc", "#ccc", "#ccc"],
                                min: MIN,
                                max: MAX,
                            }),
                            alignSelf: "center",
                        }}
                    >
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: "22px",
                        width: "22px",
                        backgroundColor: "#000",
                    }}
                />
            )}
        />
    </div>
);

export default TwoThumbsRange;

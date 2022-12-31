import Image from "next/image";
import LeftArrow from "../../../../public/icons/left-arrow.svg";
import RightArrow from "../../../../public/icons/right-arrow.svg";

export const SimpleNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <span
            className={className}
            style={{ ...style, display: "block", background: "transperent", right: "10px" }}
            onClick={onClick}
        />
    );
};

export const SimplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <span
            className={className}
            style={{ ...style, display: "block", background: "transperent", left: "5px", zIndex: 10 }}
            onClick={onClick}
        />
    );
};

export const BlackNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "transparent", right: "10px", top: "24px", zIndex: 10 }}
            onClick={onClick}
        >
            <Image src={RightArrow} alt="prev" width={24} height={24} />
        </div>
    );
};

export const BlackPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "transparent",
                left: "5px",
                top: "24px",
                zIndex: 10,
            }}
            onClick={onClick}
        >
            <Image src={LeftArrow} alt="prev" width={24} height={24} />
        </div>
    );
};

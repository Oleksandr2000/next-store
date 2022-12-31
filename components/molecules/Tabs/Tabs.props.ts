export interface ITabsProps {
    list: {
        label: any;
        content: any;
    }[];
    oriental: "top" | "bottom" | "right" | "left";
    sliderList?: boolean;
    slidesToShow?: number;
    activeStyle?: "top" | "bottom" | "right" | "left" | "all";
    divider?: boolean;
    className: string;
}

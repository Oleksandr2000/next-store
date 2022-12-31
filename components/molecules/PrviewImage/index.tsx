import cn from "classnames";
import Image from "next/legacy/image";
import React from "react";
import Title from "../../atoms/Title";

import { IPreviewImageProps } from "./PreviewImage.props";

const PreviewImage = ({ title, src, className }: IPreviewImageProps) => (
    <div className={cn("relative", className, {})}>
        <Title
            variant="h2"
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-center  text-gray-100"
        >
            {title}
        </Title>
        <Image src={src} alt={title} layout="fill" quality={100} />
    </div>
);

export default PreviewImage;

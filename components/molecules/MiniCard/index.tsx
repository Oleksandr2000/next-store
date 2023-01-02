import React from "react";
import Image from "next/image";
import cn from "classnames";
import Link from "next/link";
import { IMiniCardProps } from "./MiniCard.props";
import { PRODUCT_ROUTE } from "../../../utils/route.constant";
import Title from "../../atoms/Title";

const MiniCard = ({ _id, title, img, price, currentPrice, code, hit, currentSize }: IMiniCardProps) => (
    <Link href={`${PRODUCT_ROUTE}/${_id}`}>
        <div
            key={_id}
            className={cn("mx-auto flex h-24 w-[290px] flex-row items-center bg-gray-50 shadow-md shadow-gray-500", {
                "border-r-8 border-r-yellow-600": hit,
            })}
        >
            <Image src={img} alt={title} width={64} height={100} />
            <div className="flex h-full w-full flex-col justify-between px-3">
                <Title variant="h4" className="text-left  text-gray-400">
                    {title}
                </Title>
                <div className="flex flex-row">
                    <Title variant="h6" className="text-left">
                        {code}
                    </Title>
                    {currentSize && (
                        <Title variant="h6" className="text-left">
                            {currentSize}
                        </Title>
                    )}
                </div>
                <div className="flex w-full flex-row items-center justify-between pb-4">
                    {price !== currentPrice && (
                        <Title variant="h6" className="line-through">
                            {price} UAH
                        </Title>
                    )}
                    <Title variant="h6" className="text-gray-500">
                        {currentPrice} UAH
                    </Title>
                </div>
            </div>
        </div>
    </Link>
);

export default MiniCard;

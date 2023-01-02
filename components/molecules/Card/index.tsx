import Image from "next/legacy/image";
import React from "react";

import { ICardProps } from "./Card.props";

import { PRODUCT_ROUTE } from "../../../utils/route.constant";
import Title from "../../atoms/Title";

const Card = ({ _id, title, hash, price, currentPrice, img }: ICardProps) => (
    <div className="mx-auto box-border flex max-w-xs flex-col">
        <div>
            <Image src={img} alt={title} width={320} height={460} layout="intrinsic" />
        </div>
        <div className="flex flex-col  px-2 ">
            <Title variant="h5" className="pt-5 pb-2" href={`${PRODUCT_ROUTE}/${_id}`}>
                {title}
            </Title>
            <Title variant="h6" className="pb-2 text-gray-400">
                {hash}
            </Title>
            <div className="flex justify-between">
                {price !== currentPrice && (
                    <Title variant="h6" className="text-black line-through">
                        {price} грн.
                    </Title>
                )}
                <Title variant="h6" className="text-gray-400">
                    {currentPrice} грн.
                </Title>
            </div>
        </div>
    </div>
);

export default Card;

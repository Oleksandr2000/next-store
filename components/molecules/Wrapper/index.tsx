import React from "react";

import { IWrapperProps } from "./Wrapper.props";

import { IProduct } from "../../../app/services/ProductService/Product.types";
import Card from "../Card";
import Sceleton from "../Card/Sceleton";

const Wrapper = ({ data, isLoading, error }: IWrapperProps) => {
    if (!data && error) {
        return <div className="flex h-96 items-center justify-center">Error Products Not Found</div>;
    }

    return (
        <div className="row-auto my-10 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {!data || isLoading
                ? [...Array(12)].map((_, index: number) => (
                      <div key={index} className="flex items-center justify-center">
                          <Sceleton />
                      </div>
                  ))
                : data?.map((item: IProduct) => (
                      <Card
                          key={item._id}
                          _id={item._id}
                          title={item.title}
                          price={item.price}
                          currentPrice={item.currentPrice}
                          hash={item.code}
                          hit={item.hit}
                          img={item.images[0].src}
                      />
                  ))}
        </div>
    );
};

export default Wrapper;

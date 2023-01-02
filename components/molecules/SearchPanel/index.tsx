import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";

import SearchIcon from "../../../public/icons/search.svg";

import Input from "../../atoms/Input";
import MiniCard from "../MiniCard";
import { useFetchAllProducts } from "../../../app/services/ProductService/hooks";
import { addToSearchParams } from "../../../app/helpers";
import { IProduct } from "../../../app/services/ProductService/Product.types";
import Sceleton from "../MiniCard/Sceleton";
import Title from "../../atoms/Title";

const SearchPanel = () => {
    const [term, setTerm] = useState<string>("");
    const debounseTerm = useDebounce<string>(term, 500);

    const queryString = addToSearchParams([{ key: "term", value: debounseTerm }]);

    const products = useFetchAllProducts(
        {
            enabled: false,
        },
        queryString,
    );

    useEffect(() => {
        if (debounseTerm.length > 1) {
            products.refetch();
        }
    }, [debounseTerm]);

    return (
        <div className="z-index-20 flex h-[80vh] w-80 flex-col justify-start">
            <div className="h-28 w-full rounded-[4px] bg-white p-5 shadow-lg shadow-black">
                <div className="mb-2 flex flex-row items-center justify-center">
                    <Title variant="h4">Пошук</Title>
                    <Image src={SearchIcon} alt="search" width={18} height={18} className="ml-3" />
                </div>
                <Input
                    name="term"
                    type="text"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setTerm(event.target.value)}
                    value={term}
                    placeholder="Введіть назву товару"
                />
            </div>
            <AnimatePresence>
                {debounseTerm.length > 0 && (
                    <motion.div
                        key="searchedProducts"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="mt-3 overflow-auto rounded-[4px] bg-white px-2 py-4 shadow-lg shadow-black"
                    >
                        <div className="container row-auto mx-auto grid grid-cols-1 gap-4">
                            {products.isLoading || !products.data
                                ? [...Array(4)].map((_, index: number) => {
                                      <Sceleton key={index} />;
                                  })
                                : products.data.products.map((item: IProduct) => (
                                      <MiniCard
                                          _id={item._id}
                                          img={item.images[0].src}
                                          title={item.title}
                                          price={item.price}
                                          currentPrice={item.currentPrice}
                                          code={item.code}
                                          hit={item.hit}
                                          key={item._id}
                                      />
                                  ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchPanel;

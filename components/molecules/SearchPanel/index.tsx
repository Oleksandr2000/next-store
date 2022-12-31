import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useDebounce, useMediaQuery } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../../atoms/Input";
import SearchIcon from "../../../public/icons/search.svg";
import MiniCard from "../MiniCard";
import { useFetchAllProducts } from "../../../app/services/ProductService/hooks";
import { addToSearchParams } from "../../../app/helpers";
import { IProduct } from "../../../app/services/ProductService/Product.types";
import Sceleton from "../MiniCard/Sceleton";

const SearchPanel = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [term, setTerm] = useState<string>("");
    const debounseTerm = useDebounce<string>(term, 500);
    const isMobile = useMediaQuery("(max-width: 767px)");

    const queryString = addToSearchParams([{ key: "term", value: debounseTerm }]);

    const products = useFetchAllProducts(
        {
            enabled: false,
        },
        queryString,
    );

    const hide = () => {
        setIsOpen(false);
        setTerm("");
    };

    useEffect(() => {
        if (debounseTerm.length > 1) {
            products.refetch();
        }
    }, [debounseTerm]);

    return (
        <div className="z-index-20 flex justify-center">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        key="searchInput"
                        initial={{ width: 60, opacity: 0 }}
                        animate={{ width: isMobile ? 220 : 400, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Input
                            type="text"
                            icon={
                                <span className="text-2xl font-bold text-red-900" onClick={hide}>
                                    x
                                </span>
                            }
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setTerm(event.target.value)}
                            value={term}
                            placeholder="Введіть назву товару"
                        />
                    </motion.div>
                ) : (
                    <Image src={SearchIcon} alt="search" width={24} height={24} onClick={() => setIsOpen(true)} />
                )}
                {debounseTerm.length > 1 && (
                    <motion.div
                        key="searchedProducts"
                        initial={{ y: -1000, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -1000, opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className=" absolute bottom-16 left-0  h-screen w-screen overflow-auto bg-white pt-20 pb-6"
                    >
                        <div className="container row-auto mx-auto grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
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
                                          currentPrice={item.price - item.sale}
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

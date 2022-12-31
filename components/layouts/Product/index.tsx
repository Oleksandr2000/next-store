import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMediaQuery } from "usehooks-ts";
import { useAuthContext } from "../../../app/providers/userProvider";
import { useAddToBasket } from "../../../app/services/BasketService/hooks";
import { useFetchAllProducts, useFetchOneProduct } from "../../../app/services/ProductService/hooks";
import { IProduct, ProductImage, ProductVariants, Size } from "../../../app/services/ProductService/Product.types";
import { AUTH_ROUTE, BASKET_ROUTE, PRODUCT_ROUTE } from "../../../utils/route.constant";
import Button from "../../atoms/Button";
import Accordion from "../../molecules/Accordion";
import Card from "../../molecules/Card";
import { SimpleNextArrow, SimplePrevArrow } from "../../molecules/Slider/CustomArrows";
import SimpleSlider from "../../molecules/Slider/Simple";
import Tabs from "../../molecules/Tabs";
import Eclipse from "../../molecules/Loading/Eclipse";
import { useFetchFavotire, useTogleFavorite } from "../../../app/services/FavoriteService/hooks";
import { addToSearchParams } from "../../../app/helpers";
import Sceleton from "../../molecules/MiniCard/Sceleton";
import Title from "../../atoms/Title";

const ProductLayout = () => {
    const isMobile = useMediaQuery("(max-width: 767px)");
    const isTablet = useMediaQuery("(min-width: 768px)");
    const [activeSize, setActoveSize] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const { user } = useAuthContext();

    const router = useRouter();

    const product = useFetchOneProduct(String(router.query.id), {
        enabled: router.isReady,
    });

    const queryString = addToSearchParams([
        { key: "hit", value: true },
        { key: "limit", value: 12 },
    ]);

    const hits = useFetchAllProducts({}, queryString);

    if (user) {
        const queryString = addToSearchParams([
            { key: "user", value: String(user._id) },
            { key: "product", value: String(product?.data?.product._id) },
        ]);

        useFetchFavotire(
            {
                enabled: !!product,
                onSuccess(data: any) {
                    setIsFavorite(data.length !== 0);
                },
            },
            queryString,
        );
    }

    const moveToNextPage = (page: string) => {
        router.push(page);
    };

    const add = useAddToBasket();

    const addToBasket = () => {
        if (!user) {
            moveToNextPage(AUTH_ROUTE);

            return null;
        }
        if (!activeSize) {
            toast.warn("Оберіть розмір");
        }

        if (user._id && activeSize) {
            add.mutateAsync({ user: user._id, product: product.data.product._id, size: activeSize, count: 1 }).then(
                () => {
                    moveToNextPage(BASKET_ROUTE);
                },
            );
        }
    };

    const togle = useTogleFavorite();

    const togleFavorite = () => {
        if (!user) {
            router.push(AUTH_ROUTE);
        }
        if (user._id) {
            togle
                .mutateAsync({ user: user._id, product: product.data.product._id })
                .then(() => setIsFavorite(!isFavorite));
        } else {
            moveToNextPage(AUTH_ROUTE);
        }
    };

    if (product.isLoading || !product.data) {
        return <Eclipse />;
    }

    return (
        <>
            <section className="container mx-auto flex flex-col justify-between lg:flex-row">
                <div className="w-full lg:h-[600px] lg:w-1/2">
                    <Tabs
                        className="h-full w-full"
                        oriental={isMobile ? "bottom" : "right"}
                        sliderList={product.data?.product.images.length > 4}
                        slidesToShow={4}
                        list={product.data?.product.images.map((item: ProductImage) => ({
                            label: <Image alt={item.id} src={item.src} width={110} height={144} layout="intrinsic" />,
                            content: <Image alt={item.id} src={item.src} width={425} height={600} layout="fixed" />,
                        }))}
                    />
                </div>
                <div className="mt-10 flex h-full w-full flex-col justify-between lg:mt-0 lg:h-[600px] lg:w-1/2">
                    <div className="px-5">
                        <Title variant="h6" className="text-slate-400">
                            Артикул: {product.data?.product.code}
                        </Title>
                        <Title variant="h3" className="py-5">
                            {product.data?.product.title}
                        </Title>
                        <Accordion title="Опис">
                            <p>{product.data?.product.description}</p>
                        </Accordion>
                        <Accordion title="Склад">
                            <ul>
                                {product.data?.product.material.map((item) => (
                                    <li key={item.name}>
                                        <b>{item.name}: </b>
                                        <span>{item.value}%</span>
                                    </li>
                                ))}
                            </ul>
                        </Accordion>
                        <Title variant="h4" className="my-6 mr-5">
                            Доступні кольори
                        </Title>
                        <div className="mb-10 flex flex-row items-center justify-start">
                            <Button className="mr-2 h-12 w-24" variant="white">
                                Кольори:
                            </Button>
                            {product.data?.variants.map((item: ProductVariants) => (
                                <Button
                                    type="button"
                                    onClick={() => moveToNextPage(String(`${PRODUCT_ROUTE}/${item._id}`))}
                                    key={item._id}
                                    variant="gray"
                                    className="mr-2 h-12 w-12"
                                    style={{ backgroundColor: String(item.color.value) }}
                                />
                            ))}
                        </div>
                        <Title variant="h4" className="my-6 mr-5 ">
                            Оберіть розмір
                        </Title>
                        <div className="mb-10 flex flex-row items-center justify-start">
                            <Button className="mr-2 h-12 w-24" variant="white">
                                Розміри:
                            </Button>
                            {product.data?.product.sizes.map((item: Size) => (
                                <Button
                                    key={item.name}
                                    disabled={item.count === 0}
                                    variant={item.name === activeSize ? "black" : "gray"}
                                    className="mr-2 h-12 w-12"
                                    onClick={() => setActoveSize(item.name)}
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <Button className="w-1/2 py-5 text-2xl" variant="black" onClick={addToBasket}>
                            Купити
                        </Button>
                        <Button
                            className="w-1/2 py-5 text-2xl"
                            variant={isFavorite ? "remove" : "white"}
                            onClick={togleFavorite}
                        >
                            {isFavorite && user ? "Видалити з обраних" : "В обрані"}
                        </Button>
                    </div>
                </div>
            </section>
            <div className="container mx-auto">
                {product?.data?.product?.recomendation.length > 0 && (
                    <SimpleSlider
                        title="Також купують"
                        slidesToShow={isTablet ? 4 : 2}
                        slidesToScroll={1}
                        nextArrow={<SimpleNextArrow />}
                        prevArrow={<SimplePrevArrow />}
                    >
                        {!product.data || product.isLoading
                            ? [...Array(4)].map((_, index: number) => (
                                  <div key={index} className="flex items-center justify-center">
                                      <Sceleton />
                                  </div>
                              ))
                            : product.data.product?.recomendation?.map((item: IProduct) => (
                                  <div key={item._id} className="h-62 px-1">
                                      <Card {...item} hash={item.code} key={item._id} img={item.images[0].src} />
                                  </div>
                              ))}
                    </SimpleSlider>
                )}
                <SimpleSlider
                    title="Хіти продажу"
                    slidesToShow={isTablet ? 4 : 2}
                    slidesToScroll={1}
                    nextArrow={<SimpleNextArrow />}
                    prevArrow={<SimplePrevArrow />}
                >
                    {!hits.data || hits.isLoading
                        ? [...Array(4)].map((_, index: number) => (
                              <div key={index} className="flex items-center justify-center">
                                  <Sceleton />
                              </div>
                          ))
                        : hits.data.products.map((item: IProduct) => (
                              <div key={item._id} className="h-62 px-1">
                                  <Card {...item} hash={item.code} key={item._id} img={item.images[0].src} />
                              </div>
                          ))}
                </SimpleSlider>
            </div>
        </>
    );
};

export default ProductLayout;

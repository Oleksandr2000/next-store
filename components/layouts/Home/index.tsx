import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

import { useMediaQuery } from "usehooks-ts";
import laptopBg from "../../../public/img/laptop_main.png";
import mobileBg from "../../../public/img/main.png";
import ModernArtImg from "../../../public/img/art_2.png";
import WoomanArtImg from "../../../public/img/art_3.png";

import { ICategory } from "../../../app/services/CategoryService/Category.types";
import { useFetchCategories } from "../../../app/services/CategoryService/hooks";
import { CATALOG_ROUTE, COLLECTION_ROUTE } from "../../../utils/route.constant";
import Button from "../../atoms/Button";
import Card from "../../molecules/Card";
import PreviewImage from "../../molecules/PrviewImage";
import CenterModeSlider from "../../molecules/Slider/CenterMode";
import SimpleSlider from "../../molecules/Slider/Simple";
import FeedbackForm from "../../organisms/FeedbackForm";
import Sceleton from "../../molecules/Card/Sceleton";
import { SimpleNextArrow, SimplePrevArrow } from "../../molecules/Slider/CustomArrows";
import { useFetchAllProducts } from "../../../app/services/ProductService/hooks";
import { addToSearchParams } from "../../../app/helpers";
import { IProduct } from "../../../app/services/ProductService/Product.types";
import { useFetchCollections } from "../../../app/services/CollectionService/hooks";
import { ICollection } from "../../../app/services/CollectionService/Collection.types";
import Title from "../../atoms/Title";

const HomeLayout = () => {
    const isMobile = useMediaQuery("(max-width: 767px)");
    const categories = useFetchCategories({});
    const collections = useFetchCollections({});

    const queryString = addToSearchParams([
        { key: "hit", value: true },
        { key: "limit", value: 12 },
    ]);

    const hits = useFetchAllProducts({}, queryString);

    return (
        <>
            <section className="relative flex h-screen w-full items-center justify-center bg-black bg-opacity-40">
                <div className="flex flex-col">
                    <Title variant="h1" className="text-center text-white">
                        Serginnetti <br />
                        Сучасний бренд <br />
                        Жіночого одягу
                    </Title>
                    <Button
                        href={CATALOG_ROUTE}
                        variant="white"
                        className="z-10 mx-auto mt-16 h-12 w-64 text-lg font-semibold shadow-none"
                    >
                        Перейти в каталог
                    </Button>
                    <Image
                        src={isMobile ? mobileBg : laptopBg}
                        alt="Serginnetti"
                        layout="fill"
                        quality={100}
                        className="absolute bottom-0 left-0 -z-10 box-border h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 z-20 w-full bg-black py-3 px-5 text-center text-sm font-light text-gray-200">
                        Увага!!! <br />
                        Це начальний проект який не містить комерційної основи
                    </div>
                </div>
            </section>
            <section className="lg:container lg:mx-auto">
                {collections.isSuccess && collections.data.length >= 3 && (
                    <>
                        <div className="sm:hidden">
                            <CenterModeSlider title="Колекції" slidesToShow={1.25} speed={300}>
                                {collections.data.map((item: ICollection) => (
                                    <Link
                                        href={`${COLLECTION_ROUTE}/${item._id}`}
                                        key={item._id}
                                        className="h-[360px] pr-2 lg:h-[460px]"
                                    >
                                        <PreviewImage src={item.img} title={item.name} className="h-full " />
                                    </Link>
                                ))}
                            </CenterModeSlider>
                        </div>
                        <div className="hidden sm:block">
                            <SimpleSlider
                                title="Колекції"
                                slidesToShow={3}
                                slidesToScroll={1}
                                nextArrow={<SimpleNextArrow />}
                                prevArrow={<SimplePrevArrow />}
                            >
                                {collections.data.map((item: ICollection) => (
                                    <Link
                                        href={`${COLLECTION_ROUTE}/${item._id}`}
                                        key={item._id}
                                        className="h-[360px] pr-2 lg:h-[460px]"
                                    >
                                        <PreviewImage src={item.img} title={item.name} className="h-full " />
                                    </Link>
                                ))}
                            </SimpleSlider>
                        </div>
                    </>
                )}
                {categories.isSuccess && categories.data.length >= 3 && (
                    <>
                        <div className="sm:hidden">
                            <CenterModeSlider title="Категорії" slidesToShow={1.25} speed={300}>
                                {categories.data.map((item: ICategory) => (
                                    <Link
                                        key={item._id}
                                        href={`${CATALOG_ROUTE}/${item.slug} `}
                                        className="h-[360px] pr-2 lg:h-[460px]"
                                    >
                                        <PreviewImage src={item.img} title={item.name} className="h-full" />
                                    </Link>
                                ))}
                            </CenterModeSlider>
                        </div>
                        <div className="hidden sm:block">
                            <SimpleSlider
                                title="Категорії"
                                slidesToShow={3}
                                slidesToScroll={1}
                                nextArrow={<SimpleNextArrow />}
                                prevArrow={<SimplePrevArrow />}
                            >
                                {categories.data.map((item: ICategory) => (
                                    <Link
                                        key={item._id}
                                        href={`${CATALOG_ROUTE}/${item.slug}`}
                                        className="h-[360px] px-2 lg:h-[460px]"
                                    >
                                        <PreviewImage src={item.img} title={item.name} className="h-full" />
                                    </Link>
                                ))}
                            </SimpleSlider>
                            <Button
                                href={CATALOG_ROUTE}
                                variant="black"
                                className="my-6 mx-auto hidden py-3 px-10 lg:block"
                            >
                                Переглянути каталог
                            </Button>
                        </div>
                    </>
                )}
                <SimpleSlider
                    title="Хіти продажу"
                    slidesToShow={isMobile ? 2 : 4}
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
            </section>
            <div className="my-24 hidden h-96 w-full items-center justify-center bg-wooman-beauty lg:flex ">
                <Image src={WoomanArtImg} alt="art" height={416} width={300} layout="fixed" />
            </div>
            <section className="container mx-auto mt-10 px-5">
                <div className="flex h-full items-center justify-center md:justify-between">
                    <div className="w-full md:w-1/2">
                        <div className="my-5">
                            <Title variant="h2" className="py-5  text-black">
                                Мистецтво створення одягу
                            </Title>
                            <p className="text-base md:text-sm lg:text-base">
                                Это удобный способ получения заказов, который популярен среди наших клиентов. Именно
                                поэтому их перечень постоянно растет, а комфортабельность и функционал совершенствуются.
                                В Постамате вы можете самостоятельно получить заказ в удобное для вас время, без
                                очередей и ожидания курьера, следуя инструкции в меню терминала.
                                <br />
                                <br />
                                Вы можете выбрать пункт Самовывоза с возможностью примерки и безналичной оплатой.
                            </p>
                            <Button variant="black" className="mt-5 w-full py-2 md:w-1/2">
                                Заявка на франчайзинг
                            </Button>
                        </div>
                    </div>
                    <div className="ml-10 hidden h-[300px] w-1/2 items-center justify-center bg-modern-art bg-cover bg-top md:flex lg:h-[400px]">
                        <Image
                            src={ModernArtImg}
                            alt="art"
                            height={300}
                            layout="intrinsic"
                            objectFit="contain"
                            objectPosition="center"
                        />
                    </div>
                </div>
                <FeedbackForm />
            </section>
        </>
    );
};

export default HomeLayout;

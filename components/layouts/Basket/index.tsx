import { useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../app/providers/userProvider";
import { IUserBasket } from "../../../app/services/BasketService/Basket.types";
import { useFetchUserBasket } from "../../../app/services/BasketService/hooks";

import { AUTH_ROUTE, CATALOG_ROUTE } from "../../../utils/route.constant";
import Button from "../../atoms/Button";
import Empty from "../../atoms/Empty";
import Typography from "../../atoms/Typography";
import BasketCard from "../../molecules/BasketCard";
import Eclipse from "../../molecules/Loading/Eclipse";
import Modal from "../../molecules/Modal";
import OrderForm from "../../organisms/OrderForm";
import Title from "../../atoms/Title";

const BasketLayout = () => {
    const [openOrderForm, setOpenOrderForm] = useState<boolean>(false);
    const { user } = useAuthContext();

    const router = useRouter();

    if (!user) {
        router.push(AUTH_ROUTE);

        return null;
    }

    const basketProducts = useFetchUserBasket(String(user._id), {
        enabled: !!user._id,
    });

    if (basketProducts.isLoading || !basketProducts.data) {
        return <Eclipse />;
    }

    return (
        <div className="container mx-auto min-h-screen ">
            <Title variant="h2" className="mb-10 border-b border-b-gray-300 pb-5">
                Корзина
            </Title>
            <div className="flex flex-col justify-between">
                {basketProducts?.data?.basket?.length > 0 || basketProducts.isError ? (
                    basketProducts?.data?.basket.map((item: IUserBasket) => (
                        <BasketCard
                            _id={item._id}
                            productId={item.product?._id}
                            category={item.product?.category}
                            title={item.product?.title}
                            img={item.product?.images[0].src}
                            price={item.product?.price}
                            currentPrice={item.product?.price - item.product?.sale}
                            code={item.product?.code}
                            currentSize={item.size}
                            count={item.count}
                            key={item._id}
                            upateBasket={() => basketProducts.refetch()}
                        />
                    ))
                ) : (
                    <Empty>
                        <Typography size="text-lg" center bold="semi">
                            Ви ще не додали товари в корзину.
                        </Typography>
                    </Empty>
                )}
            </div>
            <div className="fixed bottom-0 left-0 w-full border-t border-t-gray-300 bg-white pt-5 md:pb-5">
                <div className="container mx-auto flex flex-col-reverse items-center justify-between md:flex-row">
                    <div className="flex flex-row items-center justify-between">
                        {basketProducts?.data?.basket?.length > 0 && (
                            <Button
                                className="px-4 py-2 text-base"
                                variant="black"
                                onClick={() => setOpenOrderForm(true)}
                            >
                                Оформити замовлення
                            </Button>
                        )}
                        <Button className="px-4 py-2 text-base md:ml-4" variant="white" href={CATALOG_ROUTE}>
                            Продовжити покупки
                        </Button>
                    </div>
                    <div className="mb-5 flex flex-row items-center justify-between md:mb-0">
                        <Typography color="gray" size="text-lg" bold="medium">
                            Кількість товарів: {basketProducts?.data?.count}
                        </Typography>
                        <Typography color="gray" size="text-lg" bold="medium" className="ml-4">
                            На сумму: {basketProducts?.data?.totalPrice}
                        </Typography>
                    </div>
                </div>
            </div>
            <Modal layoutClose={false} closeButton open={openOrderForm} setOpen={setOpenOrderForm}>
                <OrderForm updateBasket={basketProducts.refetch} />
            </Modal>
        </div>
    );
};

export default BasketLayout;

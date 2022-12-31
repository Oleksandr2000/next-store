import Image from "next/image";
import { useAuthContext } from "../../../app/providers/userProvider";
import Button from "../../atoms/Button";
import DeleteIcon from "../../../public/icons/delete.svg";
import { IBasketCardProps } from "./BasketCard.props";
import Typography from "../../atoms/Typography";
import { PRODUCT_ROUTE } from "../../../utils/route.constant";
import { useAddToBasket, useRemoveFromBasket, useUpdateProductCount } from "../../../app/services/BasketService/hooks";
import Title from "../../atoms/Title";

const BasketCard = ({
    _id,
    productId,
    currentPrice,
    img,
    title,
    count,
    currentSize,
    upateBasket,
}: IBasketCardProps) => {
    const { user } = useAuthContext();

    const add = useAddToBasket();

    const remove = useRemoveFromBasket();

    const update = useUpdateProductCount(_id);

    const incCount = () => {
        add.mutateAsync({
            user: String(user._id),
            product: productId,
            size: currentSize,
            count: count + 1,
        }).then(() => {
            upateBasket();
        });
    };

    const decCount = () => {
        update
            .mutateAsync({
                count: count - 1,
            })
            .then(() => {
                upateBasket();
            });
    };

    const removeFromBasket = () => {
        remove.mutateAsync(_id).then(() => {
            upateBasket();
        });
    };

    return (
        <div className="my-5 flex h-72 w-full flex-col items-center justify-between border-b border-b-gray-300 pb-5 md:h-[180px] md:flex-row">
            <div className="flex w-full flex-row md:w-1/2">
                <Image src={img} alt={title} width={120} height={180} />
                <div className="ml-5 flex flex-col justify-between">
                    <Title variant="h3" href={`${PRODUCT_ROUTE}/${productId}`}>
                        {title}
                    </Title>
                    <Typography size="text-lg" bold="medium">
                        Розмір: {currentSize}
                    </Typography>
                    <Typography size="text-lg" bold="medium">
                        {currentPrice} грн.
                        <span className="mx-5 text-xs text-gray-400">X</span>
                        {count}
                    </Typography>
                </div>
            </div>
            <div className="flex w-full flex-row items-center justify-between px-5 md:w-1/2">
                <Typography upercase size="text-lg" bold="medium">
                    До сплати: {currentPrice * count}
                </Typography>
                <div className="flex flex-row">
                    <Button
                        variant="black"
                        className="ml-3 flex h-10 w-10 items-center justify-center text-xl font-bold leading-10"
                        onClick={decCount}
                    >
                        -
                    </Button>
                    <Button
                        variant="black"
                        className="ml-3 flex h-10 w-10 items-center justify-center text-xl font-bold leading-10"
                        onClick={incCount}
                    >
                        +
                    </Button>
                    <Button
                        variant="black"
                        className="ml-3 flex h-10 w-10 items-center justify-center bg-red-900"
                        onClick={removeFromBasket}
                    >
                        <Image src={DeleteIcon} alt="del" width={30} height={30} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BasketCard;

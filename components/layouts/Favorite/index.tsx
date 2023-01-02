import { useRouter } from "next/router";
import { addToSearchParams } from "../../../app/helpers";
import { useAuthContext } from "../../../app/providers/userProvider";
import { useFetchFavotire } from "../../../app/services/FavoriteService/hooks";
import { AUTH_ROUTE } from "../../../utils/route.constant";

import Empty from "../../atoms/Empty";
import Title from "../../atoms/Title";
import Typography from "../../atoms/Typography";
import Eclipse from "../../molecules/Loading/Eclipse";
import MiniCard from "../../molecules/MiniCard";

const FavoriteLayout = () => {
    const { user } = useAuthContext();

    const router = useRouter();

    if (!user) {
        router.push(AUTH_ROUTE);

        return null;
    }
    const queryString = addToSearchParams([{ key: "user", value: String(user._id) }]);

    const favorites = useFetchFavotire({}, queryString);

    if (favorites.isLoading || !favorites.data) {
        return <Eclipse />;
    }

    return (
        <div className="container mx-auto min-h-screen ">
            <Title variant="h2" className="mb-10 border-b border-b-gray-300 pb-5">
                Обране
            </Title>
            {favorites?.data?.length > 0 || favorites.isError ? (
                <div className="row-auto mx-auto grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                    {favorites?.data?.map((item) => (
                        <MiniCard
                            key={item._id}
                            _id={item.product._id}
                            code={item.product.code}
                            currentPrice={item.product.currentPrice}
                            img={item.product.images[0].src}
                            price={item.product.price}
                            title={item.product.title}
                            hit={item.product.hit}
                        />
                    ))}
                </div>
            ) : (
                <Empty>
                    <Typography size="text-lg" center bold="semi">
                        Ви ще не додали товари в обрані.
                    </Typography>
                </Empty>
            )}
        </div>
    );
};

export default FavoriteLayout;

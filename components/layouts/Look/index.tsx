import Image from "next/legacy/image";
import Link from "next/link";
import { ReactNode } from "react";
import { ILook } from "../../../app/services/CapsuleService/Capsule.types";
import { useFetchLooks } from "../../../app/services/CapsuleService/hooks";
import { IProduct } from "../../../app/services/ProductService/Product.types";
import { PRODUCT_ROUTE } from "../../../utils/route.constant";
import Title from "../../atoms/Title";
import Eclipse from "../../molecules/Loading/Eclipse";

const LookWrapper = ({ children }: { children: ReactNode }) => (
    <div className="row-auto grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">{children}</div>
);

const LookLayout = () => {
    const looks = useFetchLooks({});

    if (!looks.data || looks.isLoading) {
        return <Eclipse />;
    }

    return (
        <div className="container mx-auto">
            {looks.data.map((item: ILook) => (
                <div key={item.name} className="pb-5">
                    <Title variant="h2">{item.name}</Title>
                    <LookWrapper>
                        {item.products.map((item: IProduct) => (
                            <Link key={item._id} href={`${PRODUCT_ROUTE}/${item._id}`}>
                                <Image
                                    src={item.images[0].src}
                                    alt={item.title}
                                    layout="intrinsic"
                                    width={300}
                                    height={460}
                                />
                            </Link>
                        ))}
                    </LookWrapper>
                </div>
            ))}
        </div>
    );
};

export default LookLayout;

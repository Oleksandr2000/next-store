import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

import MenuIcon from "../../../public/img/menu.png";
import BasketIcon from "../../../public/img/basket.png";
import Logo from "../../../public/img/logo.png";

import { BASKET_ROUTE } from "../../../utils/route.constant";
import Nav from "../../molecules/Nav";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { pathname, query } = useRouter();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname, query]);

    return (
        <>
            <div className={`z-30 w-full py-5 ${pathname === "/" && "absolute"}`}>
                <div className="flex w-full flex-row items-center justify-between px-3">
                    <Image src={MenuIcon} alt="menu" width={22} height={22} onClick={() => setIsOpen(!isOpen)} />
                    <div>
                        <Link href="/">
                            <Image src={Logo} alt="serginnetti" height={32} width={160} />
                        </Link>
                    </div>
                    <div className="cursor-pointer">
                        <Link href={BASKET_ROUTE}>
                            <Image src={BasketIcon} alt="basket" width={22} height={22} />
                        </Link>
                    </div>
                </div>
            </div>
            <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

export default Header;

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

import Image from "next/image";
import { INavProps } from "./Nav.props";

import AuthIcon from "../../../public/icons/auth.svg";
import FavoriteIcon from "../../../public/icons/favorite.svg";
import LogoutIcon from "../../../public/icons/logout.svg";
import MenuIcon from "../../../public/img/menu.png";
import BasketIcon from "../../../public/img/basket.png";
import Logo from "../../../public/img/logo.png";

import { useAuthContext } from "../../../app/providers/userProvider";
import { ICategory } from "../../../app/services/CategoryService/Category.types";
import { useFetchCategories } from "../../../app/services/CategoryService/hooks";
import { AUTH_ROUTE, CATALOG_ROUTE, COLLECTION_ROUTE, FAVORITE_ROUTE, LOOK_ROUTE } from "../../../utils/route.constant";
import Accordion from "../Accordion";
import SearchPanel from "../SearchPanel";
import Route from "../../atoms/Route";
import useHandleScroll from "../../../app/hooks/useHandleScroll";
import { useFetchCollections } from "../../../app/services/CollectionService/hooks";
import { ICollection } from "../../../app/services/CollectionService/Collection.types";

const Nav = ({ isOpen, setIsOpen }: INavProps) => {
    const categories = useFetchCategories({});
    const collections = useFetchCollections({});

    useEffect(() => {
        useHandleScroll(isOpen);
    }, [isOpen]);

    const { user, token, logout } = useAuthContext();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.nav
                    key="nav"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "100vh", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed top-0 left-0 z-30 h-screen w-full overflow-auto overflow-y-hidden bg-white pt-5"
                >
                    <div className="flex h-full flex-col justify-between ">
                        <div>
                            <div className="flex w-full flex-row items-center justify-between px-3">
                                <Image
                                    src={MenuIcon}
                                    alt="menu"
                                    width={22}
                                    height={22}
                                    onClick={() => setIsOpen(!isOpen)}
                                />
                                <div>
                                    <Link href="/">
                                        <Image src={Logo} alt="serginnetti" width={160} height={32} />
                                    </Link>
                                </div>
                                <div className="cursor-pointer">
                                    <Link href="/basket">
                                        <Image src={BasketIcon} alt="basket" width={22} height={22} />
                                    </Link>
                                </div>
                            </div>
                            <ul className="w-full px-3">
                                <Route className="py-0">
                                    <Accordion title="Каталог">
                                        <ul>
                                            {categories.data.map((item: ICategory) => (
                                                <Route href={`${CATALOG_ROUTE}/${item.slug}`} key={item._id} subRoute>
                                                    {item.name}
                                                </Route>
                                            ))}
                                        </ul>
                                    </Accordion>
                                </Route>
                                <Route className="py-0">
                                    <Accordion title="Колекції">
                                        <ul>
                                            {collections.data.map((item: ICollection, index: number) => (
                                                <Route href={`${COLLECTION_ROUTE}/${item._id}`} key={index} subRoute>
                                                    {item.name}
                                                </Route>
                                            ))}
                                        </ul>
                                    </Accordion>
                                </Route>
                                <Route href={LOOK_ROUTE}>Образи</Route>
                                {user && user?.role === "ADMIN" && <Route href="/admin">Панель адміністратора</Route>}
                            </ul>
                        </div>
                        <div className="mb:10 mt-4 flex w-full flex-row items-center justify-between px-3 py-4 lg:m-0 ">
                            {!token || !user ? (
                                <Link href={AUTH_ROUTE}>
                                    <Image src={AuthIcon} alt="auth" width={24} height={24} />
                                </Link>
                            ) : (
                                <Link href={AUTH_ROUTE}>
                                    <Image src={LogoutIcon} alt="logout" width={24} height={24} onClick={logout} />
                                </Link>
                            )}
                            <SearchPanel />
                            {!token || !user ? (
                                <Link href={AUTH_ROUTE}>
                                    <Image src={FavoriteIcon} alt="favorite" width={24} height={24} />
                                </Link>
                            ) : (
                                <Link href={FAVORITE_ROUTE}>
                                    <Image src={FavoriteIcon} alt="favorite" width={24} height={24} />
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Nav;

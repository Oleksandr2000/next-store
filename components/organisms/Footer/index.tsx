import React from "react";
import Image from "next/image";

import TelegramIcon from "../../../public/icons/telegram.svg";
import InstagramIcon from "../../../public/icons/instagram.svg";

import Button from "../../atoms/Button";
import Typography from "../../atoms/Typography";
import Accordion from "../../molecules/Accordion";

const Footer = () => (
    <footer className="my-20 px-5">
        <div className="">
            <Accordion title="Достовка">
                <Typography>
                    <b>Нова пошта</b> - за умовами перевізника, середня тривалість доставки від 1 до 3 днів в залежності
                    від місця отримання
                </Typography>
                <Typography>
                    <b>Укрпошта</b> - за умовами перевізника, середня тривалість доставки від 1 до 3 днів в залежності
                    від місця отримання
                </Typography>
                <Typography>
                    <b>Justin</b> - за умовами перевізника, середня тривалість доставки від 1 до 3 днів в залежності від
                    місця отримання
                </Typography>
            </Accordion>
            <Accordion title="Оплата">
                <Typography>
                    <b>Оплата при отриманні</b> - оплата на пошті після перевірки товару, комісію за накладний платіж за
                    умовами перевізника сплачує отримувач
                </Typography>
                <Typography>
                    <b>Оплата картою</b> - при замовленні більше ніж на 1000грн доставка за рахунок компанію у будь-яку
                    точку країни
                </Typography>
                <Typography>
                    <b>Криптовалютою</b> - отримайте 10% знижки при оплатті криптовалютою. На данний момент ви можете
                    оплатити замовлення у BTC, ETH, XRP, USDT, BUSD
                </Typography>
            </Accordion>
            <Accordion title="Повернення">
                <Typography>
                    <b>Термін та умови</b> - ви можете обміняти та повернути товари згідно законодавству на протязі 30
                    днів, для цього потрібно неушкоджений товар в оригінальній упаковці та чек про покупку
                </Typography>
                <Typography>
                    <b>Повернення коштів</b> - поверненя коштів триває від 3 до 5 робочих діб у випадку опатті картою,
                    повернення за товари купленні за готівку можна отримати одразу
                </Typography>
            </Accordion>
        </div>
        <div className="my-10 text-xl">
            <Typography>
                <b>Телефон:</b>
                <a href="tel:+380637777777"> +38-(063)-777-77-77</a>
            </Typography>
            <br />
            <Typography>
                <b>E-mail:</b>
                <a href="mailto:serginnetti@gmail.com"> Serginnetti@gmail.com</a>
            </Typography>
        </div>
        <div className="my-10 flex flex-row justify-between">
            <Button
                variant="white"
                className="-gray-300 flex h-10 w-full items-center justify-center border shadow-none"
            >
                <Image src={InstagramIcon} alt="instagram" width={24} height={24} />
            </Button>
            <Button
                variant="white"
                className="-gray-300 flex h-10 w-full items-center justify-center border shadow-none"
            >
                <Image src={TelegramIcon} alt="telegram" width={24} height={24} />
            </Button>
        </div>
    </footer>
);

export default Footer;

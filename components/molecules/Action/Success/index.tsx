import Title from "../../../atoms/Title";
import Typography from "../../../atoms/Typography";

const Success = () => (
    <div className="bg-white p-5">
        <Title variant="h2">Дякую за замовлення!</Title>
        <Typography size="text-base" color="gray" center>
            Для уточнення деталей вам зателефонує менеджер.
        </Typography>
    </div>
);

export default Success;

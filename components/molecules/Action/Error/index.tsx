import Title from "../../../atoms/Title";
import Typography from "../../../atoms/Typography";

const Error = () => (
    <div className="bg-white p-5">
        <Title variant="h2" className="text-red-900">
            Виникла помилка!
        </Title>
        <Typography size="text-base" color="gray" center>
            Спробуйте будь ласка пізніше.
        </Typography>
    </div>
);

export default Error;

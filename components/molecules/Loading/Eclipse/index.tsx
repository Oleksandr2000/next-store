import Image from "next/image";

import EclipseLoader from "../../../../public/Loaders/Eclipse.svg";

const Eclipse = () => (
    <div className="container flex h-screen w-screen items-center justify-center">
        <Image src={EclipseLoader} alt="loading" width={200} height={200} />
    </div>
);

export default Eclipse;

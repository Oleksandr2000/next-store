import React from "react";
import ContentLoader from "react-content-loader";

const Sceleton = (props) => (
    <ContentLoader
        speed={2}
        width={320}
        height={100}
        viewBox="0 0 320 100"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="380" rx="10" ry="10" width="287" height="45" />
        <rect x="0" y="450" rx="10" ry="10" width="90" height="30" />
        <rect x="0" y="519" rx="5" ry="5" width="120" height="30" />
        <rect x="110" y="450" rx="10" ry="10" width="90" height="30" />
        <rect x="0" y="0" rx="0" ry="0" width="64" height="100" />
        <rect x="6" y="118" rx="0" ry="0" width="526" height="58" />
        <rect x="7" y="188" rx="0" ry="0" width="513" height="81" />
        <rect x="80" y="7" rx="0" ry="0" width="240" height="30" />
        <rect x="80" y="50" rx="0" ry="0" width="150" height="20" />
        <rect x="80" y="80" rx="0" ry="0" width="100" height="20" />
        <rect x="190" y="80" rx="0" ry="0" width="140" height="20" />
    </ContentLoader>
);

export default Sceleton;

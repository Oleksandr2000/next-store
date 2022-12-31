import React from "react";
import Title from "../../atoms/Title";
import Wrapper from "../../molecules/Wrapper";
import { ICollectionLayoutProps } from "./CollectionLayout.props";

const CollectionLayout = ({ data, isLoading, error, title }: ICollectionLayoutProps) => (
    <div className="container mx-auto">
        <Title variant="h2" className="my-5 text-center">
            {title}
        </Title>
        <Wrapper data={data} isLoading={isLoading} error={error} />
    </div>
);

export default CollectionLayout;

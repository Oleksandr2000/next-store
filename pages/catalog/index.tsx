/* eslint-disable no-return-assign */
import Head from "next/head";
import React from "react";

import { useFetchAllFilters } from "../../app/services/FilterService/hooks";
import MobileCatalogLayout from "../../components/layouts/Catalog/CatalogLayout";

const Catalog = () => {
    const filters = useFetchAllFilters({});

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <>
                <MobileCatalogLayout filters={filters} />
            </>
        </>
    );
};

export default Catalog;

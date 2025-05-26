import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useShallow } from "zustand/react/shallow";
import { useLocation, useParams } from "react-router-dom";

import { PageBanner } from "@components/banner/page";
import { BreadCrumb } from "./bread-crumb";
import { LeftSection } from "./left-section";
import { RightSection } from "./right-section";
import { useEcommerceStore } from "@app/store";
import { FILTER, SORT } from "@app/constant";
import { useFetchProducts } from "@app/service/query";
import { Footer } from "@app/components/footer";

import styles from "./collections.module.css";

import CollectionBannerImg from "@assets/collections/banner.jpg";

const { NameAsc, NameDesc, PriceAsc, PriceDesc } = SORT;
const { PriceRange, InStock } = FILTER;
const pageSize = 10;
const currentPage = 1;

export default function CollectionsPage() {
  const [bannerTitle, setBannerTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { collectionId } = useParams();
  const [sort, setSort] = useState({
    id: NameAsc.id,
  });
  const [filter, setFilter] = useState({
    collectionIdList: [],
    priceRange: null,
    inStock: null,
  });
  const [pagination, setPagination] = useState({
    pageSize,
    currentPage,
    history: { [pageSize * currentPage]: null },
  });
  const ref = useRef({ loading: false });
  const location = useLocation();

  const { storedCollections } = useEcommerceStore(
    useShallow((state) => ({ storedCollections: state.storedCollections }))
  );

  const {
    data: fetchedProducts,
    refetch,
    isFetching: isProductsFetching,
    error: isProductsError,
  } = useFetchProducts({
    sortBy: getSortBy(sort.id).sortBy,
    sortOrder: getSortBy(sort.id).sortOrder,
    lastKey: pagination.history[pagination.pageSize * pagination.currentPage],
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
    search: searchValue,
    collectionIdList: filter.collectionIdList,
    inStock: filter.inStock,
    priceRange:
      filter.priceRange && `${filter.priceRange[0]}#${filter.priceRange[1]}`,
    enabled: false,
  });

  useEffect(() => {
    if (isProductsFetching) {
      setIsLoading(true);
    } else if (isProductsError) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [fetchedProducts, isProductsFetching, isProductsError]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sort.id,
    sort.order,
    pagination.currentPage,
    pagination.pageSize,
    searchValue,
    filter,
  ]);

  useEffect(() => {
    setFilter({
      collectionIdList: collectionId ? [collectionId] : [],
      priceRange: null,
      inStock: null,
    });
    setSort({
      id: NameAsc.id,
    });
    setPagination({
      pageSize,
      currentPage,
      history: { [pageSize * currentPage]: null },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId]);

  useEffect(() => {
    if (fetchedProducts?.data) {
      ref.current.loading = false;
    }
    fetchedProducts?.lastKey &&
      setPagination({
        ...pagination,
        history: {
          ...pagination.history,
          [pagination.pageSize * (pagination.currentPage + 1)]:
            fetchedProducts.lastKey,
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedProducts]);

  useEffect(() => {
    if (location.pathname === "/collections") {
      setBannerTitle("All Collections");
    } else {
      let data = storedCollections.data.find(
        (item) => item.id === collectionId
      );
      setBannerTitle(data?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const sortConfing = useMemo(() => {
    return [NameAsc, NameDesc, PriceAsc, PriceDesc];
  }, []);

  const filterConfig = useMemo(() => {
    let collectionData = storedCollections.data.map((item) => ({
      id: item.id,
      label: item.name,
    }));

    if (collectionId) {
      collectionData = collectionData.find((item) => item.id === collectionId);
      collectionData = [{ ...collectionData, readOnly: true }];
    }

    return {
      collections: collectionData,
      priceRange: PriceRange,
      inStock: InStock,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId]);

  const onSearchChange = (value) => {
    setSearchValue(value);
    setPagination({
      pageSize,
      currentPage,
      history: { [pageSize * currentPage]: null },
    });
  };

  const onSortChange = (id) => {
    setSort({ id });
    setPagination({
      pageSize,
      currentPage,
      history: { [pageSize * currentPage]: null },
    });
  };

  const onPaginationChange = ({ currentPage, pageSize }) => {
    const scrollPosition = window.innerHeight * 0.65;
    window.scrollTo(0, scrollPosition);
    setPagination({ ...pagination, pageSize, currentPage });
  };

  const onFilterChange = ({
    collectionId: collection_id,
    priceRange,
    inStock,
  }) => {
    setPagination({
      pageSize,
      currentPage,
      history: { [pageSize * currentPage]: null },
    });

    if (collection_id && !collectionId) {
      let exist = filter.collectionIdList.includes(collection_id);
      let newList = exist
        ? filter.collectionIdList.filter((id) => id !== collection_id)
        : [...filter.collectionIdList, collection_id];

      setFilter({
        ...filter,
        collectionIdList: newList,
      });
    } else if (priceRange) {
      setFilter({ ...filter, priceRange });
    } else if (inStock) {
      let exist = filter.inStock === inStock;
      setFilter({ ...filter, inStock: exist ? null : inStock });
    }
  };

  return (
    <>
      <Helmet>
        <title>Explore Cotton, and Georgette Saree Collections | Dhanika</title>
        <meta
          name="description"
          content="Browse our latest collections of cotton, and georgette sarees. Discover hand block printed and digital print sarees for both traditional and modern wear."
        />
        <meta
          name="keywords"
          content="Saree collections, sarees, Cotton sarees, Latest saree collections for women,and cotton saree collections online, Hand block printed and digital print sarees, Explore new collections of cotton, and georgette sarees, Buy the latest hand block printed Kalamkari sarees online, Budget-friendly saree collections for traditional and modern wear"
        />
      </Helmet>

      {/* ---------- page banner ---------- */}
      <PageBanner
        imageSrc={CollectionBannerImg}
        alt={bannerTitle}
        content={bannerTitle}
      />

      {/* ---------- collections ---------- */}
      <div className={`wrapper wrapper-margin-bottom`}>
        <div className={`container ${styles.collectionsContainer}`}>
          <BreadCrumb
            data={[
              { label: "Home", path: "/" },
              { label: "Collections", path: location.pathname },
            ]}
            activePath={location.pathname}
            className={`${styles.breadContainer}`}
          />
          <div className={`${styles.productWrapper}`}>
            <>
              <LeftSection
                filter={filter}
                filterConfig={filterConfig}
                onFilterChange={onFilterChange}
              />
              <RightSection
                productData={fetchedProducts?.data}
                sort={sort}
                searchValue={searchValue}
                count={fetchedProducts?.count}
                currentPage={pagination?.currentPage}
                pageSize={pagination?.pageSize}
                isLoading={isLoading}
                sortConfig={sortConfing}
                loadingRef={ref}
                onPaginationChange={onPaginationChange}
                onSearchChange={onSearchChange}
                onSortChange={onSortChange}
              />
            </>
          </div>
        </div>
      </div>

      {/* ---------- footer ---------- */}
      <Footer />
    </>
  );
}

const getSortBy = (id) => {
  switch (id) {
    case NameAsc.id:
      return { sortBy: "name", sortOrder: "asc" };
    case NameDesc.id:
      return { sortBy: "name", sortOrder: "desc" };
    case PriceAsc.id:
      return { sortBy: "price", sortOrder: "asc" };
    case PriceDesc.id:
      return { sortBy: "price", sortOrder: "desc" };
    default:
      return { sortBy: "name", sortOrder: "asc" };
  }
};

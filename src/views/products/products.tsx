
"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation in app router
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";

export const Products: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  useEffect(() => {
    setIsMounted(true);

    // Listen to popstate events for back/forward navigation
    const handlePopState = () => {
      const modalId = new URLSearchParams(window.location.search).get("modal");
      if (modalId) {
        const product = PRODUCTS_DATA.find((p) => p.id === modalId);
        if (product) {
          setSelectedProduct(product);
        } else {
          setSelectedProduct(null);
        }
      } else {
        setSelectedProduct(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Open modal with URL update
  const handleOpenModal = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      const newUrl = `/products?modal=${product.id}`;
      // router.push(newUrl, { shallow: true });
      router.push(newUrl);
     },
    [router]
  );

  // Close modal and remove URL parameter
  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    const newUrl = `/products`;
     router.push(newUrl);
    //  router.push(newUrl, { shallow: true });
  }, [router]);

  // Check URL query on initial load to open modal if needed
  useEffect(() => {
    if (isMounted) {
      const modalId = new URLSearchParams(window.location.search).get("modal");
      if (modalId) {
        const product = PRODUCTS_DATA.find((p) => p.id === modalId);
        if (product) setSelectedProduct(product);
      }
    }
  }, [isMounted]);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};






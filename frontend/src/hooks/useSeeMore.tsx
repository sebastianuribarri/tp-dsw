import { useState, useEffect } from "react";

const useSeeMore = (
  totalItems: number,
  minItemWidth: number,
  rowsPerPage: number,
  gap: number = 10
) => {
  const [visibleItems, setVisibleItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const availableWidth = window.innerWidth - gap;
      const itemsPerRow = Math.floor(availableWidth / (minItemWidth + gap));
      let itemsToShow = itemsPerRow * rowsPerPage;
      if (itemsToShow < 1) itemsToShow = 3;
      setItemsPerPage(itemsToShow);
      setVisibleItems(itemsToShow); // Initialize visible items
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [gap, minItemWidth]);

  const handleSeeMore = () => {
    setVisibleItems((prevVisibleItems) =>
      Math.min(prevVisibleItems + itemsPerPage, totalItems)
    );
  };

  return { visibleItems, handleSeeMore };
};

export default useSeeMore;

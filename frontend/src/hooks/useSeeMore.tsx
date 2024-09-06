import { useState, useEffect } from "react";

const useSeeMore = (
  totalItems: number,
  itemsPerRowMobile: number,
  itemsPerRowDesktop: number,
  rowsPerClick: number
) => {
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    const updateVisibleItems = () => {
      const itemsPerRow =
        window.innerWidth >= 768 ? itemsPerRowDesktop : itemsPerRowMobile;
      const itemsToShow = itemsPerRow * rowsPerClick;
      setVisibleItems(itemsToShow);
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, [itemsPerRowMobile, itemsPerRowDesktop, rowsPerClick]);

  const handleSeeMore = () => {
    const itemsPerRow =
      window.innerWidth >= 768 ? itemsPerRowDesktop : itemsPerRowMobile;
    setVisibleItems((prevVisibleItems) =>
      Math.min(prevVisibleItems + itemsPerRow * rowsPerClick, totalItems)
    );
  };

  return { visibleItems, handleSeeMore };
};

export default useSeeMore;

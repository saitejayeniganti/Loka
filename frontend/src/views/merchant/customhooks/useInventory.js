import { useState, useEffect } from "react";
import { get } from "../../../utils/serverCall";

export const useInventory = (merchantId) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProductsByMerchantId();
  }, []);

  const fetchAllProductsByMerchantId = () => {
    setLoading(true);
    get(`/product/merchant/` + merchantId).then((data) => {
      setInventory(data.product);
      setLoading(false);
    });
  };

  return { inventory, fetchAllProductsByMerchantId, loading };
};

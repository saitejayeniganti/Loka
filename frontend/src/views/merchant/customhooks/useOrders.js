import { useState, useEffect } from "react";
import { get } from "../../../utils/serverCall";

export const useOrders = (merchantId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllOrdersByMerchantId();
  }, []);

  const fetchAllOrdersByMerchantId = () => {
    setLoading(true);
    get(`/order/merchant/myOrder/` + merchantId).then((data) => {
      setOrders(data.orders);
      setLoading(false);
    });
  };

  return { orders, fetchAllOrdersByMerchantId, loading };
};

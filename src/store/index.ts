import { Order, OrderFilters } from '@/model';
import { getOrderById, getOrders } from '@/service/order.service';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOrderStore = defineStore('orderStore', () => {
  const allOrders = ref<Order[]>([]);
  const filteredOrders = ref<Order[]>([]); 
  const orders = ref<Order[]>([]);
  const orderDetail = ref<null | Order>(null);
  const totalOrders = ref(0);
  const loading = ref(false);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const filters = ref<OrderFilters>({
    startDate: '2024-05-01',
    endDate: '2024-06-30',
    statuses: [],
  });

  const fetchOrders = async () => {
    try {
      loading.value = true;
      const { data } = await getOrders();
      allOrders.value = data.orders;
      totalOrders.value = data.orders.length;
      
      applyFilters();
    } finally {
      loading.value = false;
    }
  };
  const applyFilters = () => {
    filteredOrders.value = allOrders.value.filter((order) => {
      const { orderId, startDate, endDate, statuses } = filters.value;

      if (orderId && !order.uid1c.includes(orderId)) return false;
      
      if (startDate && new Date(order.created) < new Date(startDate)) return false;
      if (endDate && new Date(order.created) > new Date(endDate)) return false;

      if (statuses && statuses.length && !statuses.includes(Number(order.status.id))) return false;
      
      return true;
    });
    currentPage.value = 1;
    totalOrders.value = filteredOrders.value.length;

    updateOrders();
  };

  const fetchOrderDetail = async (id: number) => {
    const { data } = await getOrderById(id);
    orderDetail.value = data.order;
  };
  const clearOrderDetail = () => {
    orderDetail.value = null;
  };

  const changePage = (page: number) => {
    if (page > 0 && page <= Math.ceil(totalOrders.value / itemsPerPage.value)) {
      currentPage.value = page;
      updateOrders();
    }
  };
  const updateOrders = () => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    orders.value = filteredOrders.value.slice(start, start + itemsPerPage.value);
  };


  return {
    orders,
    totalOrders,
    loading,
    orderDetail,
    fetchOrders,
    fetchOrderDetail,
    changePage,
    currentPage,
    itemsPerPage,
    allOrders,
    clearOrderDetail,
    applyFilters,
    filters,
    filteredOrders,
  };
});

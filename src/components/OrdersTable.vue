
<template>
  <div>
    <h6 class="text-start text-black mb-3">Найдено заказов: <span :style="{color: totalOrders === 0 ? 'red': '#42b983' }">{{ totalOrders }}</span></h6>
    <div class="table-responsive">
    <table class="table table-light table-hover ">
      <thead>
        <tr>
          <th >Номер заказа</th>
          <th>Дата создания</th>
          <th>Статус</th>
          <th>Тип отгрузки</th>
          <th>Дата отгрузки</th>
          <th>Способ оплаты</th>
          <th>Место отгрузки</th>
          <th>ФИО клиента</th>
          <th>Сумма заказа</th>
          <th>Кол-во товаров</th>
          <th>Оператор</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading && !orders.length">
          <td colspan="11" class="text-center">
            <div  class="d-flex justify-content-center mb-3">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Загрузка...</span>
            </div>
            </div>
          </td>
        </tr>
        <tr v-if="!orders.length">
          <td colspan="11" class="text-center">
            <span>Нет заказа</span>
          </td>
        </tr>
        <tr v-for="order in orders" :key="order.id" @click="openOrderDetail(order.id)" class="cursor-pointer">
          <td>{{ order.uid1c }}</td>
          <td>{{ order.created }}</td>
          <td :style="{ color: getStatusColor(order.status.id) }">{{ order.status.title }}</td>
          <td>{{ order.shipment.method.title }}</td>
          <td>{{ order.shipment.date }}</td>
          <td>{{ order.payment.method.title }}</td>
          <td>{{ order.shop.title }}</td>
          <td>{{ order.client.firstname }} {{ order.client.lastname }}</td>
          <td>{{ order.amount }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.operator }}</td>
        </tr>
      
      </tbody>
    </table>
    </div>
      <nav aria-label="Page navigation example">
      <ul class="pagination m-0">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">&laquo;</button>
        </li>
        <li class="page-item p-2 d-flex justify-content-center align-items-center">
          <span class="text-body-secondary"> Страница {{ currentPage }} из {{ totalPages }} </span>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">&raquo;</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useOrderStore } from '../store';

const orderStore = useOrderStore();
const loading = orderStore.loading;
const orders = computed(() => orderStore.orders);
const totalOrders = computed(() => orderStore.totalOrders);
const currentPage = computed(() => orderStore.currentPage);
const itemsPerPage = orderStore.itemsPerPage;

const totalPages = computed(() => Math.ceil(totalOrders.value / itemsPerPage));
onMounted(() => {
  orderStore.fetchOrders();
})
const getStatusColor = (statusId: number) => {
  switch (statusId) {
    case 4: return 'darkgreen';
    case 6: return '#42b983';
    case 5: return 'red';
    default: return 'black';
  }
};

watch(orderStore.filters, () => {
  orderStore.applyFilters();
}, { deep: true });

const changePage = (page: number) => {
  orderStore.changePage(page);
};
const openOrderDetail = async (id: number) => {
  try {
    await orderStore.fetchOrderDetail(id);
  } catch (error) {
    console.error('Ошибка при загрузке данных заказа:', error);
  }
};

</script>

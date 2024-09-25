<template>
  <div v-if="orderDetail" class="modal fade show" style="display: block;" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Детали заказа</h4>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body text-start">
          <h5 class="text-black">Данные по заказу</h5>
          <p>ID: {{ orderDetail.id }}</p>
          <p>Номер: {{ orderDetail.uid1c }}</p>
          <p>Дата создания: {{ orderDetail.created }}</p>
          <p>Статус: {{ orderDetail.status.title }}</p>

          <h5 class="text-black">Данные по клиенту</h5>
          <p>ФИО: {{ orderDetail.client.firstname }} {{ orderDetail.client.lastname }}</p>
          <p>Телефон: {{ orderDetail.client.phone }}</p>

          <h5 class="text-black">Данные по магазину</h5>
          <p>Место отгрузки: {{ orderDetail.shop.title }}</p>

          <h5 class="text-black">Данные по способу оплаты</h5>
          <p>Способ оплаты: {{ orderDetail.payment.method.title }}</p>
          <h5 class="text-black">Состав заказа</h5>
          <ul>
            <li v-for="item in orderDetail.items" :key="item.id">
              {{ item.title }} - {{ item.quantity }} шт. - {{ item.price }} руб. - {{ item.status }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useOrderStore } from '../store';

const orderStore = useOrderStore();

const orderDetail = computed(() => orderStore.orderDetail);

const closeModal = () => {
  orderStore.clearOrderDetail();
};

</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>

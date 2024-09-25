<template>
  <div class="mb-4">
    <div class="row">
      <div class="col-lg-3">
        <div class="row mb-3">
      <div class="col">
        <input v-model="filters.orderId" type="text" class="form-control w-215" placeholder="Номер заказа" />
      </div>
    </div>
      </div>
      <div  class="col-lg-9">
        <div class="row mb-3 ">
          <div class="col-6 col-lg-3">
            <input v-model="filters.startDate" type="date" class="form-control w-215" />
          </div>
          <div class="col-6 col-lg-3">
            <input v-model="filters.endDate" type="date" class="form-control w-215" />
          </div>
          <div class="col-12 mt-3 mt-lg-0 col-lg-6 d-flex justify-content-end ">
            <CustomMultiSelect v-model="filters.statuses" :options="statusOptions" />
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import CustomMultiSelect from '@/components/CustomMultiSelect.vue';
import { computed } from 'vue';
import { useOrderStore } from '../store';

const orderStore = useOrderStore();
const filters = computed(() => orderStore.filters);

const statusOptions = [
  { value: 4, label: 'Заказ выполнен' },
  { value: 6, label: 'Заказ зарезервирован' },
  { value: 5, label: 'Заказ отменен' }
];
</script>

<style scoped>
.w-215 {
  max-width: 215px;
}
@media screen and (max-width:991px){
  .w-215 {
    max-width: 100%;
  }
}
</style>


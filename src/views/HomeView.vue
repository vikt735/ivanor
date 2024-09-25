<template>
  <div class="container ">
    <div class="border rounded p-3 mb-3">
      <OrderFilter />
      <OrdersTable />
      <OrderDetailsModal />
    </div>
  </div>
</template>

<script lang="ts" setup>
import OrderDetailsModal from '@/components/OrderDetailsModal.vue';
import OrderFilter from '@/components/OrderFilter.vue';
import OrdersTable from '@/components/OrdersTable.vue';
</script>

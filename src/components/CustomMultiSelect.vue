<template>
  <div class="custom-multi-select">
    <div class="dropdown">
      <button class="dropdown-toggle button rounded border" type="button" @click="toggleDropdown">
        <span v-if="!selectedItems.length">Фильтр по статусу</span>
        <div v-else class="selected-items">
      <span v-for="(item, index) in selectedItems" :key="index" class="selected-item rounded">
        {{ getOptionLabel(item) }}
      </span>
    </div>
      </button>
      <div v-if="isOpen" class="menu-dropdown border">
        <div v-for="option in options" :key="option.value" class="dropdown-item">
          <label>
            <input type="checkbox" :value="option.value" v-model="selectedItems" />
            {{ option.label }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue';

interface Option {
  value: number;
  label: string;
}

const props = defineProps<{
  modelValue: number[];
  options: Option[];
}>();

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedItems = ref<number[]>(props.modelValue);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const getOptionLabel = (value: number) => {
  const option = props.options.find(option => option.value === value);
  return option ? option.label : '';
};

watch(selectedItems, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<style scoped>
.custom-multi-select {
  position: relative;
  max-width: 100%;
  
}
@media screen and (max-width:991px){
  .custom-multi-select {
    width: 100%;
  }
}
.selected-items {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.selected-item {
  background-color: #e0e0e0;
  padding: 3px 5px;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.selected-item button {
  background: none;
  border: none;
  margin-left: 5px;
}

.dropdown-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  color: black;
  border: none;
  padding: 7px 10px;
  min-width: 215px;
}
@media screen and (max-width:991px){
  .dropdown-toggle {
    min-width: 100%;
  }
}
.menu-dropdown {
  position: absolute;
  background-color: white;
  width: 100%;
  z-index: 555;
}

.dropdown-item label {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  cursor: pointer;
}
label:hover {
  background-color:#e0e0e0;
}
.dropdown-item input {
  margin-right: 10px;
}
</style>

import axios from 'axios';

const API_URL = 'https://msk.ivanor.ru/front/service/test-api/v1';
const TOKEN = 'd41debf13a511105913db5c9d595d8c3';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    token: TOKEN
  }
});

export const getOrders = () => {
  return apiClient.get('/orders');
};

export const getOrderById = (id: number) => {
  return apiClient.get(`/order/${id}`);
};

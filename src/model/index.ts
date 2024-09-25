export interface Order {
  id: number;
  created: string;
  status: { id: number; title: string };
  shipment: { date: string; method: { title: string } };
  payment: { method: { title: string } };
  shop: { title: string };
  client: { firstname: string; lastname: string; phone: string };
  operator: string;
  amount: number; 
  quantity: number;
  uid1c: string;
  items: { id: number; title: string; price: number; quantity: number, status: string }[];
}

export interface OrderFilters {
  startDate?: string;
  endDate?: string;
  statuses?: number[] | undefined;
  orderId?: string;
}

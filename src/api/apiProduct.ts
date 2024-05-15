import apiClient from './apiClient';

import { DealDetailsInterface } from '../interfaces/dealDetail';
import { DealInterface } from '../interfaces/dealInterface';

// Obtener la lista de ofertas
export const fetchDeals = async (): Promise<DealInterface[]> => {
  const response = await apiClient.get('/deals');
  return response.data;
};

// Obtener detalles de una oferta específica por ID
export const fetchDealById = async (id: string): Promise<DealDetailsInterface> => {
  const response = await apiClient.get(`/deals?id=${id}`);
  return response.data;
};

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Products from '../app/products/page';

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: string;
}
export interface SalesSummary {
  SalesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}
export interface PurchaseSummary {
  PurchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}
export interface ExpenseSummary {
  expenseSummaryId: string;
  totalPurchased: number;
  date: string;
}
export interface ExpenseByCategorySummary {
  expenseSummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const api = createApi({ 
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
  }),
});

export const { useGetDashboardMetricsQuery } = api;
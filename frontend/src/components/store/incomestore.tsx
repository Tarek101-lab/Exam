import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_BASE = "http://localhost:3000";

export interface IncomeItem {
  _id: string;
  name: string;
  amount: number;
}

interface IncomeState {
  income: IncomeItem[];
  name: string;
  amount: number;
  selectedId: string;
  search: string;
  isEditing: boolean;
  isModalOpen: boolean;

  setSearch: (value: string) => void;
  setName: (value: string) => void;
  setAmount: (value: number) => void;
  setIsModalOpen: (open: boolean) => void;

  createIncome: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;

  fetchIncome: () => Promise<void>;

  getIncome: () => Promise<void>;

  updateIncome: (
    e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;

  loadIncome: (i: IncomeItem) => void;

  cancelEdit: () => void;

  deleteIncome: (id: string) => Promise<void>;
}

export const useIncomeStore = create<IncomeState>()(
  persist(
    (set, get) => ({
      income: [],
      name: "",
      amount: 0,
      selectedId: "",
      search: "",
      isEditing: false,
      isModalOpen: false,

      setName: (value) => set({ name: value }),

      setAmount: (value) => set({ amount: value }),

      setSearch: (value) => set({ search: value }),

      setIsModalOpen: (open) => set({ isModalOpen: open }),

      createIncome: async (e) => {
        e.preventDefault();

        const { name, amount } = get();

        await axios.post(`${API_BASE}/incomes`, {
          name,
          amount,
        });

        await get().fetchIncome();

        set({
          name: "",
          amount: 0,
          isModalOpen: false,
        });
      },

      fetchIncome: async () => {
        const res = await axios.get(`${API_BASE}/incomes`);

        set({
          income: res.data.incomes,
        });
      },

      getIncome: async () => {
        const { search } = get();

        if (!search) {
          await get().fetchIncome();
          return;
        }

        const res = await axios.get(`${API_BASE}/incomes`);

        const filtered = res.data.incomes.filter((i: IncomeItem) =>
          i.name.toLowerCase().includes(search.toLowerCase()),
        );

        set({
          income: filtered,
        });
      },

      updateIncome: async (e) => {
        e.preventDefault();

        const { name, amount, selectedId } = get();

        if (!selectedId) return;

        await axios.put(`${API_BASE}/incomes/${selectedId}`, {
          name,
          amount,
        });

        await get().fetchIncome();

        set({
          name: "",
          amount: 0,
          isEditing: false,
          selectedId: "",
          isModalOpen: false,
        });
      },

      loadIncome: (i) => {
        set({
          selectedId: i._id,
          name: i.name,
          amount: i.amount,
          isEditing: true,
          isModalOpen: true,
        });
      },

      cancelEdit: () => {
        set({
          name: "",
          amount: 0,
          isEditing: false,
          selectedId: "",
          isModalOpen: false,
        });
      },

      deleteIncome: async (id) => {
        if (!id) return;

        await axios.delete(`${API_BASE}/incomes/${id}`);

        await get().fetchIncome();
      },
    }),
    {
      name: "income-storage",
    },
  ),
);

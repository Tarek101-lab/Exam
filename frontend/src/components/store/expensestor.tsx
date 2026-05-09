import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_BASE = "http://localhost:3000";

export interface ExpenseItem {
  _id: string;
  name: string;
  amount: number;
}

interface ExpenseState {
  expense: ExpenseItem[];
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

  createExpense: (
    e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;

  fetchExpense: () => Promise<void>;

  getExpense: () => Promise<void>;

  updateExpense: (
    e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;

  loadExpense: (i: ExpenseItem) => void;

  cancelEdit: () => void;

  deleteExpense: (id: string) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      expense: [],
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

      createExpense: async (e) => {
        e.preventDefault();

        const { name, amount } = get();

        await axios.post(`${API_BASE}/expenses`, {
          name,
          amount,
        });

        await get().fetchExpense();

        set({
          name: "",
          amount: 0,
          isModalOpen: false,
        });
      },

      fetchExpense: async () => {
        const res = await axios.get(`${API_BASE}/expenses`);

        set({
          expense: res.data.expenses,
        });
      },

      getExpense: async () => {
        const { search } = get();

        if (!search) {
          await get().fetchExpense();
          return;
        }

        const res = await axios.get(`${API_BASE}/expenses`);

        const filtered = res.data.expenses.filter((i: ExpenseItem) =>
          i.name.toLowerCase().includes(search.toLowerCase()),
        );

        set({
          expense: filtered,
        });
      },

      updateExpense: async (e) => {
        e.preventDefault();

        const { name, amount, selectedId } = get();

        if (!selectedId) return;

        await axios.put(`${API_BASE}/expenses/${selectedId}`, {
          name,
          amount,
        });

        await get().fetchExpense();

        set({
          name: "",
          amount: 0,
          isEditing: false,
          selectedId: "",
          isModalOpen: false,
        });
      },

      loadExpense: (i) => {
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

      deleteExpense: async (id) => {
        if (!id) return;

        await axios.delete(`${API_BASE}/expenses/${id}`);

        await get().fetchExpense();
      },
    }),
    {
      name: "expense-storage",
    },
  ),
);
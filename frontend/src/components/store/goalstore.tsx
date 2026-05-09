import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_BASE = "http://localhost:3000";

export interface GoalItem {
  _id: string;
  name: string;
  amount: number;
}

interface GoalState {
  goal: GoalItem[];
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

  createGoal: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;

  fetchGoal: () => Promise<void>;

  getGoal: () => Promise<void>;

  updateGoal: (
    e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;

  loadGoal: (i: GoalItem) => void;

  cancelEdit: () => void;

  deleteGoal: (id: string) => Promise<void>;
}

export const useGoalStore = create<GoalState>()(
  persist(
    (set, get) => ({
      goal: [],
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

      createGoal: async (e) => {
        e.preventDefault();

        const { name, amount } = get();

        await axios.post(`${API_BASE}/goals`, {
          name,
          amount,
        });

        await get().fetchGoal();

        set({
          name: "",
          amount: 0,
          isModalOpen: false,
        });
      },

      fetchGoal: async () => {
        const res = await axios.get(`${API_BASE}/goals`);

        set({
          goal: res.data.goals,
        });
      },

      getGoal: async () => {
        const { search } = get();

        if (!search) {
          await get().fetchGoal();
          return;
        }

        const res = await axios.get(`${API_BASE}/goals`);

        const filtered = res.data.goals.filter((i: GoalItem) =>
          i.name.toLowerCase().includes(search.toLowerCase()),
        );

        set({
          goal: filtered,
        });
      },

      updateGoal: async (e) => {
        e.preventDefault();

        const { name, amount, selectedId } = get();

        if (!selectedId) return;

        await axios.put(`${API_BASE}/goals/${selectedId}`, {
          name,
          amount,
        });

        await get().fetchGoal();

        set({
          name: "",
          amount: 0,
          isEditing: false,
          selectedId: "",
          isModalOpen: false,
        });
      },

      loadGoal: (i) => {
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

      deleteGoal: async (id) => {
        if (!id) return;

        await axios.delete(`${API_BASE}/goals/${id}`);

        await get().fetchGoal();
      },
    }),
    {
      name: "goals-storage",
    },
  ),
);
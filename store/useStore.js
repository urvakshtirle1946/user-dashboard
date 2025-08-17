import { create } from "zustand"
import { persist } from "zustand/middleware"

// Global store for User, Tasks, and Theme
const useStore = create(
  persist(
    (set, get) => ({
      /* -----------------------------
       * User State & Actions
       * ---------------------------*/
      user: null,
      isAuthenticated: false,

      login: (userData) =>
        set({
          user: userData,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          tasks: [],
        }),

      updateProfile: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),

      /* -----------------------------
       * Tasks State & Actions
       * ---------------------------*/
      tasks: [],

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { ...task, id: Date.now(), completed: false },
          ],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      toggleTaskComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, completed: !task.completed }
              : task
          ),
        })),

      /* -----------------------------
       * Theme State & Actions
       * ---------------------------*/
      isDarkMode: false,

              toggleDarkMode: () =>
          set((state) => ({
            isDarkMode: !state.isDarkMode,
          })),
    }),
    {
      name: "user-dashboard-storage", // storage key in localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        tasks: state.tasks,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
)

export default useStore

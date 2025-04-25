import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of a Task
export interface Task {
  id: string;
  title: string;
  body: string;
  completed?: boolean;
}

// Define the shape of the store
interface TaskStore {
  tasks: Task[];
  loadTasks: () => Promise<void>;
  addTask: (title: string, body: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
}

// Zustand store with types
export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  loadTasks: async () => {
    try {
      const saved = await AsyncStorage.getItem('tasks');
      if (saved) {
        const parsed: Task[] = JSON.parse(saved);
        set({ tasks: parsed });
      }
    } catch (e) {
      console.log('Failed to load tasks:', e);
    }
  },

  deleteTask: async (id: string) => {
    try {
      const updated = get().tasks.filter(task => task.id !== id);
      set({ tasks: updated });
      await AsyncStorage.setItem('tasks', JSON.stringify(updated));
    } catch (e) {
      console.log('Failed to delete task:', e);
    }
  },

  addTask: async (title: string, body: string) => {
    try {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        body,
        completed: false,
      };
      const updatedTasks = [...get().tasks, newTask];
      set({ tasks: updatedTasks });
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (e) {
      console.log('Failed to add task:', e);
    }
  },

  toggleTaskCompletion: async (id: string) => {
    try {
      const updated = get().tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      set({ tasks: updated });
      await AsyncStorage.setItem('tasks', JSON.stringify(updated));
    } catch (e) {
      console.log('Failed to toggle task completion:', e);
    }
  },
}));

import { create } from 'zustand';// to manage app state (tasks list)
import AsyncStorage from '@react-native-async-storage/async-storage';//save and load tasks from device storage

export const useTaskStore = create((set, get) => ({
  tasks: [],
  //Loads saved tasks when app starts
  loadTasks: async () => {
    try {
      const saved = await AsyncStorage.getItem('tasks');
      if (saved) {
        set({ tasks: JSON.parse(saved) });
      }
    } catch (e) {
      console.log('Failed to load tasks:', e);
    }
  },
  // Delete a task by id
  deleteTask: async (id) => {
    try {
      const updated = get().tasks.filter(task => task.id !== id);
      set({ tasks: updated });
      await AsyncStorage.setItem('tasks', JSON.stringify(updated));
    } catch (e) {
      console.log('Failed to delete task:', e);
    }
  },
  // Adds a new task and saves it.
  addTask: async (title, body) => {
    try {
      const newTask = {
        id: Date.now().toString(),
        title,
        body,
      };
      const updatedTasks = [...get().tasks, newTask];
      set({ tasks: updatedTasks });
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (e) {
      console.log('Failed to add task:', e);
    }
  },
  toggleTaskCompletion: async (id) => {
    const updated = get().tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    set({ tasks: updated });
    await AsyncStorage.setItem('tasks', JSON.stringify(updated));
  },
}));

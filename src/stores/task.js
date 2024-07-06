import { defineStore } from "pinia";
import supabase from "@/lib/supabase";
import { ref } from "vue";
import { useToast } from 'vue-toast-notification';

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);
  const toast = useToast();

  //Reinicialice las tareas antes de buscar otras nuevas
  const fetchTasks = async () => {
    tasks.value = []; 
    const userResponse = await supabase.auth.getUser();
    const user = userResponse.data.user;

    if (user) {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        tasks.value = data || [];
        console.log("Tasks fetched:", tasks.value);
      }
    } else {
      console.log("User is not authenticated");
    }
  };

  // Creación de nueva tarea.
  const newTask = async (title) => {
    const userResponse = await supabase.auth.getUser();
    const user = userResponse.data.user;

    if (user) {
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ title, user_id: user.id, is_complete: false }])
        .select();

      if (error) {
        console.error("Error adding task:", error);
        toast.error("Error adding task");
      } else {
        tasks.value.push(data[0]);
        console.log("Task added:", data[0]);
        toast.success("Task added successfully!");
      }
    } else {
      console.log("User is not authenticated");
    }
  };

  // Eliminar tarea
  const deleteTask = async (taskId) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId);

    if (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task");
    } else {
      tasks.value = tasks.value.filter((task) => task.id !== taskId);
      console.log("Task deleted:", taskId);
      toast.success("Task deleted successfully!");
    }
  };

  // Marcar tarea completada
  const toggleComplete = async (taskId, currentState) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ is_complete: !currentState })
      .eq("id", taskId)
      .select();

    if (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task");
    } else if (data.length > 0) {
      const task = tasks.value.find((task) => task.id === taskId);
      if (task) {
        task.is_complete = !currentState;
      }
      console.log("Task updated:", data[0]);
      toast.success("Task updated successfully!");
    } else {
      console.log("Task update returned empty data.");
    }
  };

  const updateTask = async (taskId, newTitle) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ title: newTitle })
      .eq("id", taskId)
      .select();

    if (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task");
    } else if (data.length > 0) {
      const task = tasks.value.find(task => task.id === taskId);
      if (task) {
        task.title = newTitle;
      }
      console.log("Task updated:", data[0]);
      toast.success("Task updated successfully!");
    } else {
      console.log("Task update returned empty data.");
    }
  };

  // Borrar tareas completadas
  const deleteCompletedTasks = async () => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("is_complete", true);

    if (error) {
      console.error("Error deleting completed tasks:", error);
      toast.error("Error deleting completed tasks");
    } else {
      tasks.value = tasks.value.filter(task => !task.is_complete);
      console.log("Completed tasks deleted");
      toast.success("All completed tasks deleted");
    }
  };

  return { tasks, fetchTasks, newTask, deleteTask, toggleComplete, updateTask, deleteCompletedTasks };
});
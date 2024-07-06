<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import { useToast } from 'vue-toast-notification';

const taskStore = useTaskStore();
const newTaskTitle = ref("");
const toast = useToast();

const addNewTask = async () => {
  if (newTaskTitle.value.trim()) {
    try {
      await taskStore.newTask(newTaskTitle.value.trim());
      newTaskTitle.value = ""; // Limpiar el input después de añadir la tarea
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task");
    }
  } else {
    toast.error("Task title cannot be empty");
  }
};
</script>

<template>
  <div class="container-task">
    <input class="add-task" v-model="newTaskTitle" placeholder="Add a new task" />
    <button class="button-task" @click="addNewTask">Add Task</button>
  </div>
</template>


<style scoped>
.add-task {
  width: 500px;
  height: 40px;
  border: 1px solid #6B708D;
  border-radius: 5px;
  margin-right: 40px;
}

.container-task{
  margin-bottom: 100px;
}


.add-task:focus {
  outline: none;
}

.button-task {
  height: 40px;
  width: 100px;
  color: #F2F4FC;
  background-color: rgb(58, 111, 209);
  border: none;
  border-radius: 5px;
}

.button-task:hover {
  cursor: pointer;
}

/* media queries */
@media (max-width:900px) {

  .add-task {
    width: 400px;
    margin-bottom: 30px;
  }

  .button-task {
    width: 80px;
  }

  @media (max-width: 600px){
  
    .add-task {
    width: 200px;
    height: 20px;
    font-size: 0.7em;
    margin-right:10px;
  }

  .button-task {
    width: 60px;
    height: 20px;
    font-size: 0.7em;

  }
  }
}
</style>
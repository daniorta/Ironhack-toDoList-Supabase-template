<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '../stores/task';
import NewTask from './NewTask.vue';

const taskStore = useTaskStore();
const filter = ref('all');
const sortBy = ref('date_desc');
const taskBeingEdited = ref(null);
const editedTaskTitle = ref("");

// Computed para tareas filtradas
const filteredTasks = computed(() => {
  if (filter.value === 'completed') {
    return taskStore.tasks.filter(task => task.is_complete);
  } else if (filter.value === 'not_completed') {
    return taskStore.tasks.filter(task => !task.is_complete);
  } else {
    return taskStore.tasks;
  }
});

// Computed para tareas ordenadas
const sortedTasks = computed(() => {
  return filteredTasks.value.sort((a, b) => {
    if (sortBy.value === 'date_desc') {
      return new Date(b.inserted_at) - new Date(a.inserted_at);
    } else if (sortBy.value === 'date_asc') {
      return new Date(a.inserted_at) - new Date(b.inserted_at);
    } else if (sortBy.value === 'state') {
      return a.is_complete - b.is_complete;
    }
    return 0;
  });
});

// onounted espera a que el codigo este cargado y listo
onMounted(() => {
  taskStore.fetchTasks();
});

const toggleComplete = async (task) => {
  await taskStore.toggleComplete(task.id, task.is_complete);
};

const deleteTask = async (taskId) => {
  await taskStore.deleteTask(taskId);
};

const startEditing = (task) => {
  taskBeingEdited.value = task.id;
  editedTaskTitle.value = task.title;
};

const saveEdit = async (taskId) => {
  if (editedTaskTitle.value.trim()) {
    await taskStore.updateTask(taskId, editedTaskTitle.value);
    taskBeingEdited.value = null;
  }
};

const deleteCompletedTasks = async () => {
  await taskStore.deleteCompletedTasks();
};
</script>

<template>
  <div class="table-container">
    <h2 class="title-app">Welcome </h2>
    <NewTask></NewTask>

    <!-- Filtros -->
    <aside class="container-filter-sort">

      <div class="container-filter">
        <h3 class="title-filter">Filter results</h3>
        <select v-model="filter" class="fil-sort">
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="not_completed">Not Completed</option>
        </select>
      </div>

      <!-- Ordenación -->
      <div class="container-sort">
        <h3 class="title-sort">Sort By</h3>
        <select v-model="sortBy" class="fil-sort">
          <option value="date_desc">Date Descending</option>
          <option value="date_asc">Date Ascending</option>
          <option value="state">Completion State</option>
        </select>

      </div>
    </aside>

    <button class="delete-completed" @click="deleteCompletedTasks">Delete Completed Tasks</button>

    <table class="container-head">
      <thead>
        <tr class="border-container">

          <th class="border-checkbox">Completed</th>
          <th class="border-title">Title</th>
          <th class="border-action">Actions</th>

        </tr>
      </thead>

      <tbody>

        <tr v-for="task in sortedTasks" :key="task.id" :class="{ 'completed-task': task.is_complete }"
          class="border-tr">

          <td>
            <input type="checkbox" :checked="task.is_complete" @change="toggleComplete(task)" class="input-container" />
          </td>

          <td v-if="taskBeingEdited === task.id">
            <input v-model="editedTaskTitle" />
          </td>

          <td v-else class="container-task">
            {{ task.title }}
          </td>

          <td>
            <button class="save-task action-task" v-if="taskBeingEdited === task.id" @click="saveEdit(task.id)">
              Save
            </button>
            <button class="edit-task action-task" v-else @click="startEditing(task)">
              Edit
            </button>
            <button class="delete-task action-task" @click="deleteTask(task.id)">Delete</button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.completed-task {
  text-decoration: line-through;
  color: gray;
}

.title-app {
  font-size: 3em;
  color: #6B708D;
  margin: 20px 0 60px 0;

}

table {
  width: 100%;
  max-width: 800px;
  box-shadow: 10px 5px 25px 5px rgba(0, 0, 0, 0.5);
}


.container-head {
  text-align: center;
  margin-top: 5vh;
  margin-bottom: 10vh;
}

.border-container {
  background-color: #F2F4FC;
  height: 50px;

}

.border-tr {
  background-color: #F2F4FC;
  height: 50px;

}

.border-checkbox {
  font-size: 1.3em;
  color: #6B708D;

}

.border-title {
  font-size: 1.3em;
  color: #6B708D;

}

.border-action {
  font-size: 1.3em;
  width: 250px;
  color: #6B708D;
}



.input-container:hover {
  cursor: pointer;
}

.action-task {
  border: none;
  border-radius: 10px;
  height: 30px;
  width: 60px;
  margin-right: 30px;
  margin-left: 30px;
}

.action-task:hover {
  cursor: pointer;
}

.edit-task,
.save-task {
  color: #F2F4FC;
  background-color: rgb(55, 55, 204);
}

.delete-task {
  color: #F2F4FC;
  background-color: rgb(216, 57, 57);
}

.container-filter-sort {
  text-align: center;
  position: fixed;
  left: 2vw;
  top: 38vh;
}



.delete-completed {
  height: 40px;
  width: 200px;
  background-color: rgb(55, 55, 204);
  color: #F2F4FC;
  border: none;
  border-radius: 10px;
}

.delete-completed:hover {
  cursor: pointer;
}


.container-filter {
  .title-filter {
    color: #6B708D
  }
}

.container-sort {
  margin-top: 30px;

  .title-sort {
    color: #6B708D;
  }
}

.fil-sort {
  background-color: #F2F4FC;
  color: #6B708D;
  border: none;
  height: 25px;
  margin-top: 10px;
}

.fil-sort:focus {
  outline: none;
}

.fil-sort:hover {
  cursor: pointer;
}


/* media queries */

@media (max-width:900px) {

  .container-filter-sort {
    position: fixed;
    top: 30vh;
    
  }

  .container-head {
    text-align: center;
    margin-top: 2vh;
    margin-bottom: 0vh;
  }

  .title-filter,
  .title-sort {
    font-size: 1em;
  }


}

@media(max-width:600px) {

  .title-app {
    font-size: 1.5em;
    margin: 0px 0 50px 0;
  }

  table {
    width: 80%;

  }

  .container-head {
    text-align: center;
    margin-top: 1.2vh;

  }

  .border-container {
    height: 30px;
  }

  .border-tr {
    height: 30px;
  }

  .border-checkbox {
    font-size: 0.9em;
  }

  .border-title {
    font-size: 0.9em;
  }

  .border-action {
    font-size: 0.9em;
    width: 120px;
  }

  .input-container {
    width: 12px;
  }

  .action-task {
    border-radius: 10px;
    height: 15px;
    width: 40px;
    margin-right: 5px;
    margin-left: 5px;
    font-size: 0.7em;
  }

  .container-task {
    font-size: 0.9em;
    color: #383b47;

  }

  .delete-completed {
    height: 25px;
    width: 140px;
    font-size: 0.7em;
   
  }

  .container-filter-sort {
    text-align: center;
    position: fixed;
    left: 2vw;
    top: 16vh;
    margin-top: 0px;
  }

  .title-filter,
  .title-sort {
    font-size: 0.7em;

  }

  .container-sort {
    margin-top: 10px;
  }

  .fil-sort {
    font-size: 0.7em;
    height: 20px;
    width: 100px;
    margin-top: 5px;
  }



}
</style>

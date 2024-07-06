<script setup>
import { useUserStore } from '../stores/user';
import { RouterLink } from 'vue-router';

const userStore = useUserStore();

</script>

<template>
  <header class="header-link">

    <section class="section-first">
      <img src="/src/image/Logo.p-removebg-preview.png" alt="logo" class="img-header">
      <h1 class="title-header">To Do List</h1>
    </section>

    <section class="section-second">
      <nav class="nav-bar">
        <!-- Enlaces de navegación con `RouterLink` -->
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/taskmanager" class="nav-link">Task Manager</RouterLink>
      </nav>
      <div class="container-logout" v-if="userStore.isAuthenticated()">
        <button class="button-logout" @click="userStore.signOut">Logout</button>
      </div>
      
    </section>

  </header>

</template>

<style scoped>
.header-link {
  background-color: #F2F4FC;
}

.section-first {
  width: 100vw;
  display: flex;
  gap: 25%;

  .img-header {
    height: 250px;
  }

  .title-header {
    position: absolute;
    left: 40%;
    top: 90px;
    font-size: 5em;
    color: #6B708D;
  }
}

.section-second {
  display: flex;
  justify-content: center;
  align-items: center;


  .nav-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 50px;

  }

  .nav-link {
    font-size: 1.2em;
    text-decoration: none;
    color: #6B708D;
  }

  .nav-link:hover {
    cursor: pointer;
  }

  .container-logout {
    position: absolute;
    right: 50px;
    top: 20px;

    .button-logout {
      width: 120px;
      height: 40px;
      font-size: 1em;
      border-radius: 5px;
      color: #6B708D;
      background-color: #F2F4FC;
      border: none;
    }

    .button-logout:hover {
      border: 1px solid #6B708D;
      cursor: pointer;
    }
  }
}

/* media queries */

@media (max-width:900px) {

  .section-first {
    display: flex;
    gap: 15%;

    .img-header {
      height: 200px;
    }

    .title-header {
      font-size: 4em;

    }
  }

  .section-second {

    .nav-bar {
      left: -20px;
      bottom: 15px;
    }


    .container-logout {
      position: absolute;
      right: 0px;
      top: 6px;

      .button-logout {
        font-size: 0.8em;
        width: 90px;
        height: 30px;

      }
    }
  }


}


@media (max-width:600px)  {

  .section-first {
    display: flex;
    gap: 15%;

    .img-header {
      height: 100px;
    }

    .title-header {
      position: absolute;
      left: 30%;
      top: 30px;
      font-size: 2em;

    }
  }

  .section-second {

    .nav-bar {
      left: -20px;
      bottom: 0px;
      gap: 20px;
    }

    .nav-link {
      font-size: 0.8em;
    }

    .container-logout {


      .button-logout {
        font-size: 0.5em;
        width: 90px;
        height: 30px;



      }
    }
  }

}
</style>
<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../stores/user';
import Modal from './Modal.vue';
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';

const userStore = useUserStore();
const showSignInModal = ref(false);
const showSignUpModal = ref(false);

// Propiedades calculadas para mostrar u ocultar botones basados en el estado de autenticación
const isLoginVisible = computed(() => !userStore.isAuthenticated());
const isSignUpVisible = computed(() => !userStore.isAuthenticated());
</script>

<template>
  <div class="container-navbar">

    <!-- Botones de inicio de sesión y registro -->
    <button v-if="isLoginVisible" @click="showSignInModal = true" class="button-navbar">Sign In</button>
    <button v-if="isSignUpVisible" @click="showSignUpModal = true" class="button-navbar">Sign Up</button>

    <!-- Modal de inicio de sesión -->
    <Modal v-if="showSignInModal" @close="showSignInModal = false">
      <SignIn @closeModal="showSignInModal = false" />
    </Modal>

    <!-- Modal de registro -->
    <Modal v-if="showSignUpModal" @close="showSignUpModal = false">
      <SignUp @closeModal="showSignUpModal = false" />
    </Modal>

  </div>
  <div class="container-body">
    <section class="container-text">
      <h1 class="title-text">Organiza tus tareas y trabajos, por fin. </h1>
      <p class="paragraph-text">Simplifica las tareas de tu dia a dia, <br>
        así como las de tu equipo <br>
        con nuestra aplicacion To Do List.</p>
    </section>
    <img class="image-home" src="/src/image/tareas-removebg-preview.png" alt="">

  </div>

</template>
<style scoped>
.container-navbar {
  display: flex;
  justify-content: center;
  gap: 50px;
  position: absolute;
  right: 50px;
  top: 20px;


}

.button-navbar {
  width: 120px;
  height: 40px;
  font-size: 1em;
  border-radius: 5px;
  color: #6B708D;
  border: none;

}

.button-navbar:hover {
  cursor: pointer;
}

.button-navbar:first-child {
  background-color: #F2F4FC;
}

.button-navbar:first-child:hover {
  border: 1px solid #6B708D;
}

.button-navbar:last-child {
  border-radius: 5px;
  background-color: rgb(58, 111, 209);
  color: #F2F4FC;
}

.button-navbar:last-child:hover {
  background-color: rgb(43, 51, 165);
}

.container-body {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 50px;
}

.container-text {
  width: 500px;
  margin-left: 50px;


  .title-text {
    font-size: 3em;
    color: #6B708D;
    margin-bottom: 50px;


  }

  .paragraph-text {
    font-size: 1.5em;
    color: #6B708D;

  }
}

/* meddia queries */

@media (max-width: 900px) {

  .container-navbar {
    gap: 20px;

  }

  .button-navbar {
    font-size: 0.8em;
    width: 90px;
    height: 30px;
  }

  .container-text {
    width: 300px;
    margin-left: 0px;

    .title-text {
      font-size: 2em;
    }

    .paragraph-text {
      font-size: 1em;
    }
  }

  .image-home {
    width: 300px;
  }
}

@media (max-width:400px) {

  .container-navbar {
    gap: 10px;
    position: absolute;
    right: 10px;
    top: 10px;

  }

  .button-navbar {
    font-size: 0.5em;
    width: 50px;
    height: 20px;
  }

  .container-text {
    width: 200px;
    margin-left: 20px;

    .title-text {
      font-size: 1.2em;
      margin-bottom: 20px;
    }

    .paragraph-text {
      font-size: 0.8em;
    }
  }

  .image-home {
    width: 200px;
  }
}
</style>
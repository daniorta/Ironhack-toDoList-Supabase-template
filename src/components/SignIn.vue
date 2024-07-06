<script setup>

import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import 'vue-toast-notification/dist/theme-sugar.css';
import { useToast } from 'vue-toast-notification';

const emit = defineEmits(['closeModal']);
const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const toast = useToast();
const passwordVisibility = ref(true);

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const handleLogin = async () => {
  if (userStore.isAuthenticated()) {
    toast.error("You are lready logged in. Please log ou first");
    return;
  }
  if (!email.value || !password.value) {
    toast.error("Email and password are required");
    return;
  }

  if (!validateEmail(email.value)) {
    toast.error("Invalid email format")
    return;
  }

  try {
    await userStore.signIn(email.value, password.value);
    emit('closeModal'); // Emite el evento para cerrar el modal
    router.push('/taskmanager'); // Redirige a taskmanager
    toast.success("Logged in successfully!");
  } catch (error) {
    toast.error("Failed to log in: " + error.message);
  }
};

const togglePasswordVisibility = () => {
  passwordVisibility.value = !passwordVisibility.value;
}

</script>

<template>
  <div class="container-signin">

    <h1 class="title-signin">Sign In</h1>

    <section class="form-signin">
      <input class="email-signin" placeholder="Writed your email" v-model="email" />
      <input class="password-signin" :type="passwordVisibility ? 'password' : 'text'" placeholder="Write your password"
        v-model="password" />
      <span @click="togglePasswordVisibility">
        <i :class="passwordVisibility ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
      </span>
      <button class="button-signin" @click="handleLogin">Sign In</button>
    </section>
  </div>
</template>

<style scoped>
.container-signin {
  margin-top: 5vh;
}

.title-signin {
  font-size: 4em;
  color: #6B708D;
  text-align: center;
  margin-bottom: 20px;
}

.form-signin {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}


.email-signin,
.password-signin {
  width: 250px;
  height: 30px;
  margin-bottom: 2vh;
  color: #6B708D;
  border: 1px solid #6b708d71;
  border-radius: 5px;
}

.email-signin:focus,
.password-signin:focus {
  outline: none;
}

.button-signin {
  width: 90px;
  height: 40px;
  margin-bottom: 1.5em;
  color: #6B708D;
  border: 1px solid #6b708d71;
  border-radius: 5px;
}

.button-signin:hover {
  cursor: pointer;
}

/* media queries */

@media (max-width:900px) {

  .container-signin {
    margin-top: 3vh;
  }

  .title-signin {
    font-size: 3em;
  }

  .email-signin,
  .password-signin {
    width: 200px;
    border-radius: 5px;
  }

  .button-signin {
    height: 30px;
  }
}

@media (max-width:400px) {
  .container-signin {
    margin-top: 0vh;
  }

  .title-signin {
    font-size: 2em;
    margin-bottom: 10px;
  }

  .form-signin {
    gap: 0em;
  }


  .email-signin,
  .password-signin {
    width: 200px;
    height: 30px;
    margin-bottom: 0.5vh;

 
  }

  .button-signin {
    width: 60px;
    height: 25px;
    margin-top: 1em;
  }

}
</style>
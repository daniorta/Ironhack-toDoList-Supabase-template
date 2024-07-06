<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import 'vue-toast-notification/dist/theme-sugar.css'; // Importar estilos de notificaciones
import { useToast } from 'vue-toast-notification'; // Importar el hook useToast

const emit = defineEmits(['closeModal']); // Emitir evento para cerrar el modal
const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const toast = useToast();
const passwordVisibility = ref(true);

// Verificamos email
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const handleSignUp = async () => {
  if (userStore.isAuthenticated()) {
    toast.error("you are akready logged in. Please log out first.");
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
    await userStore.createNewUser(email.value, password.value);
    emit('closeModal'); // Emite el evento para cerrar el modal
    router.push('/taskmanager'); // Redirige a taskmanager
    toast.success("Signed up and logged in successfully!");
  } catch (error) {
    toast.error("Failed to sign up" + error.message);
  }
};

const togglePasswordVisibility = () => {
  passwordVisibility.value = !passwordVisibility.value;
}

</script>

<template>
  <div class="container-signup">
    <h1 class="title-signup">Sign Up</h1>

    <section class="form-signup">
      <input class="email-signup" placeholder="Write your email" v-model="email" />
      <input class="password-signup" :type="passwordVisibility ? 'password' : 'text'" placeholder="Write your password"
        v-model="password" />
      <span @click="togglePasswordVisibility">
        <i :class="passwordVisibility ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
      </span>


      <button class="button-signup" @click="handleSignUp">Sign Up</button>
    </section>

  </div>
</template>

<style scoped>
.container-signup {
  margin-top: 10vh;
}

.title-signup {
  font-size: 4em;
  color: #6B708D;
  text-align: center;
  margin-bottom: 20px;
}

.form-signup {

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

.email-signup,
.password-signup {
  width: 250px;
  height: 30px;

  margin-bottom: 2vh;
  color: #6B708D;
  border: 1px solid #6b708d71;
  border-radius: 5px;
}

.email-signup:focus,
.password-signup:focus {
  outline: none;
}


.button-signup {
  width: 90px;
  height: 40px;
  margin-bottom: 1.5em;
  color: #6B708D;
  border: 1px solid #6b708d71;
  border-radius: 5px;
}

.button-signup {
  cursor: pointer;
}

/* media queries */

@media (max-width:900px) {

  .container-signup {
    margin-top: 3vh;
  }

  .title-signup {
    font-size: 3em;
  }

  .email-signup,
  .password-signup {
    width: 200px;
    border-radius: 5px;
  }

  .button-signup {
    height: 30px;
  }
}

@media (max-width:400px) {

  .container-signup {
    margin-top: 0vh;
  }

  .title-signup {
    font-size: 2em;
    margin-bottom: 10px;
  }

  .form-signup {
    gap: 0em;
  }


  .email-signup,
  .password-signup {
    width: 200px;
    height: 30px;
    margin-bottom: 0.5vh;

 
  }

  .button-signup {
    width: 60px;
    height: 25px;
    margin-top: 1em;
  }

}
</style>
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useUserStore } from './stores/user';
import './assets/main.css'
import App from './App.vue';
import router from './router';
import 'vue-toast-notification/dist/theme-sugar.css'; // Importar estilos de notificaciones
import '@fortawesome/fontawesome-free/css/all.css';
import VueToast from 'vue-toast-notification';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VueToast, {
  position: 'top-right'
});
// Verificar sesión al iniciar la aplicación
const initializeAuth = async () => {
  const userStore = useUserStore();
  const userData = JSON.parse(localStorage.getItem('user'));
  if (userData) {
    userStore.setUser(userData); // Restaurar el estado del usuario desde `localStorage`
  } else {
    userStore.clearUser(); // Asegurarse de limpiar el estado del usuario si no hay datos en `localStorage`
  }
};
initializeAuth();
app.mount('#app');
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/NavBar.vue'; // Página que muestra las opciones de SignIn y SignUp
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import TaskManager from '../components/TaskManager.vue';
import { useUserStore } from '../stores/user';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/taskmanager',
    name: 'taskmanager',
    component: TaskManager,
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn,
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: { requiresGuest: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isAuthenticated()) {
    next({ name: 'signin' }); // Redirige a signin si el usuario no está autenticado
  } else if ((to.meta.requiresGuest && userStore.isAuthenticated()) && (to.name !== 'home')) {
    next({ name: 'taskmanager' }); // Redirige a taskmanager si el usuario está autenticado e intenta acceder a una ruta de invitados
  } else {
    next(); // Permite la navegación
  }
});

export default router;
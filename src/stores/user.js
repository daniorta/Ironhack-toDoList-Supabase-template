import { defineStore } from 'pinia';
import supabase from '@/lib/supabase';
import { ref } from 'vue';
import { useRouter } from 'vue-router'


export const useUserStore = defineStore('userStore', () => {
  const user = ref(JSON.parse(localStorage.getItem('user'))); // Inicializar el estado del usuario desde `localStorage`
  const router = useRouter();

  // Establecer el usuario y guardar en `localStorage`
  const setUser = (sessionUser) => {
    user.value = sessionUser;
    localStorage.setItem('user', JSON.stringify(sessionUser)); // Guardar el estado del usuario en `localStorage`
  };

  // Limpiar el usuario y eliminar de `localStorage`
  const clearUser = () => {
    user.value = null;
    localStorage.removeItem('user'); // Eliminar el estado del usuario de `localStorage`
  };

  // Crear un nuevo usuario y manejar el estado
  const createNewUser = async (email, password) => {
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw error;
      }
      setUser(signUpData.user);
      console.log('User created:', user.value);
      router.push('/taskmanager');
    } catch (error) {
      console.error('Error:', error.message || error);
      throw new Error('Failed to sign up');
    }
  };


  // Iniciar sesión y manejar el estado
  const signIn = async (email, password) => {
    try {
      const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw error;
      }
      setUser(signInData.user);
      console.log('User signed in:', user.value);
      router.push('/taskmanager');
    } catch (error) {
      console.error('Error:', error.message || error);
      throw new Error('Failed to log in');
    }
  };

  // Cerrar sesión y manejar el estado
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      clearUser();
      console.log('User signed out');
      router.push('/');
    } catch (error) {
      console.error('Error:', error.message || error);
      throw new Error('Failed to sign out');
    }
  };
  
  // Verificar si el usuario está autenticado
  const isAuthenticated = () => user.value !== null;
  
  return { user, setUser, clearUser, createNewUser, signIn, signOut, isAuthenticated };
});
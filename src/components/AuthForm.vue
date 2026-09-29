<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase/client.js'

// Estados reactivos para los inputs y el modo (login o registro)
const email = ref('')
const password = ref('')
const isRegistering = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

/**
 * Maneja la autenticación o el registro según el estado actual.
 */
const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (isRegistering.value) {
    // Lógica de Registro
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })
    if (error) {
      errorMessage.value = error.message
    } else {
      successMessage.value = '¡Registro exitoso! Ya puedes iniciar sesión.'
    }
  } else {
    // Lógica de Inicio de Sesión
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) {
      errorMessage.value = error.message
    } else {
      successMessage.value = '¡Inicio de sesión exitoso!'
      // Aquí más adelante redirigiremos al muro principal
    }
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
      {{ isRegistering ? 'Crear una cuenta' : 'Iniciar Sesión' }}
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
        <input 
          type="email5" 
          v-model="email" 
          required
          class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="tu@correo.com"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Contraseña</label>
        <input 
          type="password" 
          v-model="password" 
          required
          class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="••••••••"
        />
      </div>

      <button 
        type="submit" 
        class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
      >
        {{ isRegistering ? 'Registrarse' : 'Ingresar' }}
      </button>
    </form>

    <!-- Mensajes de feedback -->
    <p v-if="errorMessage" class="mt-4 text-sm text-red-600 text-center">{{ errorMessage }}</p>
    <p v-if="successMessage" class="mt-4 text-sm text-green-600 text-center">{{ successMessage }}</p>

    <!-- Botón para alternar entre Login y Registro -->
    <div class="mt-6 text-center">
      <button 
        @click="isRegistering = !isRegistering" 
        class="text-sm text-blue-600 hover:underline"
      >
        {{ isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate' }}
      </button>
    </div>
  </div>
</template>
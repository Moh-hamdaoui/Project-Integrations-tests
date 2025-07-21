<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-4 text-center">Inscription</h2>
    <form @submit.prevent="register" class="flex flex-col gap-4">
      <input v-model="name" placeholder="Nom" class="input" />
      <input v-model="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Mot de passe" class="input" />
      <button type="submit" class="btn">S'inscrire</button>
    </form>
    <p class="text-red-500 mt-4 text-center">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { registerUser } from '../services/authService'

const name = ref('')
const email = ref('')
const password = ref('')
const message = ref('')

const register = async () => {
  try {
    const res = await registerUser({ name: name.value, email: email.value, password: password.value })
    message.value = 'Inscription réussie ! Token : ' + res.token
  } catch (err) {
    message.value = err.response?.data?.message || 'Erreur'
  }
}
</script>

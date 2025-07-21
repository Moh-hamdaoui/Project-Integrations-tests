<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-4 text-center">Connexion!</h2>
    <form @submit.prevent="login" class="flex flex-col gap-4">
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Mot de passe" class="input" />
      <button type="submit" class="btn">Se connecter</button>
    </form>
    <p class="text-red-500 mt-4 text-center">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { loginUser } from '../services/authService'

const email = ref('')
const password = ref('')
const message = ref('')

const login = async () => {
  try {
    const res = await loginUser({ email: email.value, password: password.value })
    message.value = 'Connexion réussie ! Token : ' + res.token
  } catch (err) {
    message.value = err.response?.data?.message || 'Erreur'
  }
}
</script>


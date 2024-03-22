<script setup lang="ts">

const email = ref('');
const password = ref('');

const submitLogin = async function () {
  const data = await useFetch('/api/user/index.post.ts', {
    body: {
      email: 'test@gmail.com',
    }
  });
  console.log('🚀 ~ submitLogin ~ data:', data);
  // await navigateTo('/todos');
};

</script>

<template>
  <v-card class="pa-4">
    <h1>Todo list app</h1>
    <v-form @submit.prevent="submitLogin">
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
      />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
      />
      <div class="d-flex justify-center">
        <v-btn type="submit">Login</v-btn>
      </div>
    </v-form>
  </v-card>
</template>
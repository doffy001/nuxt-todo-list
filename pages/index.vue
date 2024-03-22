<script setup lang="ts">

const formLogin = ref({
  email: '',
  password: '',
});
const isShowLoginError = ref(false);

const submitLogin = async function () {
  const { data: userName } = await useFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(formLogin.value),
  });
  if (userName.value) {
    await navigateTo('/todos');
  } else {
    isShowLoginError.value = true;
  }
};

</script>

<template>
  <v-card class="pa-4">
    <h1 class="mb-2">Todo list app</h1>
    <v-form @submit.prevent="submitLogin">
      <v-text-field
        v-model="formLogin.email"
        label="Email"
        type="email"
      />
      <v-text-field
        v-model="formLogin.password"
        label="Password"
        type="password"
      />
      <p
        v-show="isShowLoginError"
        class="error-message mb-2 text-center"
      >
        Wrong email or password.
      </p>
      <div class="d-flex justify-center">
        <v-btn type="submit">Login</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<style lang="scss" scoped>
.error-message {
  color: red
}
</style>
<template>
  <v-card class="pa-4">
    <h1 class="mb-2">Todo list app</h1>
    <v-form
      v-if="isLogin"
      @submit.prevent="submitLogin"
    >
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
      <div class="d-flex justify-center mb-3">
        <v-btn type="submit">Login</v-btn>
      </div>
      <p class="text-center">Or if you don't have an account, <a href="javascript:;" @click="isLogin=false">sign up</a> instead.</p>
    </v-form>
    <v-form
      v-else
      @submit.prevent="submitSignup"
    >
      <v-text-field
        v-model="formSignup.email"
        label="Email"
        type="email"
      />
      <v-text-field
        v-model="formSignup.name"
        label="Name"
      />
      <v-text-field
        v-model="formSignup.password"
        label="Password"
        type="password"
      />
      <v-text-field
        v-model="formSignup.confirmPassword"
        label="Confirm Password"
        type="password"
      />
      <p
        v-show="signupErrorMessage"
        class="error-message mb-2 text-center"
      >
        {{ signupErrorMessage }}
      </p>
      <div class="d-flex justify-center mb-3">
        <v-btn type="submit">Sign up</v-btn>
      </div>
      <p class="text-center">Or if you have an account, <a href="javascript:;" @click="isLogin=true">log in</a> instead.</p>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
const isLogin = ref(true);
const formLogin = ref({
  email: '',
  password: '',
});
const formSignup = ref({
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
});
const isShowLoginError = ref(false);
const signupErrorMessage = ref('');

const submitLogin = async () => {
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

const submitSignup = async () => {
  if (formSignup.value.email && formSignup.value.name && formSignup.value.password && formSignup.value.confirmPassword) {
    if (formSignup.value.password === formSignup.value.confirmPassword) {
      try {
        const { data, error } = await useFetch('/api/signup', {
          method: 'POST',
          body: JSON.stringify(formSignup.value),
        });
        if (error.value) throw new Error(error.value.data.message);
        if (data.value) {
          await navigateTo('/todos');
        } else {
          signupErrorMessage.value = 'Email exist!'
        }
      } catch (err) {
        const error = err as {message: string}
        signupErrorMessage.value = error?.message || '';
      }
    } else {
      signupErrorMessage.value = 'Wrong password.'
    }
  } else {
    signupErrorMessage.value = 'All fields have to be filled.'
  }
};
</script>

<style lang="scss" scoped>
.error-message {
  color: red
}
</style>
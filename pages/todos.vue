<script setup lang="ts">
import { ref } from 'vue';

const todos = ref<{
  id: number,
  content: string,
  isEditing: boolean,
}[] | []>([
  {
    id: 1,
    content: 'todo 1',
    isEditing: false,
  },
  {
    id: 2,
    content: 'todo 2',
    isEditing: false,
  },
]);

</script>

<template>
  <v-card class="pa-4">
    <h1>Todo list</h1>
    <div class="d-flex">
      <v-text-field placeholder="Take a note..."></v-text-field>
      <v-btn
        class="ml-4"
        width="56"
        height="56"
        rounded="0"
        icon="mdi-plus"
      />
    </div>
    <v-list v-if="todos.length">
      <v-list-item
        v-for="todo in todos"
        :key="todo.id"
      >
        <div class="d-flex align-center">
          <v-text-field
            :readonly="!todo.isEditing"
            :model-value="todo.content"
            hide-details
          />
          <v-switch
            inset
            hide-details
            class="mx-4"
            color="primary"
          />
          <v-btn
            icon="mdi-close"
            width="30"
            height="30"
            color="error"
            rounded
          />
        </div>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style lang="scss">
.v-input--readonly {
  pointer-events: none;
}
</style>
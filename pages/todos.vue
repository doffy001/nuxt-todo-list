<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

type Todo = {
  id: string,
  content: string,
  isEditing: boolean,
  isCompleted: boolean,
};

const todos = ref<Todo[]>([]);

const currentNote = ref('');

const addNote = function () {
  if (!currentNote.value) return;
  const newTodo = {
    id: uuidv4(),
    content: currentNote.value,
    isEditing: false,
    isCompleted: false,
  };
  todos.value.push(newTodo);
  currentNote.value = '';
};

const deleteNote = function (i: number) {
  todos.value.splice(i, 1);
};

</script>

<template>
  <v-card class="pa-4">
    <h1>Todo list</h1>
    <div class="d-flex">
      <v-text-field
        v-model="currentNote"
        placeholder="Take a note..."
        @keyup.enter="addNote"
      />
      <v-btn
        class="ml-4"
        width="56"
        height="56"
        rounded="0"
        icon="mdi-plus"
        @click="addNote"
      />
    </div>
    <v-list v-if="todos.length">
      <v-list-item
        v-for="(todo, i) in todos"
        :key="todo.id"
      >
        <div class="d-flex align-center">
          <v-text-field
            :readonly="!todo.isEditing"
            :model-value="todo.content"
            :disabled="todo.isCompleted"
            hide-details
          />
          <v-switch
            inset
            hide-details
            class="mx-4"
            color="primary"
            v-model="todo.isCompleted"
          />
          <v-btn
            icon="mdi-close"
            width="30"
            height="30"
            color="error"
            rounded
            @click="deleteNote(i)"
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
.v-input--disabled
  input:disabled {
    text-decoration: line-through;
  }
</style>
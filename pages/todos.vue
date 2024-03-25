
<template>
  <v-card class="pa-4">
    <h1>{{ userName }}'s note</h1>
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
    <v-list
      v-if="todos.length"
      class="js-list-note"
      :key="keyListTodo"
    >
      <v-list-item
        v-for="(todo, i) in todos"
        :key="todo.id"
        :data-id="todo.id"
      >
        <div class="d-flex align-center">
          <v-checkbox
            v-model="todo.isCompleted"
            class="mr-4"
            hide-details
            color="secondary"
          />
          <v-text-field
            :readonly="!todo.isEditing"
            :model-value="todo.content"
            :disabled="todo.isCompleted"
            hide-details
            @keyup.enter="(e: Event) => finishEditingNote(i, e)"
            @blur="(e: Event) => finishEditingNote(i, e)"
          />
          <v-btn
            class="mx-4"
            :disabled="todo.isCompleted || todo.isEditing"
            color="info"
            @click="editNote(i)"
          >
            Edit
          </v-btn>
          <v-btn
            icon="mdi-close"
            width="30"
            height="30"
            color="red-darken-1"
            rounded
            @click="deleteNote(i)"
          />
        </div>
      </v-list-item>
    </v-list>
    <v-snackbar
      v-model="isShowSnackbar"
      timeout="2000"
    >
      You deleted the note.
    </v-snackbar>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

type Todo = {
  id: number,
  content: string,
  isEditing: boolean,
  isCompleted: boolean,
};
const userName = 'test user';
const todos = ref<Todo[]>([]);
const currentNote = ref('');
const isShowSnackbar = ref(false);
const keyListTodo = ref(1);
const updateKeyListTodo = () => {
  keyListTodo.value++;
};

const addNote = () => {
  if (!currentNote.value) return;
  const newTodo = {
    id: Math.random(),
    content: currentNote.value,
    isEditing: false,
    isCompleted: false,
  };
  todos.value.push(newTodo);
  currentNote.value = '';
};

const editNote = (i: number) => {
  const input = document.querySelector(`.js-list-note [data-id="${todos.value[i].id}"] input[type=text]`) as HTMLInputElement;
  input.focus();
  todos.value[i].isEditing = true;
};

const finishEditingNote = (i: number, e: Event) => {
  const input = e.target as HTMLInputElement | null;
  const newNote = input?.value;
  if (newNote) todos.value[i].content = newNote;
  todos.value[i].isEditing = false;
  updateKeyListTodo();
};

const deleteNote = (i: number) => {
  isShowSnackbar.value = true;
  todos.value.splice(i, 1);
};

onBeforeMount(async () => {
  const { data } = await useFetch('/api/todos');
  if (data.value) {
    todos.value = data.value.map(({ content }, i) => ({
      id: Math.random(),
      content,
      isEditing: false,
      isCompleted: false,
    }));
  }
});
</script>

<style lang="scss">
.v-input--readonly {
  pointer-events: none;
}
.v-input--disabled {
  input:disabled {
    text-decoration: line-through;
  }
}

.v-overlay-container {
  .v-overlay__content {
    right: 0;
    left: auto !important;
    transform: none !important;
  }
  .v-snackbar__content {
    text-align: center;
  }
}
</style>
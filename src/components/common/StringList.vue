<template>
  <div>
    <div v-for="item in list">
      <button @click="removeItem(item)">X</button>
      {{ item }}
    </div>
    <div>
      <input
        class="input"
        type="text"
        v-model="currentInput"
        @keypress.enter="addItem"
      />
      <button
        @click="addItem"
        class="float-right"
      >
        +
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StringList',
  props: {
    list: {
      type: Array<string>,
      default: new Array<string>()
    }
  },
  data () {
    return {
      currentInput: ''
    }
  },
  methods: {
    addItem () {
      if (this.currentInput !== '') {
        this.list.push(this.currentInput);
        this.currentInput = '';
      }
    },
    removeItem (item:string) {
      const index = this.list.indexOf(item);
      if (index !== -1) {
        this.list.splice(index, 1);
      }
    }
  }
});
</script>

<style>
.input {
  min-width: 85%;
}
</style>
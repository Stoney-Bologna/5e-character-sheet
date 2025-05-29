<template>
  This is the third page
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { use5eSheetStore } from '@/stores/5esheet';

export default defineComponent({
  name: 'CharSheetPage3',
  setup() {
    sheetStore: use5eSheetStore()
  }
});
</script>
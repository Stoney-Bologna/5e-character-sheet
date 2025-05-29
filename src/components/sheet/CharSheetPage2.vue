<template>
  This is the second page
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { use5eSheetStore } from '@/stores/5esheet';

export default defineComponent({
  name: 'CharSheetPage2',
  setup() {
    sheetStore: use5eSheetStore()
  }
});
</script>
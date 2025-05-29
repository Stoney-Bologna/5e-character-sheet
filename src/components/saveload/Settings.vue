<template>
  TODO: Implement various settings for this:

  Current setting ideas:
  Allow you to remove the 0-20 limit on base stats here
  
          
</template>
  
<script lang="ts">

import { defineComponent } from 'vue';
import { use5eSheetStore } from '@/stores/5esheet';
  
export default defineComponent({
  name: 'Settings',
  setup() {
    sheetStore: use5eSheetStore()
  }
});
</script>

<style>
  
</style>
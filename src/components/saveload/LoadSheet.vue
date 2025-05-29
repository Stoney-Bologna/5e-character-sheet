<template>
  TODO: implement a means of loading the character sheet.

  So far, to correlate with what I was thinking for saving sheets, I was thinking the 2 ways:

  Reach into the browser's session storage or something and see if we have a sheet ready there

  Let the user paste a JSON string (or load a .txt with the json) and see if that successfully turns into the state. 
    Much like saving, for the future the json we're loading could come from a service or something in addition to/instead of being copy pasted

        
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { use5eSheetStore } from '@/stores/5esheet';

export default defineComponent({
  name: 'LoadSheet',
  setup() {
    sheetStore: use5eSheetStore()
  }
});
</script>

<style>

</style>
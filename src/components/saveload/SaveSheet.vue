<template>
  TODO: implement a means of saving the style sheet. 

  At the current iteration, I don't think I have enough figured out that I'll actually be able to, but I think from here, but the main thoughts I have are that:
    The character sheet will be persisted on the pinia state

    We can save the current state in a few ways, either by:
        Saving it into the browser's session storage
            *Might* be a way to save this so that a session can have multiple hseets stored in it. 
        Saving a jsonified version of the state as a text file on the users's device (FUTURE: might even be able to send that to a service so that it persists it on something)

        
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { use5eSheetStore } from '@/stores/5esheet';

export default defineComponent({
  name: 'SaveSheet',
  setup() {
    sheetStore: use5eSheetStore()
  }
});
</script>

<style>

</style>
<template>
  This is the third page
  <input @click="openTestModal" type="button" value="Test button text" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { use5eSheetStore } from '@/stores/5esheet';
import { openModal } from '@kolirt/vue-modal';
import CantripCreator from '../modal/ModalSkeleton.vue';

export default defineComponent({
  name: 'CharSheetPage3',
  setup() {
    return { sheetStore: use5eSheetStore() }
  },
  methods: {
    async openTestModal () {
      const ok = await openModal<boolean>(CantripCreator, {props: {
        message: 'Test MESSAGE'
      }}).catch(() => false)
      
      if (ok) {
        console.log('we hit ok')
      }
    }
  }
});
</script>
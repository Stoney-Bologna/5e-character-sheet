<template>
  <ModalRoot class="root">
    <ModalContent class="card">
      <ModalTitle>Confirm</ModalTitle>
      <ModalDescription>fakemessage</ModalDescription>

      <div class="actions">
        <button @click="close()" class="btn btn--cancel">Cancel</button>
        <button @click="confirm(true)" class="btn btn--confirm">OK</button>
      </div>
    </ModalContent>
  </ModalRoot>
</template>

<script lang="ts">
import { ModalRoot, ModalContent, ModalTitle, ModalDescription, useModalContext } from '@kolirt/vue-modal'

import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { close, confirm } = useModalContext<boolean>()
    return { close, confirm };
  },
  components: { ModalRoot, ModalContent, ModalTitle, ModalDescription },
  modalGroup: 'default',
  props: {
    message: String
  },
  options: {
    modalGroup: 'default'
  }
});
</script>
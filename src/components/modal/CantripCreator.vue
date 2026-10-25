<template>
  <ModalRoot class="root">
    <ModalContent class="card">
      <ModalTitle>Add another cantrip</ModalTitle>
      <ModalDescription>Please add data about your input cantrip</ModalDescription>

      <div>

      </div>

      <div class="actions">
        <button @click="close()" class="btn btn--cancel">Cancel</button>
        <button @click="confirm(true)" class="btn btn--confirm">OK</button>
      </div>
    </ModalContent>
  </ModalRoot>
</template>

<script lang="ts">
import { ModalRoot, ModalContent, ModalTitle, ModalDescription, useModalContext } from '@kolirt/vue-modal'

import type { Cantrip, SpellEffect } from '@/stores/5esheet';

import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { close, confirm } = useModalContext<boolean>()
    return { close, confirm };
  },
  components: { ModalRoot, ModalContent, ModalTitle, ModalDescription },
  modalGroup: 'default',
  props: {
    targetList: {
      type: Array<Cantrip>,
      default: new Array<object>()
    }
  },
  data () {
    return {
      newCantrip : {
        name: '',
        schoolOfMagic: '',
        description: '',
        castingTime: '',
        range: '',
        duration: '',
        components: new Array<string>(),
        classesKnown: new Array<string>(),
        effect: {} as SpellEffect
      } as Cantrip
    }
  },
  methods: {
    saveCantripAndDismiss () {
      this.targetList.push(this.newCantrip);





      this.confirm(true);
    }
  }
});
</script>
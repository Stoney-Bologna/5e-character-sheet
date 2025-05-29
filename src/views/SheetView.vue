<template>
  <div class="row">
    <div>
      <nav class="navbar-links">
        <a
          class="navbar-link"
          :class="{ 'router-link-active': currPage === 1 }"
          @click="currPage = 1"
        >
          Stats and Inventory
        </a>
        <a
          class="navbar-link"
          :class="{ 'router-link-active': currPage === 2 }"
          @click="currPage = 2"
        >
          Character Info
        </a>
        <a
          class="navbar-link-final"
          :class="{ 'router-link-active': currPage === 3 }"
          @click="currPage = 3"
        >
          Spells
        </a>
      </nav>
    </div>
  </div>

  <div class="content">
    <char-sheet-page1 v-if="currPage === 1" />
    <char-sheet-page2 v-if="currPage === 2" />
    <char-sheet-page3 v-if="currPage === 3" />
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

import CharSheetPage1 from '@/components/sheet/CharSheetPage1.vue';
import CharSheetPage2 from '@/components/sheet/CharSheetPage2.vue';
import CharSheetPage3 from '@/components/sheet/CharSheetPage3.vue';

export default defineComponent({
  name: 'SheetView',
  components: { CharSheetPage1, CharSheetPage2, CharSheetPage3 },
  data() {
    return {
      currPage: 1
    }
  }
});
</script>
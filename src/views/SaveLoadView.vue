<template>
  <div class="row">
    <div>
      <nav class="navbar-links">
        <a
          class="navbar-link"
          :class="{ 'router-link-active': currPage === 1 }"
          @click="currPage = 1"
        >
          Load
        </a>
        <a
          class="navbar-link"
          :class="{ 'router-link-active': currPage === 2 }"
          @click="currPage = 2"
        >
          Save
        </a>
        <a
          class="navbar-link-final"
          :class="{ 'router-link-active': currPage === 3 }"
          @click="currPage = 3"
        >
        Settings
        </a>
      </nav>
    </div>
  </div>

  <div class="content">
    <load-sheet v-if="currPage === 1" />
    <save-sheet v-if="currPage === 2" />
    <settings v-if="currPage === 3" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import SaveSheet from '@/components/saveload/SaveSheet.vue';
import Settings from '@/components/saveload/Settings.vue';
import LoadSheet from '@/components/saveload/LoadSheet.vue';

export default defineComponent({
  name: 'SaveLoadView',
  components: { LoadSheet, SaveSheet, Settings },
  data() {
    return {
      currPage: 1
    }
  }
});
</script>
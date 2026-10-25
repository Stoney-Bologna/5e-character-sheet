<template>
  <div class="row thin-outline">
    <p class="text-center p-0 m-0">
      Character Info
    </p>
    <div class="col-4">
      Age
      <input
          class="w-100 h2"
          type="number"
          v-model="sheetStore.age"
      />
      Eye Color
      <input
          class="w-100 h2"
          type="text"
          v-model="sheetStore.eyes"
      />
    </div>
    <div class="col-4">
      Height
      <input
          class="w-100 h2"
          type="text"
          v-model="sheetStore.height"
      />
      Skin
      <input
          class="w-100 h2"
          type="text"
          v-model="sheetStore.skin"
      />
    </div>
    <div class="col-4">
      Weight
      <input
          class="w-100 h2"
          type="text"
          v-model="sheetStore.weight"
      />
      Hair
      <input
          class="w-100 h2"
          type="text"
          v-model="sheetStore.hair"
      />
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <div class="row thin-outline">
        <p class="text-center p-0 m-0">
          Backstory
        </p>
        <textarea
            rows="22"
            cols="18"
            placeholder="Please type here..."
            v-model="sheetStore.backstory"
        />
      </div>
    </div>
    <div class="col-8">
      <div class="row thin-outline">
        <p class="text-center p-0 m-0">
          Allies
        </p>
        <string-list :list="sheetStore.allies" />
      </div>
      <div class="row thin-outline">
        <p class="text-center p-0 m-0">
          Organizations
        </p>
        <string-list :list="sheetStore.organizations" />
      </div>
      <div class="row thin-outline">
        <p class="text-center p-0 m-0">
          Treasure
        </p>
        <string-list :list="sheetStore.treasure" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { use5eSheetStore } from '@/stores/5esheet';
import StringList from '@/components/common/StringList.vue';

export default defineComponent({
  name: 'CharSheetPage2',
  components: {StringList},
  setup() {
    return { sheetStore: use5eSheetStore() }
  }
});
</script>
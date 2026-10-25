<template>
  <div class="row">
    <div class="col-4">
      <div class="row">
        <div
          id="baseStats"
          class="col-3 text-center"
        >
          <div class="thin-outline">
            Strength
            <h2>
              {{ sheetStore.strModifier }}
            </h2>
            <input
              v-model="sheetStore.strBase"
              class="base-modifier-input"
              type="number"
              :min="skillExempt('str') ? '-99' : '0'"
              :max="skillExempt('str') ? '99' : '20'"
            />
          </div>
          <div class="thin-outline">
            Dexterity
            <h2>
              {{ sheetStore.dexModifier }}
            </h2>
            <input
              v-model="sheetStore.dexBase"
              class="base-modifier-input"
              type="number"
              :min="skillExempt('dex') ? '-99' : '0'"
              :max="skillExempt('dex') ? '99' : '20'"
            />
          </div>
          <div class="thin-outline">
            Constitution
            <h2>
              {{ sheetStore.conModifier }}
            </h2>
            <input
              v-model="sheetStore.conBase"
              class="base-modifier-input"
              type="number"
              :min="skillExempt('con') ? '-99' : '0'"
              :max="skillExempt('con') ? '99' : '20'"
            />
          </div>
          <div class="thin-outline">
            Intelligence
            <h2>
              {{ sheetStore.intModifier }}
            </h2>
            <input
              v-model="sheetStore.intBase"
              class="base-modifier-input"
              type="number"
              :min="skillExempt('int') ? '-99' : '0'"
              :max="skillExempt('int') ? '99' : '20'"
            />
          </div>
          <div class="thin-outline">
            Wisdom
            <h2>
              {{ sheetStore.wisModifier }}
            </h2>
            <input
              v-model="sheetStore.wisBase"
              class="base-modifier-input"
              type="number"
              :min="skillExempt('wis') ? '-99' : '0'"
              :max="skillExempt('wis') ? '99' : '20'"
            />
          </div>
          <div class="thin-outline">
            Charisma
            <h2>
              {{ sheetStore.chaModifier }}
            </h2>
            <input
              v-model="sheetStore.chaBase"
              class="base-modifier-input"
              type="number"
              :min="skillExempt('cha') ? '-99' : '0'"
              :max="skillExempt('cha') ? '99' : '20'"
            />
          </div>
        </div>
        <div class="col-9">
          <div
            id="inspiration"
            class="thin-outline"
          >
            <input
              v-model="sheetStore.inspiration"
              class="base-modifier-input"
              type="number"
              
            />
            Inspiration
          </div>
          <div
            id="proficiencyBonus"
            class="thin-outline"
          >
            <input
              v-model="sheetStore.proficiencyBonus"
              class="base-modifier-input"
              type="number"
              min="0"
            />
            Proficiency Bonus
          </div>
          <div 
            id="savingThrows"
            class="thin-outline"
          >
            <p class="text-center p-0 m-0">
              Saving Throws
            </p>
            <template v-for="savingThrowType in savingThrowTypes">
              <input type="checkbox" @click="toggleSavingThrow($event, savingThrowType.stat)"/>
              {{ `${sheetStore.getSavingThrowModifier(savingThrowType.stat)} ${savingThrowType.name}` }}
              <br/> 
            </template>
          </div>
          <div 
            id="skills"
            class="thin-outline"
          >
            <p class="text-center p-0 m-0">
              Skills
            </p>
            <template v-for="skill in skillTypes">
              <input type="checkbox" @click="toggleSkill($event, skill.toLowerCase())"/>
              {{ `${sheetStore.getSkillModifier(skill.toLowerCase())} ${skill}` }}
              <br/>
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <span class="thin-outline">
          {{ `${10 + sheetStore.getSkillModifier('perception')} Passive Perception` }}
        </span>
        <br/>
        <div class="thin-outline">
          <p class="text-center p-0 m-0">
            Languages
          </p>
          <string-list :list="sheetStore.languages" />
        </div>
        <div class="thin-outline">
          <p class="text-center p-0 m-0">
            Other Proficiences
          </p>
          <string-list :list="sheetStore.otherProficiences" />
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="row thin-outline">
        <div class="col-4">
          <p class="text-center p-0 m-0">
            Armor class
          </p>
          <input
            class="w-100 h2"
            type="number"
            v-model="sheetStore.armorClass"
          >
        </div>
        <div class="col-4">
          <p class="text-center p-0 m-0">
            Initiative
          </p>
          <input
            class="w-100 h2"
            type="number"
            v-model="sheetStore.dexModifier"
          >
        </div>
        <div class="col-4">
          <p class="text-center p-0 m-0">
            Speed
          </p>
          <input
            class="w-100 h2"
            type="number"
            v-model="sheetStore.speed"
          >
        </div>
      </div>
      <div class="row thin-outline">
        <div class="col-4">
          Maximum HP: 
          <input
              class="w-100 h2"
              type="number"
              v-model="sheetStore.hitPointMax"
          >
        </div>
        <div class="col-4">
          Current HP:
          <input
              class="w-100 h2"
              type="number"
              v-model="sheetStore.hitPointCurrent"
          >
        </div>
        <div class="col-4">
          Temporary HP:
          <input
              class="w-100 h2"
              type="number"
              v-model="sheetStore.hitPointTemp"
          >
        </div>
      </div>
      <div class="row">
        <div class="col-6 thin-outline">
          <p class="text-center p-0 m-0">
            Hit Dice
          </p>
          Max:
          <input
              class="w-100"
              type="number"
              v-model="sheetStore.hitDiceMax"
          >
          Current:
          <input
              class="w-100"
              type="number"
              v-model="sheetStore.hitDiceCurrent"
          >
          Hit Dice Sides:
          <input
              class="w-100"
              type="number"
              v-model="sheetStore.hitDiceSides"
          >
        </div>
        <div class="col-6 thin-outline">
          <p class="text-center p-0 m-0">
            Saving Throws
          </p>
          <br />
          <!--TODO: some time in the future, make these fancier than just number inputs-->
          Successes:
            <input
                class="w-100"
                type="number"
                v-model="sheetStore.deathSaveSuccesses"
            >
          <br />
          Failures:
            <input 
                class="w-100"
                type="number"
                v-model="sheetStore.deathSaveFailures"
            >
        </div>
      </div>
      <div class="row thin-outline">
        <p class="text-center p-0 m-0">
          Attacks and Spellcasting
        </p>
        <br />

      </div>
      <div class="row thin-outline">
        <p class="text-center p-0 m-0">
          Equipment
        </p>
        <br />
        <div class="row">
          <div class="col-4 thin-outline">
            <div class="pb-3">
              Copper
              <input
                  class="w-100"
                  type="number"
                  v-model="sheetStore.copperPieces"
              >
            </div>
            <div class="pb-3">
              Silver
              <input
                  class="w-100"
                  type="number"
                  v-model="sheetStore.silverPieces"
              >
            </div><div class="pb-3">
              Electrum
              <input
                  class="w-100"
                  type="number"
                  v-model="sheetStore.electrumPieces"
              >
            </div><div class="pb-3">
              Gold
              <input
                  class="w-100"
                  type="number"
                  v-model="sheetStore.goldPieces"
              >
            </div><div class="pb-3">
              Platnum
              <input
                  class="w-100"
                  type="number"
                  v-model="sheetStore.platnumPieces"
              >
            </div>
          </div> 
          <div class="col-8 thin-outline">
            Items
            <br />
            TODO: whip something up for items here
          </div>
        </div>
      
      </div>
    </div>
    <div class="col-4">
      <div class="row thin-outline">
        <p class="text-center p-0 m-0">
          Personality Traits
        </p>
        <string-list :list="sheetStore.personalityTraits" />
      </div>
      <div class="row thin-outline">
        <p class="text-center p-0 m-0">
          Ideals
        </p>
        <string-list :list="sheetStore.ideals" />
      </div>
      <div class="row thin-outline">
        <p class="text-center p-0 m-0">
          Bonds
        </p>
        <string-list :list="sheetStore.bonds" />
      </div>
      <div class="row thin-outline">
        <p class="text-center p-0 m-0">
          Flaws
        </p>
        <string-list :list="sheetStore.flaws" />
      </div>
      <div class="row thin-outline">
        <p class="text-center p-0 m-0">
          Features & Traits
        </p>
        <textarea
            rows="22" 
            cols="18" 
            placeholder="Please type here..." 
            v-model="sheetStore.featuresAndTraits" 
        />
      </div>
      <br/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { use5eSheetStore } from '@/stores/5esheet';
import StringList from '@/components/common/StringList.vue';

export default defineComponent({
  name: 'CharSheetPage1',
  components: {StringList},
  data() {
    return {
      savingThrowTypes: [
        { stat: 'str', name: 'Strength' },
        { stat: 'dex', name: 'Dexterity' },
        { stat: 'con', name: 'Constitution' },
        { stat: 'int', name: 'Intelligence' },
        { stat: 'wis', name: 'Wisdom' },
        { stat: 'cha', name: 'Charisma' },
      ],
      skillTypes: [
        'Acrobatics',
        'Animal Handling',
        'Arcana',
        'Athletics',
        'Deception',
        'History',
        'Intimidation',
        'Investigation',
        'Medicine',
        'Nature',
        'Perception',
        'Performance',
        'Persuasion',
        'Religion',
        'Sleight of Hand',
        'Stealth',
        'Survival'
      ]
    }
  },
  setup() {
    return { sheetStore: use5eSheetStore() }
  },
  methods: {
    toggleSavingThrow(event:Event, throwType:string) {
      if ((<HTMLInputElement>event.target).checked) {
        this.sheetStore.addSavingThrowProficiency(throwType);
      } else {
        this.sheetStore.removeSavingThrowProficiency(throwType);
      }
    },
    toggleSkill(event:Event, statType:string) {
      if ((<HTMLInputElement>event.target).checked) {
        this.sheetStore.addSkillProficiency(statType);
      } else {
        this.sheetStore.removeSkillProficiency(statType);
      }
    },
    skillExempt(statType:string) {
      return this.sheetStore.exemptStats.includes(statType);
    }
  }
});
</script>

<style>
.base-modifier-input {
  width: 2em;
  -moz-appearance: textfield;
  appearance: textfield;
}

.base-modifier-input::-webkit-outer-spin-button,
.base-modifier-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
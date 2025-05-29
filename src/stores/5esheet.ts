import { defineStore } from 'pinia'

/**
 * Effector: object to represent a modifier or something, which will hold on to
 * What it's affecting (e.g., base stat, specific skill, armor class, etc)
 * Value it's being affected by (e.g., +3, -4)
 * 
 * Effectors must be attached to something, and can be inactive or active. 
 *   The problem is figuring out which way to link everything just right so it all works. 
 * 
 * 
 * Ideas for storing the list of effectors:
 *   Reinvent the idea of pointers: Every time we create something that makes an effector, the list that spawned the effector
 *    stores just a uuid of that effector, then we have a central effector map where the key is that uuid, and the value is the
 *    effector tied to it?
 *   Same idea as above but we purposefully guarantee the uuid 
 *   Old Fashioned Way: Let the user just calculate it themselves as if it were just the paper sheet (not ideal but ok i guess)
 */
export enum EffectType {
  baseStat,              // Effector affects a base stat by X (should be number)
  skill,                 // Effector affects a specific skill by X (should be number)
  armorClassConstant,    // Effector affects armorClass by X (should be number)
  armorClassEquation,    // Effector affects armor class via an equation (e.g., 13 base + dex modifier or something like that)
  armorClassSetter,      // Effector sets armor class to a constant value
  maxHitPoints,          // Effector affects max hit points by X (should be number)
  tempHitPoints,         // Effector affects temp hit points by X (should be number)
  givesVulnerability,    // Effector gives vulnerability to X damage type (should be string, matching a dmg type I have defined)
  givesResistance,       // Effector gives resistance to X damage type (should be string, matching a dmg type I have defined)
  givesInvulnerability,  // Effector gives invulnerability to X damage type (should be string, matching a dmg type I have defined)
  givesAdvantageBase,    // Effector gives advantage on everything using base stat X (should be string matching base stat)
  givesAdvantageSkill,   // Effector gives advantage on specific skill X (should be string matching skill)
  givesDisadvantageBase, // Effector gives disadvantage on everything using base stat X (should be string matching base stat)
  givesDisadvantageSkill,// Effector gives disadvantage on specific skill X (should be string matching skill)
  grantsCurse,           // Effector gives the user X curse when equipped (should be string with the name of the curse)
  shortRestStatusDebuff, // A base stat decrease that disappears on short rest
  longRestStatusDebuff   // A base stat decrease that disappears on a long rest
};

export enum DieType {
  d2,
  d3,
  d4,
  d6,
  d8,
  d10,
  d12,
  d20,
  d100
}

export enum WeaponProperties {
  ammunition = 'Ammunition',
  finesse = 'Finesse',
  heavy = 'Heavy',
  light = 'Light',
  loading = 'Loading',
  range = 'Range',
  reach = 'Reach',
  special = 'Special',
  thrown = 'Thrown',
  twoHanded = 'Two-Handed',
  versatile = 'Versatile'
}

export enum Alignment {
  chaoticGood = 'Chaotic Good',
  neutralGood = 'Neutral Good',
  lawfulGood = 'Lawful Good',
  chaoticNeutral = 'Chaotic Neutral',
  neutralNeutral = 'True Neutral',
  lawfulNeutral = 'Lawful Neutral',
  chaoticEvil = 'Chaotic Evil',
  neutralEvil = 'Neutral Evil',
  lawfulEvil = 'Lawful Evil'
}

type Effector = {
   id: string | number;
   name: string;
   desc: string;
   type: EffectType;
   value: string | number;
   isActive: boolean;
};

/**
 * Equipable items, I figure there's a few ways to handle them:
 *   If they can be attuned to
 *   If you are attuned to them 
 *   What passive effects it gives you 
 *   What skills does it need to be used if active
 *   What damage it does if its a weapon
 *   (maybe not needed) What weapon types it has?
 *   Conditional Effectors (e.g., item gives +2 AC but only against ranged attacks if you pass a DC 15 wisdom check, for example)
 *     this flavor of effector will not be applied globally, but will be prominent enough if one's looking at the info for the item you're using such that a player can know to use this
 *     when the condition does apply
 */
type Weapon = {
  name: string;
  desc: string;
  properties: Map<WeaponProperties, string>; // will be properties like finesse etc. and optional description if you want to write that down.
  damageAttributes: Array<object>; // object will be damage type, and -1 if disadvantage, implied 0 if normal, 1 if advantage
  damageType: string;
  damageDieType: DieType;
  damageDieCounnt: number;
  ammoCount: number; // Should only matter if it has the "ammunition" property. tbh its probably the only property I need to handle in code
  effectors: Array<string | number>;
  equipped: boolean;
};

type Item = {
  name: string;
  desc: string;
  effectors: Array<string>;
  equipped: boolean;
}

// Stuff for the character page

type Feature = {
  level: number;
  title: string;
  description: string;
  featureFunction: any; //TODO: create specific types for like, charge bars or list of spells known (static) vs list of spells known (otherwise)
}

type ClassFeatures = {
  name: string;
  features: Array<Feature>;
  subclassName: string;
  subclassFeatures: Array<Feature>;
}

type RaceFeatures = { 
  name: string;
  features: Array<Feature>;
  subRaceName: string;
  subRaceFeatures: Array<Feature>;
}

type BackgroundFeatures = {
  name: string;
  features: Array<Feature>;
}

type Feats = {
  features: Array<Feature>;
}

// Stuff for spellcasting

type Cantrip = {
  name: string;
  schoolOfMagic: string;
  description: string;
  castingTime: string;
  range: string;
  duration: string;
  components: Array<string>;
  classesKnown: Array<string>;
  effect: SpellEffect | SpellAttackEffect;
  // TODO: the rest of this
}

type Spell = {
  name: string;
  // TODO the rest of this
}

type SpellEffect = {
  todo: string;
  // TODO: catch all for a bunch of the spell effects that aren't attacks
}

type SpellAttackEffect = {
  damageAttributes: Array<object>; // object will be damage type, and -1 if disadvantage, implied 0 if normal, 1 if advantage
  damageType: string;
  damageDieType: DieType;
  damageDieCounnt: number;
}

const skills: { [key: string]: any } = {
  'acrobatics': { baseStat: 'dex' },
  'animal handling': { baseStat: 'wis' },
  'arcana': { baseStat: 'int' },
  'athletics': { baseStat: 'str' },
  'deception': { baseStat: 'cha' },
  'history': { baseStat: 'int' },
  'insight': { baseStat: 'wis' },
  'intimidation': { baseStat: 'cha' },
  'investigation': { baseStat: 'int' },
  'medicine': { baseStat: 'wis' },
  'nature': { baseStat: 'int' },
  'perception': { baseStat: 'wis' },
  'performance': { baseStat: 'cha' },
  'persuasion': { baseStat: 'cha' },
  'religion': { baseStat: 'int' },
  'sleight of hand': { baseStat: 'dex' },
  'stealth': { baseStat: 'dex' },
  'survival': { baseStat: 'wis' }
};

export const use5eSheetStore = defineStore('5eSheet', {
  state: () => ({
    /**
     * Constants used in the state
     */
    constants: { skills },

    /**
     * Is initialized TODO: wtf was this for again?
     */
    isInitialized: false,

    /** 
     * Exempt stats: List of stats which I'm going to allow to work outside of any validation that they must be
     * 0-20. I can see this working for when some characters hit lvl 20 and exceed it, or if any legendary gear
     * allows one to go that far with it. 
     */
    exemptStats: new Array<string>(),

    /**
     * List of all possible effectors for the character. ID should always be tied to *something* else on the sheet.
     */
    effectors: new Array<Effector>(),
    
    /**
     * List of validation issues with the character
     */
    validationIssues: new Array<string>(),


    /**
     * Character's name
     */
    characterName: '',

    /**
     * Current character level
     */
    level: 0,

    /**
     * Current player's name
     */
    playerName: '',

    /**
     * Current player's alignment
     */
    alignment: Alignment.neutralNeutral,

    /**
     * Current amount of Xp
     */
    xp: 0,

    /**
     * If true, use feat based leveling (e.g., level when the dm says you do) instead of doing math to figure out xp
     */
    featBasedLeveling: false,

    /**
     * Base values for all the base stats
     */
    strBase: 0,
    dexBase: 0,
    conBase: 0,
    intBase: 0,
    wisBase: 0,
    chaBase: 0,

    inspiration: 0,
    proficiencyBonus: 0,

    savingThrowProficiencies: new Array<string>(),

    skillProficiencies: new Array<string>(),

    languages: new Array<string>(),
    otherProficiences: new Array<string>(),

    //passive wisdom can just be calculated via 10 + wisModifier() + proficiencyBonus if proficient
    //there exists other similar passive stats that can also be done this way.

    //Armor class: in future iterations, might make it based on which modifiers are in 
    // based on ac values on stuff in the inventory + equipped, but for now just a simple 
    // field
    armorClass: 0,

    //initiative is just your dex bonus, can just make that a calculated on the page itself

    speed: 0,

    hitPointMax: 0,
    hitPointCurrent: 0,
    hitPointTemp: 0,

    hitDiceMax: 0,
    hitDiceCurrent: 0,
    hitDiceSides: 0,

    deathSaveSuccesses: 0,
    deathSaveFailures: 0,

    //Damage types: -1 will be vulnerable, 0 will be normal, 1 will be resistance, 2 will be immunity
    // implication being -2 means instant death from that damage?? Probably rules as written is can't be worse than vulnerable, maybe
    //  double disadvantage if the DM is that mean/implements that rule, but some don't so you're probalby fine lol. 
    // Type list pulled from https://arcaneeye.com/mechanic-overview/damage-types-5e/
    // Blank slate just assumes that nothing across the board
    // For first iteration, probably just make this a menu somewhere in the character sheet
    //  For future iterations, *probably* allow people to add their own if they want, in case a homebrew campaign adds extra dmg or something
    damageVulnerabilities: {
      'acid': 0,
      'bludgeoning': 0,
      'cold': 0,
      'fire': 0,
      'force': 0,
      'lightning': 0,
      'necrotic': 0,
      'piercing': 0,
      'poison': 0,
      'psychic': 0,
      'radiant': 0,
      'slashing': 0,
      'thunder': 0
    },

    //While weapons will be empty, the vague plan for them is to define:
    // Name, way to calculate d20 modifier for attacking, way to describe the damage + type
    weapons: new Array<Weapon>,

    //Equipment is also going to be fun, in that I'll want to figure out how to set
    // modifiers, plus include a checkbox for what's actively equipped
    equipment: new Array<Item>,

    copperPieces: 0,
    silverPieces: 0,
    ePieces: 0,
    goldPieces: 0,
    platnumPieces: 0,

    //Also like the other one, might want to allow people to tie modifiers and such to this
    /**
     * So this is just for ffeatures and traits, *but* this could be something expanded upon
     * for equipment as well if I want to, and the plans for what I'm thinking about that is below:
     * 
     * name
     * list of effectors for that feature or trait (Can *probably* assume these will always be marked as active)
     * 
     * 
     */
    classFeatures: {} as ClassFeatures,
    raceFeatures: {} as RaceFeatures,
    backgroundFeatures: {} as BackgroundFeatures,
    feats: {} as Feats,

    personalityTraits: new Array<string>(),
    ideals: new Array<string>(),
    bonds: new Array<string>(),
    flaws: new Array<string>(),

    //page 2
    age: '',
    height: '',
    weight: '',
    eyes: '',
    skin: '',
    hair: '',

    //TODO: since I don't want to worry about embedding images right now, there will
    // not be any character appearance or symbols. Maybe for the future we might get this

    backstory: '',
    allies: new Array<string>(),
    organizations: new Array<string>(),
    treasure: new Array<string>(),

    //page 3
    knowsSpells: false,

    spellcastingAbility: '',
    spellSaveDC: { baseValue: 8, abilityModifier: '' },
    spellAttackBonus: { abilityModifier: '' },
    concentratedSpell: {} as Spell,

    //Notes about the spell object: I'm planning on these fields:
    // isPrepared
    // name
    // modifiers
    // special restrictions (e.g., can only be called once per long rest, etc)
    // active length
    level0Spells: {
      spells: new Array<Cantrip>()
    },

    level1Spells: {
      spells: new Array<Spell>(),
      slotsAvailable: 0,
      slotsExpended: 0
    },

    level2Spells: {
      spells: new Array<Spell>(),
      slotsAvailable: 0,
      slotsExpended: 0
    },

    level3Spells: {
      spells: new Array<Spell>(),
      slotsAvailable: 0,
      slotsExpended: 0
    },

    level4Spells: {
      spells: new Array<Spell>(),
      slotsAvailable: 0,
      slotsExpended: 0
    },

    level5Spells: {
      spells: new Array<Spell>(),
      slotsAvailable: 0,
      slotsExpended: 0
    },

    level6Spells: {
      spells: new Array<Spell>(),
      slotsAvailable: 0,
      slotsExpended: 0
    },

    level7Spells: {
      spells: new Array<Spell>(),
      slotsAvailable: 0,
      slotsExpended: 0
    },

    level8Spells: {
      spells: new Array<Spell>(),
      slotsAvailable: 0,
      slotsExpended: 0
    },

    level9Spells: {
      spells: new Array<Spell>(),
      slotsAvailable: 0,
      slotsExpended: 0
    }
  }),
  getters: {
    strModifier: (state) => {
      return Math.floor(state.strBase / 2) - 5;
    },
    dexModifier: (state) => {
      return Math.floor(state.dexBase / 2) - 5;
    },
    conModifier: (state) => {
      return Math.floor(state.conBase / 2) - 5;
    },
    intModifier: (state) => {
      return Math.floor(state.intBase / 2) - 5;
    },
    wisModifier: (state) => {
      return Math.floor(state.wisBase / 2) - 5;
    },
    chaModifier: (state) => {
      return Math.floor(state.chaBase / 2) - 5;
    }
    
  },
  actions: {
    getModifierForStat(stat: string) {
      switch(stat) {
        case 'str':
          return this.strModifier;
        case 'dex':
          return this.dexModifier;
        case 'con':
          return this.conModifier;
        case 'int':
          return this.intModifier;
        case 'wis':
          return this.wisModifier;
        case 'cha':
          return this.chaModifier;
        default:
          return 0;
      }
    },
    
    addSkillProficiency(skill: string) {
      this.skillProficiencies.push(skill);
    },
    removeSkillProficiency(skill: string) {
      this.skillProficiencies = this.skillProficiencies.filter(item => item !== skill);
    },
    hasSkillProficiency(skill: string) {
      return this.skillProficiencies.includes(skill);
    },
    getSkillModifier(skill: string) {
      return this.getModifierForStat(this.constants.skills[skill].baseStat) + (this.skillProficiencies.includes(skill) ? this.proficiencyBonus : 0);
    },
    addSavingThrowProficiency(skill: string) {
      this.savingThrowProficiencies.push(skill);
    },
    removeSavingThrowProficiency(skill: string) {
      this.savingThrowProficiencies = this.savingThrowProficiencies.filter(item => item !== skill);
    },
    hasSavingThrowProficiency(skill: string) {
      return this.savingThrowProficiencies.includes(skill);
    },
    getSavingThrowModifier(stat: string) {
      return this.getModifierForStat(stat) + (this.savingThrowProficiencies.includes(stat) ? this.proficiencyBonus : 0);
    },
  }
});
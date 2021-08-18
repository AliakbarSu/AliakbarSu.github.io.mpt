<template>
  <v-list flat subheader three-line>
    <v-subheader>Options</v-subheader>

    <v-list-item-group v-model="settings" multiple active-class="">
      <v-list-item
        v-for="option in updatedOptions"
        @click="select(option)"
        :key="option.id"
      >
        <template>
          <v-list-item-action>
            <v-checkbox :input-value="isActive(option.id)"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title
              ><v-chip class="ma-2">{{ option.alpha }}</v-chip> -
              {{ option.text }}</v-list-item-title
            >
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: ['options'],
  data() {
    return {
      settings: [],
      alphabets: 'a,b,c,d,e,f,g',
      activeItem: ''
    }
  },
  computed: {
    updatedOptions() {
      return this.options.map((op, index) => {
        return {
          ...op,
          alpha: this.alphabets.split(',')[index].toUpperCase()
        }
      })
    }
  },
  methods: {
    isActive(item) {
      return item.toLowerCase() === this.activeItem.toLowerCase()
    },
    select(option) {
      this.activeItem = option.id
      this.$emit('select', option)
    }
  }
}
</script>

<template>
    <v-menu
      open-on-hover
      right
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on">
          <v-list-item-title>
            <slot></slot>
          </v-list-item-title>
          <v-list-item-action>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, name) in menuItems"
          :key="name"
          @click="item.handler"
        >
          <v-list-item-title>{{ name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Object,
      default: null,
      required: true,
    },
  },
};
</script>

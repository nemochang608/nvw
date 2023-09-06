<template>
  <div class="text-center">
    <v-menu bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
          <slot name="activator" v-bind="{ on, attrs }"></slot>
      </template>
      <v-list>
        <v-list-item-group>
          <template
            v-for="(item, name) in menuItems"
          >
            <nview-dropdown-submenu
              :key="name"
              v-if="item.childItems !== null"
              :menuItems="item.childItems"
              >{{ name }}
            </nview-dropdown-submenu>
            <v-list-item
              v-if="item.childItems === null"
              :key="name"
            >
              <v-list-item-title
                @click="item.handler"
                >{{ name }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <slot name="append"></slot>
    </v-menu>
  </div>
</template>

<script>
import NviewDropdownSubmenu from './NviewDropdownSubmenu.vue';

export default {
  props: {
    activateButtonHandler: {
      type: Function,
      default: () => {},
      required: false,
    },
    menuItems: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data: () => ({}),
  components: { NviewDropdownSubmenu },
};
</script>

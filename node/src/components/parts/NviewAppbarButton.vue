<template>
  <v-btn
    text
    v-bind="{attrs, disabled}"
    v-on="handlers"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: ['handlers', 'attrs', 'disabled'],
};
</script>

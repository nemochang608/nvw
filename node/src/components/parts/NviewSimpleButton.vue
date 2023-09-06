<template>
  <v-btn
    text
    color="blue darken-1"
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

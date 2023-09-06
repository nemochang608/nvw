<template>
  <div>
  </div>
</template>

<style>
  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }
</style>

<script>

export default {
  mounted() {
    this.$el.innerHTML = this.html;
  },
  watch: {
    html(val) {
      this.$el.innerHTML = val;
    },
  },
  props: {
    html: {
      type: String,
      required: true,
    },
    meta_data: {
      type: Object,
      required: false,
      default: null,
    },
    post_date: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

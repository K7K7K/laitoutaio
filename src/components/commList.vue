<template></template>

<script>
export default {
  data() {
    return {
      skip: 0,
      loading: false,
      finished: false,
    };
  },
  props: {
    limit: {
      default: 10,
      type: Number,
    },
  },
};
</script>

<style></style>

<template>
  <div>
    <p>
      /users/_userid
      User ID: {{userID}}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userID: this.$route.params
      // userID: this.$route.params.userid
    };
  }
};
</script>

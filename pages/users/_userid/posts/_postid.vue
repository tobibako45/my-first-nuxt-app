<template>
  <div>
    <p>
      /users/_userid/posts/_postis.vue
      Post ID: {{postID}}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postID: this.$route.params
      // postID: this.$route.params.postid
    };
  }
};
</script>

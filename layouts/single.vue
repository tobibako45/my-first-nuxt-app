<template>
  <div>
    <sapn>これはsingle layout</sapn>
    <AppNavigation />
    <hr>
    <Nuxt />
    <nuxt-link to="/">TOPに戻る</nuxt-link>
    <hr>
    <footer>
      footer
    </footer>
  </div>
</template>

<script>
  import AppNavigation from '~/components/AppNavigation.vue'

  export default {
      components: {
          AppNavigation
      }
  }
</script>

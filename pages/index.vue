<template>
  <section class="container">
    <div>
      <h3>Nuxt.jsのタグが付けられた投稿一覧</h3>
      <ul>
        <li v-for="item in items" :key="item.id">
          <h4>
            <span>[{{item.id}}]</span>
            <span>{{item.title}}</span>
            <!--            <small>by {{item.user.id}}</small>-->
            <small>
              <span>by </span>
              <nuxt-link :to="`/users/${item.user.id}`">
                {{item.user.id}}
              </nuxt-link>
            </small>
          </h4>
          <div>{{item.body.slice(0, 130)}}.....</div>
          <p><a :href="item.url">{{item.url}}</a></p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        async asyncData({store}) {
            if (store.getters['items'].length) {
                return
            }

            // ストアのactionsの関数を実行するには dispatch関数をVueのインスタンスで実行します。
            await store.dispatch('fetchItems')
        },
        // vuexのstoreは基本的にcomputedと使う。
        computed: {
            // mapGettersヘルパーはストア(index.js)のgetterをローカルの算出プロパティ(computed)にマッピングさせます:
            ...mapGetters(['items'])
        }
    }
</script>

<style>
  .container {
    min-height: 100vh;
    padding: 16px;
  }

  h3 {
    margin: 16px 0;
    padding: 8px 0;
    border-bottom: solid 1px #e5e5e5;
  }

  li + li {
    margin: 16px 0;
  }

  p {
    margin: 8px 0;
  }
</style>

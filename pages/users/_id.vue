<template>
  <div>
    <h3>{{user.id}}</h3>
    <h3>followees_count: {{user.followees_count}}</h3>
    <h3>followers_count: {{user.followers_count}}</h3>
    <img :src="user.profile_image_url" width="120" alt="">
    <p>{{user.description || 'No description'}}</p>
    <p>
      <nuxt-link to="/">
        <small><b>トップへもどる</b></small>
      </nuxt-link>
    </p>
    <h3>{{user.id}}さんの投稿一覧</h3>
    <ul>
      <li v-for="item in items" :key="item.id">
        <h4>
          <span>{{item.title}}</span>
        </h4>
        <div>{{item.body.slice(0, 130)}}...........</div>
        <p><a target="_blank" :href="item.url">{{item.url}}</a></p>
      </li>
    </ul>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        // ヘッダー情報
        head() {
            return {
                title: this.user.id
            }
        },
        // asynDataはコンポーネントにデータをセットするとこ
        async asyncData({route, store, redirect}) {
            // storeのgettersのuserオブジェクト
            if (store.getters['users'][route.params.id]) {
                return
            }

            try {
                // ストアのactionsの関数を実行するには dispatch関数をVueのインスタンスで実行します。
                await store.dispatch('fetchUserInfo', {id: route.params.id})
            } catch (e) {
                redirect('/') // 簡易的なエラー処理として404を想定してリダイレクト
            }
        },

        // vuexのstoreは基本的にcomputedと使う。
        computed: {
            user() {
                // Vue Router  遷移先のコンポーネントでパラメータを表示させるには $route を使ってルーターインスタンスにアクセスできるので、それを使います。
                return this.users[this.$route.params.id]
            },
            items() {
                return this.userItems[this.$route.params.id] || []
            },

            // ゲッターを、「...」スプレッド演算子（object spread operator）を使って computed に組み込む

            // mapGettersヘルパーはストア(index.js)のgetterをローカルの算出プロパティ(computed)にマッピングさせます:
            ...mapGetters(['users', 'userItems'])
        }
    }
</script>

<style scoped>
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

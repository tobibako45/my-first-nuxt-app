// import Vuex from 'vuex'
//
// export default () =>
//   new Vuex.Store({
//     state: {
//       items: []
//     }
//   })

import Vuex from 'vuex'

export default () => (new Vuex.Store({

    // state: コンポーネントでいうdata
    state: {
      items: [],
      users: {},
      userItems: {}
    },

    // gettersは主にstateのデータを加工して表示したいときに使用します
    // getters: コンポーネントでいうcomputed的なもの
    getters: {
      // itemsを使うgetter
      items: (state) => state.items,
      // usersを使うgetter
      users: (state) => state.users,
      // userItemsを使うgetter
      userItems: (state) => state.userItems
    },

    // mutations は state を更新する関数を登録します。
    // mutations: コンポーネントでいうmethods（というかsetter）
    // stateを唯一変更できるもの
    // mutations内の関数の呼び出しとして特徴的なことはストアのcommit関数を用いて発火させるということです。
    mutations: {
      // vuexでは引数をpayloadと呼ぶ
      // payloadはオブジェクトにするべき（いっぱい入れれるし）
      setItems(state, {items}) {
        // stateのitemの値を変更する
        state.items = items
      },
      setUser(state, {user}) {
        state.users[user.id] = user
      },
      setUserItems(state, {user, items}) {
        state.userItems[user.id] = items
      }
    },

    // actionsはmutationsをコミットする関数を登録します。
    // actionsのcommitを使うことでmutationsを呼び出す(コンポーネントには無い懸念)
    // context.commit を呼び出すことでミューテーションをコミットできます。あるいは context.state や context.getters で、状態やゲッターにアクセスできます。他のアクションも context.dispatch で呼ぶこともできます。

    // ※actionsの関数を実行するには dispatch関数を Vue のインスタンスで実行します。
  // Vue のインスタンス側からストアを参照し、ストアの dispactch 関数を実行します。 dispatch 関数も commit 関数と同じように実行する関数の名前を指定して実行します。
    actions: {
      async fetchItems({commit}) {
        const items =
          await this.$axios.$get('https://qiita.com/api/v2/items?query=tag:nuxt.js')
        commit('setItems', {items})
      },
      async fetchUserInfo({commit}, {id}) {
        const [user, items] = await Promise.all([
          this.$axios.$get(`https://qiita.com/api/v2/users/${id}`),
          this.$axios.$get(`https://qiita.com/api/v2/items?query=user:${id}`)
        ])
        commit('setUser', {user})
        commit('setUserItems', {user, items})
      }
    }
  })
)

// export default () => new Vuex.Store(store);

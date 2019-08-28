// import Vuex from 'vuex'
//
// export default () =>
//   new Vuex.Store({
//     state: {
//       items: []
//     }
//   })

import Vuex from 'vuex'

export default () => (
  new Vuex.Store({

    // state: コンポーネントでいうdata
    state: {
      items: [],
      users: {},
      userItems: {}
    },

    // gettersは主にstateのデータを加工して表示したいときに使用する。
    // getters: コンポーネントでいうcomputed的なもの。
    getters: {
      // itemsを使うgetter
      items: (state) => state.items,
      users: (state) => state.users,
      userItems: (state) => state.userItems
    },

    // mutations は state を更新する関数を登録します。stateを唯一変更できるもの。
    // mutations: コンポーネントでいうmethods（というかsetter）
    // mutations内の関数の呼び出しとして、特徴的なことはストアのcommit関数を用いて発火させる。(actionsのほうで)
    mutations: {

      // vuexでは引数をpayloadと呼ぶ
      // payloadはオブジェクトにするべき（いっぱい入れれるし）

      // actionsから第２引数の値が来る
      setItems(state, {items}) {
        // stateのitemsの値を変更する
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

    // ※　context.commit を呼び出すことでmutationsをコミットできます。

    // あるいは context.state や context.getters で、状態やゲッターにアクセスできます。
    // 他のアクションも context.dispatch で呼ぶこともできます。

    // Vueインスタンス側話ね。
    // ※actionsの関数を実行するには dispatch関数を Vueのインスタンスで実行します。
    // Vueのインスタンス側からストアを参照し、ストアのdispactch関数を実行します。
    // dispatch関数もcommit関数と同じように実行する関数の名前を指定して実行します。
    actions: {
      async fetchItems({commit}) {
        // mutationsのsetItemsに第２引数として、$axios.$getの値を送る
        const items =
          await this.$axios.$get('https://qiita.com/api/v2/items?query=tag:nuxt.js')
        // commit関数でmutaionsの
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

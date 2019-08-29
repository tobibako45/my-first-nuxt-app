<!--<nuxt /> で呼ばれる-->

<template>
  <div>
    <h1>Index page</h1>
    <ul>
      <li>
        <nuxt-link to="/login">ログインページへ</nuxt-link>
      </li>
        <li>
          <nuxt-link to="/authed-route">認証が必要なページへ</nuxt-link>
        </li>
    </ul>
  </div>
</template>

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

import Cookies from "universal-cookie/lib";

// ミドルウェア関数には、contextと呼ばれるオブジェクトが引数として渡される
export default ({req, route, redirect}) => {
  console.log(route.path)

  // includes() メソッドは、特定の要素が配列に含まれているかどうかを true または false で返します。
  // var pets = ['cat', 'dog', 'bat'];
  // console.log(pets.includes('cat')); // expected output: true

  if(['/'].includes(route.path)){ // ['/']にroute.pathが含まれているか？
    // ルートを参照した場合は認証をスッキプし、処理を終了する
    return
  }

  // Node.jsのリクエストオブジェクトに格納されているCookieの情報をuniversal-cookieを利用して取得する。
  const cookies  = req ? new Cookies(req.headers.cookies) : new Cookies()
  const credential = cookies.get('credential')

  // topページでない場合に分岐処理を行う
  // もし、クレデンシャルが存在しつつログインページにアクセスしている場合は、トップページに。
  if(credential && route.path === '/login'){
    return redirect('/')
  }
  // クレデンシャルが存在しつつトップページ以外のページにアクセスしている場合は、ログインページに
  if(!credential && route.path !== '/login'){
    return redirect('/login')
  }
}

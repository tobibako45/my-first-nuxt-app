export default () => {
  if(process.browser){
    console.log('console.log() on browserこれ')
  } else {
    console.log('console.log() on SSR serverSSRサーバー上のconsole.log（）')
  }
}

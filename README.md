## 使い方 @delmontz 
▶カレントに移動 インストール package.js内のモジュールがDLされる  
`npm install または yarn install`  
▶ビルドして鯖起動 watchを有効にしてあるのでソース変更が即時反映される package.jsにスクリプト内容記載  
`npm start または yarn start`  
▶ビルドのみ webpack.config.js内のmode:'development'を適時変更 'production'にすると圧縮される  
`npm build またはyarn build`  
▶ブラウザで下記URLを開く  
`http://localhost:8080/`  
  
※ eslint設定参考　eslintはこの環境に入ってないため適時対応 google styleベース  
npm install -g eslint babel-eslint eslint-plugin-react eslint-config-google

``` 
module.exports = {
  "extends": "google",
  "env": {
      // browser グローバル変数を使用する
      "browser": true,
  },
  "parser": "babel-eslint",
  "plugins": [
    //Reactのチェックに必要
    "react"
  ],
  "rules": {
      // インデントスタイルは2スペースに強制
      "indent": ["error", 2],
      // 改行コードはWindows
      "linebreak-style": ["error", "windows"],
      //未定義が鬱陶しいのでとりあえず無効　追加
      "no-unused-vars": 0
  },
};
```

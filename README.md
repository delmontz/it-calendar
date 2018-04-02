** 使い方 @delmontz 
* ▶カレントに移動 インストール package.js内のモジュールがDLされる
* `npm install または yarn install`
* ▶ビルドして鯖起動 watchを有効にしてあるのでソース変更が即時反映される package.jsにスクリプト内容記載
* `npm start または yarn start`
* ▶ビルドのみ webpack.config.js内のmode:'development'を適時変更 'production'にすると圧縮される
* `node_modules/webpack/bin/webpack.js`
* ▶ブラウザで下記URLを開く
* `http://localhost:8080/`

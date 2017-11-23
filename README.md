# Socket.IO-Redis-Scalling
Socket.IOをredisでシンプルにスケールさせるやつ

# 必要環境
- node
- redis


# 必要なライブラリインストール
```
npm install
```

# 起動
``
node index.js
``

# デバッグ
SUB
```
node debug.js  PubAndSubKey
```

PUB
```
curl \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{"message":"hoge","key":"PubAndSubKey","token":"tokenSample"}' \
  'http://localhost:3000/message/send'
```

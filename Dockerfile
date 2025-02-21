# Node.jsの軽量なalpine版イメージを利用
FROM node:16-alpine

# コンテナ内で作業するディレクトリを設定
WORKDIR /app

# package.json と package-lock.json（存在する場合）をコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースコードをすべてコピー
COPY . .

# アプリケーションが利用するポートを指定
EXPOSE 3000

# アプリケーションを起動するコマンドを指定
CMD ["npm", "start"]

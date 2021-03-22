# furikaeri-web
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/cbb2daafec32460e99c92a83e23dd066)](https://app.codacy.com/app/tomatoaiu/Furikaeri?utm_source=github.com&utm_medium=referral&utm_content=tomatoaiu/Furikaeri&utm_campaign=badger)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftomatoaiu%2FFurikaeri.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftomatoaiu%2FFurikaeri?ref=badge_shield)
[![dependencies Status](https://david-dm.org/tomatoaiu/Furikaeri/status.svg)](https://david-dm.org/tomatoaiu/Furikaeri)
[![devDependencies Status](https://david-dm.org/tomatoaiu/Furikaeri/dev-status.svg)](https://david-dm.org/tomatoaiu/Furikaeri?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b60b08cc57b45ed0815/maintainability)](https://codeclimate.com/github/tomatoaiu/Furikaeri/maintainability)

Let's Furikaeri  
[Web Site](https://lets-furikaeri.firebaseapp.com/)
> Nuxt.js + Vuetify.js project

## Progress
Progress is slow because I am producing it as a hobby.  
Now version [0.1.2](https://github.com/tomatoaiu/Furikaeri/releases)  

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [Nuxt.js](https://github.com/nuxt/nuxt.js) and [Vuetify.js](https://vuetifyjs.com/) documentation.

## Deploy
firebase

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftomatoaiu%2FFurikaeri.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftomatoaiu%2FFurikaeri?ref=badge_large)


## Note (Lang: Ja)

### デプロイの仕方

#### 必要なもの

- node v10.24.0
- firebase-tools

#### 流れ

```sh
npm run generate
firebase -V
firebase login
firebase serve
firebase deploy
```


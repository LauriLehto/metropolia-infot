# Metropolian Karaportin Infotaulut

Metropolia tilasi tämän toteutuksen osana innovaatio opintojani ja tarkoitus oli toteuttaa opiskelijoita varten digital signage ratkaisu. Tekninen puoli on toteutettu hyödyntäen Raspberry Pita ja piSignagea, joilla hallinnoidaan ja näytetään haluttu sisältö.

Tämä github repo on osa toteutusta ja sen tarkoitus on näyttää verkkosivuna Karaportin opetuspisteen ruokalan lounaslista ja HSL:n liikennetiedot Karaportilta.

Sovellus julkaistu osoitteessa https://metropolia.netlify.app



## SPA, React ja Netlify

Projekti on alustettu create-react-appilla ja se on julkaistu Netlifyn palvelimelle. Sovellus pyörii hyvin selaimella, mutta ruokalistan osalta aiheutti cors-ongelman. Yritettyäni ratkaista ongelman käyttäen cors-anywhere ratkaisua löysin ilokseni Netlifyn oman ratkaisun cors-ongelmaan.

Tiedon ratkaisutavasta löysin [tästä](https://www.digitalocean.com/community/tutorials/nodejs-solve-cors-once-and-for-all-netlify-dev) artikkelista.

Asentamalla netlify-cli'n `npm i -g netlify-cli` pystyi hyödyntämään valmiita funktioita, jotka korvaavat tarpeen hyödyntää palvelinta proxya cors-ongelman ratkaisemiseksi.

Seuraavana projekti tulee alustaa,
```
netlify init
```
ja paikallisen proxy palvelimen saa käyntiin
```
netlify dev
```
Seuraavaksi piti luoda netlify.toml. Create-react-appia varten käytin lopulta muotoa
```
[build]
  command = "npm run build && cd functions/node-fetch && npm install"
  functions = "functions"
  publish = "build"
```
Tarvittava funktio luotiin ensin antamalla komento
```
netlify functions:create
```
ja avautuvasta valikosta valittiin `node-fetch` ja valmis proxy funktio oli sen jälkeen löydettävissä kansiosta `/functions/node-fetch`. Tätä funktiota muokkaamalla pystyi hakemaan ruokalistan jsonina Sodexon [sivuilta](https://www.sodexo.fi/en/restaurants/metropolia-myllypuro). Karaportille ei ollut saatavana projektin alussa ruokalistaa, joten käytin Myllypuroa testaamista varten. Nyt projektiin on lisätty Food & CO päivittyvä ruokalista. Fazerin api ei tarjoa muuta kuin päivittäin vaihtuvien annosten tiedot, joten sivun staattiset tiedot tulevat data-jsonista '/src/data/foodnco.js'.

## Julkaiseminen

Sovelluksen voi julkaista suoraan Netlifylla käyttäen paikallisesti netlify-cli'a komennoilla

```
netlify build
netlify deploy --prod
```


---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

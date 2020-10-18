<p align="center">
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
  <img width="500" src="https://covid19.mathdro.id/api/og" />
</p>

# COVID-19 API

![last_cron_date](https://img.shields.io/endpoint?url=https://covid19.mathdro.id/api/statusbadge?status=last_cron_date&style=flat-square)
![og_cron_status](https://img.shields.io/endpoint?url=https://covid19.mathdro.id/api/statusbadge?status=og_cron_status&style=flat-square)
![daily_cron_status](https://img.shields.io/endpoint?url=https://covid19.mathdro.id/api/statusbadge?status=daily_cron_status&style=flat-square)

> Serving data from John Hopkins University CSSE as a [JSON API](https://covid19.mathdro.id)

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/import/project?template=https://github.com/mathdroid/covid-19-api)

## Routes

- /: contains opengraph image for sharing

- /api: global summary

- /api/og: generate a summary open graph image

- /api/confirmed: global cases per region sorted by confirmed cases

- /api/recovered: global cases per region sorted by recovered cases

- /api/deaths: global cases per region sorted by death toll

- /api/daily: global cases per day

- /api/daily/[date]: detail of updates in a [date] (e.g. /api/daily/2-14-2020)

- /api/countries: all countries and their ISO codes

- /api/countries/[country]: a [country] summary (e.g. /api/countries/Indonesia or /api/countries/USA or /api/countries/CN)

- /api/countries/[country]/confirmed: a [country] cases per region sorted by confirmed cases

- /api/countries/[country]/recovered: a [country] cases per region sorted by recovered cases

- /api/countries/[country]/deaths: a [country] cases per region sorted by death toll

- /api/countries/[country]/og: generate a summary open graph image for a [country]

## Usage

1. Clone

    ```bash
    git clone --depth=1 https://github.com/mathdroid/covid-19-api
    ```

2. Install deps (`yarn`, `npm install`)

3. Install and register to [ZEIT Now](https://zeit.co/now) if you haven't. This project is exclusively made for the platform.

4. `now dev` to run a local dev deployment, `now` to publish.

## Showcase

- [Create a Github Action that Send Everyday Covid19 Status Through Telegram Using Python](https://dev.to/spiritbro1/create-a-github-action-that-send-everyday-covid19-status-through-telegram-using-python-3l78), (Telegram Bot) by [catflip](https://github.com/catflip)

- [17 responsible live visualizations about the coronavirus, for you to use](https://blog.datawrapper.de/coronaviruscharts/), (Web) by [Datawrapper](https://datawrapper.de)

- [Android kotlin-mvvm-covid19](https://github.com/rizmaulana/kotlin-mvvm-covid19), (Android) by [Rizki Maulana](https://github.com/rizmaulana)

- [CovidNow](https://github.com/OMIsie11/CovidNow), (Android) by [Oskar Misiewicz](https://github.com/OMIsie11)

- [https://github.com/andreyyoshua/Covid-19](https://github.com/andreyyoshua/Covid-19), (iOS) by [Andrey Yoshua](https://github.com/andreyyoshua)

- [https://github.com/pararang/vue-covid](https://github.com/pararang/vue-covid), (VueJS) by [Muhammad Ikhsan](https://github.com/pararang)

- [Vue Covid 19 monitoring App](https://github.com/princerafid01/covid19), (VueJS) by [Mahmud Rafid](https://github.com/princerafid01) . A [demo](https://covid-19-stat.now.sh).

- [https://github.com/pooladkhay/covid19](https://github.com/pooladkhay/covid19), (React, NextJS) by [Mohammad Javad Pooladkhay](https://mamadev.ir)

- [https://github.com/alancampora/corona-virus-react](https://github.com/alancampora/corona-virus-react), (React) by [Alan Adrian Campora](https://github.com/alancampora)

- [https://github.com/alankilalank/react-covid-19](https://github.com/alankilalank/react-covid-19), (React, CRA) by [Alank Ilalank](https://github.com/alankilalank)

- [https://github.com/pabloVinicius/covid-19-dashboard](https://github.com/pabloVinicius/covid-19-dashboard) [https://covid19.data.eti.br/](https://covid19.data.eti.br/), (Web) by [Pablo Vinicius](https://github.com/pabloVinicius)

- [https://github.com/freakyfelt/gatsby-source-mathdroid-covid19](https://github.com/freakyfelt/gatsby-source-mathdroid-covid19)(https://github.com/freakyfelt/gatsby-source-mathdroid-covid19), (Gatsby, TypeScript) by [Bruce Felt](https://github.com/freakyfelt)

- [https://github.com/miftahafina/covid19-data](https://github.com/miftahafina/covid19-data), (React) by [Miftah Afina](https://github.com/miftahafina)

- [https://github.com/mazik/corona/](https://github.com/mazik/corona/), (An Electron based Desktop application based on VueJS) by [Md Mazedul Islam Khan](http://twitter.com/iamazik/)

- [https://github.com/hoaaah/flutter-covid19ina](https://github.com/hoaaah/flutter-covid19ina), (Flutter) by [@hoaaah](https://github.com/hoaaah)

- [https://github.com/kasramp/COVID-19-Telegram-bot](https://github.com/kasramp/COVID-19-Telegram-bot), (Telegram Bot, Java) by [Kasra Madadipouya](https://github.com/kasramp)

- [https://covid-19-map.netlify.com/](https://covid-19-map.netlify.com/),(React, Deck.GL) by [Jason Feng](https://github.com/iyci)

- [https://github.com/Ghazif-Adeem/COVID-19-Statistics-Checker](https://github.com/Ghazif-Adeem/COVID-19-Statistics-Checker), (PHP) by [Ghazif Adeem](https://github.com/Ghazif-Adeem)

- [Access mathdroid API to store Coronavirus COVID-19 worldwide data in JSON format](https://github.com/maxMaxineChen/COVID-19-worldwide-json-data-script), (Javascript script, get updated every 8 hours by Github Actions) by [Maxine Chen](https://github.com/maxMaxineChen)

- [A Coronavirus COVID-19 global data statistics website](https://github.com/maxMaxineChen/COVID19-Worldwide-Stats), (React + Gatsby + Material UI + Recharts) by [Maxine Chen](https://github.com/maxMaxineChen)

- [https://novel-coronavirus-reports.netlify.com/](https://novel-coronavirus-reports.netlify.com/), (PWA with Map & reports) by [Sharad Raj Singh Maurya](https://github.com/sharadcodes)

- [https://github.com/sutanlab/covid19-visualized](https://github.com/sutanlab/covid19-visualized), (Next.js, TypeScript) by [Sutan Gading F. Nasution](https://github.com/sutanlab)

- [A Dedicated Covid-19 Philippines Tracker](https://covid19.com.ph/), (React, CRA, TailwindCSS) by [Mark Anthony Uy](https://github.com/markanthonyuy)

- [Covid-19 World Map](https://github.com/pvogenthaler/covid-19) (D3.js globe displaying confirmed, recovered, and death counts by country) by [Paige Vogenthaler](https://github.com/pvogenthaler/)

- [https://souryvath.github.io/ng-covid-19/](https://souryvath.github.io/ng-covid-19/), (Angular, ApexCharts) by [Souryvath NIRASAY](https://github.com/souryvath/)

- [Corona-tracker](https://corona-tracker-2020.netlify.com/), (Vue frontend for the API with main focus on India) by [Akash Raju M](https://github.com/akashrajum7) 

- [https://github.com/satyawikananda/Vucovid-Covid-info](https://github.com/satyawikananda/Vucovid-Covid-info), (VueJS, PWA) by [Satya Wikananda](https://github.com/satyawikananda)

- [https://github.com/juanitourquiza/ng-covid-19](https://github.com/juanitourquiza/ng-covid-19) [https://hackeruna.com/covid19/](https://hackeruna.com/covid19/), (Angular) by [Juan Urquiza](https://github.com/juanitourquiza)

- [RN-Covid19](https://github.com/Hamaar/RN-Covid19), (React-Native) by [Hamaar](https://github.com/Hamaar)

- [Last 7 days chart with percentages](https://covidchart.netlify.com/),(Next, React, PWA) by [Mithhu](https://github.com/mithhu)

- [https://livecovid19stats.netlify.com](https://livecovid19stats.netlify.com), (Gatsby, React) by [Dhaiwat Pandya](https://github.com/Dhaiwat10)

- [https://corona-stats-eta.now.sh/](https://corona-stats-eta.now.sh/), (React, Hooks) by [Vitor Boccio](https://github.com/vitorboccio)

- [COVID-19 | Coronavirus Live Stats and Tracker](https://covidstats.ca/), (React) by [Micah Mones](https://github.com/micahmones)

- [https://sandipnirmal.github.io/covid-19-tracker](https://sandipnirmal.github.io/covid-19-tracker), (React PWA) by [Sandip R. Nirmal](https://github.com/sandipnirmal)

- [https://github.com/NoumanHere/COVID-19-Using-Django](https://github.com/NoumanHere/COVID-19-Using-Django), (Django, Python) by [Nouman](https://github.com/NoumanHere/)

- [https://github.com/mazik/corona-tracker/](https://github.com/mazik/corona-tracker/), (A Google Chrome extension for tracking CORONAVIRUS - COVID-19 update) by [Md Mazedul Islam Khan](http://twitter.com/iamazik/)

- [https://github.com/johanneshaberlah/corona-dashboard](https://github.com/johanneshaberlah/corona-dashboard), (Java, Spring) by [Johannes Haberlah](https://github.com/johanneshaberlah)

- [https://krishnatre-siddhartha.github.io/](https://krishnatre-siddhartha.github.io/), (HTML+JS) by [Siddhartha Sharma](https://github.com/krishnatre-siddhartha/)

- [Corona Count](https://coronacount.co), (Next.js) by [Ankit](https://github.com/nnnkit) [Suraj](https://github.com/suraj122)

- [https://github.com/NicolaLisci/COV1D9](https://github.com/NicolaLisci/COV1D9), (Angular 9, Typescript) by [Nicola Lisci](https://github.com/NicolaLisci) [DEMO](https://cov1d9.web.app/)

- <https://mzaini30.js.org/covid19>. Source: <https://github.com/mzaini30/covid19/>. By: [@mzaini30](https://github.com/mzaini30)

- [https://github.com/oniharnantyo/covid-19-telegram-bot](https://github.com/oniharnantyo/covid-19-telegram-bot), (Telegram Bot, Golang) by [Oni Harnantyo](https://github.com/oniharnantyo/covid-19-telegram-bot)

- [https://github.com/dabigjoe6/react-native-covid19](https://github.com/dabigjoe6/react-native-covid19), (React Native) by [Joseph Olabisi](https://github.com/dabigjoe6)

- [https://fight-covid19.netlify.app/](https://fight-covid19.netlify.app/), (Gatsby, React) by [Jason Zheng](https://github.com/bilafish)

- [https://github.com/mastersam07/toju_wa](https://github.com/mastersam07/toju_wa), (Flutter) by [@Mastersam07](https://github.com/mastersam07)

- [https://github.com/flborrelli/covid-19-updates](https://github.com/flborrelli/covid-19-updates), (React + Semantic UI) by [Fernando Lima Borrelli](https://github.com/flborrelli)

- [covid19-graphql-api.herokuapp.com](https://covid19-graphql-api.herokuapp.com/api/graphql), (GraphQL) by [Rene Osman](https://github.com/rosman21)

- [http://corona.milestonetechs.com/](http://corona.milestonetechs.com/) by [omarjamal1](https://github.com/omarjamal1)

- [https://coronnavirusapp.firebaseapp.com/](https://coronnavirusapp.firebaseapp.com/), (Angular/Ionic) by [Rayden2015](https://github.com/Rayden2015)

- [https://github.com/melvinalmonte/covid-bot](https://github.com/melvinalmonte/covid-bot), (Chatbot using Google's Dialogflow + NextJS Wrapper) by [Melvin Almonte](https://github.com/melvinalmonte)

- [https://cdmoro.github.io/covid-19-stats/](https://cdmoro.github.io/covid-19-stats/) [https://github.com/cdmoro/covid-19-stats](https://github.com/cdmoro/covid-19-stats) React, by [cdmoro](https://github.com/cdmoro)

- [https://tracking-corona.web.app/](https://tracking-corona.web.app/) [https://github.com/JakMar17/CoronaTracker](https://github.com/JakMar17/CoronaTracker) by [JakMar17](https://github.com/JakMar17)

- [https://covid19site.netlify.com/](https://covid19site.netlify.com/) (Vue.js) by [Ihsan Nurul Habib](https://github.com/ihsaninh)

- [https://github.com/ihsaninh/covid-19-reactnative](https://github.com/ihsaninh/covid-19-reactnative), (React Native) by [Ihsan Nurul Habib](https://github.com/ihsaninh)

- [https://github.com/AbdullahChauhan/Coronavirus-COVID-19-Tracker](https://github.com/AbdullahChauhan/Coronavirus-COVID-19-Tracker), (Flutter) by [Abdullah Chauhan](https://github.com/AbdullahChauhan)

- [https://github.com/dynamicbalaji/covid19-tracker](https://github.com/dynamicbalaji/covid19-tracker), (React) by [Balaji Ashok Kumar(BK)](https://github.com/dynamicbalaji)

- [https://covid19.sznm.dev](https://covid19.sznm.dev), (Gatsby, Nivo) by [Agustinus Nathaniel](https://github.com/sozonome)

- [https://github.com/ZuTechV2/c19stats](https://github.com/ZuTechV2/c19stats), [https://zu-c19stats.netlify.app](https://zu-c19stats.netlify.app), (VueJS) by [Zu Tech V2](https://github.com/ZuTechV2)


## License

MIT License 2020, mathdroid.

Transitively from the Johns Hopkins Site, the data may not be used for commercial purposes.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://mathdro.id/"><img src="https://avatars2.githubusercontent.com/u/3748658?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Odi</b></sub></a><br /><a href="https://github.com/mathdroid/covid-19-api/commits?author=mathdroid" title="Code">💻</a> <a href="https://github.com/mathdroid/covid-19-api/commits?author=mathdroid" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/k1m0ch1"><img src="https://avatars0.githubusercontent.com/u/5756522?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yahya Fadhlulloh Al-Fatih</b></sub></a><br /><a href="https://github.com/mathdroid/covid-19-api/commits?author=k1m0ch1" title="Code">💻</a></td>
    <td align="center"><a href="https://bit.ly/resumerino"><img src="https://avatars3.githubusercontent.com/u/62529025?v=4?s=100" width="100px;" alt=""/><br /><sub><b>spiritbro1</b></sub></a><br /><a href="https://github.com/mathdroid/covid-19-api/commits?author=spiritbro1" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/YogaSakti"><img src="https://avatars2.githubusercontent.com/u/24309806?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Imperial Owl</b></sub></a><br /><a href="https://github.com/mathdroid/covid-19-api/commits?author=YogaSakti" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
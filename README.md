<p align="center">
  <img width="500" src="https://covid19.mathdro.id/api/og" />
</p>

# COVID-19 API

> Serving data from John Hopkins University CSSE as a [JSON API](https://covid19.mathdro.id)

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

## Usage

1. Clone

2. Install deps (`yarn`, `npm install`)

3. Install and register to [ZEIT Now](https://zeit.co/now) if you haven't. This project is exclusively made for the platform.

4. `now dev` to run a local dev deployment, `now` to publish.

## Showcase

- [17 responsible live visualizations about the coronavirus, for you to use](https://blog.datawrapper.de/coronaviruscharts/), (Web) by [Datawrapper](https://datawrapper.de)

- [Android kotlin-mvvm-covid19](https://github.com/rizmaulana/kotlin-mvvm-covid19), (Android) by [Rizki Maulana](https://github.com/rizmaulana)

- [https://github.com/andreyyoshua/Covid-19](https://github.com/andreyyoshua/Covid-19), (iOS) by [Andrey Yoshua](https://github.com/andreyyoshua)

- [https://github.com/pararang/vue-covid](https://github.com/pararang/vue-covid), (VueJS) by [Muhammad Ikhsan](https://github.com/pararang)

- [https://github.com/pooladkhay/covid19](https://github.com/pooladkhay/covid19), (React, NextJS) by [Mohammad Javad Pooladkhay](https://mamadev.ir)

## License

MIT License 2020, mathdroid.

Transitively from the John Hopkins Site, the data may not be used for commercial purposes.

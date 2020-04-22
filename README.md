# Klassen-indeler voor corona-regels

Op 21 april 2020 heeft de Nederlandse overheid
[aangekondigd](https://www.rijksoverheid.nl/actueel/nieuws/2020/04/21/maatregelen-corona-verlengd)
dat de scholen vanaf 11 mei 2020 weer open mogen, met daarbij de volgende voorwaarde:

> Basisscholen in het primair onderwijs halveren de groepsgrootte in de klas; kinderen gaan daarbij
> ongeveer 50% van de tijd naar school. De dag dat de leerlingen niet op school verblijven, wordt op
> een andere wijze ingevuld. Die invulling wordt bepaald door de school en de leraren.
>
> De praktische invulling van dit principe ligt de komende tijd bij de scholen. Zij gaan dit verder
> uitwerken; daarbij kunnen verschillen tussen scholen ontstaan. Scholen informeren ouders over wat
> dit voor het onderwijs van hun kinderen precies betekent.

Het zou kunnen dat je als school de groepen in twee ongeveer even grote stukken wilt verdelen,
en daarbij rekening wilt houden met kinderen uit hetzelfde gezin, zodat die in hetzelfde tijdslot zitten.
Dat is prettig voor de ouders, maar scheelt ook vervoersbewegingen en verlaagt daarmee kans op besmetting.

# Hoe werkt het

Je maakt een spreadsheet met daarin alle klassen, de namen van de leerlingen en de adressen. Die spreadsheet
geef je aan de tool, en die verzint een goed tijdslot.

De tool staat online op: https://klassenindeling.gek.nl

Met dank aan Bert Slagter voor de PHP code https://github.com/bslagter
Angular code door Eds Keizer https://github.com/edskeizer (GeK)


# Zelf hosten?

Wil je – *bijvoorbeeld om absoluut zeker te weten dat niets op andermans server draait* – deze tool zelf hosten of draaien in een container? Daarvoor kun je Docker gebruiken (lokaal), Netlify of Google Cloud Run (hosted op GCP).

## Build een container (Docker)
```
docker build -t klassen-indeling .
```

## Start de Container
```
docker run --rm -p 80:8080  -it klassen-indeling
```

Open [http://localhost](http://localhost) in je browser

## Netlify
Als je een Netlify account hebt en op onderstaande knop klikt, wordt deze applicatie op Netlify geplaatst:

[![Run on Google Cloud](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/rogiervandenberg/klassen-indeling)

Netlify kun je gratis gebruiken 🎉

## Cloud Run
Als je op de onderstaande Cloud Run-knop klikt, wordt deze applicatie in een Container gestopt, naar de Google Container Registry gepusht en op [Cloud Run](https://cloud.google.com/run) gestart, in jouw eigen Google Cloud Platform omgeving.

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run/?git_repo=https://github.com/rogiervandenberg/klassen-indeling)

De eerste 2 miljoen requests per maand zijn gratis!
# SpaceX test Api

**Projekt można zobaczyć na:** [click here to see the result.](https://kombajn27.github.io/spacex_test_api/)

## Opis

Aby uruchomić aplikajcę należy:

1. Skopiować repozytorium

```
git clone git@github.com:ArlBiern/spacex_test_api.git
```

2. Zainstalować wszelkie potrzebne paczki

```
cd spacex_test_api
npm i
```

3. Uruchomić aplikację lub testy

```
npm start
npm test
```

### Wykorzystane technologie

- React (+ hooks)
- Redux Toolkit
- CSS

### Podstawowe informacje

- Cała aplikacja bazuje na wykorzystaniu React, React Hooks oraz Redux Toolkit (zarządzenie stanem).
- Do pobierania danych wybrano metodę POST wraz z queries. Pozwala to na obsługę jednym zapytaniem wszystkich zmiennych wpływających na odpowiedź.
- Do podpięcia kalendarza wykorzystano komponent DataRangePicker z Rsuite. Nie znaleziono gotowej funkcjonalności, która by bliżej odpowiadała założonej grafice. Pozostałe stylowanie przeprowadzono bez wykorzystania dodatkowych bibliotek.
- Wykorzystano podstawowy routing (HashRouter) do wyświetlenia szczegółowych informacji o danym locie (przekierowanie z wykorzystaniem id lotu).
- Wykonano także podstawowe testy w oparciu o bibliotekę testową React.

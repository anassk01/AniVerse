# AniVerse

A React SPA for discovering anime (via the Jikan API) and managing a personal
collection (favorites, ratings, library) persisted through json-server.

## Setup

```
npm install
```

## Running the app

You need **two terminals running at the same time**:

**Terminal 1 - the local database (json-server):**
```
npm run server
```
This serves `db.json` at `http://localhost:3001` with 3 resources:
`/favorites`, `/ratings`, `/library`.

**Terminal 2 - the React app:**
```
npm run dev
```
Open the URL Vite prints (usually `http://localhost:5173`).

> The app will still load and browse anime without json-server running -
> only favorites/ratings/library actions need it. If it's not running,
> those pages will show a clear error message instead of crashing.

## Project structure

```
src/
  api/
    jikan.js       - all calls to the Jikan API (external anime data)
    localApi.js     - GET/POST/PUT/DELETE helpers for json-server
  context/
    AppDataContext.jsx  - favorites/ratings/library state, shared app-wide via Context
  components/
    Navbar, Card, AnimeCard, CharacterCard, Pagination,
    SearchBar, RatingForm, StatusUI (Loader/ErrorMessage/EmptyState)
  pages/
    Landing, AnimeList, AnimeDetailLayout + AnimeDetail + AnimeCharacters
    (nested routes), CharactersList, CharacterProfile,
    Favorites, MyRatings, MyLibrary, Dashboard
```

## Notes

- Every API call (Jikan or local) follows the same loading / error / empty
  pattern - look at any page component for the shape.
- `/anime/:id` and `/anime/:id/characters` are nested routes sharing one
  layout (`AnimeDetailLayout`) - the anime is fetched once and passed to
  both child routes via `<Outlet context={{ anime }} />` +
  `useOutletContext()`.
- Favorites/ratings/library records store a copy of the anime's title/image
  (and genres, for favorites) at the time they're saved, so pages like
  Favorites/Dashboard don't need extra API calls just to display a list.

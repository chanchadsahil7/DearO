# Node Scrapper

This app is used to fetch repo list from this link: https://github.com/search?o=desc&q=nodejs&s=updated&type=Repositories

## Installation

```bash
npm install
```

## Usage

```bash
node server.js
```

## APIs

1) `/scrape` : calls a function from scrape.js to scrape the data and stores it in mongo db.

2) `/search` : takes url params as title, desc, and language to search the data from the mongo db using regex match.

## Files

1) `server.js` : contains the main server code to run and handle api request.

2) `scrape.js` : contains js script to scrape the data from thr given link.

3) `schema.js` : contains the schema for the repoList collection whate data will be stored.

## limitations

1) for now connection to mongo db is opened and closed for each request which should be changed to a server session.

# Real time map with leaflet, node js and socket.io

Just a fun map to play around with real-time markers.

## Requirements 
- Node js
- PostgreSQL


## Installation

Clone the repository on your local machine.

Use the package manager [npm](https://nodejs.org/en/) to install the dependencies.

```bash
npm install 
```

Run these PostgreSQL queries:

```bash
CREATE DATABASE points;
CREATE TABLE points (
    lat real,
    lng real
);
```
Run this command
```bash
npm start
```
Go to http://localhost:3000/ on your browser and we're good to go!
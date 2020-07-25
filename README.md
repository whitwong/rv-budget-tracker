# 🚐💨 rv-budget-tracker
A personal project of mine to create a mini dashboard to reference and show the expenses made while RV traveling in 2019. It's still an active project (as is usually the case with most projects) that I'm tidying up. Currently the app looks best on desktop, but actively working on making the design more mobile-friendly.

Please have look here:
[https://rv-budget-tracker.herokuapp.com/](https://rv-budget-tracker.herokuapp.com/)

# 🎉 Getting Started
1. `git clone https://github.com/whitwong/rv-budget-tracker.git`

1. Open 2 iTerm2 windows. To start your server, in one window run:
```
cd rv-budget-tracker
nodemon index.js
```

To start your client, in the other window run:
```
cd rv-budget-tracker/client
npm start
```

3. To hit endpoints in Postman, use proxy address listed in `client/package.json`. Examples:
```
http://localhost:3001/ping
http://localhost:3001/getCategoryTotals
```

If I placed the data in a public space, then:
1. Copy or pg_restore data to local DB
1. In `server/config.js`, add or replace 'postgres://whitneywong@localhost:5432/rv' with your local DB connection string.


## 🥞 **Project Tech Stack**
- React
- Express
- Postgresql
- Recharts
- Material UI
- Nodemon

## 🔧 **Tools Used for Development/Deployment**
- GitHub
- Heroku
- Visual Studio Code
- Postman
- Postico
- iTerm2
- MacBook Pro (2017)
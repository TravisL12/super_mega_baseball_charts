# Super Mega Baseball 3 Players

I found this data within the SMB3 `sqlite` database located within the `Steam` program files on Windows 10.

## Player Images
Download all the player images from : https://drive.google.com/drive/u/0/folders/1RtlftwSAvzLRdTmpspko-ejrwEhGO6Rl

## Querying database

The database was named `bigfly.sqlite`, I made a copy of it and used `sqlite3` to dig into the database schema. Some quick commands for `sqlite3`:

- `.open <db name>` open the database.
- `.tables` displays the db tables to begin queries.
- `.headers on` displays headers in db output.
- `SELECT * from <table_name>` simple query use `limit 10` to just see the headers.
- `.output output.csv` to output the query to a CSV file

Additional data for the options was shared to me.

## Queries used

These are some simple queries used to eventually output the data in this site. I added the headers for each of the table outputs.

##### BASEBALL PLAYER ABILITIES

```
GUID | originalGUID | teamGUID | power | contact | speed | fielding | arm | velocity | junk | accuracy | age
select * from t_baseball_players;
```

##### BASEBALL PLAYER NAMES/POSITION

```
baseballPlayerGUID | firstName | lastName | primaryPosition | pitcherRole
select * from v_baseball_player_info;
```

##### TEAM TYPES

```
select * from t_team_types;
teamType | typeName
0, standard
1, sandbox
2, template
```

##### TEAMS

```
GUID | originalGUID | teamName | isBuiltIn | isGenerated | teamType | templateTeamFamily | isHistorical
select * from t_teams;
```

##### GET PLAYERS AND ABILITIES AND TEAMS

```
select
    team.teamName,
    vbpi.firstName,
    vbpi.lastName,
    vbpi.primaryPosition,
    vbpi.pitcherRole,
    tbp.power,
    tbp.contact,
    tbp.speed,
    tbp.fielding,
    tbp.arm,
    tbp.velocity,
    tbp.junk,
    tbp.accuracy,
    tbp.age
from v_baseball_player_info vbpi
join t_baseball_players tbp
    on vbpi.baseballPlayerGUID = tbp.GUID
join t_teams team
    on tbp.teamGUID = team.GUID
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

BE CAREFUL NOT TO RE-UPLOAD THE PLAYER IMAGES OVER AND OVER AGAIN!!!!!!!!!!!!!!!!!!!!!

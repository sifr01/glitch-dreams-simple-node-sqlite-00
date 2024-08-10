# sifr's notes

## Github repo sync:
When you import a GitHub repository into Glitch, it does not automatically set up a Git remote.
You can manually initialize a Git repository and add a remote and then manually push or pull changes from within the glitch terminal:

1. Open the Terminal: In your Glitch project, click on the Tools button at the bottom left and select Terminal.

2. Initialize Git (if necessary): If your project is not already a Git repository, you can initialize it:

`git init`

3. Add the Remote: You can add your GitHub repository as a remote. Replace username and repo-name with your GitHub username and repository name:

`git remote add origin https://github.com/username/repo-name.git`

4. Verify the Remote: Now, if you run git remote -v, you should see the remote repository listed:

`git remote -v`

5. For each commit to github, you will need to run the following in the glitch terminal to sync:

`git pull`

## Running the app locally:

Be sure to create the necessary folder and install dependencies

```
mkdir .data
npm install
sudo apt install sqlite3
```

## SQLite database:
1. SQLite3 database is can be found by accessing the terminal in glitch:

`sqlite3 .data/sqlite.db`

2. Then view tables:

`.tables`

3. Then:

`SELECT * FROM Dreams;`

4. To leave the sqlite3 prompt:

`.quit`

-----------------------------------

## Example API call data:

Endpoint: 

`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=${startTimestamp}&end=${endTimestamp}`

Data as stored in DB:
```
10|{"data":[{"height":-0.9937196070594816,"time":"2024-08-09T23:47:00+00:00","type":"low"},{"height":0.8685125273601144,"time":"2024-08-10T05:57:00+00:00","type":"high"},{"height":-0.8766247267372509,"time":"2024-08-10T11:56:00+00:00","type":"low"},{"height":0.9125929883379379,"time":"2024-08-10T18:10:00+00:00","type":"high"},{"height":-0.8647022223319859,"time":"2024-08-11T00:20:00+00:00","type":"low"},{"height":0.7608925307060468,"time":"2024-08-11T06:34:00+00:00","type":"high"},{"height":-0.7314693024644449,"time":"2024-08-11T12:34:00+00:00","type":"low"},{"height":0.746783704972198,"time":"2024-08-11T18:49:00+00:00","type":"high"}],"meta":{"cost":1,"dailyQuota":10,"datum":"MSL","end":"2024-08-11 22:59","lat":40.4511,"lng":-8.8067,"offset":0,"requestCount":1,"start":"2024-08-09 23:00","station":{"distance":23,"lat":40.65,"lng":-8.75,"name":"aveiro","source":"sg"}}}|1723295160576
```

-----------------------------------


# hello-sqlite

A starter that has a database

- This app uses sqlite but you can power your apps with [a number of other storage options](https://glitch.com/storage)
- `sqlite.db` is created and put into the `.data` folder, a hidden directory whose contents aren’t copied when a project is remixed. You can see the contents of `.data` in the console under "Logs"
- To save to the database, remix this app!

On the front-end,

- Edit `views/index.html`,  `public/style.css`, and `public/client.js`
- Drag in `assets`, like images or music, to add them to your project

On the back-end,

- Your app starts at `server.js`
- Add frameworks and packages in `package.json`
- Safely store app secrets in `.env` (nobody can see this but you and people you invite)

Click `Show` in the header to see your app live. Updates to your code will instantly deploy.


## Made by [Glitch](https://glitch.com/)

\ ゜ o ゜)ノ

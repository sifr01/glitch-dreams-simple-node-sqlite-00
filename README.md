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

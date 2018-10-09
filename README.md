# fundooNotes_node_backend

## Folder Structure

After creation, your project should look like this:

```
NodeServer/ 
  node_modules/ 
  server/
    config/
        database.js
        settings.js
    controllers/
        labelController.js
        noteController.js
        userController.js
    models/
        Labels.js
        Notes.js
        Users.js
    routes/
        api/
            labels.js
            notes.js
            users.js
    services/
        labelServices.js
        noteServices.js
        userServices.js
  index.js 
  package.json
  README.md 
```

For the project to build, **these files must exist with exact filenames**:

* `index.js` is the JavaScript entry point.

You can delete or rename the other files.

## Available Scripts

In the project directory, you can run:

### `npm run server`

Runs the app in the development mode.<br>
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

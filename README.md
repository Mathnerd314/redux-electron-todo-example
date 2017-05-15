# Todo example

Todo List Application example

![screenshot](http://i.imgur.com/aipE0VJ.png)

Frameworks: React + Redux + Electron + Material UI + Sass + Browserify + Gulp

## How to get started

```
npm install -g gulp-cli
npm install
gulp serve
```

### Hacking

- Open up the app: `gulp serve`. This will watch for changes, and live reload on edits.
- Lint / Prettify (StandardJS + .eslintrc): `gulp lint`
- Commit
- Package the app for release: `gulp package`.

### Features

- [x] Resizable/frameless
- [x] Save data to localStorage.
- [x] Tie appbar exit button to electron.
- [x] Minimize to system tray.
- [ ] Export to PDF functionality (for safe keeping).
- [ ] Make sure reducers are pure functions.

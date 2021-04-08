# Step by Step

## Initialize


### Create package.json 
We can use yarn or npm or just touch package.json and edit. For more information of structure read [npm](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#engines)

```bash
$ yarn init
```

### Create the gitignore
```bash
$ touch .gitignore
```

Edit the file with the following content
```
  # Log files
  logs
  *.log
  *-debug.log
  *-error.log

  # Standard lib folder
  /lib

  # Standard dist folder
  /dist

  # Tooling files
  node_modules

  # Temp directory
  /tmp

  # Jest coverage folder
  /coverage

  # MacOS system files
  .DS_Store

  # Windows system files
  Thumbs.db
  ehthumbs.db
  [Dd]esktop.ini
  $RECYCLE.BIN/
```

### Module Resolution
There are two ways: 

- Add a lwc.config.json file at the root of the project.
- Add an lwc key to the package.json file.

Lets add to package.json the following:

```
"lwc": {
        "modules": [
            /* list of module records */
            {
                "dir": "src/modules"
            }
        ]
    }
}
```

### Create basic folder structure for source code

```bash
$ mkdir src
$ cd src
$ mkdir modules
```

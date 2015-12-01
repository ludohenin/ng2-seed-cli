# angular2-seed-cli

A simple cli generator for [angular2-seed](https://github.com/mgechev/angular2-seed).

_Not yet publish to npm_


## How to start

```bash
npm install -g ng2-seed-cli # when available from npm

# In the meantime
git clone https://github.com/ludohenin/ng2-seed-cli
cd ng2-seed-cli
npm install
npm link
cd #../YOUR_ANGULAR2_SEED_PROJECT_DIR

# command must be executed from project root
ng2-seed new cmp blog    # ng2-seed new <cmp_name> <path> path is relative to app.
ng2-seed new service blog/services/api
ng2-seed new directive blog/directives/is-active
```

## Configuration

In package.json, add:

```json
// Default values.
{
  // ...
  "ng2-seed-cli": {
    "project_base" : "app",
    "templates": {
      "cmp": {
        "folder_name": "components",
        "suffix_name": "cmp"
      },
      "service": {
        "folder_name": "services",
        "suffix_name": "service"
      },
      "directive": {
        "folder_name": "directives",
        "suffix_name": "directive"
      }
    }
  }
}
```


## TODO

* [ ] init (blankify seed)
  * [ ] rm -rf .git
  * [ ] empty readme (append app name)
  * [ ] app name
  * [ ] app title
  * [ ] ...
* [x] Configure from package.json
* [x] Generator
  * [x] Components
  * [x] Directives
  * [x] Services
  * [ ] Pipes
* [ ] Custom templates
* [ ] Rename components
* [ ] Documentation
* [ ] ... _Any needs ?_
* [ ] Unit test

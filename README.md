# [jslip](https://c-dante.github.io/jslip)
A JavaScript library playground.

# build

`npm run server` for developing

`npm run compiler` to build to `./bin`

`npm run linter` to lint code

`npm test` host tests at `localhost:8080/test.bundle`

# best practise
Instead of cloning or forking this repo, simply make a new repo and add this repo as a remote resource.

Feel free to replace `build` with whatever remote name you like.
```sh
# Setup (do once, only persists in your local folder):
# navigate to project that wants to use browser-base
$> cd ./my-git-project
# Add a remote repo ("build" can be any name -- even "upstream")
$> git remote add build git@github.com:c-dante/browser-base.git

# To update build:
$> git checkout master
$> git fetch build
$> git merge build/master
```

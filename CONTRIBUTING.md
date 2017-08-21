# Contributing

### Fork the repo

Use github’s interface to make a fork of the repo, then add that repo as an upstream remote:

```
git remote add upstream https://github.com/reactorcore/<NAME_OF_REPO>.git
```

1. Do 'git pull --rebase upstream master' on the master branch of your forked repo
1. Cut a namespaced feature branch from master using the following convention
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...

  for example: 'git checkout -b test/newTest'

1. Switch to your branch (in terminal or in editor)
1. Do a 'git pull --rebase upstream master' in your feature branch
1. Make commits to your feature branch
1. Do a 'git pull --rebase upstream master' to check for conflicts
1. Push the commits on your feature branch to Github
1. Open a pull request on your feature branch
1. Assign two reviewers
1. After the pull request is merged, switch back to your master branch in your terminal or editor
1. Do a 'git pull --rebase upstream master' to bring the changes from your merged PR into your local master branch
1. Do a 'git status' to check if there are any commits on your local master branch that need to be pushed
1. Push any commits that exist in order to bring your local master branch in sync with your master branch on github
1. Start from the top for your next feature branch

## General Workflow

1. Fork the repo
1. Cut a namespaced feature branch from master
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...
1. Make commits to your feature branch. Prefix each commit like so:
  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...
1. When you've finished with your fix or feature, Rebase upstream changes into your branch. submit a [pull request][]
   directly to master. Include a description of your changes.
1. Your pull request will be reviewed by another maintainer. The point of code
   reviews is to help keep the codebase clean and of high quality and, equally
   as important, to help you grow as a programmer. If your code reviewer
   requests you make a change you don't understand, ask them why.
1. Fix any issues raised by your code reviwer, and push your fixes as a single
   new commit.
1. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.

## Development Workflow
1. Open a terminal window alongside your editor and browser
1. Run 'npm start' window which will load the React dev live server and proxy any requests to the Express backend along with opening a browser window to view the changes
1. Make changes to the code and save to see live client and server updates.

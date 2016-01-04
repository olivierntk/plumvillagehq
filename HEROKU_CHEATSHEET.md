## Heroku's cheatsheet

### Start the app
`heroku local web`

### Push to heroku
`git push heroku master`

### Know what dynos are running which process types
`heroku ps`

### See the audit trail of release deploys
`heroku releases`

### rollback and deploy a previous release
`heroku releases:rollback v102`

### View logs
`heroku logs`
`heroku logs --ps web.1 --tail`

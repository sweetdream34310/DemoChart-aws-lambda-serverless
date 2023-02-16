# Democharts backend

## Getting started

Login to serverless (you probably need the [sls cli](https://www.npmjs.com/package/serverless) installed globally for this to work)

```shell
sls login
npm install
```

That's it!

If you search for a way to start the backend locally - you won't find an easy option. For developing purpose, deploy your changes to dev stage.

##Deployment
```shell
# Go to specific path, e.g. cd ./src/dashboard
cd ./src/{path}

# sls is a shortcut for serverless, you can use both commands
# per default, this deploys only to dev stage.
sls deploy

# function only
sls deploy -f FUNCTIONNAME

# deploy to prod
sls deploy -s prod

# (debugging) get latest logs from specific function
sls logs -f FUNCTIONNAME

```

Of course, you can combine flags like -s and -f .

##AWS, Logs,...
Currently, everything is stored in Frankfurt.

Logs can be found in [Cloudwatch -> Logs -> Log Groups](https://eu-central-1.console.aws.amazon.com/cloudwatch/home?region=eu-central-1#logsV2:log-groups)


## Manipulate Tables
After adding / removing / changing some tables or columns, we need to tell the database to manipulate those fields we added/removed/... do the following:
To easy handle this case, we've implemented an endpoint. After you've deployed your function, you will also have to update this endpoint.
```
cd src/dashboard
serverless deploy -f updateDBColumns
```
(If you deploy something for production mode, add serverless deploy -s prod)

After this, go to the democharts dashboard (depending on your stage https://dashboard.democharts.org/ or https://test-dashboard-democharts-org.netlify.app/)
Here, go to the admin tab and click "Update DB - Columns". This updates the sql scheme on backend side.


## Others
Each folder in the src directive is a sls project that can be deployed.
Each folder includes thematically grouped functions. 
For example, the mollie folder includes all functions needed to perform a mollie payment.  

## Links
[sls on windows conflict solution](https://stackoverflow.com/a/43302844/3461920)  
[example yaml by serverless](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml)  
[sequelize orm](https://sequelize.org/)  
[sequelize typescript](https://www.npmjs.com/package/sequelize-typescript)
[HeidiSQL](https://www.heidisql.com/)
[PuTTY](https://www.putty.org/)

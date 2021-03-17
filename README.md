# Stencil setup

## Single environment stencil setup
For projects with single environments, we can have a standard setup

### For the packages.json
```json
"lint": "eslint assets/js/theme/_customisations/**",
"moveStencil": "mv .stencil-$npm_config_env .stencil",
"resetStencil": "mv .stencil .stencil-$npm_config_env",
"bcs": "npm run moveStencil --env=$npm_config_env && stencil start && npm run resetStencil --env=$npm_config_env",
"bcp": "npm run moveStencil --env=$npm_config_env && npm run lint && stencil push && npm run resetStencil --env=$npm_config_env",
"bcb": "npm run lint && stencil bundle"
```

### Files
- .stencil-prod

### Example commands
- Check linting: `npm run lint`
- Start local environment: `npm run bcs --env=prod`
- Rename stencil file back to default: `npm run bcr --env=prod`
- Push to production environment: `npm run bcp --env=prod`

## Multi-environment Stencil setup
For projects with multiple environments, we need to be careful and concise with what code we push to what environment. The following will force this.
(_NOTE_: If the project has Stencil CLI install locally to the project, this will need to be uninstalled: `npm uninstall @bigcommerce/stencil-cli --save-dev`)

### Files
- .stencil-prod
- .stencil-stage
- .stencil-test

### Example commands
- Check linting: `npm run lint`
- Start local environment: `npm run bcs --env=prod`
- Rename stencil file back to default: `npm run bcr --env=prod`
- Push to production environment: `npm run bcp --env=prod`
- Start local environment: `npm run bcs --env=stage`
- Rename stencil file back to default: `npm run bcr --env=stage`
- Push to staging environment: `npm run bcp --env=stage`
- Start local environment: `npm run bcs --env=test`
- Rename stencil file back to default: `npm run bcr --env=test`
- Push to test environment: `npm run bcp --env=test`

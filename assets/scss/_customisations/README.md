# Enable CSS customisations in theme

1. Add the following line to `theme.scss` file to add the customisations to the main load:
```scss
@import "_customisations/customisations";
```

## Add files to the customisation list
The structure here should follow closely to the `templates` folder structure. If CSS is being done for a component, then the file should follow the same structure as the related .html file.
For example, if you create a component in `templates/components/example/test-component.html` then the scss file would go in `assets/scss/_customisations/components/example/test-component.scss`
An exception would be for custom templates, styling for these can simply live under `assets/scss/_customisations/pages/`.
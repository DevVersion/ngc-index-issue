# ngc-index-issue
NGC issue with Flat Modules

### Reproduction

1. `npm run build`
2. Notice that the `dist/index.js` file is empty. This happens because the `flatModuleId` is set to `index.js`.

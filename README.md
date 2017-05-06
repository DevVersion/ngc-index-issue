# ngc-index-issue
NGC issue with Flat Modules

In Material v2+ we want to compile the different secondary entry-points and we want to have a `index.js` file.

> e.g. https://github.com/angular/material2/tree/master/src/lib/button

A problem when compiling with the `flatModuleXXX` flags is that the `index.js` file will be overwritten & empty if we use the `button/index.ts` file as entry file.

The output file would look like the following:

```ts
/**
 * Generated bundle index. Do not edit.
 */
//# sourceMappingURL=index.js.map
```

This issue is not a big deal because we can just set the `flatModuleOutFile` flag to a file like `index-flat.js`.

```
|-- src
  |- index-flat.d.ts
  |- index-flat.js
  |- index-flat.metadata.json
  |- index.d.ts
  |- index.js
  |- my-exports.d.ts
  |- my-exports.js
```

At some point we want to create a flat ESM bundle of the `.js` files and we just run rollup to bundle the `index-flat.js` file.

The generated bundle will then be called `index.js` (as an entry file) and the `index.d.ts` and metadata file should be next to the generated bundle.

The issue is that we cannot just rename the `index-flat.d.ts` to `index.d.ts` because under-the-hood the `flat-index.d.ts` still tries to re-export everything from the `index.d.ts` file.

```ts
/**
 * Generated bundle index. Do not edit.
 */
export * from './index';

```

This sounds very complicating and confusing. In short terms, we just want to create a `flatModule` out of a `index.ts` file where the `flatModuleOutFile` will be called `index.js` too.

Renaming the `index.ts` file to something like `public_api.ts` would work, but I feel like it would be weird to have inside of our code-base.


### Reproduction

1. `npm run build`
2. Notice that the `dist/index.js` file is empty. This happens because the `flatModuleId` is set to `index.js`.

# react-lazily

[![minzip size](https://badgen.deno.dev/bundlephobia/minzip/react-lazily)](https://bundlephobia.com/result?p=react-lazily)
[![install size](https://badgen.deno.dev/packagephobia/install/react-lazily)](https://packagephobia.com/result?p=react-lazily)
[![dependency count](https://badgen.deno.dev/bundlephobia/dependency-count/react-lazily)](https://bundlephobia.com/result?p=react-lazily)

`react-lazily` is a simple wrapper around `React.lazy` (or `loadable` from `@loadable/component`) that supports named imports.

## Usage

Consider a component `MyComponent` that is exported with a default export:

```ts
export default MyComponent;
```

Per React docs, you could use `React.lazy` as follows:

```ts
const MyComponent = React.lazy(() => import('./MyComponent'));
```

However, if the component is exported with a named export:

```ts
export const MyComponent = ...
```

You would have to use `React.lazy` like this:



But if the component is exported with named export `export const MyComponent = ...` then you have to do:

```ts
const MyComponent = React.lazy(() =>
  import('./MyComponent').then((module) => ({ default: module.MyComponent }))
);
```

With `react-lazily` it becomes:

```ts
const { MyComponent } = lazily(() => import('./MyComponent'));
```

## Full example

See the live example: https://codesandbox.io/s/react-lazily-example-p7hyj

```ts
import React, { Suspense } from 'react';
import { lazily } from 'react-lazily';

const { MyComponent } = lazily(() => import('./MyComponent'));

const App = () => {
  const [open, setOpen] = React.useReducer(() => true, false);

  return (
    <>
      {open ? (
        <Suspense fallback={<div>Loading...</div>}>
          <MyComponent />
        </Suspense>
      ) : (
        <button onClick={setOpen}>Load</button>
      )}
    </>
  );
};
```

## Full Example with @loadable/component

Don't forget to install `@loadable/component` first.

```ts
import React from 'react';
import { loadable } from 'react-lazily/loadable';

const { MyComponent } = loadable(() => import('./MyComponent'), {
  fallback: <div>Loading...</div>,
});

const App = () => {
  const [open, setOpen] = React.useReducer(() => true, false);

  return (
    <>
      {open ? <MyComponent /> : <button onClick={setOpen}>Load</button>}
    </>
  );
};
```

## Related

- [Allow for named imports in React.lazy (GitHub Issue)](https://github.com/facebook/react/issues/14603#issuecomment-726551598)
- [Can you deconstruct lazily loaded React components? (Stack Overflow)](https://stackoverflow.com/a/61879800/74167)
- [solidjs-lazily (NPM Package)](https://www.npmjs.com/package/solidjs-lazily)

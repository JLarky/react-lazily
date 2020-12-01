# react-lazily

react-lazily is a simple wrapper around `React.lazy` (or `loadable` from `@loadable/component`) that supports named imports.

Consider that component `MyComponent` is exported with `export default MyComponent` then per React docs you could do:

```ts
const MyComponent = React.lazy(() => import("./MyComponent"));
```

But if the component is exported with named export `export const MyComponent = ...` then you have to do

```ts
const MyComponent = React.lazy(() =>
  import("./MyComponent").then(module => ({ default: module.MyComponent}))
);
```

Using `react-lazily` you can do:

```ts
const { MyComponent } = lazily(() => import("./MyComponent"));
```

## Full example

```ts
import React, { Suspense } from 'react'
import { lazily } from 'react-lazily'

const { MyComponent } = lazily(() => import("./MyComponent"));

const App = () => {
  const [open, setOpen] = React.useReducer(() => true, false)
  return (
    <>
      {open ? (
        <Suspense fallback={<>Loading...</>}>
          <MyComponent />
        </Suspense>
      ) : (
        <button onClick={setOpen}>Load</button>
      )}
    </>
  )
}

```

## Related

* https://github.com/facebook/react/issues/14603#issuecomment-726551598
* https://stackoverflow.com/a/61879800/74167


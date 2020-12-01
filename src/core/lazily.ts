import { lazy } from 'react'

export const lazily = <T extends {}, U extends keyof T>(
  loader: (x?: string) => Promise<T>
) =>
  new Proxy(({} as unknown) as T, {
    get: (target, componentName: U) => {
      if (typeof componentName === 'string') {
        return lazy(() =>
          loader(componentName).then((x) => ({
            default: (x[componentName] as any) as React.ComponentType<any>,
          }))
        )
      }
    },
  })

import { lazy } from 'react'

export function lazily <T extends {}, U extends keyof T>(
  loader: (x?: string) => Promise<T>
) {
  return new Proxy(({} as unknown) as T, {
    get: function(target, componentName: string | symbol) { 
      if (typeof componentName === 'string') {
        return lazy(() => {
          return loader(componentName).then((x) => ({default: (x[componentName as U] as any) as React.ComponentType<any>})
         )
        })
      }
      return
    }
    })
}

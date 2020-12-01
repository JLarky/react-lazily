// @ts-ignore does not provide TypeScript definitions
import load from '@loadable/component'

// see https://loadable-components.com/docs/babel-plugin/#loadable-detection
export const loadable = <T extends {}, U extends keyof T>(
  loader: () => Promise<T>,
  opts?: any
) =>
  new Proxy(({} as unknown) as T, {
    get: (target, componentName: U) => {
      if (typeof componentName === 'string') {
        return load(() => loader().then((x) => x[componentName]), opts)
      }
    },
  })

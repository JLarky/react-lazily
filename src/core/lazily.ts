import { lazy } from 'react'

type ComponentName = string;
type Loader<T> = () => Promise<T>;
type NamedComponents = Record<ComponentName, unknown>;

export const lazily = <T extends NamedComponents>(loader: Loader<T>) => {
  return new Proxy({} as T, {
    get: (_target, name: ComponentName) => {
      return lazy(async () => {
        const module = await loader();
        const Component = module[name] as ComponentType<T>;
        if (!Component) throw new Error(`Component ${name} not found`);

        return { default: Component };
      });
    },
  });
};

# SVG Icons

**Why icons are implemented as React components instead of importing `.svg` files directly:**

1. **TypeScript friendly** – All icons are `.tsx` components with typed props.
2. **Easily styleable** – Pass `className` for dynamic sizing, colors, hover states, etc.
3. **No bundler headaches** – Works without special SVG loaders.
4. **Jest compatibility** – Direct `.svg` imports often break or require custom mocks in Jest; wrapping them in components avoids this mess entirely.
5. **Tree-shakable** – Only imports the icons you use via the `index.ts` barrel file.
6. **Consistent pattern** – All icons share the same prop signature and structure.

**Example usage:**
```ts
import { ExclamationMarkIcon } from './icons';

<ExclamationMarkIcon className="text-red-500 w-6 h-6" />

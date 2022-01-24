# use-ref-deps-effect

Effect hooks that support "ref.current" dependency

## Install

```sh
npm i use-ref-deps-effect
```

## Example

```js
import { useRefDepsEffect } from 'use-ref-deps-effect'

function Component({ outRef, prop }) {
    const inRef = useRef()

    useRefDepsEffect(() => {
        function onClick() {
            const value = inRef.current[prop]
            /* ... */
        }
        const el = outRef.current
        el.addEventListener('click', onClick)
        return () => {
            el.removeEventListener('click', onClick)
        }
    }, [outRef, inRef, prop])

    /* ... */
}
```

## Motivation

The `ref.current` for the DOM element cannot be put in the `useEffect` dependencies because it is filled after rendering.

```js
useEffect(() => {
    /* ... */
}, [ref.current]) // <= not working !
```

There are alternatives, but they are not familiar with React's general mental model. `use-ref-deps-effect` lazy evaluates the dependencies. Therefore, it supports the dependency of `ref.current` and maintains the usability of `useEffect`.

## API List

-   useRefDepsEffect
-   useRefDepsLayoutEffect

## License

MIT

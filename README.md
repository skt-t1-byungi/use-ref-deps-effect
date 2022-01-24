# use-ref-deps-hook

Effect hooks that support "ref.current" dependency

## Install

```sh
npm i use-ref-deps-hook
```

## Example

```js
import { useRefDepsEffect } from 'use-ref-deps-hook'

function Component({ outRef, prop }) {
    const inRef = useRef()

    useRefDepsEffect(() => {
        function onClick() {
            const value = inRef.current[prop]
            /* ... */
        }
        outRef.current.addEventListener('click', onClick)
        return () => {
            outRef.current.removeEventListener('click', onClick)
        }
    }, [outRef, inRef, prop])

    /* ... */
}
```

## License

MIT

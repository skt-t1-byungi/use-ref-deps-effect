# use-ref-deps-effect

[![npm version](https://badge.fury.io/js/use-ref-deps-effect.svg)](https://www.npmjs.com/package/use-ref-deps-effect)

Effect hooks that support "ref.current" dependencies

## Motivation

`ref.current` for DOM Element is `null` until the rendering is over. So it can not be used as a dependency of useEffect.

```js
useEffect(() => {
    /* ... */
}, [ref.current]) // <= not working !
```

There are some known alternatives, but they are not familiar with the react mental model. `use-ref-deps-effect` provides a mental model similar to `useEffect` by lazy evaluation of `ref.current` dependencies.

```js
useRefDepsEffect(() => {
    /* ... */
}, [ref]) // <= If ref.current changes, it runs.
```

## Install

```sh
npm i use-ref-deps-effect
```

## API

### useRefDepsEffect(callback, deps)

```js
import { useRefDepsEffect } from 'use-ref-deps-effect'
```

This is an Effect hook that supports `ref.current` dependencies.

### createRefDepsHook(useEffectLike)

This function uses the same API hook as the `useEffect` to create a hook that supports `ref.current`.

```js
import { createRefDepsHook } from 'use-ref-deps-effect'
import { useLayoutEffect } from 'react'

const useRefDepsLayoutEffect = createRefDepsHook(useLayoutEffect)
```

## Caution

### Do not cleanup using `ref.current` directly.

`ref.current` is always latest. To do cleanup, you need to capture the previous value in advance.

```js
// 🙅 Bad
useRefDepsEffect(() => {
    ref.current.addEventListener(/* ... */)
    return () => {
        ref.current.removeEventListener(/* ... */)
    }
}, [ref])

// ✅ Good
useRefDepsEffect(() => {
    const el = ref.current
    el.addEventListener(/* ... */)
    return () => {
        el.removeEventListener(/* ... */)
    }
}, [ref])
```

## License

MIT

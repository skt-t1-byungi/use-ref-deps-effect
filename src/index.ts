import { useRef, useEffect, RefObject, useLayoutEffect, EffectCallback, DependencyList } from 'react'

export const useRefDepsEffect = createRefDepsHook(useEffect)
export const useRefDepsLayoutEffect = createRefDepsHook(useLayoutEffect)

type UseEffectLike = (effect: EffectCallback, deps?: DependencyList) => void

function createRefDepsHook(useEffectLike: UseEffectLike) {
    return function (effect: EffectCallback, refDeps: DependencyList) {
        const cleanupRef = useRef<(() => void) | undefined>()
        const prevDepsRef = useRef<DependencyList>()
        useEffectLike(() => {
            const prevDeps = prevDepsRef.current
            if (
                prevDeps &&
                refDeps.every((v, i) => {
                    const prev = prevDeps[i]
                    if (isRefObj(v) && isRefObj(prev)) {
                        return v.current === prev.current
                    }
                    return v === prev
                })
            ) {
                return
            }
            cleanupRef.current?.()
            const f = effect()
            cleanupRef.current = typeof f === 'function' ? f : undefined
            prevDepsRef.current = refDeps
        })
        useEffectLike(() => {
            return () => cleanupRef.current?.()
        }, [])
    }
}

function isRefObj(ref: any): ref is RefObject<any> {
    return (ref !== null || ref !== undefined) && 'current' in ref
}
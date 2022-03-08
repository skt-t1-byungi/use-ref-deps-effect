import { test, expect, vitest } from 'vitest'
import { useRefDepsEffect } from '../src/index'
import { renderHook } from '@testing-library/react-hooks'

test('basic', () => {
    const t = vitest.fn()
    const ref = { current: 1 }

    const { rerender } = renderHook(() => {
        useRefDepsEffect(() => {
            const { current } = ref
            t('call', current)
            return () => {
                t('clear', current)
            }
        }, [ref])
    })

    expect(t.mock.calls).toEqual([['call', 1]])
    t.mockClear()

    rerender()
    expect(t.mock.calls).toEqual([])

    ref.current++
    rerender()
    expect(t.mock.calls).toEqual([
        ['clear', 1],
        ['call', 2],
    ])
})

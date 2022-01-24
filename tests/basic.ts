import { test, expect, vitest } from 'vitest'
import { useRefDepsEffect } from '../src/index'
import { renderHook, act } from '@testing-library/react-hooks'
import { useRef } from 'react'

test('basic', () => {
    const log = vitest.fn()
    let ref = { current: 1 }
    const { rerender } = renderHook(() => {
        useRefDepsEffect(() => {
            const { current } = ref
            log('call', current)
            return () => {
                log('clear', current)
            }
        }, [ref])
    })
    expect(log.mock.calls).toEqual([['call', 1]])
    log.mockClear()
    rerender()
    expect(log.mock.calls).toEqual([])
    ref.current++
    rerender()
    expect(log.mock.calls).toEqual([
        ['clear', 1],
        ['call', 2],
    ])
})

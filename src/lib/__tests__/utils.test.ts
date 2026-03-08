import { describe, it, expect } from 'vitest'
import { cn, formatDate } from '../utils'

describe('utils', () => {
    describe('cn', () => {
        it('merges tailwind classes correctly', () => {
            expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
            expect(cn('px-2 py-1', 'p-4')).toBe('p-4')
        })
    })

    describe('formatDate', () => {
        it('formats ISO string correctly', () => {
            const dateStr = '2024-01-20T10:30:00Z'
            const result = formatDate(dateStr)
            expect(typeof result).toBe('string')
            expect(result.length).toBeGreaterThan(0)
            expect(result).toMatch(/2024/)
        })
    })
})

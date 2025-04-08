import util from 'util'
import type { FetchWithTimeoutOptions } from '@/utils/types'

/**
 * Fetches data from URL with timeout functionality.
 *
 * @param url - The URL to fetch from
 * @param options - Fetch options
 * @param timeout - Optional timeout in milliseconds. Defaults to 5 seconds.
 * @param responseHandler - Optional function to handle the response. Defaults to JSON parsing.
 * @returns Promise resolving to the API response
 * @throws Error if request times out or fails
 */
export async function fetchWithTimeout<TApiResponse>(
  url: string,
  {
    options,
    timeout = 5000,
    responseHandler = async (res): Promise<TApiResponse> => (await res.json()) as TApiResponse,
  }: FetchWithTimeoutOptions<TApiResponse>,
): Promise<TApiResponse> {
  const controller = new AbortController()
  const actualTimeout = timeout > 0 ? timeout : 5000

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, actualTimeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status.toString()}`)
    }

    return await responseHandler(response)
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${actualTimeout.toString()}ms`)
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Creates a debounced function that delays the execution of the provided function
 * until after a specified wait time has elapsed since the last time it was invoked.
 * Optionally, the function can be triggered immediately on the leading edge instead of the trailing edge.
 *
 * @param callback - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @param immediate - If true, triggers the function on the leading edge instead of the trailing edge. Default is `false`.
 * @returns A debounced version of the provided function.
 *
 * @example
 * ```typescript
 * const debouncedLog = debounce(() => {
 *   console.log('Function executed after 300ms of inactivity')
 * }, 300)
 *
 * window.addEventListener('resize', debouncedLog)
 * ```
 */
export function debounce<TParams extends (...args: Array<unknown>) => void>(
  callback: TParams,
  wait: number,
  immediate = false,
): (...args: Parameters<TParams>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null

  return (...args: Parameters<TParams>) => {
    const shouldCallNow = immediate && !timeoutId

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      timeoutId = null
      if (!immediate) {
        callback(...args)
      }
    }, wait)

    if (shouldCallNow) {
      callback(...args)
    }
  }
}

/**
 * Processes a template literal string, preserving all escape sequences as raw text.
 *
 * @param strings - The raw template literal strings, which can be a `ReadonlyArray` or `ArrayLike` collection of strings.
 * @param values - The dynamic values to be interpolated within the template literal.
 * @returns The processed string with escape sequences preserved and interpolated values inlined.
 *
 * @example
 * ```typescript
 * const className = 'bg-blue-500'
 * const result = tw`text-white ${className}`
 * console.log(result) // Output: 'text-white bg-blue-500'
 * ```
 */
export function tw(strings: ReadonlyArray<string> | ArrayLike<string>, ...values: Array<unknown>): string {
  return String.raw({ raw: strings }, ...values)
}

/**
 * Logs a formatted message to the Node.js standard output stream.
 *
 * This function uses `util.format` to process the input arguments, supporting the same formatting as `console.log`
 * but writing directly to `process.stdout` without adding a newline automatically.
 *
 * @param args - The values to log, which can include any types. They will be formatted as per `util.format`.
 *
 * @example
 * ```typescript
 * consoleLogNode('Hello %s, the result is %d', 'world', 42)
 * ```
 */
export function consoleLogNode(...args: Array<unknown>): void {
  process.stdout.write(util.format(...args) + '\n')
}

/**
 * Throws an error if the provided value is `null`.
 *
 * @param value - The value to validate.
 * @param errorMessage - The error message to throw if the value is `null`.
 * @returns The validated value if it is not `null`.
 * @throws Error - will throw an error with the provided message if the value is `null`.
 */
export function throwIfNull<TElementType>(value: TElementType | null, errorMessage: string): TElementType {
  if (value === null) {
    throw new Error(errorMessage)
  }
  return value
}

/**
 * Checks if any property of the given object is empty.
 * A property is considered empty if its value is `null`, `undefined`, or an empty string.
 *
 * @param object - The object whose properties to check.
 * @returns `true` if at least one property is empty, otherwise `false`.
 */
export function areObjectPropertiesEmpty(object: Record<string, unknown>): boolean {
  return Object.values(object).some((value) => value === null || value === undefined || value === '')
}

/**
 * Ensures that a given value is converted to an `Error` object.
 *
 * If the provided value is already an instance of `Error`, it is returned as-is.
 * Otherwise, the value is stringified (if possible) and wrapped in a new `Error` instance.
 * If the value cannot be stringified, a fallback message is used.
 *
 * Based on: https://medium.com/with-orus/the-5-commandments-of-clean-error-handling-in-typescript-93a9cbdf1af5
 *
 * @param value - The value to ensure as an `Error`. It can be of any type.
 * @returns An `Error` instance, either the original or a new one containing the stringified value.
 *
 * @example
 * ```typescript
 * try {
 *   throw "Some string error"
 * } catch (err) {
 *   const error = ensureError(err)
 *   console.error(error) // Outputs: Error: This value was thrown as is, not through an Error: "Some string error"
 * }
 * ```
 */
export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value

  let stringified = '[Unable to stringify the thrown value]'
  try {
    stringified = JSON.stringify(value)
  } catch {
    /* empty */
  }

  return new Error(`This value was thrown as is, not through an Error: ${stringified}`)
}

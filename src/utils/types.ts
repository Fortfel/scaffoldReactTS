/**
 * Options for the fetchWithTimeout method.
 */
export type FetchWithTimeoutOptions<TApiResponse> = Readonly<{
  /** Fetch API request options */
  options: RequestInit
  /** Timeout duration in milliseconds */
  timeout?: number
  /** Response type handler */
  responseHandler?: (response: Response) => Promise<TApiResponse>
}>

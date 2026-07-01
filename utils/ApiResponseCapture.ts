import { expect, Page } from "@playwright/test";

interface WrappedApiResponse<T> {
  statusCode: number;
  message?: string;
  data: T;
}

export class ApiResponseCapture {
  /**
   * Waits for a GET (or custom method) network response and returns parsed JSON.
   * Automatically unwraps `{ statusCode, data }` responses when present.
   */
  static async capture<T>(
    page: Page,
    urlFragment: string,
    method = "GET"
  ): Promise<T> {
    const response = await page.waitForResponse(
      (networkResponse) =>
        networkResponse.url().includes(urlFragment) &&
        networkResponse.request().method() === method
    );

    expect(response.status()).toBe(200);

    const body: unknown = await response.json();

    if (ApiResponseCapture.isWrappedResponse<T>(body)) {
      expect(body.statusCode).toBe(200);
      return body.data;
    }

    return body as T;
  }

  private static isWrappedResponse<T>(
    body: unknown
  ): body is WrappedApiResponse<T> {
    return (
      typeof body === "object" &&
      body !== null &&
      "statusCode" in body &&
      "data" in body
    );
  }
}

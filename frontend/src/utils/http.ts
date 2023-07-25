import z, { ZodTypeAny } from "zod";
export type RequestInitWithBody = Omit<RequestInit, "body"> & {
  body?: unknown;
};
//TODO: move to dotenv
export const BASE_URL = "http://localhost:3000";
export function fetchSafe<Model extends ZodTypeAny>(
  model: Model,
  url: string,
  init: RequestInitWithBody
): Promise<z.infer<Model>>;
export function fetchSafe(
  model: null,
  url: string,
  init: RequestInitWithBody
): Promise<void>;
/**
 * wrapper around fetch that automatically validates using a zod schema
 * @param model the zod schema to validate against
 * @param url the URL, relativized to the BASE_URL if it's relative
 * @param init the init, as mandated by fetch, but with application/json set in the headers
 * and the body converted into json if it's not a string (willfully ignoring formdata and similar for the sake of brevity)
 * @returns the json object from the body, validated by the zod schema
 */
export async function fetchSafe<Model extends ZodTypeAny>(
  model: Model | null,
  url: string,
  init: RequestInitWithBody
): Promise<z.infer<Model> | void> {
  //we have to do it the immutable way because Request has read only properties
  const { body: oldBody } = init;
  url = url.startsWith("http") ? url : `${BASE_URL}/${url}`;
  const body = typeof oldBody === "string" ? oldBody : JSON.stringify(oldBody);
  const headers = {
    "Content-Type": "application/json",
  };
  const data = await fetch(url, {
    ...init,
    headers,
    body,
  });
  if (model) {
    const json = await data.json();
    return model.parseAsync(json);
  }
}

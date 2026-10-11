/** The three states of anything fetched after the page has rendered. */
export type Loadable<T> =
  | { state: "loading" }
  | { state: "error" }
  | { state: "ready"; data: T };

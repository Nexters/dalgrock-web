export const getQueryKeyHelper = (queryName: string) => {
  return {
    all: [queryName],
    detail: (key: string, params?: object) => [
      ...getQueryKeyHelper(queryName).all,
      key,
      ...(params ? [params] : [])
    ]
  }
}

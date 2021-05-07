export class DataError extends Error {
  constructor(public message: string, public code?: number) {
    super(message);
  }
}

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> => {
    const res = await fetch('/graphql', {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();

    if (json.errors) {
      const { message, extensions } = json.errors[0];

      const error = new DataError(message, extensions.code);
      throw error;
    }

    return json.data;
  };
}

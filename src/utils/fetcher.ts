export interface ValidationError {
  field?: string;
  message?: string;
}

export class DataError extends Error {
  constructor(
    public message: string,
    public validationError?: ValidationError,
    public retryAfter?: number,
    public code?: number,
  ) {
    super(message);
  }
}

export async function gqlRequest<TData, TVariables>(
  query: string,
  variables?: TVariables,
): Promise<TData> {
  const res = await fetch(process.env.REACT_APP_API_URL + '/graphql', {
    method: 'POST',
    body: JSON.stringify({ query, variables }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const json = await res.json();

  if (json.errors) {
    const { message, extensions } = json.errors[0];

    const error = new DataError(
      message,
      extensions.validationError,
      extensions.retryAfter,
      extensions.code,
    );
    throw error;
  }

  return json.data;
}

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
) => () => gqlRequest<TData, TVariables>(query, variables);

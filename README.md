## Endpoints

### Token.json

- POST `/friends/v1/requests/send`
  - Payload: `code`
  - Response: `FetchTokenResponse`

```ts
export type AuthToken = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
};

export type Error = {
  error: string;
  error_description: string;
};

export type FetchTokenResponse = Error | AuthToken;
```

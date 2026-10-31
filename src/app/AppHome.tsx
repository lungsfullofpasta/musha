import { useQuery } from "@connectrpc/connect-query";
import { getStatus } from "../gen/musha/v1/app-AppService_connectquery";

export function AppHome() {
  const { data, error, isPending } = useQuery(getStatus);

  return (
    <>
      <h1>App home</h1>
      {isPending && <p>Checking the API…</p>}
      {error && <p role="alert">API unavailable: {error.message}</p>}
      {data && (
        <p>
          API {data.status}, version {data.version}
        </p>
      )}
    </>
  );
}

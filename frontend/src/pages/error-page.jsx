import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h3>Page you are trying to is not created yet</h3>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

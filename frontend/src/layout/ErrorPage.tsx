import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Something went wrong";
  let description =
    "An unexpected error occurred. Please try again or come back later.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status}`;
    description =
      error.statusText || "The page you are trying to access has an issue.";
  } else if (error instanceof Error) {
    description = error.message;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm">
        <h1 className="text-4xl font-semibold text-gray-900">{title}</h1>

        <p className="mt-3 text-sm text-gray-600">{description}</p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

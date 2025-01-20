import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-gray-200">
          404
        </h1>
        <p className="mb-4 text-xl text-gray-600 dark:text-gray-400">
          Oops! Page not found.
        </p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Let's get you back on track!
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-sm font-medium leading-6 text-center text-white uppercase transition bg-blue-600 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

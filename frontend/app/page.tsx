import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Welcome to Freelance CRM</h1>
      <p className="text-gray-600 mb-8">Manage your freelance clients with ease</p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-gray-200 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

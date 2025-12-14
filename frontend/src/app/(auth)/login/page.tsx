import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-2xl">
      
      {/* Logo / App Name */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          AI Bookstore
        </h1>
        <p className="mt-2 text-gray-600">
          Sign in to your account
        </p>
      </div>

      {/* Form */}
      <LoginForm />

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="font-medium text-gray-900 underline underline-offset-4 hover:text-black"
        >
          Create one
        </a>
      </div>
    </div>
  );
}

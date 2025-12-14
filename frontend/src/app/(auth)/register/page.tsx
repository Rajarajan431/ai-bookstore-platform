
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-2xl">
      
      {/* Logo / App Name */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Create your account
        </h1>
        <p className="mt-2 text-gray-600">
          Join AI Bookstore and start selling & buying books
        </p>
      </div>

      {/* Form */}
      <RegisterForm />

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-medium text-gray-900 underline underline-offset-4 hover:text-black"
        >
          Sign in
        </a>
      </div>
    </div>
  );
}

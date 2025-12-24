import PasswordForm from "./password-form";
import ProfileForm from "./profile-form";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <ProfileForm />
      <PasswordForm />
    </div>
  );
}

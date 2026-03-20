import { Card } from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/register-form";
import { LoginFeaturePanel } from "@/components/auth/login-feature-panel";

export function RegisterCard() {
    return (
        <Card className="w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl border border-gray-100 p-0 grid grid-cols-1 md:grid-cols-2">
            {/* Left: register form */}
            <div className="bg-white">
                <RegisterForm />
            </div>

            {/* Right: feature panel (reused) */}
            <LoginFeaturePanel />
        </Card>
    );
}

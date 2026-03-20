import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import { LoginFeaturePanel } from "@/components/auth/login-feature-panel";

export function LoginCard() {
    return (
        <Card className="w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl border border-gray-100 p-0 grid grid-cols-1 md:grid-cols-2">
            {/* Left: login form */}
            <div className="bg-white">
                <LoginForm />
            </div>

            {/* Right: feature panel */}
            <LoginFeaturePanel />
        </Card>
    );
}

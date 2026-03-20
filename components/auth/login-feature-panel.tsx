import {
    ShieldCheck,
    KeyRound,
    LockKeyhole,
    Fingerprint,
    EyeOff,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        label: "Vault Protected",
        description: "AES-256 encrypted storage",
        color: "bg-blue-100 text-blue-600",
        position: "top-6 left-8",
        size: 22,
    },
    {
        icon: KeyRound,
        label: "Key Management",
        description: "One master key, all access",
        color: "bg-indigo-100 text-indigo-600",
        position: "top-10 right-6",
        size: 20,
    },
    {
        icon: LockKeyhole,
        label: "Encrypted Storage",
        description: "Zero-knowledge architecture",
        color: "bg-purple-100 text-purple-600",
        position: "bottom-16 left-6",
        size: 20,
    },
    {
        icon: Fingerprint,
        label: "Biometric Auth",
        description: "Touch ID & Face ID ready",
        color: "bg-sky-100 text-sky-600",
        position: "bottom-10 right-8",
        size: 22,
    },
];

export function LoginFeaturePanel() {
    return (
        <div className="hidden md:flex flex-col items-center justify-center relative overflow-hidden rounded-r-2xl bg-gradient-to-br from-[#3B5BDB] via-[#4263EB] to-[#5C7CFA] p-10 text-white">
            {/* Background subtle circles */}
            <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full" />
            <div className="absolute -bottom-20 -left-12 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/[0.03] rounded-full" />

            {/* Central vault icon */}
            <div className="relative z-10 flex flex-col items-center text-center gap-8">
                {/* Hero icon cluster */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                    {/* Outer ring glow */}
                    <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
                    <div className="absolute inset-3 rounded-full bg-white/10" />

                    {/* Central shield */}
                    <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg">
                        <ShieldCheck className="w-10 h-10 text-white drop-shadow-md" />
                    </div>

                    {/* Floating icon badges */}
                    <div className="absolute -top-2 -right-2 flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm shadow-md">
                        <KeyRound className="w-5 h-5 text-yellow-200" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm shadow-md">
                        <LockKeyhole className="w-5 h-5 text-green-200" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm shadow-md">
                        <Fingerprint className="w-5 h-5 text-pink-200" />
                    </div>
                    <div className="absolute -top-2 -left-2 flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm shadow-md">
                        <EyeOff className="w-5 h-5 text-purple-200" />
                    </div>
                </div>

                {/* Headline */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold leading-tight tracking-tight">
                        Your Vault.
                        <br />
                        Your Keys.
                        <br />
                        Your Control.
                    </h2>
                    <p className="text-sm text-blue-100/80 max-w-[200px] leading-relaxed">
                        All your passwords, secured with military-grade encryption.
                    </p>
                </div>

                {/* Feature pills */}
                <div className="flex flex-col gap-3 w-full max-w-[220px]">
                    {features.map((f) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={f.label}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
                            >
                                <Icon className="w-4 h-4 shrink-0 text-white/80" />
                                <div className="text-left">
                                    <p className="text-xs font-semibold text-white leading-none">
                                        {f.label}
                                    </p>
                                    <p className="text-[10px] text-blue-100/70 mt-0.5">
                                        {f.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Dots indicator */}
                <div className="flex gap-1.5">
                    <div className="w-5 h-1.5 rounded-full bg-white" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>
            </div>
        </div>
    );
}

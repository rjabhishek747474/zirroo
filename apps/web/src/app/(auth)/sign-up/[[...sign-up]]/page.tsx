import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="w-full max-w-md space-y-6 p-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="mt-2 text-muted-foreground">
                        Join ListShare and start sharing your lists
                    </p>
                </div>
                <SignUp
                    appearance={{
                        elements: {
                            formButtonPrimary: 'bg-primary hover:bg-primary/90',
                            card: 'shadow-xl',
                        },
                    }}
                />
            </div>
        </div>
    );
}

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="w-full max-w-md space-y-6 p-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="mt-2 text-muted-foreground">
                        Sign in to continue to Zirroo
                    </p>
                </div>
                <SignIn
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

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 100px)" }}>
            <SignIn
                path="/sign-in"
                routing="path"
            />
        </div>
    );
}
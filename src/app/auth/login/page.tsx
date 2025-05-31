"use client";

// Hooks
import useLoginLogic from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

// Components
import Container from "@/components/container";
import FetchFields from "@/components/fetch/fetchFields";
import Link from "next/link";
import { Checkbox, Divider, FormControlLabel, Button } from "@mui/material";

// Providers
import ThemeProviderWraper from "@/providers/themeProvider";

// Icons
import { Google } from "@mui/icons-material";

// Utilities
import handleGoogle from "@/utils/signWithGoogle";

export default function Login() {
  const { setRemember, fields, handleChange, handleSubmit } = useLoginLogic();

  const router = useRouter();

  return (
    <Container className="flex justify-center items-center p-4">
      <ThemeProviderWraper>
        <form
          method="post"
          autoComplete="off"
          onSubmit={handleSubmit}
          className="card flex-col gap-6"
        >
          <h2 className="text-xl">Sign in to your account</h2>

          {/* Render input fields dynamically */}
          <FetchFields fields={fields} handleChange={handleChange} />

          {/* Submit button */}
          <Button variant="contained" type="submit" fullWidth>
            Log in
          </Button>

          {/* Remember me checkbox and forgot password link */}
          <div className="flex justify-between items-center w-full">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  onChange={(e) => setRemember(e.target.checked)}
                />
              }
              label="Remember me"
            />

            <Link
              href="/auth/forgotPassword"
              className="text-primary hover:text-hover text-sm"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Divider for alternative login options */}
          <Divider className="text-xs w-full">OR</Divider>

          {/* Google sign-in button */}
          <Button
            variant="outlined"
            startIcon={<Google />}
            fullWidth
            onClick={async () => {
              const success = await handleGoogle();
              if (success) router.push("/");
            }}
          >
            Continue with Google
          </Button>

          {/* Link to registration page */}
          <p className="center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:text-hover"
            >
              Create an account
            </Link>
          </p>
        </form>
      </ThemeProviderWraper>
    </Container>
  );
}

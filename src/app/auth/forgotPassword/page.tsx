"use client";

// imports

// hooks
import useForgotPassword from "@/hooks/useForgotPassword";

// components
import Container from "@/components/container";
import { TextField, Button, Typography } from "@mui/material";

// providers
import ThemeProviderWraper from "@/providers/themeProvider";

// Utilities
import { formatCountdown } from "@/utils/countdown";

export default function ForgotPassword() {
  const { fields, countdown, handleChange, handleSubmit } = useForgotPassword();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <Container className="flex justify-center items-center min-h-screen p-4">
      <ThemeProviderWraper>
        <form
          method="post"
          className="card flex-col gap-6 w-full max-w-sm"
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <Typography variant="h5" className="text-center">
            Forgot Password?
          </Typography>

          <TextField
            label="Email"
            id={fields[0].name}
            name={fields[0].name}
            type="email"
            variant="standard"
            fullWidth
            size="small"
            value={fields[0].value}
            error={fields[0].isErr}
            helperText={fields[0].error}
            autoComplete="new-email"
            onChange={(e) => handleChange(0, e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={countdown > 0}
          >
            {countdown > 0
              ? `Try again in ${formatCountdown(countdown)}`
              : "Send Reset Link"}
          </Button>
        </form>
      </ThemeProviderWraper>
    </Container>
  );
}

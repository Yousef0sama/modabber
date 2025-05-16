// imports

// components
import Container from "@/components/container";

// providers
import ThemeProviderWraper from "@/providers/themeProvider";

export default function Home() {
  return (
    <Container className="flex justify-center items-center p-4">
      <ThemeProviderWraper>
        home
      </ThemeProviderWraper>
    </Container>
  );
}

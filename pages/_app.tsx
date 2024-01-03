import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App(props: AppProps) {
  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={darkTheme}>
        <props.Component {...props.pageProps} />
        <Analytics />
      </ThemeProvider>
    </AppCacheProvider>
  );
}

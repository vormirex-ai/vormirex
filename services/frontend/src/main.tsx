import "./index.css";
import App from "./App";
import { StrictMode, useEffect, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./store/store";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import ErrorBoundary from "./components/common/error-boundary";
import SuspenseFallback from "./components/common/suspense-fallback";
import GlobalLoader from "./components/common/global-loader";

function Root() {
  const theme = useSelector((state: RootState) => state.theme.theme);
    const fontSize = useSelector((state: RootState) => state.theme.fontSize);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Font size 
     root.classList.remove("text-small", "text-large");

  if (fontSize === "small") {
    root.classList.add("text-small");
  } else if (fontSize === "large") {
    root.classList.add("text-large");
  }

  }, [theme,fontSize]);

  return (
    <>
      <Toaster richColors position="top-right" />
      <App />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Suspense fallback={<SuspenseFallback />}>
          <BrowserRouter>
            <Root />
            <GlobalLoader />
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);

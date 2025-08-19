// sentry.server.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://81a40f606587eaaf42e4b35dedc95111@o4509869487489024.ingest.us.sentry.io/4509869494042624",
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

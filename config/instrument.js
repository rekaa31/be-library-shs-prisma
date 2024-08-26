// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
	dsn: "https://6579b0583424c8866c6911e9e26589f1@o4507843512172544.ingest.us.sentry.io/4507843996745728",
	integrations: [
		nodeProfilingIntegration(),
	],
	// Tracing
	tracesSampleRate: 1.0, //  Capture 100% of the transactions

	// Set sampling rate for profiling - this is relative to tracesSampleRate
	profilesSampleRate: 1.0,
});
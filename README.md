# Retirement Reality Check — v1 starter

## Included
- English four-step questionnaire: retirement vision, financial picture, assumptions and life-readiness.
- Deterministic calculator: inflation-adjusted expenses, corpus estimate, projected corpus, gap/surplus, indicative monthly investment and three scenarios.
- AI report API route that explains the supplied calculations without changing them or recommending securities.
- Explicit consent gate before sending answers to the AI provider.
- Responsive dark / muted-gold interface and print-to-PDF report.
- No database and no account system in v1.

## Run locally
1. Install Node.js 20+.
2. Extract the ZIP and run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Add your secret OpenAI API key to `.env.local`.
5. Run `npm run dev` and open http://localhost:3000.

Without an API key, the calculator works but AI report generation is unavailable.

## Deploy
1. Push the project to a private GitHub repository.
2. Import it into Vercel.
3. In Vercel Project Settings → Environment Variables, add `OPENAI_API_KEY` and optionally `OPENAI_MODEL`.
4. Deploy and test on mobile and desktop.
5. Connect your domain after QA.

Never expose the API key in client code, `NEXT_PUBLIC_*`, source control or screenshots.

## Before public launch
- Add rate limiting and bot protection to `/api/analyze` to prevent API abuse and unexpected cost.
- Publish a privacy policy that explains AI-provider processing, purpose and retention. This starter sends questionnaire data to the AI provider only after explicit consent and does not persist it in a database.
- Have the calculation method independently reviewed. This is a simplified model using fixed return assumptions and monthly compounding. It does not model tax, fees, volatility, sequence-of-returns risk, variable cash flows, inflation by expense category or guaranteed income escalation.
- Confirm legal and regulatory requirements. Do not market as personalised investment advice or portfolio management.
- Test boundary cases (retirement age, life expectancy, zero years to retirement, negative corpus gap) and API error handling.

## Next iterations
- Improve model: tax/fee inputs, separate healthcare and dependent-care budgets, irregular cash flows, inflation by category, longevity stress tests and sequence-of-returns simulations.
- Add optional accounts and saved reports only with explicit consent.
- Add AI follow-up chat grounded in the same deterministic results and strict financial-advice guardrails.
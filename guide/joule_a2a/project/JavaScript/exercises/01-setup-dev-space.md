# Set up your local development environment

In this exercise you'll prepare your machine to develop and run the investigator agent: clone the repository, configure your SAP AI Core credentials, and install the Node.js dependencies. All tooling runs locally using your own editor and terminal.

## Clone the Repository

👉 Clone this Git repository to your machine using the URL below:

```sh
git clone https://github.com/SAP-AWS-ID-Hackathon-2026/SAP_AWS_Hackathon_ID_2026.git
```

> The JavaScript exercises and starter project live under the `joule_a2a` folder of this repository.

👉 Open the project folder in your editor.

## Configure the Connection to Generative AI Hub

👉 Retrieve your team's SAP AI Core service key by following [`BTP_Instructions/README.md`](../../../BTP_Instructions/README.md) (section **Get AI Core and Joule Credentials**). The keybroker returns the full service key JSON containing `clientid`, `clientsecret`, `url`, and `serviceurls.AI_API_URL`.

👉 Create a new file `.env` in [`/project/JavaScript/solution/`](/project/JavaScript/solution/) by copying the provided `.env.example`:

```bash
cp project/JavaScript/solution/.env.example project/JavaScript/solution/.env
```

👉 Open the `.env` file and paste the keybroker service key JSON as the value of `AICORE_SERVICE_KEY` (the entire JSON on a single line, wrapped in single quotes):

```bash
AICORE_SERVICE_KEY='{"clientid":"sb-...","clientsecret":"...","url":"https://....authentication.ap10.hana.ondemand.com","serviceurls":{"AI_API_URL":"https://api.ai.prod.ap-southeast-2.aws.ml.hana.ondemand.com"}}'
RESOURCE_GROUP=default
```

> ⚠️ Keep these credentials private — never commit `.env` to git.

> 💡 The chat model (`gpt-5.4`) and the RPT-1 deployment ID (`sap-rpt-1.6`) are fixed in the source code, so they are **not** environment variables — the only value you provide is your credential.

> 💡 **Why a single-line JSON string?** The SAP Cloud SDK for AI reads `AICORE_SERVICE_KEY` as a raw JSON string from the environment. Pasting the service key JSON as a single line (without newlines) ensures `dotenv` parses it correctly. Newlines inside the value would break the `.env` format.

## Install Node.js Dependencies

👉 Open a terminal in the project folder.

👉 Verify your Node.js version (18 or newer required):

```bash
node --version
```

> ⚠️ **Important**: The SAP Cloud SDK for AI requires Node.js 18 or newer. If your version is older, install a current LTS release from [nodejs.org](https://nodejs.org).

👉 Navigate to the solution project and install dependencies:

```bash
cd project/JavaScript/solution
npm install
```

This installs all packages defined in `package.json`, including:

- `@langchain/langgraph` — the graph-based agent framework
- `@sap-ai-sdk/orchestration` — SAP Cloud SDK for AI, LLM access via Generative AI Hub
- `@sap-ai-sdk/rpt` — SAP Cloud SDK for AI, RPT-1 structured data model
- `dotenv` — loads your `.env` file into `process.env`
- `tsx` — TypeScript Execute runtime, runs `.ts` files directly

> 💡 **No compilation step needed for development.** You will run TypeScript files directly using `npx tsx`. This means you edit a `.ts` file and run it immediately, with no `tsc` build required during the workshop.

## Let's Start Coding!

[Next exercise](02-deploy-agent-to-cf-ts.md)

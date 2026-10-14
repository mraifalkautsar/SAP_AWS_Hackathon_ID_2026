# Investigator Graph - TypeScript Solution

A multi-agent investigation system built with **LangGraph** and **SAP Cloud SDK for AI** to solve an art theft case. This TypeScript implementation provides a sophisticated agent orchestration system that mirrors the functionality of the Python LangGraph solution.

## 🏗️ Architecture

The solution uses three specialized agents working in sequence:

1. **Insurance Appraiser Agent** 🎨
   - Uses the RPT-1 model to predict missing insurance values
   - Analyzes stolen artwork data and completes appraisals
   - Tool: `call_rpt1`

2. **Evidence Analyst Agent** 🔍
   - Analyzes evidence for each suspect
   - Tool: `call_grounding_service` (stub — grounding is not activated for this hackathon)

3. **Lead Detective Agent** 🕵️
   - Synthesizes findings from both agents
   - Identifies the most likely culprit
   - Provides comprehensive case conclusion

## 📋 Prerequisites

- Node.js v18+ and npm
- SAP AI Core access (via the hackathon keybroker service key) with:
  - RPT-1 model deployment
  - A deployed foundation model (e.g. `gpt-5.4`)

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# SAP AI Core service key (paste the full keybroker JSON on a single line)
AICORE_SERVICE_KEY='{"clientid":"...","clientsecret":"...","url":"https://....authentication.ap10.hana.ondemand.com","serviceurls":{"AI_API_URL":"https://api.ai.prod.ap-southeast-2.aws.ml.hana.ondemand.com"}}'

# SAP AI Core configuration
RESOURCE_GROUP=default
```

> The chat model (`gpt-5.4`) and RPT-1 deployment (`sap-rpt-1.6`) are fixed in the source code (`src/investigationWorkflow.ts` and `src/rptClient.ts`), so they are not configured here.

### 3. Build the Project

```bash
npm run build
```

## 🎯 Usage

### Run the Investigation

```bash
npm run dev
```

Or using the compiled version:

```bash
npm start
```

### Expected Output

The system will:

1. Initialize the three agents
2. Run the appraiser agent to predict missing insurance values
3. Run the evidence analyst to search for suspect evidence
4. Run the lead detective to synthesize findings and identify the culprit
5. Output a comprehensive investigation report

## 📁 Project Structure

```
solution/
├── src/
│   ├── investigationWorkflow.ts   # LangGraph orchestration and agent definitions
│   ├── main.ts                # Entry point
│   ├── payload.ts             # Stolen items data
│   ├── rptClient.ts           # RPT-1 API client
│   ├── tools.ts               # LangGraph tools for RPT-1 and evidence lookup
│   └── types.ts               # TypeScript type definitions
├── .env.example               # Environment variable template
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🔧 Key Components

### LangGraph State Graph

The investigation workflow is implemented as a LangGraph state graph with sequential execution:

```
START → Appraiser → Evidence Analyst → Lead Detective → END
```

Each node in the graph:

- Receives the current state
- Executes its specialized task
- Updates the state with its findings
- Passes control to the next node

### State Management

The agent state includes:

- `payload`: Stolen items data with prediction placeholders
- `suspect_names`: List of suspects to investigate
- `appraisal_result`: Output from the appraiser agent
- `evidence_analysis`: Output from the evidence analyst
- `final_conclusion`: Final report from the lead detective
- `messages`: Conversation history

### Tools

1. **call_rpt1**: Calls the RPT-1 model deployment via SAP AI Core
2. **call_grounding_service**: Returns evidence for each suspect (stub — grounding is not activated for this hackathon)

## 🔄 Comparing with Python Solution

This TypeScript solution provides equivalent functionality to the Python CrewAI implementation:

| Feature             | Python (CrewAI)                       | TypeScript (LangGraph)        |
| ------------------- | ------------------------------------- | ----------------------------- |
| Framework           | CrewAI                                | LangGraph                     |
| Agent Orchestration | `@agent`, `@task`, `@crew` decorators | StateGraph with nodes         |
| Configuration       | YAML files                            | Direct code configuration     |
| Tool Definition     | `@tool` decorator                     | `tool()` from @langchain/core |
| Process Flow        | `Process.sequential`                  | Graph edges (START → END)     |
| State Management    | Automatic by CrewAI                   | Explicit state updates        |
| AI SDK              | `gen_ai_hub` (Python)                 | `@sap-ai-sdk` (TypeScript)    |

## 🐛 Troubleshooting

### Authentication Errors

If you see OAuth token errors:

- Verify your `AICORE_CLIENT_ID` and `AICORE_CLIENT_SECRET`
- Check that `AICORE_AUTH_URL` is correct
- Ensure your credentials have the necessary permissions

### RPT-1 Deployment Errors

If the RPT-1 call fails:

- Verify the RPT-1 deployment ID in `src/rptClient.ts` is correct (`d76cf689a05d504f` = `sap-rpt-1.6`)
- Check that the deployment is running in SAP AI Core
- Ensure the `RESOURCE_GROUP` matches your deployment

## 📚 Additional Resources

- [LangGraph Documentation](https://js.langchain.com/docs/langgraph)
- [SAP AI SDK Documentation](https://www.npmjs.com/package/@sap-ai-sdk/ai-api)
- [SAP AI Core Documentation](https://help.sap.com/docs/sap-ai-core)

## 📝 License

See the LICENSE file in the root of the repository.

## 🤝 Contributing

This is an educational project for the SAP AWS hackathon. Feel free to explore and learn from the code!

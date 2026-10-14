# Set up your local development environment

In this exercise you'll prepare your machine to develop and run the investigator agent: clone the repository, configure your SAP AI Core credentials, and install the Python dependencies. All tooling runs locally using your own editor and terminal.

## Clone the exercises from the Git repository

👉 Clone this Git repository to your machine using the URL below:

```sh
git clone https://github.com/SAP-AWS-ID-Hackathon-2026/SAP_AWS_Hackathon_ID_2026.git
```

> The LangGraph exercises and starter project live under the `joule_a2a` folder of this repository.

👉 Open the project folder in your editor.

## Configure the connection details to Generative AI Hub

👉 Create a new file `.env` in the [/project/Python-LangGraph/solution/](/project/Python-LangGraph/solution/) directory.

👉 Retrieve your team's SAP AI Core credentials by following [`BTP_Instructions/README.md`](../../../BTP_Instructions/README.md) (section **Get AI Core and Joule Credentials**). The keybroker response contains `clientid`, `clientsecret`, `url`, and `serviceurls.AI_API_URL`.

👉 Add the following variables to your `.env` file, filling in the values from the keybroker response:

```Python
LITELLM_PROVIDER="sap"
AICORE_AUTH_URL="<url>/oauth/token"
AICORE_CLIENT_ID="<clientid>"
AICORE_CLIENT_SECRET="<clientsecret>"
AICORE_RESOURCE_GROUP="default"
AICORE_BASE_URL="<serviceurls.AI_API_URL>"
```

For this hackathon the hosts resolve to the AP10 / AP-southeast-2 landscape, so your file will look like this:

```Python
LITELLM_PROVIDER="sap"
AICORE_AUTH_URL="https://aws-sap-hackathon-si4ykj9d.authentication.ap10.hana.ondemand.com/oauth/token"
AICORE_CLIENT_ID="sb-949c5904-...|aicore!b1456"
AICORE_CLIENT_SECRET="<clientsecret>"
AICORE_RESOURCE_GROUP="default"
AICORE_BASE_URL="https://api.ai.prod.ap-southeast-2.aws.ml.hana.ondemand.com"
```

> ☝️ The resource group is `default` for this hackathon. The chat model (`sap/gpt-5.4`) and RPT-1 model (`sap-rpt-1.6`) are fixed in the code, so they are not in `.env`. Keep these credentials private — never commit `.env` to git.

## Create a Python virtual environment and install LangGraph dependencies

👉 Open a terminal in the project folder.

👉 Verify your Python version is compatible with LangGraph (requires Python 3.10 or newer):

```bash
python3 --version
```

> ⚠️ **Important**: LangGraph requires Python 3.10 or newer. If your Python version is 3.9 or older, install a compatible version first.
>
> - **macOS**: Use [Homebrew](https://brew.sh/) to install Python 3.11: `brew install python@3.11`, then use `python3.11` in the commands below.
> - **Linux**: Install Python 3.11 with your distro package manager, for example:
>   - Ubuntu/Debian: `sudo apt update && sudo apt install python3.11 python3.11-venv`
>   - Fedora/RHEL: `sudo dnf install python3.11`
>     Then use `python3.11` in the commands below.
> - **Windows**: Install Python 3.11 from the [official Python downloads page](https://www.python.org/downloads/windows/) and make sure **Add python.exe to PATH** is enabled during installation. Then use `python` (or `py -3.11`) in the commands below.

👉 Create a virtual environment using the following command:

_macOS / Linux_

```bash
python3 -m venv env --upgrade-deps
```

_Windows (PowerShell)_

```powershell
python -m venv .\env --upgrade-deps
```

👉 Activate the `env` virtual environment and make sure it is activated:

_macOS / Linux_

```bash
source env/bin/activate
```

_Windows (PowerShell)_

```powershell
.\env\Scripts\Activate.ps1
```

_Windows (Command Prompt)_

```cmd
.\env\Scripts\activate.bat
```

> ℹ️ If PowerShell blocks script execution, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` and then run `./env/Scripts/Activate.ps1` again.

👉 Install LangGraph, LangChain, LiteLLM, and python-dotenv using the following `pip install` command:

```bash
pip install --require-virtualenv langgraph langchain-core langchain-litellm litellm==1.82.6 python-dotenv
```

## Let's start coding

[Next exercise](02-deploy-agent-to-cf.md)

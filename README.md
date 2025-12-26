staqlt Azure Governance Bot

This project automates the auditing of Azure Cloud environments, leveraging AI Integration to provide cost optimization and security recommendations.

Features

Auto-Discovery: Scans all Azure resources and Virtual Machines using Azure SDK.

AI Analysis: Uses GPT-4 to interpret infrastructure data and suggest architectural improvements.

Instant Reporting: Sends formatted summaries to Slack/Teams for the Admin team.

Setup

Clone the repository.

Run npm install.

Create a .env file with:

AZURE_SUBSCRIPTION_ID

AZURE_TENANT_ID

AZURE_CLIENT_ID

AZURE_CLIENT_SECRET

OPENAI_API_KEY

SLACK_WEBHOOK_URL (Optional)

Run npm start.

Core Services Used

Process Automation: Orchestrating Azure resource calls.

AI Integration: Analyzing cloud topology for "Next-Best-Action" insights.

Data Analysis: Aggregating resource counts and health statuses.
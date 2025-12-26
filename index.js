const { DefaultAzureCredential } = require("@azure/identity"); const { ResourceManagementClient } = require("@azure/arm-resources"); const { ComputeManagementClient } = require("@azure/arm-compute"); const OpenAI = require("openai"); require("dotenv").config();

// Configuration const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID; const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); const credential = new DefaultAzureCredential();

async function runAudit() { console.log("🚀 Starting Azure Infrastructure Audit...");

try {
    const resourceClient = new ResourceManagementClient(credential, subscriptionId);
    const computeClient = new ComputeManagementClient(credential, subscriptionId);

    // 1. Fetch Resources
    const resources = [];
    for await (const resource of resourceClient.resources.list()) {
        resources.push({
            name: resource.name,
            type: resource.type,
            location: resource.location
        });
    }

    // 2. Fetch VM Statuses
    const vms = [];
    for await (const vm of computeClient.virtualMachines.listAll()) {
        vms.push(vm.name);
    }

    console.log(`📊 Found ${resources.length} resources and ${vms.length} Virtual Machines.`);

    // 3. AI Analysis for Cost & Optimization
    const report = await generateAIInsights(resources, vms);
    
    // 4. Send Report to Slack/Webhook
    await sendNotification(report);

} catch (error) {
    console.error("❌ Audit Failed:", error.message);
}


}

async function generateAIInsights(resources, vms) { const prompt = As a Senior Azure Cloud Architect, analyze this infrastructure list and provide 3 optimization recommendations and a security summary: Resources: ${JSON.stringify(resources.slice(0, 10))} VM Count: ${vms.length};

const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "system", content: prompt }],
});

return completion.choices[0].message.content;


}

async function sendNotification(message) { if (process.env.SLACK_WEBHOOK_URL) { await axios.post(process.env.SLACK_WEBHOOK_URL, { text: *staqlt Azure Audit Report*\n\n${message} }); console.log("📨 Report sent to Slack."); } else { console.log("📝 AI Analysis Output:\n", message); } }

runAudit();
import express from 'express';
import os from 'os';

const app = express();
const PORT = 3000;
const startTime = Date.now();

const funFacts = [
  "Kubernetes was originally designed by Google.",
  "The name 'Kubernetes' comes from the Greek word for 'helmsman' or 'pilot'.",
  "Minikube is a great way to learn Kubernetes locally!",
  "Pods are the smallest deployable units in Kubernetes.",
  "Kubernetes is also known as K8s (because there are 8 letters between K and s).",
  "Containers make applications portable and scalable.",
  "Kubernetes was donated to the Cloud Native Computing Foundation (CNCF) in 2015.",
  "Kubernetes supports rolling updates for zero-downtime deployments.",
  "A Kubernetes cluster can have thousands of nodes.",
  "Kubernetes uses etcd as its distributed key-value store.",
  "Docker was the first widely adopted container runtime for Kubernetes.",
  "Kubernetes can self-heal by automatically restarting failed containers.",
  "Kubernetes is open source and has a huge global community.",
  "You can manage Kubernetes clusters using kubectl, the command-line tool."
];

function getRandomFact() {
  return funFacts[Math.floor(Math.random() * funFacts.length)];
}

function getUptime() {
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}

app.get("/", (req, res) => {
  const podName = process.env.HOSTNAME || os.hostname();
  const nodeIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
  const fact = getRandomFact();
  const uptime = getUptime();
  const now = new Date().toLocaleString();
  const html = `
    <html>
    <head>
      <title>K8s Demo App</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f0f4f8; color: #222; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 32px; }
        h1 { color: #1976d2; }
        .version { color: #388e3c; font-weight: bold; margin-bottom: 12px; }
        .info { margin: 16px 0; }
        .fact { background: #e3f2fd; color: #1976d2; padding: 12px; border-radius: 8px; margin: 16px 0; font-size: 1.1em; }
        .links { margin: 24px 0; display: flex; gap: 16px; }
        .link-btn { background: #1976d2; color: #fff; border: none; border-radius: 6px; padding: 10px 18px; text-decoration: none; font-size: 1em; cursor: pointer; transition: background 0.2s; }
        .link-btn:hover { background: #1565c0; }
        .footer { margin-top: 32px; color: #888; font-size: 0.95em; }
      </style>
    </head>
    <body>
      <div class="container">
  <div class="version">Version: latest</div>
        <h1> Kubernetes Demo App</h1>
  <div class="info"><b>Pod Name:</b> ${podName}</div>
  <div class="info"><b>Node IP:</b> ${nodeIp}</div>
        <div class="info"><b>Current Time:</b> ${now}</div>
        <div class="info"><b>App Uptime:</b> ${uptime}</div>
        <div class="fact">💡 <b>Fun Fact:</b> ${fact}</div>
        <div class="links">
          <a class="link-btn" href="/nginx" target="_blank">Nginx Service (internal, ClusterIP)</a>
          <a class="link-btn" href="/external-api" target="_blank">External API (jsonplaceholder)</a>
          <a class="link-btn" href="/healthz" target="_blank">Health Check</a>
        </div>
        <div class="footer">
          <a href="https://expressjs.com/" target="_blank">Express.js (docs)</a> |
          <a href="https://kubernetes.io/docs/" target="_blank">K8s (docs)</a>
        </div>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

// Health check endpoint
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", uptime: getUptime() });
});

// Nginx proxy endpoint to demonstrate inter-service communication
app.get("/nginx", async (req, res) => {
  const url = 'http://nginx'
  const response = await fetch(url);
  const body = await response.text();
  res.send(body)
})

// Example of fetching data from an external API
app.get("/external-api", async (req, res) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos');
  const data = await response.json();
  res.json(data);
});


app.listen(PORT, () => {
  console.log(`Web server is listening at port ${PORT}`);
});
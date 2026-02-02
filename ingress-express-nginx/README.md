# Kubernetes Ingress Demo: Express + Nginx

## Purpose

This project packages a small Express application as a Docker image intended to run behind a Kubernetes Ingress or HTTP reverse proxy. It surfaces pod and client metadata, exposes a health endpoint, and demonstrates internal service calls to an Nginx backend and an external API.

## Technologies used

- Node.js (Alpine base image)
- Express 5.x
- Docker

## Key containerization concepts

- Containerizing a Node.js HTTP application
- Defining a simple health endpoint for probes (`/healthz`)
- Service-to-service communication over the container or cluster network via the `nginx` hostname (`/nginx`)
- External API integration from inside a container (`/external-api`)
- Ingress-ready design: single HTTP port (3000) and clear path-based routing

## How to build and run

### Run locally with Node.js

```bash
cd ingress-express-nginx
npm install
npm start
# Application listens on http://localhost:3000
```

### Build and run with Docker

From the repository root:

```bash
docker build -t k8s-web-express-nginx ./ingress-express-nginx
docker run --rm -p 3000:3000 --name k8s-web-express-nginx k8s-web-express-nginx
```

The main routes:

- `/` – HTML UI with pod name, client IP, uptime, timestamp, and a random Kubernetes fact
- `/healthz` – JSON health check
- `/nginx` – Forwards traffic to an HTTP service reachable at `http://nginx`
- `/external-api` – Proxies data from `https://jsonplaceholder.typicode.com/photos`

### Using the published image

A prebuilt image is available on Docker Hub:

```bash
docker pull dmitryzhuravlev/k8s-web-express-nginx
docker run --rm -p 3000:3000 dmitryzhuravlev/k8s-web-express-nginx
```

## Notes

- For `/nginx` to return content, you must run an Nginx (or other HTTP) service reachable as `nginx` on the same Docker network or as a Kubernetes Service.
- The container reads the `HOSTNAME` environment variable (as set by Kubernetes) to display pod identity on the UI.
- This image is suitable for demonstrating Kubernetes Ingress behavior such as host/path routing and HTTP health probes.


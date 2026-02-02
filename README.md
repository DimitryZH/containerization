# Docker Container Projects for Web Workloads

This repository contains several focused Docker projects that demonstrate different ways to package and run web workloads in containers.

The emphasis is on practical image design, web server configuration, and patterns that translate directly to Kubernetes and production infrastructure.

## Repository structure

```text
.
├── ingress-express-nginx/
├── k8s-php-testapp/
├── nginx-webserver/
└── webserver-apache/
```

### Project directories

- `ingress-express-nginx/` – Node.js Express application designed for Kubernetes Ingress demos, including health checks, inter-service calls to an Nginx backend, and an HTML UI that surfaces pod metadata.
- `k8s-php-testapp/` – Minimal PHP/Apache HTTP server container that renders the server IP address for debugging and cluster/network testing.
- `nginx-webserver/` – Multi-stage Ubuntu + Nginx image that clones a static website from GitHub and serves it via Nginx, illustrating image layering and cleanup.
- `webserver-apache/` – Handcrafted Apache httpd image workflow built entirely with Docker CLI and a running container, showing manual image creation and size optimization.

## Technologies

- Docker and Docker CLI
- Node.js and Express
- PHP and Apache httpd
- Nginx
- Ubuntu 22.04 and Amazon Linux 1
- Git-based content delivery into images
- Kubernetes-oriented application design (Ingress-ready HTTP workloads)

## Containerization concepts demonstrated

- Dockerfile authoring and multi-stage builds
- Image layering, cleanup, and size optimization
- Web server containerization (Apache and Nginx)
- Environment-driven behavior (for example, `HOSTNAME`, container networking)
- Patterns for Kubernetes-ready applications: health endpoints, service-to-service HTTP, and external API calls

## Usage

### Prerequisites

- Docker installed and configured
- Optional: Node.js and npm if you want to run the Express app without Docker

### Clone the repository

```bash
git clone <this-repo-url>
cd containerization
```

### Build and run examples

From the repository root:

```bash
# Kubernetes Ingress demo: Express + Nginx
docker build -t k8s-web-express-nginx ./ingress-express-nginx
docker run --rm -p 3000:3000 --name k8s-web-express-nginx k8s-web-express-nginx

# PHP test application (server IP visibility)
docker build -t k8s-php-testapp ./k8s-php-testapp
docker run --rm -p 8080:80 --name k8s-php-testapp k8s-php-testapp

# Nginx static website (multi-stage build)
docker build -t nginx-webserver ./nginx-webserver
docker run --rm -p 8081:80 --name nginx-webserver nginx-webserver
```

For the Apache handcrafted workflow, follow the scripted steps:

```bash
cd webserver-apache
bash bash_script.sh
```

Refer to each project README for container-specific notes and Kubernetes-oriented usage.


# Kubernetes PHP Test Application

## Purpose

This project provides a minimal PHP application packaged in a Docker image for testing web connectivity in Docker and Kubernetes environments. The page renders the server IP address so you can easily verify which container or node is serving traffic.

## Technologies used

- Amazon Linux 1 base image
- Apache HTTP Server (`httpd`)
- PHP
- Docker

## Key containerization concepts

- Building a simple PHP/Apache container image without a framework
- Exposing a single HTTP port (80) for service or pod testing
- Using application output (server IP) to debug load balancing and network routing

## How to build and run

From the repository root:

```bash
docker build -t k8s-php-testapp ./k8s-php-testapp
docker run --rm -p 8080:80 --name k8s-php-testapp k8s-php-testapp
```

Then open:

```text
http://localhost:8080
```

The page displays:

- Static application text
- The server IP address obtained from `$_SERVER['SERVER_ADDR']`

## Notes

- This image is useful for validating Kubernetes Service and Ingress routing, as different replicas will expose different server IPs.
- The Dockerfile intentionally uses a straightforward package-based installation to keep the setup transparent for troubleshooting and demo purposes.


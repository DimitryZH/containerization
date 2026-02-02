# Nginx Static Web Server (Multi-stage Build)

## Purpose

This project builds an Nginx-based container that serves a static website cloned from a Git repository. It uses a multi-stage Dockerfile to keep the final image small and focused on runtime dependencies.

## Technologies used

- Docker multi-stage builds
- Ubuntu 22.04
- Nginx
- Git (build stage only)

## Key containerization concepts

- Separating build and runtime stages in a Dockerfile
- Copying only the website content into the final image
- Cleaning up build tools and temporary data to reduce image size
- Serving static content from Nginx inside a container

## How to build and run

From the repository root:

```bash
docker build -t nginx-webserver ./nginx-webserver
docker run --rm -p 8081:80 --name nginx-webserver nginx-webserver
```

Then open:

```text
http://localhost:8081
```

The container:

- Clones the website content from `https://github.com/DimitryZH/content-widget-factory-inc.git`
- Serves the `web` directory via Nginx

## Notes

- A reference build of this image is published on Docker Hub: `dmitryzhuravlev/dockerfileimage`.
- This project is a practical example of image hardening through multi-stage builds and post-build cleanup.


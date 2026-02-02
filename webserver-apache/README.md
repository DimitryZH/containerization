# Apache Web Server: Handcrafted Container Image

## Purpose

This project demonstrates how to build an Apache-based web server image by modifying a running container and committing it as a new image. It focuses on understanding image layers, cleanup, and running multiple containers from a handcrafted image.

## Technologies used

- Docker CLI
- Apache HTTP Server (`httpd:2.4` base image)
- Bash

## Key containerization concepts

- Using `docker run`, `docker exec`, and `docker commit` to create images
- Installing tools and application code directly inside a running container
- Cleaning up temporary files and utilities to reduce image size
- Running multiple containers from the same custom image

## How to build and run

The workflow is implemented as a scripted set of Docker commands. From the repository root:

```bash
cd webserver-apache
bash bash_script.sh
```

The script:

- Pulls the `httpd:2.4` base image and runs a template container
- Installs Git and clones the sample website
- Copies the site into Apache's document root
- Commits the modified container as a versioned image
- Cleans up tools and temporary data and commits a smaller second version
- Runs multiple containers from the cleaned image on different host ports

## Notes

- The detailed sequence of commands is maintained in `bash_script.sh`.
- This pattern is useful for exploratory debugging and for learning how container image layers are created, even though production images are typically built with Dockerfiles.


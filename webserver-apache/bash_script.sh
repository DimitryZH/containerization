# Step 1: Get and Run the Base Image as Template.

# Retrieve the httpd 2.4 image from Docker hub.
docker pull httpd:2.4
# Start a container from the httpd image.
docker run --name webtemplate -d httpd:2.4
# Check the status of the webtemplate container:
docker ps

# Step 2: Install Tools and add the Website Code in the Container.

# Log in to the container:
docker exec -it webtemplate bash
# Update the base image and install git:
apt update && apt install git -y
# Get website code from GitHub:
git clone  https://github.com/linuxacademy/content-widget-factory-inc.git /tmp/widget-factory-inc
# Verify that the code was cloned successfully:
ls -l /tmp/widget-factory-inc/
# List the files in the htdocs/ directory:
ls -l htdocs/
# Remove the default index page and copy the website files to httpd's web serving directory:
rm htdocs/index.html.
# Copy the webcode from /tmp/ to the htdocs/ folder:
cp -r /tmp/widget-factory-inc/web/* htdocs/
# Verify that they were copied over successfully:
ls -l htdocs/
# Log out of the container:
exit

# Step 3: Create an Image from the Container Template.

# Find and copy the template container's ID:
docker ps
# Create an image from the container. Name it  widgetfactory with version v1 from the container. (Alternatively, use the container's name in place of its ID for docker commit):
 docker commit <CONTAINER_ID> example/widgetfactory:v1
# Verify that the image was created successfully:
docker images
# View the image information. Take note of the image size.
  
# Step 4: Clean up the Template for a Second Version.

# Log in to the container:
docker exec -it webtemplate bash
# Remove temporary files - the cloned code from the /tmp/ directory:
rm -rf /tmp/widget-factory-inc/
# Remove installed utilities - uninstall git and clean the cache:
apt remove git -y && apt autoremove -y && apt clean
# Log out of the container:
exit
# Check the status of the container:
docker ps
# Find the template container's ID and  create a new image named widgetfactory with version v2 from the container:
docker commit <CONTAINER_ID> example/widgetfactory:v2
# Verify that both images are now running. Take note of the image sizes. Version v2 is significantly smaller than v1:
docker images  
# Delete the v1 image since it is obsolete:
docker rmi example/widgetfactory:v1

# Step 5: Run Multiple Containers from the cleaned Image.

# Start three containers from the widgetfactory:v2 image with different published web ports. # The exposed ports should be in the 8000 to 8999 range:
docker run -d --name web1 -p 8081:80 example/widgetfactory:v2
docker run -d --name web2 -p 8082:80 example/widgetfactory:v2
docker run -d --name web3 -p 8083:80 example/widgetfactory:v2
# Check the status of the containers:
docker ps
# Stop the base webtemplate image:
docker stop webtemplate
# Verify that only the created containers are running:
docker ps
# View the website from each successfully running container in a browser, using the three exposed web ports:
# <SERVER_PUBLIC_IP_ADDRESS>:8081
# <SERVER_PUBLIC_IP_ADDRESS>:8082
# <SERVER_PUBLIC_IP_ADDRESS>:8083

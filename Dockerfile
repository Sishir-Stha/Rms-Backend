# every docker file must start with from and then the base image 
# in this case we are using node version 22 as our base image 

FROM node:22

# we are setting the working directory to /RMS-BACKEND, this is where all our code will be located in the container
WORKDIR /RMS-BACKEND

# Usually in node we download the code then run npm install to install the dependencies,
# but in docker we download the dependencies first and then download the code 
# for that we copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Now for why we do that 
# the docker have a thing called layer caching it means each step could be seen as a layer and docker
# works in every layer individually, so if any layers changes then that all layers and all the after layer
# will be re-run but the layers before that will be cached and not re-run

## hence if we copy ocde first and then install dependencies then everytime we change code dependecies will get downloaded
## isntead lets install dependecies then copy code so if we change code only code will be re-run not all dependecies

RUN npm install

# now we copy the rest of the code to the container
COPY . .
# this command copy every thing but we dont need the node modules so lets make dockerignore 

# this say we gonna need this port to run our application
EXPOSE 4000

#Run the app
CMD ["npm","run","dev"]
# Why not use RUN npm run dev instead
# because RUN is used to run commands during the build time of the docker image, 
# while CMD is used to specify the command that will be executed when a container is started from the image.
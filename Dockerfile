#############
### build ###
#############

# base image
FROM node:12 as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./app/
RUN npm install

# add app
COPY . /app

# Install necessary CLI to be able to build the app
RUN npm install --save-dev --silent @angular-devkit/build-angular
RUN npm install -g --silent @angular/cli

# generate build
RUN ng build --prod --output-path=dist

############
### prod ###
############

# base image
FROM nginx:1.17.10-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# In Cloud Run container instances, the PORT environment variable is always set to 8080, but for portability reasons set a value here
ARG PORT=8080
EXPOSE $PORT

# run nginx
CMD ["nginx", "-g", "daemon off;"]
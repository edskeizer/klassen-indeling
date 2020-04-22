#############
### build ###
#############

# base image
FROM node as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./app/
RUN npm install
RUN npm install -g @angular/cli@9.1.2
RUN npm install --save-dev @angular-devkit/build-angular

# add app
COPY . /app

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

ARG PORT=8080
EXPOSE $PORT

# run nginx
CMD ["nginx", "-g", "daemon off;"]
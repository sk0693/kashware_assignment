FROM node:lts-jessie

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install -g nodemon

# start app
CMD ["sh","-c","npm install  && npm start"]
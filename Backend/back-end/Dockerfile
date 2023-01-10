FROM node:12.16.1-alpine3.9 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm install -f -save
RUN npm install circular-json
COPY . /app
EXPOSE 3000
CMD ["npm", "run", "start"]
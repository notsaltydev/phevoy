FROM node:12

## Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

## Installing PM2
RUN npm install pm2 -g

COPY package*.json ./

## Installing dependencies
RUN npm install

## Installing dependencies for production
#RUN npm ci --production

## Copying source files
COPY . .

## Building SSR app
RUN npm run build:ssr

## Running the app
#CMD [ "npm", "start" ]

## Running the app using PM2
# pm2 start npm --name "phevoy" -- run serve:ssr
CMD ["pm2-runtime", "start", "npm", "--name", "phevoy", "--", "run", "serve:ssr"]

LABEL traefik.backend=${CI_ENVIRONMENT_SLUG:-master} traefik.frontend.rule=Host:${CI_ENVIRONMENT_SLUG:-www}.skybuzz.xyz traefik.docker.network=traefik_net traefik.enable=true traefik.port=4000 traefik.default.protocol=http

FROM node:10.11.0-alpine

LABEL maintainer="mhavelant"

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["npm", "start"]

WORKDIR /home/node/app

ENV PATH="/home/node/app/node_modules/.bin:$PATH"

RUN apk add --no-cache tini

COPY . .

RUN npm install --only=production --no-shrinkwrap && \
    npm cache -g clean --force && \
    chown -R node:node /home/node

USER node

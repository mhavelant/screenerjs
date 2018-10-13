# Build.
FROM node:10.12.0-alpine as builder

LABEL maintainer="mhavelant"
WORKDIR /home/node/app
ENV PATH="/home/node/app/node_modules/.bin:$PATH" \
    NODE_ENV=development

COPY . .

RUN npm install && npm run compile


# Dist.
FROM node:10.12.0-alpine as dist

LABEL maintainer="mhavelant"
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]
WORKDIR /home/node/app
ENV PATH="/home/node/app/node_modules/.bin:$PATH" \
    NODE_ENV=production

RUN apk add --no-cache tini

COPY --from=builder ["/home/node/app/dist/", "/home/node/app/dist/"]
COPY --from=builder ["/home/node/app/package.json", "/home/node/app/package-lock.json", "./"]

RUN npm install --only=production --no-shrinkwrap && \
    npm cache -g clean --force && \
    chown -R node:node /home/node

USER node

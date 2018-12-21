# Globals.
ARG NODE_IMAGE_TAG

# Build.
FROM node:$NODE_IMAGE_TAG as builder

LABEL maintainer="mhavelant"
WORKDIR /home/node/app
ENV PATH="/home/node/app/node_modules/.bin:$PATH" \
    NODE_ENV=development

COPY ["package.json", "package-lock.json", "./"]
RUN npm install

COPY . .
RUN npm run compile

# Dist.
FROM node:$NODE_IMAGE_TAG as dist

LABEL maintainer="mhavelant"
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]
WORKDIR /home/node/app
ENV PATH="/home/node/app/bin:/home/node/app/node_modules/.bin:$PATH" \
    NODE_ENV=production

RUN apk add --no-cache tini

COPY --from=builder ["/home/node/app/package.json", "/home/node/app/package-lock.json", "./"]
RUN npm install --only=production --no-shrinkwrap && \
    npm cache -g clean --force

COPY --from=builder ["/home/node/app/dist/", "/home/node/app/dist/"]

RUN chown -R node:node /home/node && \
    mkdir /home/node/app/bin && \
    ln -s /home/node/app/dist/cli/index.js /home/node/app/bin/screenerjs && \
    chmod +x /home/node/app/bin/screenerjs

USER node

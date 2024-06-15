# use the official Bun image
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --production

# copy node_modules from temp directory to the container
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules

# copy the app files to the container
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/* .

# Install netcat for wait-for-it.sh script
RUN apt-get update && apt-get install -y netcat

# run the app
USER bun
EXPOSE 3000/tcp
# Wait for Mongodb to start
ENTRYPOINT [ "./wait-for-it.sh", "mongo", "--", "bun", "start" ]

# FROM oven/bun:1 as base
# WORKDIR /usr/src/app

# COPY . .

# RUN bun install

# # Install netcat for wait-for-it.sh script
# RUN apt-get update && apt-get install -y netcat

# USER bun
# EXPOSE 3000/tcp
# # Wait for Mongodb to start
# ENTRYPOINT [ "./wait-for-it.sh", "mongo", "--", "bun", "start" ]
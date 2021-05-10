FROM mhart/alpine-node:14.15.3

WORKDIR /app
# RUN apk add  --no-cache ffmpeg
ARG TOKEN
ARG PORT

ENV PATH=/app/node_modules/.bin:$PATH
ENV TOKEN $TOKEN
ENV PORT $PORT

COPY package.json /app
# RUN yarn install --prod
RUN yarn install
COPY . /app
RUN yarn build
CMD ["yarn","start"]
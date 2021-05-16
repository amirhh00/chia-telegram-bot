# FROM mhart/alpine-node:14.15.3
FROM mhart/alpine-node:16.1.0

WORKDIR /app
RUN apk update \
  && apk add openssh 
# && apk add sqlite3 
#   && apk add sqli...

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
FROM node:12-alpine

ENV WORK /work

WORKDIR $WORK

COPY ./package*.json ./

RUN npm ci

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 9999

ENTRYPOINT ["./entrypoint.sh"]

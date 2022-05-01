FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE secret_PORT
ENV PORT=secret_PORT
ENV DBUSER="secret_DBUSER"
ENV DBPASSWORD="secret_DBPASSWORD"
ENV DBURL="secret_DBURL"
ENV DBPORT=secret_DBPORT
ENV DBNAME="secret_DBNAME"
RUN chmod +x index.js
ENTRYPOINT [ "node", "index.js" ]
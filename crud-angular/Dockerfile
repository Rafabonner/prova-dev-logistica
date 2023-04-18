FROM node:18.13.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build --prod
CMD ["npm", "run", "start"]

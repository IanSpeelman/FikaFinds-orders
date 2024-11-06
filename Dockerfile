FROM node:lts-iron
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3002
CMD ["npm", "run", "dev"]

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install TypeScript globally to avoid permission issues
RUN npm install -g typescript

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
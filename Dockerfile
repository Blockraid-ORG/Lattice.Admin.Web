# Step 1: Build
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Step 2: Run
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app ./

RUN npm install --production

EXPOSE 3000
CMD ["npm", "start"]

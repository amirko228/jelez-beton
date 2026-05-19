FROM node:22-alpine AS base
WORKDIR /app
COPY package.json .
COPY apps/client/package.json apps/client/package.json
COPY packages/types/package.json packages/types/package.json
RUN npm install
COPY . .
ARG NEXT_PUBLIC_API_URL=http://localhost:8080/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build -w @jelez/client
EXPOSE 3000
CMD ["npm", "run", "start", "-w", "@jelez/client"]

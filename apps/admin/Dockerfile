FROM node:22-alpine AS base
WORKDIR /app
COPY package.json .
COPY apps/admin/package.json apps/admin/package.json
RUN npm install
COPY . .
ARG NEXT_PUBLIC_API_URL=http://localhost:8080/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build -w @jelez/admin
EXPOSE 3001
CMD ["npm", "run", "start", "-w", "@jelez/admin"]

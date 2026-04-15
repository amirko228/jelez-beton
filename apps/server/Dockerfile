FROM node:22-alpine
WORKDIR /app
COPY package.json .
COPY apps/server/package.json apps/server/package.json
RUN npm install
COPY . .
RUN npm run prisma:generate -w @jelez/server
RUN npm run build -w @jelez/server
EXPOSE 4000
CMD ["sh", "-c", "node -e \"const net=require('net');let n=0;const max=60;const tryConnect=()=>{const s=net.createConnection({host:'db',port:5432},()=>{s.end();process.exit(0)});s.on('error',()=>{if(++n>=max) process.exit(1);setTimeout(tryConnect,1000);});};tryConnect();\" && npm run prisma:migrate -w @jelez/server && npm run prisma:push -w @jelez/server && npm run prisma:seed -w @jelez/server && npm run start -w @jelez/server"]

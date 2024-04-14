FROM node:alpine

WORKDIR /app

COPY frontend/package* ./frontend/
COPY package* ./backend/

RUN npm install --force --prefix ./frontend
RUN npm install --force --prefix ./backend

COPY frontend ./frontend
COPY backend ./backend

RUN npm run build --prefix ./frontend

RUN npm install -g serve

EXPOSE 3000
EXPOSE 4000

CMD ["sh", "-c", "cd /app/backend && node server.js & npx serve -s /app/frontend/build -l 3000"]

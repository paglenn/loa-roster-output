FROM node:18

WORKDIR /Users/nls.pglenn/github/Codesmith/solo-project

COPY package*.json ./

RUN npm install 

COPY . . 

ENV PORT=8080

EXPOSE 8080

CMD ["npm","run","dev"]

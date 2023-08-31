FROM node:18
# this directory could be anything 
WORKDIR /Users/nls.pglenn/github/Codesmith/solo-project 

COPY package*.json ./

RUN npm install 

COPY . . 

ENV PORT=8080

EXPOSE 8080

CMD ["npm","start"]

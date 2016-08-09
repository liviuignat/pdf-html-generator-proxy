FROM nodesource/node:5.10.0

ADD package.json package.json
ADD . .
RUN npm install --production
RUN SERVICE_NAME=pdf-html


EXPOSE  3000
CMD ["npm", "run", "start"]

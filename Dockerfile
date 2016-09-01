FROM nodesource/node:5.10.0

ADD package.json package.json
ADD . .
RUN npm install --production
RUN SERVICE_NAME=pdf-html

# Node environment
ENV NODE_ENV=production
# Running port for node
ENV PORT=3000
# Internal docker cluster API URL
ENV BASE_PDF_API_URL=http://192.168.178.19:8003

EXPOSE  3000
CMD ["npm", "run", "start"]

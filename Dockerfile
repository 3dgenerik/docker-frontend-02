# build phase
FROM node:19-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "build"]

# start phase
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html





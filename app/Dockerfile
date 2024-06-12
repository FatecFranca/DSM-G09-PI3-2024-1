#FROM nginx:alpine

#COPY index.html /usr/share/nginx/html
#COPY script.js /usr/share/nginx/html

#EXPOSE 80

# Stage 1: Build the React app
FROM  node:18-alpine AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY . ./

RUN npm install
RUN npm run build

# Stage 2: Serve the React app with Nginx
# FROM nginx:alpine

# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

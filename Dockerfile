# Stage 1: Build Stage
FROM node:22-alpine AS build-stage

WORKDIR /app

# Copy package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install dependencies (including TypeScript and Vite)
RUN npm install && npm install -g typescript vite

# Copy the rest of the application files
COPY . .

# Build: Run TypeScript compiler and then Vite build
RUN tsc --noEmit && vite build

# Stage 2: Production Stage
FROM nginx:1.27-alpine AS production-stage

# Copy the built files from the build-stage to the Nginx folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

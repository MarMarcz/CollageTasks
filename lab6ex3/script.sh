#!/bin/bash

# Set a variable for your network name
network_name="my-network"

# Check if the network exists, and create it if it doesn't
if [ ! "$(docker network ls | grep $network_name)" ]; then
  docker network create $network_name
fi
# Build the Postgres database Docker image
docker build -t my-postgres-db ./db

# Run the Postgres database container
docker run --name my-postgres \
  --network=$network_name \
  -v "$(pwd)/db/data:/var/lib/postgresql/data" \
  -d my-postgres-db

# Continue with the rest of your services

# Build and run the Express app container
cd app
docker build -t my-express-app .
docker run --name my-express-app-container --network=$network_name -p 3000:3000 -d my-express-app
cd ..

# Build and run the test container
cd tests
docker build -t my-app-tests .
docker run --name my-app-tests-container --network=$network_name my-app-tests
cd ..

#!/bin/bash

# Sprawdzenie czy kontener frontendu działa
if docker ps -q --filter "name=frontend_container" | grep -q .; then
    echo "Frontend container is running"
else
    echo "Frontend container is not running"
    exit 1
fi

# Sprawdzenie czy kontener backendu działa
if docker ps -q --filter "name=backend_container" | grep -q .; then
    echo "Backend container is running"
else
    echo "Backend container is not running"
    exit 1
fi

# Sprawdzenie czy kontener bazy danych działa
if docker ps -q --filter "name=database_container" | grep -q .; then
    echo "Database container is running"
else
    echo "Database container is not running"
    exit 1
fi

# Sprawdzenie czy serwer frontendu jest dostępny
if curl -sSf http://localhost:8080/ > /dev/null; then
    echo "Frontend server is reachable on port 8080"
else
    echo "Frontend server is not reachable on port 8080"
    exit 1
fi

# Sprawdzenie czy serwer backendu jest dostępny
if curl -sSf http://localhost:8081/ > /dev/null; then
    echo "Backend server is reachable on port 8081"
else
    echo "Backend server is not reachable on port 8081"
    exit 1
fi

# Sprawdzenie czy backend ma dostęp do bazy danych
if docker exec backend_container curl -sSf http://database_container:27017/ > /dev/null; then
    echo "Backend has access to the database"
else
    echo "Backend does not have access to the database"
    exit 1
fi

echo "Connection between services is correct"
exit 0


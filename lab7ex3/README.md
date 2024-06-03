# RESTful Flask and Express.js Applications with Traefik

## Wymagania wstępne
- Docker
- Docker Compose

## Instrukcja uruchomienia

Sklonuj repozytorium:
   git clone https://github.com/MarMarcz/CollageTasks/new/main/lab7ex3
   cd traefik

Następnie:
docker-compose up --build

Testowanie:
http://localhost/flask/cars
http://localhost/flask/cars?year=2020
http://localhost/express/cars
POST http://localhost/express/addCar
{
  "make": "Toyota",
  "model": "Corolla",
  "year": 2020
}






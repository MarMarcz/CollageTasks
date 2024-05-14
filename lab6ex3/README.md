Opis

SUT - System Under Test
Projekt tworzy 3 kontenery Dockerowe:

Express.js z aplikacją, zawierającą proste API
PostgreSQL z bazą danych i kilkoma rekordami
Jasmine z testami naszej aplikacji
Uruchomienie

Sklonuj repozytorium na swój komputer.
Aby uruchomić projekt, wykonaj skrypt script.sh. Przed uruchomieniem upewnij się, że na twoim komputerze zainstalowany jest Docker.
script.sh utworzy wszystkie potrzebne obrazy oraz kontenery, a także uruchomi testy.
Jeśli chcesz przetestować aplikację manualnie, możesz odwiedzić następujące adresy:

http://localhost:3000/people/
http://localhost:3000/people/1
http://localhost:3000/average

//Nie zapomnij o node_modules

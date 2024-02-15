docker rm -f db-postgres
docker rmi -f db-postgres
docker build -t db-postgres .
docker run -d -p 5432:5432 --restart=always --name db-postgres db-postgres
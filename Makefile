dev-up:
	docker-compose up --build

prod-up:
	docker-compose -f docker-compose.prod.yml up --build

down:
	docker-compose down -v
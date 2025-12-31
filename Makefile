.PHONY: dev prod down

# Default target runs dev
all: dev

dev:
	docker-compose -f docker-compose.yml up --build -d

prod:
	docker-compose -f docker-compose.prod.yml build --no-cache
	docker-compose -f docker-compose.prod.yml up -d

down:
	docker-compose -f docker-compose.yml down
	docker-compose -f docker-compose.prod.yml down
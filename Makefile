build:
	docker build -t tgbot .

run:
	docker run -d -p 3000:3000 --name tgbot --rm tgbot
	docker ps

destroy:
	docker stop tgbot -i
	docker rmi tgbot -i
	docker rmi 2573171e0124 -i
	docker ps
	docker images

debug:
	docker run -p 3000:3000 --name tgbot --rm tgbot

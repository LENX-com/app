### DEV

build-dev:
	cd frontend && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

### LOCAL (prod config)

build-local:
	cd frontend && $(MAKE) build-local
	cd server && $(MAKE) build

run-local:
	 docker-compose -f docker-compose-production.yml up

### PROD

build-production:
	cd frontend && $(MAKE) build-production
	cd server && $(MAKE) build	

run-production:
	docker-compose -f docker-compose-production.yml up
	
stop:
	docker-compose -f docker-compose-production.yml down

### REMOTE

SSH_STRING:=root@46.101.87.78

ssh:
	ssh $(SSH_STRING)
	scp -r ./* root@46.101.87.78:/root/


# apt install make

copy-files:
	scp -r ./* $(SSH_STRING):/root/

# when you add firewall rule, have to add SSH on port 22 or it will stop working

# run challenge with cloudflare on flexible, then bump to ful
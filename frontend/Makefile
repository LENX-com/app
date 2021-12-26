build-dev:
	docker build -t react-app-dev -f Dockerfile.dev .

###################

build-local:
	docker build \
		-t react-app-production:local \
		--build-arg CADDYFILE=Caddyfile.local \
		--build-arg BASE_URL=http://localhost:5000/api \
		-f Dockerfile.production .

###################

build-production:
	docker build \
		-t react-app-production:production \
		-f Dockerfile.production .

build-nginx: 
	cd nginx && docker build -t nginx-image -f Dockerfile .


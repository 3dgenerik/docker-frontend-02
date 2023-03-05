//create docker file
Dockerfile
-----------------------------------------------------------
# Use an existing docker image as a base
FROM alpine

# Download and install a dependency
RUN apk add --update gcc
RUN apk add --update redis

# Tell the image what to do when it starts as a container
CMD ["redis-server"]
-----------------------------------------------------------



//run docker file
docker build .
-----------------------------------------------------------
Sending build context to Docker daemon  2.048kB
Step 1/4 : FROM alpine
 ---> b2aa39c304c2
Step 2/4 : RUN apk add --update gcc
 ---> Using cache
 ---> 5d0746c2a2d9
Step 3/4 : RUN apk add --update redis
 ---> Using cache
 ---> f8526ffe911b
Step 4/4 : CMD ["redis-server"]
 ---> Using cache
 ---> 6baa38be9c6f
Successfully built 6baa38be9c6f
-----------------------------------------------------------
//run image 6baa38be9c6f with new container
docker run <image_ID>

//posto je smaranje da kreiramo image sa random brojevima i slovimo,
//mozemo da image-u damo ime 
docker build -t milesoda/redis:latest .

//run image with container
docker run milesoda/redis


//////////////////////////////////ANOTHER WAY//////////////////////////////////////
//create new blank container manualy
docker run -it alpine sh
# apk add --update redis

//open another cmd prompt and add CMD
docker commit -c 'CMD ["redis-server"]' <container_id>

//now run container
docker run <container_id>
//////////////////////////////////////////////////////////////////////////////////////

//remove all containers
docker rm -f $(docker ps -a -q)



1. create nodejs server (test)
2. create dockerfile
	FROM node:19-alpine
	WORKDIR /usr/app
	COPY ./ ./
	RUN npm install
	CMD ["npm", "run", "dev"]

3. docker build -t milesoda/docker-test-01 .
4. docker run -p 8080:8080 milesoda/docker-test-01

//Go to shell inside container
docker run -it milesoda/docker-test-02 sh
docker exec -it <container_id> sh

-----------------------------------------------------------
//when we use Dockerfile.dev (in development mode)
docker build -f Dockerfile.dev .

//create Dockerfile.dev in development mode

FROM node:19-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]

//ubuduce, umesto da kopiramo foldere iz projekta ui kontejner, koristicemo
// reference projektnih foldera u kontejneru, npr:
//UMESTO OVOGA
-projekat			-container
	/src		--------	/app/src
	/public	--------	/app/public

//PRAVIMO OVO
-projekat			-container
	/src		<--------	reference
	/public	<--------	reference




//docker volume
 

//first make WSL integration in docker desktop if we wont use -v $(pwd):/app
//za windows usere korsiti powershell, bash... i napisati ovako. I obavezno otici u root folder projekta
//node_modules nemamo u projektu zato sto ce brze da radi build images. I zato sto u Dockerfile.dev imamo RUN npm install
//ovde -v ${PWD}:/app znaci da sve van kontejnera, sa PWD-a (present working dir) mapiramo na /app unutar kontejnera. Tzv. mapping
//ovde -v /app/node_modules  put a bookmark on the node_modules folder u kontejneru.
//Dakle ovo se koristi kad nemamo node_models folder u projektu i kad ne zelimo da overwrite-ujemo node_moudles u kontejneru.
//I bez ovoga ne radi, zato sto app ne moze da nadje skripte unutar node_modules
docker run -it -p 3000:3000 -v /app/node_modules -v ${PWD}:/app milesoda/docker-frontend-02

//Zato sto su ove CLI komande dugacke i komplikovane, najbolje je koristiti docker-compose

//i ovo je bitno
  "scripts": {
    "start": "WATCHPACK_POLLING=true react-scripts start",
  },

/////////////////////////TESTOVI///////////////////////
//output is STDOUT (samo output dobijamo)
docker run milesoda/web npm run start

//output is STDIN (Ovde dobijamo full overview i mozemo da koristimo komande)
docker run -it milesoda/web npm run start

//fix problem with axios. Add these lines in package.json
  "jest": {
    "transformIgnorePatterns": [
      "node_modules/(?!axios)/"
    ]
  },

///////////////////////////////NGINX//////////////////////////////////////
//nginx is web server. We use nginx to create production version of our web container.

//za build proces mi moramo da kreiramo Dockerfile ge cemo imati odvojena dva bloka. Jedan za build, drugi za Nginx. Ovako to izgleda

# build phase
FROM node:19-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "build"]

# start phase
FROM nginx
#copy build to specific folder in container
COPY --from=builder /app/build /usr/share/nginx/html

docker build -t milesoda/build
docker run -p 8080:80 milesoda/build
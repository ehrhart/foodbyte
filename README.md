## foodByte

Programmable Web project at Polytech Nice Sophia-Antipolis 2019.

Based on MEAN (MongoDB, Express, Angular, Node) stack.

### Pre-requisites
* git - [Installation guide](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) .  
* node.js - [Download page](https://nodejs.org/en/download/) .  
* npm - comes with node or download yarn - [Download page](https://yarnpkg.com/lang/en/docs/install) .  
* mongodb - [Download page](https://www.mongodb.com/download-center/community) .  

### Installation (manually)
``` 
git clone https://github.com/ehrhart/foodbyte
cd foodbyte
cp .env.example .env
npm install
npm start # (for development)
```

### Installation (Docker)
``` 
git clone https://github.com/ehrhart/foodbyte
cd foodbyte
cp .env.example .env
docker-compose up -d
```

### Production deployment
```
git clone https://github.com/ehrhart/foodbyte
cd foodbyte
cp .env.example .env
docker-compose -f docker-compose.yml -f production.yml up -d
```

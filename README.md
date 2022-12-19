# DAI-2022-HTTP-Infra
## Step 1 : Serveur web statique

Cette partie met en service un serveur web statique avec apache httpd.
Pour illustrer cela, nous avons utilisé le template Bootstrap "KnightOne".

### Dockerfile
```
FROM php:7.2-apache          # Spécifie l'image qu'on utilise ainsi que la version

EXPOSE 8081

COPY content/ /var/www/html/ # Copie le contenu du dossier content dans le dossier html du serveur web
```

### Apache config

La configuration apache se trouve dans le dossier `apache2` qui est accessible dans le container.
Pour y accéder il faut se connecter au container avec la commande `docker exec -it <container_name> bash` 
et ensuite aller dans le dossier `/etc/apache2`.

## Step 2 : Serveur web dynamique

Cette partie met en service un serveur web `node.js` (v.18.12.1) avec le framework `express.js` qui génèrent aléatoirement
des données de factures à chaque requête GET sur la racine. Le port à l'écoute côté container est le 3000.

Installer tout d'abord les dépendances de node dans le dossier `src` :
```bash
cd src
npm install
```

Construisez ensuite le container en local :
```bash
cd node-express-image
docker build -t hugoducom/node-invoices .
```

Lancez l'instance de l'application :
```bash
docker run -p 8082:8082 hugoducom/node-invoices
```
_Ici le port 8082 en local a été choisi, il peut être changé. En revanche, ne pas changer le port 8082 du container._

En faisait une requête GET sur `localhost` on obtient une liste de factures générées aléatoirement (cf. [exemple](docker-images/node-express-image/response_example.json)):

```json
[
  {
    "firstName":"Jordan",
    "lastName":"Vogel",
    "cardNumber":"5610695121575623",
    "productsSold":[
      {
        "productId":"107-96-0467",
        "productName":"kisfi",
        "quantity":7,
        "productUnitPrice":5328.26,
        "productTotalPrice":"37297.82"
      }
    ]
  },
  {
    "firstName":"Kate",
    "lastName":"Rovai",
    "cardNumber":"6304334605965006",
    "productsSold":[
      {
        "productId":"844-97-5832",
        "productName":"gemiwep",
        "quantity":8,
        "productUnitPrice":1783.01,
        "productTotalPrice":"14264.08"
      },
      {
        "productId":"952-29-7507",
        "productName":"feficotof",
        "quantity":10,
        "productUnitPrice":6042.76,
        "productTotalPrice":"60427.60"
      }
    ]
  }
]
```

## Step 3a : Docker compose

TODO

## Step 3b : Traefik reverse proxy

Il nous faut désormais configurer un reverse proxy à l'aide de Traefik.

Ce dernier va permettre de configurer les routes par lequelles seront accessibles les 2 services (static et dynamic).

Pour installer Traefik, il faut simplement suivre le [quick start](https://doc.traefik.io/traefik/getting-started/quick-start/) et modifier notre [docker-compose](./docker-images/docker-compose.yml).

Pour rajouter les routes, il faut utiliser l'option `labels` avec une [rule de Traefik](https://doc.traefik.io/traefik/routing/providers/docker/#routers) dans chaque service :

```yml
# static service
depends_on:
  - reverse_proxy
labels:
  - "traefik.http.routers.static.rule=Host(`localhost`)"
# dynamic service
depends_on:
  - reverse_proxy
labels:
  - "traefik.http.routers.dynamic.rule=(Host(`localhost`) && PathPrefix(`/api`))"
```

_Note : `reverse_proxy` est le nom du service de Traefik._

Grâce à ces quelques lignes dans le docker-compose, on peut accéder aux 2 services via les routes suivantes :
- Static : `localhost`
- Dynamic : `localhost/api`
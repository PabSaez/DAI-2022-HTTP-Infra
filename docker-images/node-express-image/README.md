# DAI-2022-HTTP-Infra

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
docker run -p 80:3000 hugoducom/node-invoices
```
_Ici le port 80 en local a été choisi, il peut être changé. En revanche, ne pas changer le port 3000 du container._

En faisait une requête GET sur `localhost` on obtient une liste de factures générées aléatoirement (cf. [exemple](response_example.json)):

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

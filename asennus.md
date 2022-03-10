# Ohjeet piSignage laiteasunnuksen tekemiseen

Ohjeet mukailtu virallisesta [ohjeesta](https://github.com/colloqi/pisignage#getting-the-player-ready)

## Valmistelut ja laiteohjelmiston asennus

* Vähintään 8GB micro-sd
* Lataa .iso tiedosto [täältä](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_3.0.4.img.zip)
* Asenna "poltto-ohjelma", suositellaan [Balena Etcheria](https://www.balena.io/etcher/) tai [Raspberry Pi Imageria](https://www.raspberrypi.com/software/)
* pura lataamasi kansio ja polta asennuskuva kortille asennus ohjelmalla
* poista kortti koneesta ja asenna laitteeseen

## Laitteen yhdistäminen piSignage palvelimeen

Liitä ulkoinen näppäimistö Raspberry Pihin

### Asetusten tekeminen laitteella ja liittäminen palvelimeen
* Ota talteen ruudulla näkyvä Player id
  * Koodi tarvitaan lisensointia varten
* Avaa laitteen valikko painamalla Ctrl + N
* Aseta serverin osoitteeksi `http://digisi.jelastic.metropolia.fi/`

## Laitteen lisensoiminen
Tässä kohdassa tarvitaan edellisessä vaiheessa talteen otettua Player id:tä.

### Tilaa lisenssejä
Kirjaudu käyttäjätunnuksellasi osoitteeseen `pisignage.com`
* Valitse sivuvalikosta kohta "Subscription/Licenses"
* Valitse "Player License Only with no subscription", jolla tilaat uusia näyttölisenssejä omalle palvelimelle
  * Kyseessä on kertaluonteinen laitekohtainen lisenssimaksu, joka ei sisällä tilausta
  * Muut kaksi valintaa koskevat pisignagen omia tilauksia. Valitse oikea vaihtoehto tarkkaan, jos haluat liittää laitteet omalle palvelimelle
### Rekisteröi laitteet
* Tilattuasi lisenssit avaa "Players"
* Sivun oikeasta yläkulmasta valitse "Register player"
* Oletusarvona on valittu "Managed". Vaihda valinta "Player license only"
  * **OLE TARKKANA!!!** Vaikka valinta menisikin väärin, pystyt lataamaan ja asentamaan lisenssin, mutta laite rekisteröidään käyttämään piSignagen palvelinta ja saat näyttölaitteille inhottavan tikkerin, vaikka olet maksanut lisenssistä
* Täytä annettuihin kenttiin talteen ottamasti Player id ja nimitiedot. Nimitiedot lähinnä auttavat tunnistamaan laitteen virhetilanteissa, mutta ovat melko merkityksettömiä, koska arvot voidaan määritellään palvelimelta.
### Lataa lisenssit
* Kun olet rekisteröinyt laitteet, lisenssit ovat ladattavissa sivulla "Subscription/Licenses" kohdassa "Licenses issued". Klikkaa "view" ja lataa joko kaikki lisenssit tai yksittäinen lisenssi.

### Lisenssin lisääminen palvelimelle

* Seuraavaksi mene omalle pisignage palvelimelle ja lataa lisenssi sivulla "Settings" ja valitse "Upload"

Voit katsoa myös [videon](https://youtu.be/WLdU_rSTRfo)


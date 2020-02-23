# Summoner Search  
## Produktbeschreibung

[Summoner Search](https://ss.vaorra.net/)  
***API Key lauft alle 24h ab (da Riot unser Projekt noch nicht akzeptiert hat und wir noch mit einem Developer Key arbeiten müssen) und einige Bilder werden nicht korrekt angezeit, da die Webseite auf einem Linuxserver (Case-sensitivity) lauft. (Funktioniert auf Windows korrekt)***

Summoner Search ist ein Tool für League of Legends Spieler. Sie können bei dem Startsuchfeld ihren "Summoner Name" eingeben und es wird für den jeweiligen Summoner die Profilübersicht und die Matchhistory angegeben. 
Sie können nach jedem League of Legends Spieler der sich auf dem EUW-Server registriert hat. Somit können Sie nach über 3 Mio. Spieler suchen. 

Beispiels Spielernamen bzw. Summonernames um die Seite zu testen wären:  
xHGeorgia; Beni8409; l am monkey  
Weiter Spieler um zum testen finden Sie [hier](https://euw.op.gg/ranking/ladder/)

Wir inspirierten uns bei unserer Idee bei Seiten wie [op.gg](euw.op.gg) oder [blitz.gg](blitz.gg).

Wenn Sie nach einem Spieler gesucht haben finden Sie Auf der linken Seite, in der Card, das Profil eines Spielers. Dort wird das Profilbild und der Name des Spielers ausgeben. Zudem finden Sie unterhalb den Ranglistenplatz des Spielers. Es wird  die momentane Stufe ausgeben (wie zum Beispiel Gold oder Platin) und der Rang in der Stufe (wie zum Beispiel IV oder II). Zudem werden noch die zugehörigen LP (Leaguepoints) ausgeben. Diese sagen aus wie man momentan im Rang steht. Die momentante Stufe
wird unten noch als Bild ausgeben. Im unteren Teil der Card finden Sie noch die Wins, Losses und die Winrate der momentanen Ranglisten Saison. Hier werden nur die Ranglisten Spiele einberechechnet, normale Spiele und andere Spass Modis werden hier ignoriert.  
Auf der rechten Seite finden Sie die letzten Spiele. Sie sehen welcher Champion gespielt wurde anhand des Bildes. Zudem sieht man, welcher Modus gespielt wurde, vor wievielen Stunden das Spiel abgeschlossen wurde, die Länge des Spieles und man sieht ob das spiel gewonnen wurde oder verloren. Wenn Sie die Box ausklappen sehen Sie welche Spieler im jeweiligen Spiel mit dem gesuchten Spieler dabei waren. Die beiden Teams werden gegenüber aufgelistet. 

## Backend services

### Was ist NestJS
NestJS ist ein aufsteigendes Backend Framework, welches ein breites Band an Features zur verfügung stellt. Es implementiert das verbreitete Express Framework und erweitert dieses mit nützlichen Features, welche auch bereits duch Angular bekannt geworden sind. Die [Dokumentation](https://docs.nestjs.com/) von Nest ist mehr als ausfühlich im Beschreiben ihrer Features. Es können auch einige Besipiele direkt aus den vorgegebenen Beispielen verwendet werden. Wir werden hier daher oft darauf verweisen oder Beipsiele verwenden.

### Aufgaben der Filetypen
Nest verwendet wie auch Angular verschiedene "Filetypen", welche ihre jeweiligen aufgaben übernehmen:

```YML
src
│   app.controller.ts          
│   app.module.ts               
│   main.ts                     
│   
└───Lib                         
│   │   Lib.ts                  
│   │   someLib.ts  
│   
└───Config                      
│   │   config.ts               
│   │   someConfig.ts   
│       
│       
└───Endpoint1Directory          
│   │   endpoint.controller.ts  
│   │   endpoint.module.ts      
│   │   endpoint.service.ts     
│   │   endpoint.guard.ts
│    
└───Endpoint2Directory
    │   endpoint.controller.ts
    │   endpoint.module.ts
    │   endpoint.service.ts
    │   endpoint.middleware.ts
    │   endpoint.guard.ts
```

### app.controller
Default controller requests auf /

### app.module.ts
Beinhaltet alle module, Controller, middleware usw. welche von Nest geladen werden

### main.ts
Enthält die Server Konfiguration - Ermöglicht das Ändern des listening ports, http Optionen usw. 
   
### Lib
Libraries, welche in der App verwendet werden

### Config
Konfigurationen, welche in der App verwendet werden
    
### EndpointDirectory
Jeder Endpoint erhält sein eigenes Directory mit dedizierten Files bzw einem Modul

### endpoint.controller.ts  
Router Endpoint - Verarbeitet die HTTP Request

### endpoint.module.ts      
Fässt alle Konfigurationen für einen Endpoint zusammen 

### endpoint.service.ts     
Kann von anderen Punkten der APP wie dem Controller angesprochen werden, um bestimmte funktionen zu übbernehmen.

### endpoint.middleware.ts
Middleware verändert eine Request bevor diese an den Controller weitergegeben wird.

### endpoint.guard.ts
Hier wird die State oder die Request geprüft und dadurch entschieden, ob der Benutzer authorisiert ist, auf den Endpoint zuzugreifen. Dies kann zum Beispiel durch JWT (JSON Web Token) gemacht werden. 

## Routing und Request Handling unter Nest
Da das Routing durchaus sehr komplex aufgebaut werden kann, werden wir uns nur auf die Basics beschränken, welche wir mit Nest zur Verfügung haben. Hier wird eine Request, welche von einem Client versendet wird direkt durch einen Controller verarbeitet. Hierfür werden sogenannte Mappings verwendet, welche direkt im Controller angelegt werden.

![](https://docs.nestjs.com/assets/Controllers_1.png)

Um ein Mapping in einem Controller anzulegen, muss der @Get decorator verwendet werden. Dieser wird vom nestjs/common Modul bereitgestellt und muss daher auch importiert werden.

```TS
import { Controller, Get } from 'nestjs/common' // Importieren des Get mappers

@Controller('Cats')                             // Konvertiert die Class zu einem Controller mit oder ohne einem Prefix 
export class CatController {                   // Jedes NestJS Object besteht aus einer Class. Hier wird die Controller Class erstellt
    @Get()                                      // URL Endpoint
    searchAll() {                               // Funktion im Controller
        return _catService.getNewCat();                     // Response des Controllers
    }
}
```

Ist der Obere Controller erstellt und im app.module File eingetragen, kann der Endpoint gleich unter `http://localhost:3000/Cats` angesprochen werden. Hier fehlt noch die Funktion `getNewCat`, welche idealerweise von einem Service stammt. Dieser Service kann durch ein geniales Konzept von Angular als auch Nest eingebunden werden, welches sich Dependency injection nennt. Hier werden classes, sogenannte Injectables durch das Framework erstellt und dann in den anderen Komponenten eingebunden.

```TS
import { Injectable } from 'nestjs/common';
import { Cat } from 'Cat';


@Inejctable()
export class CatService {

    private Cat = new Cat('Meow');

    public getCat() {
        return this.Cat;
    }

    public getNewCat(): string {
        console.log('Here ya go!');
        return 'Meow';
    }

}
```

Dieser CatService kann nun in allen Komponenten der Nest app eingebunden werden, sofern er auch refferrenziert ist. Dies wird im Construktor gemacht.

```TS
import { Controller, Get } from 'nestjs/common' 
import { CatService } from './cat.service.ts'


@Controller('Cats')                             
export class CatController {      
    
    constructor(private _catService: CatService) {  }
    
    @Get()            
    searchAll() { 
        return _catService.getNewCat();
    }
}
```
Wird nun auf den Endpoint über beispielsweise den Browser aufgerufen, sollte die Antwort Meow angezeigt werden. Sehr schön zu sehen ist ebenfalls, das Nest den Response Typ automatisch an den eigentlichen Typ der Response anpasst. Wäre die Controller Response beispielsweise im JSON Format gekommen, würde Nest als Typ nicht HTML für Text sonder Application/JSON wählen. Natürlich ist dies nur ein sehr überschaulich kleiner Teil des Potenziales, welches Nest bereitstellt, es sollte jedoch dafür ausreichen, diese API zu verstehen.

## API Endpoints

> Objekttypen, welche hier angesprochen werden, können im Models verzeichnis des Servers gefunden werden.

### GET ./api/summoner/profile:/name
#### Parameter `Name`
Der Namen des Spielers, welcher gesucht wird.
#### Response `SummonerProfile`
Das Benutzerprofiel des gesuchten Spielers.
#### Overview
Löst den Namen eines Spielers zu dessen Profil auf. Dies wird hauptsächlich für die Account ID benötigt, welche durch andere API Endpoints von Riot Games benötigt wird.

#### Riot API Endpoint
https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name

#### Components
- summoner-search.component.ts
- summoner-profile.component.ts

### GET ./api/summoner/stats:/id
#### Parameter `id`
SummonerID eines Spielers - Kann durch den SummonerProfile Endpoint gefunden werden.
#### Response `SummonerStats` | `Array` 
Detailierte Beschreibung der Rank Informationen eines Spielers
#### Overview
Verwendet die Riot Games API um Informationen über die momentane Ranglistenposition eines Spielers in Leauge of Legends zu finden. Gibt ein leeres Array zurück, wenn der Spieler noch keine Ranglistenspiele gespielt hat.

#### Riot API Endpoint
https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner

#### Component
summoner-description.component.ts

### GET ./api/summoner/matches/:accoundID
#### Parameter `accountID`
AccountID eines Spielers - Kann durch den SummonerProfile Endpoint gefunden werden.
#### Response `MatchHistoryList`
Array bestehend aus Match Informationen.
#### Overview
Durchsucht die Riot Games API nach der Spiele History eines Spielers und verwendet ebenfalls den matches Endpoint, um zusätzliche Informationen zu diesen Spielen zu erhalten.
#### Riot API Endpoint
https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account

#### Component
match-history.component.ts

### GET ./api/summoner/match/:matchID
#### Parameter `matchID`
ID eines Matches - Entspricht einem League of Legends Spiel.
#### Response `MatchInfo`
Detailierte Informationen über das gesuchte Spiel
#### Overview
Verwendet die ID eines Matches um detailierte Informationen zu einem Spiel zurückzugeben. Dieser Teil der Riot API wird durch eine Funktion des `matches` Endpoints verwendet.  

#### Riot API Endpoint
https://euw1.api.riotgames.com/lol/match/v4/matches
#### Component
Wird nicht im Projet verwendet, kann aber trotzdem verwendet werden, um einzelne Matches nachzusehen.

  
## Components  
In Angular versucht man jeden Component möglichs klein zu halten. Dabei achte man, dass jedes Stück logik in einen neuen Component geschrieben wird.  
Nun kurz zu den Component von Summoner Search:  
Auf der Landing-Page Wir der Component summoner-search geladen. Er bietet uns die SuchFunktion. Wir greifen auf die Api SummonerProfile zu und untersuchen, ob der eingegne Wert in der API existiert. Falls der Wert existiert kommen wir zum Component summoner-profile welcher wiederum die Components summoner-description und summoner-history aufruft. Summoner-history wiederum ruft den Component match auf. 


## Probleme/Ablauf
Bei erstellen des Produktes bzw. für den Anfang bekamen wir hife von einem Kollegen, der sich schon etwas mit Angular auskennt. Er zeigte uns die Basics und wie wir das Projekt angreifen sollten. Währen dem erarbeiten, des Projektes kam es immer wieder zu kleinern Probleme die man lösen musste. Beim Styling arbeiteten wir mit Material. Das bereitete uns zum Teil einige Probleme, da wir noch nicht wirklich viel Erfahrung damit hatten. Zudem war es manchmal etwas mühsam die Material Funktionen umzubauen. 
Um solche Probleme zu lösen mussten wir meistens auf das Internet zurück greifen oder lange studieren. Ab und zu schliechen sich auch die typischen Tippfehler ein, die sehr viel Zeit frassen.  
Ausserdem war am Start Angular und Nestjs relativ unverständlich für uns und wir brauchten lange um die Frameworks zu verstehen. Der Aufbau von einem solchen Projekt ist relativ komplex. Schlussendlich lohnte sich es aber trotzdem, dass wir es mit diesen Framworks gemacht haben.
Ein grösseres Problem war, dass die jeweiligen Bezeichnungen in den jeweilgen APIs nicht immer gleich war. Somit mussten wir dann herausfinden, welcher Wert mit der jeweilgen Bezeichnung gemeint ist. Es gab zum Beispiel eine AccountID, eine SummonerID, eine ID und eine puuid was zur Verwirrung stiftete. 

## Reflexion  
Da wir ein neues Framework benutzten, war der Anfang dementsprechen auch nicht einfach. Dies hat uns dafür die Möglichkeit geboten, eine neue Technologie kennenzulernen und uns dahher neuen Herausfordungen zu stellen. Wir können nun ein Framwork verwenden, welches wir vorher noch nicht kannten. Wir sind zudem auch äusserst zu frieden mit dem Abschluss von unserem Projekt. Wir denken, dass wir mit diesem Projekt beweisen konnten, dass wir die Kompetenzen in diesem Modul sehr gut beherrschen.  

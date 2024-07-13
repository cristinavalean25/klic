// src/data/zonesData.ts
import { ZoneData } from "../types/ZoneData";
import nouamai from "../Zone/zoneImg/9-mai-01.jpg";
import piatacluj from "../Zone/zoneImg/piata-cluj-1.jpg";
import piatamare from "../Zone/zoneImg/piatamare.jpg"
import central from "../Zone/zoneImg/central.jpg"
import mihaiviteazu from "../Images/m.png"
import cedonia from "../Zone/zoneImg/cedonia.jpg"
import cedonia2 from "../Zone/zoneImg/cedonia-2.jpg"
import treistejari from "../Zone/zoneImg/treistejari.jpg"
import caleadumbravii from "../Zone/zoneImg/caleadumbravii.jpg"
import caleapoplacii from "../Zone/zoneImg/caleapoplacii.jpg"
import bldvictoriei from "../Zone/zoneImg/bldvictoriei.jpg"
import subarini from "../Zone/zoneImg/subarini.jpg"
import tilisca from "../Zone/zoneImg/tilisca.jpg"
import valeaaurie from "../Zone/zoneImg/valeaaurie.jpg"
import arhitectilor from "../Zone/zoneImg/arhitectilor.jpg"
import caleasuriimici from "../Zone/zoneImg/caleasuriimici.jpg"
import broscarie from "../Zone/zoneImg/broscarie.jpg"
import cartiertineretului from "../Zone/zoneImg/cartiertineretului.jpg"
import doamnastanca from "../Zone/zoneImg/doamnastanca.jpg"
import gusterita from "../Zone/zoneImg/gusterita.jpg"
import rahovei from "../Zone/zoneImg/rahovei.jpg"

const zonesData: ZoneData[] = [
  {
    id: 1,
    title: "ULTRACENTRAL",
    description: "Zona ultracentrală a Sibiului este un amestec de istorie...",
    imageUrl: piatamare,
    population: 1325,
    area: "0.177 km²",
    priceRange: "140.000 – 1.375.000 euro"
  },
  {
    id: 2,
    title: "CENTRAL",
    description: "Zona centrală a municipiului Sibiu este un vibrant spațiu...",
    imageUrl: central,
    population: 1200,
    area: "0.150 km²",
    priceRange: "120.000 – 1.200.000 euro"
  },
  {
    id: 3,
    title: "ORASUL DE JOS",
    description: "Orasul de Jos al municipiului Sibiu, cu străzile sale ...",
    imageUrl: nouamai,
    population: 1100,
    area: "0.200 km²",
    priceRange: "130.000 – 1.300.000 euro"
  },
  {
    id: 4,
    title: "MIHAI VITEAZU",
    description: "Cartierul Mihai Viteazu din Sibiu, situat în partea de sud...",
    imageUrl: mihaiviteazu,
    population: 900,
    area: "0.180 km²",
    priceRange: "110.000 – 1.100.000 euro"
  },
  {
    id: 5,
    title: "CEDONIA",
    description: "Cartierul Cedonia din Sibiu, cu un aspect perfect pentru viața la bloc...",
    imageUrl: cedonia,
    secondaryImageUrl: cedonia2,
    population: 1.750,
    address: "Cedonia, Sibiu, Romania",
    radius: 700 ,
    area: "0.190 km²",
    priceRange: "115.000 – 1.150.000 euro",
    titleDescription: "Armonia Urbană între Tradiție și Modernitate​",
    longDescription: "Cartierul Cedonia, așezat strategic în inima orașului Sibiu, este o zonă rezidențială care exemplifică echilibrul perfect între viața la bloc și cea în case individuale. Cu o comunitate primitoare de aproximativ 1.750 de locuitori și o suprafață de 25,07 kilometri pătrați, acest cartier reprezintă un model ideal de conviețuire urbană, îmbinând cu grație comoditatea vieții moderne cu calitățile unui stil de viață comunitar și familial.​Unul dintre cele mai mari atuuri ale Cartierului Cedonia este proximitatea sa la centrul vibrant al orașului Sibiu. Această localizare privilegiată oferă rezidenților acces ușor și rapid la diverse facilități urbane, inclusiv la instituții de învățământ de top, magazine, restaurante și centre culturale. Acest acces facil la serviciile orașului aduce un plus semnificativ calității vieții locuitorilor săi.​În Cartierul Cedonia, arhitectura este o reflectare a echilibrului între tradiție și modernitate. Clădirile rezidențiale și casele sunt proiectate astfel încât să ofere confort maxim, în timp ce păstrează un sentiment de familiaritate și căldură. Acest amestec între blocuri moderne și case tradiționale creează un mediu armonios și estetic plăcut. Comoditatea și accesibilitatea sunt cuvinte de bază în acest cartier. Datorită amplasării sale, locuitorii beneficiază de o conexiune ușoară cu restul orașului, permițându-le să se bucure de evenimentele și activitățile urbane, fără a compromite liniștea și confortul vieții de cartier.​Stilul de viață comunitar și familial este încurajat în Cedonia. Parcurile și spațiile verzi, precum și zonele de joacă pentru copii, sunt puncte de întâlnire pentru familiile și prietenii care doresc să petreacă timp de calitate împreună. Aceste spații verzi contribuie nu doar la estetica cartierului, ci și la crearea unui mediu sănătos și activ pentru toate vârstele. Prin urmare, Cartierul Cedonia este mai mult decât un simplu loc de rezidență; este o comunitate vibrantă și diversă, care oferă un echilibru perfect între nevoile individuale și cele comunitare. Cu un amestec armonios de case și apartamente, apropierea de centrul orașului, și un puternic simț al comunității, Cedonia este un exemplu remarcabil de urbanism modern, ideal pentru oricine caută un stil de viață confortabil și conectat în inima Sibiului. ​"
  },
  {
    id: 6,
    title: "TREI STEJARI",
    description: "Trei Stejari este o zonă atractivă în Sibiu...",
    imageUrl: treistejari,
    population: 1000,
    area: "0.175 km²",
    priceRange: "125.000 – 1.250.000 euro"
  },
  {
    id: 7,
    title: "CALEA DUMBRAVII",
    description: "Calea Dumbravii din Sibiu, o arteră importantă...",
    imageUrl: caleadumbravii,
    population: 1150,
    area: "0.160 km²",
    priceRange: "135.000 – 1.350.000 euro"
  },
  {
    id: 8,
    title: "CALEA POPLACII",
    description: "Calea Poplacii din Sibiu, cu străzile sale pitorești...",
    imageUrl: caleapoplacii,
    population: 1050,
    area: "0.170 km²",
    priceRange: "130.000 – 1.300.000 euro"
  },
  {
    id: 9,
    title: "VICTORIEI",
    description: "Zona Victoriei din Sibiu, un loc vibrant și plin de viață...",
    imageUrl: bldvictoriei,
    population: 1300,
    area: "0.190 km²",
    priceRange: "140.000 – 1.400.000 euro"
  },
  {
    id: 10,
    title: "SUB ARIN",
    description: "Sub Arin este o zonă rezidențială liniștită în Sibiu...",
    imageUrl: subarini,
    population: 1250,
    area: "0.180 km²",
    priceRange: "120.000 – 1.200.000 euro"
  },
  {
    id: 11,
    title: "TILISCA",
    description: "Tilisca, o zonă pitorească în Sibiu...",
    imageUrl: tilisca,
    population: 1150,
    area: "0.170 km²",
    priceRange: "135.000 – 1.350.000 euro"
  },
  {
    id: 12,
    title: "VALEA AURIE",
    description: "Valea Aurie, un cartier verde și liniștit în Sibiu...",
    imageUrl: valeaaurie,
    population: 1100,
    area: "0.200 km²",
    priceRange: "130.000 – 1.300.000 euro"
  },
  // {
  //   id: 13,
  //   title: "PADUREA DUMBRAVA",
  //   description: "Pădurea Dumbrava, o oază de natură lângă Sibiu...",
  //   imageUrl: piatacluj,
  //   population: 955,
  //   area: "53.52 km²",
  //   priceRange: "VANZARI - INCHIRIERI"
  // },
  {
    id: 14,
    title: "ARHITECTILOR",
    description: "Zona Arhitecților din Sibiu, un loc modern și dinamic...",
    imageUrl: arhitectilor,
    population: 1200,
    area: "0.180 km²",
    priceRange: "120.000 – 1.200.000 euro"
  },
  {
    id: 14,
    title: "PIATA CLUJ",
    description: "Zona Arhitecților din Sibiu, un loc modern și dinamic...",
    imageUrl: piatacluj,
    population: 1200,
    area: "0.180 km²",
    priceRange: "120.000 – 1.200.000 euro"
  },
  {
    id: 15,
    title: "CALEA SURII MICI",
    description: "Zona Calea Surii Mici din Sibiu, un loc modern și dinamic...",
    imageUrl: caleasuriimici,
    population: 1200,
    area: "0.180 km²",
    priceRange: "120.000 – 1.200.000 euro"
  },
  {
    id: 16,
    title: "CARTIER TINERETULUI",
    description: "Zona Cartierul Tineretului din Sibiu, un loc modern și dinamic...",
    imageUrl: cartiertineretului,
    population: 1200,
    area: "0.180 km²",
    priceRange: "120.000 – 1.200.000 euro"
  },
  {
    id: 17,
    title: "GUSTERITA",
    description: "Zona Gusterita din Sibiu, un loc modern și dinamic...",
    imageUrl: gusterita,
    population: 1200,
    area: "0.180 km²",
    priceRange: "120.000 – 1.200.000 euro"
  },
  {
    id: 18,
    title: "RAHOVEI",
    description: "Zona Rahovei din Sibiu, un loc modern și dinamic...",
    imageUrl: rahovei,
    population: 1200,
    area: "0.180 km²",
    priceRange: "120.000 – 1.200.000 euro"
  },
  {
    id: 19,
    title: "ZONA DOAMNA STANCA",
    description: "Zona Doamna Stanca din Sibiu, un loc modern și dinamic...",
    imageUrl: doamnastanca,
    population: 1200,
    area: "0.180 km²",
    priceRange: "120.000 – 1.200.000 euro"
  },
  {
    id: 20,
    title: "BROSCARIE",
    description: "Zona Cartierul Broscarie din Sibiu, un loc modern și dinamic...",
    imageUrl: broscarie,
    population: 1200,
    area: "0.180 km²",
    priceRange: "120.000 – 1.200.000 euro"
  },
];

export default zonesData;

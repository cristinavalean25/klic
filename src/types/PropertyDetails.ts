export interface PropertyDetails {
  idnum: number;
  idstr: string;
  agent: number;
  dataadaugare: number;
  datamodificare: number;
  adresa: string;
  ansambluid: number;
  titlu: { ro: string; en: string };
  descriere: { ro: string; en: string };
  vecinatati: { ro: string; en: string };
  utilitati: string;
  finisaje: string;
  dotari: string;
  altedetaliizona: string;
  latitudine: number;
  longitudine: number;
  suprafatabalcon: number;
  tipimobil: string;
  tiplocuinta: string;
  pretnegociabil: number;
  tipteren: string;
  clasificareteren: string;
  nrfronturistradale: number;
  frontstradal: string;
  suprafatateren: number;
  latimedrumacces: number;
  nrcamere: number;
  nrbucatarii: number;
  etaj: number;
  tipcompartimentare: string;
  suprafatautila: number;
  confort: string;
  suprafataconstruita: number;
  anconstructie: number;
  nrbai: number;
  nrnivele: number;
  nrbalcoane: number;
  nrgaraje: number;
  stadiuconstructie: string;
  structurarezistenta: string;
  status: string;
  localitate: string;
  judet: string;
  zona: string;
  caroiaj: string;
  devanzare: number;
  monedavanzare: string;
  monedainchiriere: string;
  pretvanzare: number;
  pretinchiriere: number;
  pretfaratva: number;
  comisioncumparator: string;
  images?: { src: string; alt: string }[];
  top: number;
  pole: number;
  custom1: string;
  custom2: string;
  portals: {
    id: number;
    name: string;
    url: string;
    active: number;
  }[];
  tip: string;
  stadiuconstructie_value: string;
  tipconstructie_value: string;
  starefinisaje_value: string;
  mobilat_value: string;
  bucatarie_values: string[];
  utilitati_values: string[];
  eficienta_energetica: string;
  consum_specific: string;
  indice_emisii: string;
  consum_energie_regenerabila: string;
  tipvanzare: string;
  deinchiriat: number;
}
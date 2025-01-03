
import { Agent } from "./Agent";

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
  tipspatiu?: string;
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
  coordonateleZona: {
    lat: number;
    lng: number;
    radius: number; // Raza în metri pentru a desena zona
  };
  caroiaj: string;
  devanzare: number;
  monedavanzare: string;
  monedainchiriere: string;
  pretvanzare: number;
  pretinchiriere: number;
  pretfaratva: number;
  comisioncumparator: string;
  images?: { src: string; alt: string }[];
  imagine_principala?: string;
  top: number;
  pole: number;
  custom1?: string;
  custom2?: string;
  portals: Portal[];
  tip?: string;
  stadiuconstructie_value: string;
  tipconstructie_value: string;
  starefinisaje_value: string;
  mobilat_value: string;
  bucatarie_values: string[];
  utilitati_values: string[];
  eficienta_energetica: string;
  consum_specific: string;
  disponibilitateproprietate: string;
  nrlocuriparcare: number;
  regim_inaltime: string;
  anrenovare: number;
  structura: string;
  orientare: string;
  indice_emisii: string;
  consum_energie_regenerabila: string;
  tipvanzare: number;
  deinchiriat: number;
  listingType: string;
  agent_info: Agent;

 

  dotari_values: string[];
  general_value: string[];
  general: string[];
  teren_values: string[];
  finisaje_values: string[];
  climatizare_values: string[];
  sistem_incalzire_values: string[];

}


export interface Portal {
  isTop: boolean;
  // other portal properties
}
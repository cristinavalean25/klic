export interface Agent {
  agentid: number;
  dataadaugare: number;
  datamodificare: number;
  email: string; // proprietatea email este definită aici
  functie: {
    en: string;
    ro: string;
  };
  nume: string;
  phone: string;
  src: string;
}

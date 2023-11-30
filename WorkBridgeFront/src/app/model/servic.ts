import { FileHandel } from "./file-handel.model";

export interface Servic {
    serviceId: number;
    nom: string;
    description: string;
    devis_Hrs: number;
    user: any;
    serviceImages:  FileHandel[]
  }
  
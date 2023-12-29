import { FileHandel } from "./file-handel.model";

export interface Demande {
    demandeId: number,
    montant: number,
    duree_propose: number,
    description: String,
    etat: String,
    demandeImages: FileHandel[],
    freelance :any ,
    project :any
}

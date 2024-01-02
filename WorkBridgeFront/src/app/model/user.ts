import { FileHandel } from "./file-handel.model";

export interface User{
    id:any;
    nom: string;
    prenom:string;
    email:string;
    telephone: string;
    motDePasse: string;
    role: string;
    images?: FileHandel[];
    
}
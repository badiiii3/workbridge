export interface User{
    nom: string;
    prenom:string;
    email:string;
    telephone: string;
    motDePasse: string;
    role: string;
    images?: File[];
    
}
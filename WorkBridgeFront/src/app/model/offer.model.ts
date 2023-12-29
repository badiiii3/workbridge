import { FileHandel } from 'src/app/model/file-handel.model';
export interface Offer{
offerCreated: String | undefined;
offerId: number;
offerTitle: string;
offerDescription: string;
offerStatus: string;
offerSkills: string;
offerExperience: number;
offerContractType: string;
offerSalary: number;
offerDeadline: string;
offerLocation: string;
user:any;
offerImages:FileHandel[];
}
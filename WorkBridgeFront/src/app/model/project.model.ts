import { FileHandel } from "./file-handel.model";

export interface Project {
    projectId: number,
    projectName: String,
    projectDescription: String,
    projectCreated: String,
    projectDuration: number,
    projectDomain:String,
    projectState:String,
    projectTechnology:String,
    projectImages: FileHandel[],
    user :any ;
}

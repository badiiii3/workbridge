import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project.model';




@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }


  public addProject(project: FormData){
    return this.httpClient.post<Project>("http://localhost:9090/addNewProject", project);
  }

  public getAllProjects(pageNumber:any, searchKeyword: string= ""){
    return this.httpClient.get<Project[]>("http://localhost:9090/getAllProjects?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }
  public getAllProjectsUser(pageNumber:any, searchKeyword: string= ""){
    return this.httpClient.get<Project[]>("http://localhost:9090/getAllProjectsUser?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public getProjectDetailsById(projectId: any){
    return this.httpClient.get<Project>("http://localhost:9090/getProjectDetailsById/"+projectId);
   }

  public deleteProject(projectId: number){
   return this.httpClient.delete("http://localhost:9090/deleteProjectDetails/"+projectId);
  }

  public getProjectByUser(): Observable<Project[]> {
    return this.httpClient.get<Project[]>("http://localhost:9090/getProjectByUser");
  }
  public getProjectDetails(isSingeProjectCheckout:any,projectId:any){
    return this.httpClient.get<Project[]>("http://localhost:9090/getProjectDetails/"+isSingeProjectCheckout+"/"+projectId);
   }


}

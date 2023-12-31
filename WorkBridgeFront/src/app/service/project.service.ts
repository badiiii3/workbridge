import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../model/project.model';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }


  public addProject(UserId: String,project: FormData){
    return this.httpClient.post<Project>(`http://localhost:9090/addNewProject/${UserId}`, project);
  }
  
  public updateProject(projectId: number, formData: FormData) {
    return this.httpClient.put<Project>(`http://localhost:9090/updateProject/${projectId}`, formData);
  }

  public getAllProjects(pageNumber: number, searchKey: string = ""): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`http://localhost:9090/getAllProjects?pageNumber=${pageNumber}&searchKey=${searchKey}`);
  }
  

  public getAllProjectsUser(UserId: any,pageNumber:any, searchKeyword: String= ""){
    return this.httpClient.get<Project[]>(`http://localhost:9090/getAllProjectsUser/${UserId}?pageNumber=`+pageNumber+`&searchKey=`+searchKeyword);
  }

  public getProjectDetailsById(projectId: any){
    return this.httpClient.get<Project>("http://localhost:9090/getProjectDetailsById/"+projectId);
   }

  public deleteProject(projectId: number){
   return this.httpClient.delete("http://localhost:9090/deleteProjectDetails/"+projectId);
  }

  public getProjectByUser(userId: string): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`http://localhost:9090/getProjectByUser/${userId}`);
  }
  public getProjectDetails(isSingeProjectCheckout:any,projectId:any){
    return this.httpClient.get<Project[]>("http://localhost:9090/getProjectDetails/"+isSingeProjectCheckout+"/"+projectId);
   }


}

import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { Note } from '../_models';
import { analyzeAndValidateNgModules } from '@angular/compiler';

const baseUrl = `${environment.serverUrl}/note`;

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(
    private http: HttpClient
  ) {
  }

  getNotes(): Observable<Note[]> {
    //return this.http.get<Note[]>(`${baseUrl}`);
    return of([{uuid: '1', name: 'name1', body: 'body1', access: 'public'}, 
    {uuid: '2', name: 'name2', body: 'body2', access: 'public'}, 
    {uuid: '3', name: 'name3', body: 'body3', access: 'private'}]);
  }

  getNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${baseUrl}/${id}`);
  }

  getSharedNote(id: string): Observable<Note> {
    //return this.http.get<Note>(`${baseUrl}/share/${id}`);
    return of({uuid: '1', name: 'name1', body: 'body1', access: 'public'});
  }

  deleteNote(id: string) : Observable<Object> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  createNote(note: Note): Observable<Object> {
    return this.http.post(`${baseUrl}`, note);
  }

  editNote(note: Note): Observable<Object>{
    return this.http.put(`${baseUrl}/${note.uuid}`, note);
  }
}

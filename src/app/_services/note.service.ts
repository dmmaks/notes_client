import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { Note } from '../_models';

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
    return this.http.get<Note[]>(`${baseUrl}`);
  }

  getNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${baseUrl}/${id}`);
  }

  getSharedNote(id: string): Observable<Note> {
    return this.http.get<Note>(`${baseUrl}/share/${id}`);
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

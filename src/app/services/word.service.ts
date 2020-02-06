import { Injectable, EventEmitter } from '@angular/core';
import { Word } from '../models/word.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  wordURL = "http://localhost:3000/api/word/"

  wordAdded = new EventEmitter<void>();
  private wordList: Word[] = [];
  private sessionWordList: Word[] = [];
  private wordListPOS: Word[] = [];
  private wordListNEG: Word[] = [];

  sessID: string;

  constructor(public httpClient: HttpClient) { }

  loadWord() {
    return this.httpClient.get<Word[]>(environment.termURL)
      .pipe(
        map((word) => {
          this.wordList = word;
          return word
        },
          (error) => { console.log(error); })
      )
  }

  loadSessionWord(session_id: number) {
    return this.httpClient.get<any[]>(environment.termURL + session_id)
      .pipe(
        map((wordRecords) => {
          this.sessionWordList = wordRecords;
          return wordRecords;
        },
          (error) => { console.log(error); })
      );
  }

  loadPostive(session_id: number) {
    return this.httpClient.get<Word[]>(environment.termURL + session_id)
      .pipe(
        map((POSword) => {

          this.wordListPOS = this.sessionWordList.filter(data => data.prediction === "POS")
          console.log(this.wordListPOS)
          return this.wordListPOS;
        },
          (error) => { console.log(error); })
      )
  }

  loadNegative(session_id: number) {
    return this.httpClient.get<Word[]>(environment.termURL + session_id)
      .pipe(
        map((NEGword) => {

          this.wordListNEG = this.sessionWordList.filter(data => data.prediction === "NEG")
          console.log(this.wordListNEG)
          return this.wordListNEG;
        },
          (error) => { console.log(error); })
      )
  }

  addWord(newInfo) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    });

    const options = {
      headers: httpHeaders
    };

    this.httpClient.post<Word>(environment.termURL,
      { info: newInfo }, options)
      .subscribe((response) => {
        this.wordList.push(response);
        this.wordAdded.emit();
      })
  }

  getWord() {
    return this.wordList.slice();
  }

  getSessionWord() {
    return this.sessionWordList.slice();
  }

  getPOS() {
    return this.wordListPOS.slice();
  }

  getNEG() {
    return this.wordListNEG.slice();
  }

}

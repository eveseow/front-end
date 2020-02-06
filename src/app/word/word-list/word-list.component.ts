import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/models/word.model';
import { WordService } from 'src/app/services/word.service';

import { interval } from 'rxjs';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {

  sessID: string;
  ID: number;
  sessionSelected;

  isCollapsed = false;
  scrollConfig = false;

  wordList: Word[] = [];

  constructor(public wordService: WordService) { }

  ngOnInit() {
    this.sessID = localStorage.getItem('tokenID');
    this.ID = parseInt(this.sessID);

    this.wordService.loadWord()
    .subscribe((result) => {
      this.wordList = this.wordService.getWord();
    });

    let subscription = interval(7500)
      .subscribe((result) => {
        this.wordService.loadWord()
          .subscribe((result) => {
            this.wordList = this.wordService.getWord();
          })
      });

    this.wordService.wordAdded
      .subscribe(() => {
        this.wordList = this.wordService.getWord();
      })
  }

}

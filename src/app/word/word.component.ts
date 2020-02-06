import { Component, OnInit } from '@angular/core';
import { Word } from '../models/word.model';
import { WordService } from '../services/word.service';

import { interval } from 'rxjs';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  isVisible = false;

  username: string;
  sessID: string;

  isCollapsed = false;
  wordList: Word[] = [];
  sessionWordList: Word[] = [];

  constructor(public wordService: WordService) { }

  ngOnInit() {
    this.sessID = localStorage.getItem('tokenID');

    this.wordService.loadWord()
      .subscribe((result) => {
        this.wordList = this.wordService.getWord();
      })

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

  onWordAdded(newInfo) {
    console.log(newInfo);
    this.wordList.push(newInfo);
    console.log(this.wordList);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}

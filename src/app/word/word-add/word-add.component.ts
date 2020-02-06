import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/models/word.model';
import { WordService } from 'src/app/services/word.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-word-add',
  templateUrl: './word-add.component.html',
  styleUrls: ['./word-add.component.css']
})
export class WordAddComponent implements OnInit {
  isVisible = false;

  term: string;
  wordList: Word[] = [];

  constructor(public wordService: WordService, private notification: NzNotificationService) { }

  sessID: string;
  
  ngOnInit() {
    this.sessID = localStorage.getItem('tokenID');

    this.wordService.loadWord()
      .subscribe((result) => {
        this.wordList = this.wordService.getWord();
      })

      this.wordService.wordAdded
      .subscribe(() => {
        this.wordList = this.wordService.getWord();
      })
  }

  onAdd() {
    console.log("add word");

    this.wordService.addWord(new Word(
      this.wordList.length + 1,
      parseInt(this.sessID),
      this.term, 
      "NEG",
      0.1,
      new Date()
    ))
    
    console.log(this.sessID);
    this.createNotification('success', 'Word Successfully Added!')
    
    this.term = null;
    this.isVisible = false;
  }

  createNotification(type: string, msg): void {
    this.notification.create(
      type,
      msg,
      ''
    );
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}

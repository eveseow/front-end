import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Word } from '../models/word.model';
import { WordService } from '../services/word.service';
import { interval } from 'rxjs';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import { SessionService } from '../services/session.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.css']
})
export class WordcloudComponent implements OnInit {

  public wordList: Word[] = [];
  public wordListPOS: Word[] = [];
  public wordListNEG: Word[] = [];

  private subscription;

  sessID: string;
  ID: number;
  POSvalue: number;
  NEGvalue: number;
  value: number;
  POSpercent: number;
  NEGpercent: number;

  sessionSelected = 0;
  POSselected = "POS";
  NEGselected = "NEG";


  private chart;

  constructor(private zone: NgZone, private route: ActivatedRoute, public wordService: WordService, public sessionService: SessionService) { }

  ngOnInit() {
    this.sessID = localStorage.getItem('tokenID');
    this.ID = parseInt(this.sessID);

    this.route.params
      .subscribe((params: Params) => {
        this.sessionSelected = params['session_id'];
        this.sessionService.selectSession(this.sessionSelected);
        this.wordList = [];
        this.wordService.loadSessionWord(this.sessionSelected)
          .subscribe((result) => {
            this.wordList = result;

            this.wordService.loadPostive(this.sessionSelected)
              .subscribe((POS) => {
                this.wordListPOS = this.wordService.getPOS();
                this.wordListPOS = POS;
              })

            this.wordService.loadNegative(this.sessionSelected)
              .subscribe((NEG) => {
                this.wordListNEG = this.wordService.getNEG();
                this.wordListNEG = NEG;
              })

            this.POSvalue = this.wordListPOS.length;
            this.NEGvalue = this.wordListNEG.length;
            this.value = this.wordList.length;
            this.POSpercent = (this.POSvalue / this.value) * 100
            this.NEGpercent = (this.NEGvalue / this.value) * 100
          })
      })

    this.subscription = interval(5000)
      .subscribe((result) => {
        this.route.params
          .subscribe((params: Params) => {
            this.sessionSelected = params['session_id'];
            this.sessionService.selectSession(this.sessionSelected);
            this.wordList = [];
            this.wordService.loadSessionWord(this.sessionSelected)
              .subscribe((result) => {
                this.wordList = result;

                this.wordService.loadPostive(this.sessionSelected)
                  .subscribe((POS) => {
                    this.wordListPOS = this.wordService.getPOS();
                    this.wordListPOS = POS;
                  })

                this.wordService.loadNegative(this.sessionSelected)
                  .subscribe((NEG) => {
                    this.wordListNEG = this.wordService.getNEG();
                    this.wordListNEG = NEG;
                  })

                this.POSvalue = this.wordListPOS.length;
                this.NEGvalue = this.wordListNEG.length;
                this.value = this.wordList.length;
                this.POSpercent = (this.POSvalue / this.value) * 100
                this.NEGpercent = (this.NEGvalue / this.value) * 100

              })
          })
      });

    this.wordService.wordAdded
      .subscribe(() => {
        this.wordList = this.wordService.getSessionWord();
      })

  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdivPOS", am4plugins_wordCloud.WordCloud);
      let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

      series.maxCount = 100;
      series.minValue = 0;
      // series.minWordLength = 0;
      series.excludeWords = [
        "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now", "s", "shall", "could", "m", "t"
      ];

      this.route.params
        .subscribe((params: Params) => {
          this.sessionSelected = params['session_id'];
          this.sessionService.selectSession(this.sessionSelected);
          this.wordList = [];
          this.wordService.loadSessionWord(this.sessionSelected)
            .subscribe((result) => {
              this.wordList = result;

              this.wordService.loadPostive(this.sessionSelected)
                .subscribe((POS) => {
                  this.wordListPOS = this.wordService.getPOS();
                  this.wordListPOS = POS;
                })


              this.POSvalue = this.wordListPOS.length;
              this.NEGvalue = this.wordListNEG.length;
              this.value = this.wordList.length;
              this.POSpercent = (this.POSvalue / this.value) * 100
              this.NEGpercent = (this.NEGvalue / this.value) * 100

            })
        })

      this.route.params
        .subscribe((params: Params) => {
          this.sessionSelected = params['session_id'];
          this.sessionService.selectSession(this.sessionSelected);
          this.wordList = [];
          this.wordService.loadSessionWord(this.sessionSelected)
            .subscribe((result) => {
              this.wordList = result;

              this.wordService.loadPostive(this.sessionSelected)
                .subscribe((POS) => {
                  this.wordListPOS = this.wordService.getPOS();
                  this.wordListPOS = POS;
                })


              this.POSvalue = this.wordListPOS.length;
              this.NEGvalue = this.wordListNEG.length;
              this.value = this.wordList.length;
              this.POSpercent = (this.POSvalue / this.value) * 100
              this.NEGpercent = (this.NEGvalue / this.value) * 100

              this.subscription = interval(3000)
                .subscribe((result) => {

                  var data = this.wordListPOS.map(t => t.term);
                  series.text = JSON.stringify(data).toLowerCase();
                  series.dataFields.word = "tag";

                });

            })
        })

      series.colors = new am4core.ColorSet();
      series.colors.passOptions = {};

      series.labels.template.propertyFields.fill = "color";

      series.events.on("arrangestarted", function (ev) {
        console.log("start");
      });

      series.events.on("arrangeended", function (ev) {
        console.log("end");
      });

      series.events.on("arrangeprogress", function (ev) {
        console.log(ev.progress);
      });

      series.labels.template.text = "{word}";

      series.labels.template.tooltipText = "{word}:\n[bold]{value}[/]";

      this.chart = chart;
    });



    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdivNEG", am4plugins_wordCloud.WordCloud);
      let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

      series.maxCount = 100;
      series.minValue = 0;
      // series.minWordLength = 0;
      series.excludeWords = [
        "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now", "s", "shall", "could", "m", "t"
      ];

      this.route.params
        .subscribe((params: Params) => {
          this.sessionSelected = params['session_id'];
          this.sessionService.selectSession(this.sessionSelected);
          this.wordList = [];
          this.wordService.loadSessionWord(this.sessionSelected)
            .subscribe((result) => {
              this.wordList = result;

              this.wordService.loadNegative(this.sessionSelected)
                .subscribe((NEG) => {
                  this.wordListNEG = this.wordService.getNEG();
                  this.wordListNEG = NEG;
                })

              this.POSvalue = this.wordListPOS.length;
              this.NEGvalue = this.wordListNEG.length;
              this.value = this.wordList.length;
              this.POSpercent = (this.POSvalue / this.value) * 100
              this.NEGpercent = (this.NEGvalue / this.value) * 100

            })
        })

      this.route.params
        .subscribe((params: Params) => {
          this.sessionSelected = params['session_id'];
          this.sessionService.selectSession(this.sessionSelected);
          this.wordList = [];
          this.wordService.loadSessionWord(this.sessionSelected)
            .subscribe((result) => {
              this.wordList = result;

              this.wordService.loadNegative(this.sessionSelected)
                .subscribe((NEG) => {
                  this.wordListNEG = this.wordService.getNEG();
                  this.wordListNEG = NEG;
                })

              this.POSvalue = this.wordListPOS.length;
              this.NEGvalue = this.wordListNEG.length;
              this.value = this.wordList.length;
              this.POSpercent = (this.POSvalue / this.value) * 100
              this.NEGpercent = (this.NEGvalue / this.value) * 100

              this.subscription = interval(3000)
                .subscribe((result) => {

                  var data = this.wordListNEG.map(t => t.term);
                  series.text = JSON.stringify(data).toLowerCase();
                  series.dataFields.word = "tag";

                });

            })
        })

      series.colors = new am4core.ColorSet();
      series.colors.passOptions = {};

      series.labels.template.propertyFields.fill = "color";

      series.events.on("arrangestarted", function (ev) {
        console.log("start");
      });

      series.events.on("arrangeended", function (ev) {
        console.log("end");
      });

      series.events.on("arrangeprogress", function (ev) {
        console.log(ev.progress);
      });

      series.labels.template.text = "{word}";

      series.labels.template.tooltipText = "{word}:\n[bold]{value}[/]";

      this.chart = chart;
    });

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}

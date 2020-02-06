import { DecimalPipe } from '@angular/common';

export class Word {

    constructor (public term_id : number, public session_id : number, public term: string, public prediction: string, public confidence: number, public createdAt: Date) {
    }
}
import {Injectable} from '@angular/core';
import {Memo} from '../memo.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  private _memoList: Memo[] = [];

  constructor() {
    this._memoList = [
      {
        id: 1,
        title: 'memo 1',
        content: 'Right. Where\'s Einstein, is he with you? Actually, people call me Marty. Who\'s are these? Listen, Doc, you know there\'s something I haven\'t told you about the night we made that tape.',
        lastEdited: new Date()
      },
      {
        id: 2,
        title: 'memo 2',
        content: 'Oh no, don\'t touch that. That\'s some new specialized weather sensing equipment. Are those my clocks I hear? Oh, hi , Marty. I didn\'t hear you come in. Fascinating device, this video unit. I don\'t wanna know your name. I don\'t wanna know anything anything about you. A bolt of lightning, unfortunately, you never know when or where it\'s ever gonna strike.\n' +
          '\n' +
          'Calm down, Marty, I didn\'t disintegrate anything. The molecular structure of Einstein and the car are completely intact. What? What did she say? It\'s your mom, she\'s tracked you down. Quick, let\'s cover the time machine. Well, bring her along. This concerns her too. Marty, you interacted with anybody else today, besides me?\n',
        lastEdited: new Date()
      },
      {
        id: 3,
        title: 'memo 3',
        content: 'Huh?\n' +
          '\n' +
          'Quiet, quiet. I\'m gonna read your thoughts. Let\'s see now, you\'ve come from a great distance?\n',
        lastEdited: new Date()
      },
      {
        id: 4,
        title: 'I\'m gonna read your thoughts. Let\'s see now, you\'ve come from a great distance?',
        content: 'Huh?\n' +
          '\n' +
          'Quiet, quiet. I\'m gonna read your thoughts. Let\'s see now, you\'ve come from a great distance?\n',
        lastEdited: new Date()
      }
    ]
  }


  get memoList(): Memo[] {
    return this._memoList;
  }

  getMemos(): Observable<Memo[]> {
    return of(this.memoList);
  }

  getMemoById(id: number): Observable<Memo> {
    let index = this.memoList.findIndex(m => m.id === id);
    return of(this._memoList[index]);
  }

  saveMemo(memo: Memo): Observable<string> {
    memo.id = this.memoList.length + 1;
    this._memoList.push(memo);
    return of('ok');
  }

  updateMemo(memo: Memo): Observable<string> {
    let index = this.memoList.findIndex(m => m.id === memo.id);
    this._memoList[index] = memo;
    return of('ok');
  }
}

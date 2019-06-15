import {Component} from '@angular/core';
import {Memo} from './memo.model';
import {Router} from '@angular/router';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private _memos: Memo[] = [];

  constructor(private storageService: StorageService,
              private router: Router) {
  }

  get memos(): Memo[] {
    return this._memos;
  }

  ionViewWillEnter() {
    this.retrieveMemos();
  }

  retrieveMemos() {
    this.storageService.getMemos().then(memos => {
      this._memos = memos;
      this.sortByDate();
    });
  }

  newMemo() {
    this.router.navigate(['/', 'new']);
  }

  showMemo(id: string) {
    this.router.navigateByUrl('/memo/' + id);
  }

  sortByDate() {
    this.memos.sort((a: Memo, b: Memo) => {
      if (a.lastEdited < b.lastEdited) {
        return 1;
      } else if (a.lastEdited > b.lastEdited) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}

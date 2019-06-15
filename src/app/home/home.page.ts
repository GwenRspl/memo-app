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
    //this.retrieveMemos();
  }

  retrieveMemos() {
    this.storageService.getMemos().then(memos => this._memos = memos);
  }

  newMemo() {
    this.router.navigate(['/', 'new']);
  }

  showMemo(id: number) {

    this.router.navigateByUrl('/memo/' + id);

  }
}

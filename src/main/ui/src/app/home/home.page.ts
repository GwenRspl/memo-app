import {Component} from '@angular/core';
import {Memo} from './memo.model';
import {MemoService} from './services/memo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private _memos: Memo[] = [];

  constructor(private memoService: MemoService,
              private router: Router) {
  }

  get memos(): Memo[] {
    return this._memos;
  }

  ionViewWillEnter() {
    this.memoService.getMemos().subscribe(
      data => this._memos = data,
      error => console.log(error)
    );
  }

  newMemo() {
    this.router.navigate(['/', 'new']);
  }

  showMemo(id: number) {

    this.router.navigateByUrl('/memo/' + id);

  }
}

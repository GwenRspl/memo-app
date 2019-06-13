import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.page.html',
  styleUrls: ['./memo.page.scss'],
})
export class MemoPage implements OnInit {
  private _mode: string = '';

  constructor(private route: ActivatedRoute) {
  }


  get mode(): string {
    return this._mode;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.checkMode();
  }

  checkMode() {
    this._mode = this.route.snapshot['_routerState'].url.slice(0, 2);
    console.log(this.mode);
  }

}

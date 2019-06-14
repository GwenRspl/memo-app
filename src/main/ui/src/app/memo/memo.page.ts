import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Memo} from '../home/memo.model';
import {MemoService} from '../home/services/memo.service';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.page.html',
  styleUrls: ['./memo.page.scss'],
})
export class MemoPage implements OnInit {
  private _showMemoMode: boolean;
  private _memo: Memo;
  private _editMode: boolean;

  constructor(private route: ActivatedRoute,
              private memoService: MemoService) {
  }


  get showMemoMode(): boolean {
    return this._showMemoMode;
  }

  get editMode(): boolean {
    return this._editMode;
  }

  get memo(): Memo {
    return this._memo;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.checkMode();
  }

  checkMode() {
    if (this.route.snapshot['_routerState'].url.slice(0, 2) === '/m') {
      this._showMemoMode = true;
      this._editMode = false;
      this.retrieveMemo(+this.route.snapshot.params.id);
    } else {
      this._editMode = true;
    }
  }

  retrieveMemo(id: number) {
    this.memoService.getMemoById(id).subscribe(
      data => {
        this._memo = data;
        console.log(data);
      },
      error => console.log(error)
    )
    ;
  }

  toggleEditMode() {
    this._editMode = !this.editMode;
  }

  saveButton() {
    if (this.showMemoMode) {
      this.updateMemo();
    } else {
      this.saveMemo();
    }
  }

  updateMemo() {
    this.toggleEditMode();
  }

  saveMemo() {
  }
}

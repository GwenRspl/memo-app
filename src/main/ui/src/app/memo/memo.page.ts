import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Memo} from '../home/memo.model';
import {MemoService} from '../home/services/memo.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.page.html',
  styleUrls: ['./memo.page.scss'],
})
export class MemoPage implements OnInit {
  newMemoForm: FormGroup;
  private _showMemoMode: boolean;
  private _memo: Memo;
  private _editMode: boolean;

  constructor(private route: ActivatedRoute,
              private memoService: MemoService,
              private formBuilder: FormBuilder) {
  }


  get showMemoMode(): boolean {
    return this._showMemoMode;
  }

  get f() {
    return this.newMemoForm.controls;
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
      this.initNewForm();
    }
  }

  retrieveMemo(id: number) {
    this.memoService.getMemoById(id).subscribe(
      data => {
        this._memo = data;
        this.initNewForm();
      },
      error => console.log(error)
    );
  }

  initNewForm() {
    this.newMemoForm = this.formBuilder.group({
      title: [this.memo ? this.memo.title : ''],
      content: [this.memo ? this.memo.content : '']
    });
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
    console.log(this.newMemoForm.getRawValue());
    if (this.newMemoForm.value.title == '' && this.newMemoForm.value.content == '') {
      return;
    }
    let newMemo: Memo = new Memo();
    newMemo.title = this.newMemoForm.value.title;
    newMemo.content = this.newMemoForm.value.content;
    newMemo.lastEdited = new Date();
    this.memoService.saveMemo(newMemo).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
}

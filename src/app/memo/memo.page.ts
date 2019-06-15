import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Memo} from '../home/memo.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StorageService} from '../services/storage.service';

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
              private storageService: StorageService,
              private formBuilder: FormBuilder,
              private router: Router) {
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
    console.log(this.route.snapshot);
    // if (this.route.snapshot.['_routerState'].url.slice(0, 2) === '/m') {
    //   this._showMemoMode = true;
    //   this._editMode = false;
    //   this.retrieveMemo(+this.route.snapshot.params.id);
    // } else {
    //   this._editMode = true;
    //   this.initNewForm();
    // }
  }

  retrieveMemo(id: number) {
    this.storageService.getMemoById(id).then(
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
    if (!this.newMemoForm.pristine) {
      this._memo.title = this.newMemoForm.value.title;
      this._memo.content = this.newMemoForm.value.content;
      this._memo.lastEdited = new Date();
      this.storageService.updateMemo(this.memo).then(
        () => this.toggleEditMode(),
        error => console.log(error)
      );
    } else {
      this.toggleEditMode();
    }
  }

  saveMemo() {
    if (this.newMemoForm.value.title === '' && this.newMemoForm.value.content === '') {
      return;
    }
    const newMemo: Memo = new Memo();
    newMemo.title = this.newMemoForm.value.title;
    newMemo.content = this.newMemoForm.value.content;
    newMemo.lastEdited = new Date();
    this.storageService.saveMemo(newMemo).then(
      () => this.router.navigateByUrl('/home'),
      error => console.log(error)
    );
  }

  deleteMemo() {
    this.storageService.deleteMemo(this.memo.id).then(
      () => this.router.navigateByUrl('/home'),
      error => console.log(error)
    );
  }
}

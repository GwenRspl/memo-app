import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {Memo} from '../home/memo.model';

import * as uuid from 'uuid';

const MEMOS_KEY = 'memo';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
  }

  getMemos(): Promise<Memo[]> {
    return this.storage.get(MEMOS_KEY);
  }

  getMemoById(id: string): Promise<Memo> {
    return this.storage.get(MEMOS_KEY).then((memos: Memo[]) => {
      for (const m of memos) {
        if (m.id === id) {
          return m;
        }
      }
    });
  }

  saveMemo(memo: Memo): Promise<any> {
    memo.id = uuid.v4();
    return this.storage.get(MEMOS_KEY).then((memos: Memo[]) => {
      if (memos) {
        memos.push(memo);
        return this.storage.set(MEMOS_KEY, memos);
      } else {
        return this.storage.set(MEMOS_KEY, [memo]);
      }
    });
  }

  updateMemo(memo: Memo): Promise<any> {
    return this.storage.get(MEMOS_KEY).then((memos: Memo[]) => {
      if (!memos || memos.length === 0) {
        return null;
      }
      const newMemos: Memo[] = [];
      for (const m of memos) {
        if (m.id === memo.id) {
          newMemos.push(memo);
        } else {
          newMemos.push(m);
        }
      }
      return this.storage.set(MEMOS_KEY, newMemos);
    });
  }

  deleteMemo(id: string): Promise<Memo> {
    return this.storage.get(MEMOS_KEY).then((memos: Memo[]) => {
      if (!memos || memos.length === 0) {
        return null;
      }
      const toKeep: Memo[] = [];
      for (const m of memos) {
        if (m.id !== id) {
          toKeep.push(m);
        }
      }
      return this.storage.set(MEMOS_KEY, toKeep);
    });
  }
}

/*
Copyright 2021 masaue

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
import JanUtil from './jan-util';
import {Janpai, JanpaiObject} from './janpai';
import {MENTSU_TYPE, MentsuType} from './mentsu-type';

export type MentsuObject = {
  dark: boolean,
  janpaiObjectList: JanpaiObject[],
  type: MentsuType,
};

export class Mentsu {
  constructor(
    private _type: MentsuType,
    private _janpaiList: Janpai[],
    private _dark = false
  ) {}

  static createChowMentsu(head: Janpai, dark = false) {
    const middle = head.next;
    const tail = middle.next;
    return new Mentsu(MENTSU_TYPE.CHOW, [ head.clone(), middle, tail ], dark);
  }

  static createKnittedChowMentsu(head: Janpai) {
    const middle = head.next.next.next;
    const tail = middle.next.next.next;
    return new Mentsu(MENTSU_TYPE.KNITTED_CHOW, [ head.clone(), middle, tail ], true);
  }

  static createKongMentsu(janpai: Janpai, dark = false) {
    return new Mentsu(MENTSU_TYPE.KONG, [ janpai.clone(), janpai.clone(), janpai.clone(), janpai.clone() ], dark);
  }

  static createPungMentsu(janpai: Janpai, dark = false) {
    return new Mentsu(MENTSU_TYPE.PUNG, [ janpai.clone(), janpai.clone(), janpai.clone() ], dark);
  }

  isKongableTo(janpai: Janpai) {
    return (this._type === MENTSU_TYPE.PUNG) && (this._janpaiList[0].id === janpai.id);
  }

  pungToKong(janpai: Janpai) {
    if (this.isKongableTo(janpai)) {
      this._type = MENTSU_TYPE.KONG;
      this._janpaiList.push(janpai);
    }
  }

  toObject(): MentsuObject {
    return {
      dark: this._dark,
      janpaiObjectList: JanUtil.objectedList(this._janpaiList),
      type: this._type,
    };
  }

  get chow() {
    return this._type === MENTSU_TYPE.CHOW;
  }

  get concealedChow() {
    return  this._dark && this.chow;
  }

  get dark() {
    return this._dark;
  }

  get five() {
    return this._janpaiList.some((j) => { return j.five });
  }

  get hasJi() {
    return this._janpaiList.some((j) => { return j.ji });
  }

  get hasYao() {
    return this._janpaiList.some((j) => { return j.yao });
  }

  get head() {
    return this._janpaiList[0];
  }

  get janpaiList() {
    return this._janpaiList;
  }

  get knittedChow() {
    return this._type === MENTSU_TYPE.KNITTED_CHOW;
  }

  get kong() {
    return this._type === MENTSU_TYPE.KONG;
  }

  get middle() {
    return this._janpaiList[1];
  }

  get pung() {
    return this._type === MENTSU_TYPE.PUNG;
  }

  get suit() {
    return this._janpaiList[0].suit;
  }
}

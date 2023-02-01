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
import {Janpai} from "./janpai";
import {Mentsu} from "./mentsu";

export class CompletePattern {
  constructor(private _mentsuList: Mentsu[], private _head: Janpai) {}

  get chowList() {
    return this._mentsuList.filter((m) => {
      return m.chow;
    });
  }

  get concealedPungCount() {
    return this.pungList.filter((p) => { return p.dark }).length;
  }

  get darkKongCount() {
    return this.kongList.filter((k) => { return k.dark }).length;
  }

  get dragonCount() {
    return this.pungList.filter((p) => { return p.head.dragon }).length;
  }

  get head() {
    return this._head;
  }

  get hasJi() {
    return this._mentsuList.some((m) => { return m.hasJi }) ||
           this._head.ji;
  }

  get jiAll() {
    return this._mentsuList.every((m) => { return m.hasJi }) &&
           this._head.ji;
  }

  get knittedChowList() {
    return this._mentsuList.filter((m) => {
      return m.knittedChow;
    });
  }

  get kongCount() {
    return this.kongList.length;
  }

  get kongList() {
    return this._mentsuList.filter((m) => {
      return m.kong;
    });
  }

  get mentsuList() {
    return this._mentsuList;
  }

  get pungList() {
    return this._mentsuList.filter((m) => {
      return m.pung || m.kong;
    });
  }

  get windCount() {
    return this.pungList.filter((p) => { return p.head.wind }).length;
  }

  get yaoAll() {
    return this._mentsuList.every((m) => { return m.hasYao }) &&
           this._head.yao;
  }
}

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
import MentsuType from './mentsu-type';

export default class Mentsu {
    
    constructor(type, janpaiList, dark = false) {
        this._dark = dark;
        this._janpaiList = janpaiList;
        this._type = type;
    }
    
    static createChowMentsu(head, dark = false) {
        const middle = head.next;
        const tail = middle.next;
        return new Mentsu(MentsuType.CHOW, [ head.clone(), middle, tail ], dark);
    }
    
    static createKnittedChowMentsu(head) {
        const middle = head.next.next.next;
        const tail = middle.next.next.next;
        return new Mentsu(MentsuType.KNITTED_CHOW, [ head.clone(), middle, tail ], true);
    }
    
    static createKongMentsu(janpai, dark = false) {
        return new Mentsu(MentsuType.KONG, [ janpai.clone(), janpai.clone(), janpai.clone(), janpai.clone() ], dark);
    }
    
    static createPungMentsu(janpai, dark = false) {
        return new Mentsu(MentsuType.PUNG, [ janpai.clone(), janpai.clone(), janpai.clone() ], dark);
    }
    
    isKongableTo(janpai) {
        return (this._type === MentsuType.PUNG) && (this._janpaiList[0].id === janpai.id);
    }
    
    pungToKong(janpai) {
        if (this.isKongableTo(janpai)) {
            this._type = MentsuType.KONG;
            this._janpaiList.push(janpai);
        }
    }
    
    toObject() {
        const object = {};
        object.dark = this._dark;
        object.janpaiList = JanUtil.objectedList(this._janpaiList);
        object.type = this._type;
        return object;
    }
    
    get chow() {
        return this._type === MentsuType.CHOW;
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
        return this._type === MentsuType.KNITTED_CHOW;
    }
    
    get kong() {
        return this._type === MentsuType.KONG;
    }
    
    get middle() {
        return this._janpaiList[1];
    }
    
    get pung() {
        return this._type === MentsuType.PUNG;
    }
    
    get suit() {
        return this._janpaiList[0].suit;
    }
    
}

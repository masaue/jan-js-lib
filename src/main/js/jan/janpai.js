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
import JanpaiID from './janpai-id';
import Suit from './suit';

export default class Janpai {
    
    constructor(id, red = false) {
        this._id = id;
        this._red = red;
    }
    
    clone() {
        return new Janpai(this._id, this._red);
    }
    
    equals(target) {
        return target && (this._id === target.id);
    }
    
    toObject() {
        const object = {};
        object.id = this._id;
        object.red = this._red;
        return object;
    }
    
    toString() {
        return `[${this._id}]`;
    }
    
    get dragon() {
        switch (this._id) {
        case JanpaiID.BAI:
        case JanpaiID.FA:
        case JanpaiID.CHUN:
            return true;
        default:
            return false;
        }
    }
    
    get even() {
        return /^[2|4|6|8]./.test(this._id);
    }
    
    get five() {
        return /^5./.test(this._id);
    }
    
    get id() {
        return this._id;
    }
    
    get ji() {
        return !/^[1-9]./.test(this._id);
    }
    
    get next() {
        switch (this._id) {
        case JanpaiID.MAN_09:
        case JanpaiID.PIN_09:
        case JanpaiID.SOU_09:
            return new Janpai(`1${this._id[1]}`);
        case JanpaiID.TON:
            return new Janpai(JanpaiID.NAN);
        case JanpaiID.NAN:
            return new Janpai(JanpaiID.SHA);
        case JanpaiID.SHA:
            return new Janpai(JanpaiID.PEI);
        case JanpaiID.PEI:
            return new Janpai(JanpaiID.TON);
        case JanpaiID.BAI:
            return new Janpai(JanpaiID.FA);
        case JanpaiID.FA:
            return new Janpai(JanpaiID.CHUN);
        case JanpaiID.CHUN:
            return new Janpai(JanpaiID.BAI);
        default:
            return new Janpai(`${parseInt(this._id[0]) + 1}${this._id[1]}`);
        }
    }
    
    get number() {
        if (!this.ji) {
            return parseInt(this._id[0]);
        }
        else {
            return 0;
        }
    }
    
    get prev() {
        switch (this._id) {
        case JanpaiID.MAN_01:
        case JanpaiID.PIN_01:
        case JanpaiID.SOU_01:
            return new Janpai(`9${this._id[1]}`);
        case JanpaiID.TON:
            return new Janpai(JanpaiID.PEI);
        case JanpaiID.NAN:
            return new Janpai(JanpaiID.TON);
        case JanpaiID.SHA:
            return new Janpai(JanpaiID.NAN);
        case JanpaiID.PEI:
            return new Janpai(JanpaiID.SHA);
        case JanpaiID.BAI:
            return new Janpai(JanpaiID.CHUN);
        case JanpaiID.FA:
            return new Janpai(JanpaiID.BAI);
        case JanpaiID.CHUN:
            return new Janpai(JanpaiID.FA);
        default:
            return new Janpai(`${parseInt(this._id[0]) - 1}${this._id[1]}`);
        }
    }
    
    get red() {
        return this._red;
    }
    
    get suit() {
        switch (this._id[this._id.length - 1]) {
        case 'm':
            return Suit.MAN;
        case 'p':
            return Suit.PIN;
        case 's':
            return Suit.SOU;
        default:
            return Suit.JI;
        }
    }
    
    get yao() {
        switch (this._id) {
        case JanpaiID.MAN_01:
        case JanpaiID.MAN_09:
        case JanpaiID.PIN_01:
        case JanpaiID.PIN_09:
        case JanpaiID.SOU_01:
        case JanpaiID.SOU_09:
        case JanpaiID.TON:
        case JanpaiID.NAN:
        case JanpaiID.SHA:
        case JanpaiID.PEI:
        case JanpaiID.BAI:
        case JanpaiID.FA:
        case JanpaiID.CHUN:
            return true;
        default:
            return false;
        }
    }
    
    set red(value) {
        this._red = value;
    }
    
    get wind() {
        switch (this._id) {
        case JanpaiID.TON:
        case JanpaiID.NAN:
        case JanpaiID.SHA:
        case JanpaiID.PEI:
            return true;
        default:
            return false;
        }
    }
    
}

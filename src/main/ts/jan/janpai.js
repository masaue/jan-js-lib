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
import {JANPAI_ID} from './janpai-id';
import {SUIT} from './suit';

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
        case JANPAI_ID.BAI:
        case JANPAI_ID.FA:
        case JANPAI_ID.CHUN:
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
        case JANPAI_ID.MAN_09:
        case JANPAI_ID.PIN_09:
        case JANPAI_ID.SOU_09:
            return new Janpai(`1${this._id[1]}`);
        case JANPAI_ID.TON:
            return new Janpai(JANPAI_ID.NAN);
        case JANPAI_ID.NAN:
            return new Janpai(JANPAI_ID.SHA);
        case JANPAI_ID.SHA:
            return new Janpai(JANPAI_ID.PEI);
        case JANPAI_ID.PEI:
            return new Janpai(JANPAI_ID.TON);
        case JANPAI_ID.BAI:
            return new Janpai(JANPAI_ID.FA);
        case JANPAI_ID.FA:
            return new Janpai(JANPAI_ID.CHUN);
        case JANPAI_ID.CHUN:
            return new Janpai(JANPAI_ID.BAI);
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
        case JANPAI_ID.MAN_01:
        case JANPAI_ID.PIN_01:
        case JANPAI_ID.SOU_01:
            return new Janpai(`9${this._id[1]}`);
        case JANPAI_ID.TON:
            return new Janpai(JANPAI_ID.PEI);
        case JANPAI_ID.NAN:
            return new Janpai(JANPAI_ID.TON);
        case JANPAI_ID.SHA:
            return new Janpai(JANPAI_ID.NAN);
        case JANPAI_ID.PEI:
            return new Janpai(JANPAI_ID.SHA);
        case JANPAI_ID.BAI:
            return new Janpai(JANPAI_ID.CHUN);
        case JANPAI_ID.FA:
            return new Janpai(JANPAI_ID.BAI);
        case JANPAI_ID.CHUN:
            return new Janpai(JANPAI_ID.FA);
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
            return SUIT.MAN;
        case 'p':
            return SUIT.PIN;
        case 's':
            return SUIT.SOU;
        default:
            return SUIT.JI;
        }
    }
    
    get yao() {
        switch (this._id) {
        case JANPAI_ID.MAN_01:
        case JANPAI_ID.MAN_09:
        case JANPAI_ID.PIN_01:
        case JANPAI_ID.PIN_09:
        case JANPAI_ID.SOU_01:
        case JANPAI_ID.SOU_09:
        case JANPAI_ID.TON:
        case JANPAI_ID.NAN:
        case JANPAI_ID.SHA:
        case JANPAI_ID.PEI:
        case JANPAI_ID.BAI:
        case JANPAI_ID.FA:
        case JANPAI_ID.CHUN:
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
        case JANPAI_ID.TON:
        case JANPAI_ID.NAN:
        case JANPAI_ID.SHA:
        case JANPAI_ID.PEI:
            return true;
        default:
            return false;
        }
    }
    
}

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
import Janpai from './janpai';
import JanpaiID from './janpai-id';
import Mentsu from './mentsu';
import {WIND} from './wind';

export default class JanUtil {
    
    static chowable(hand, janpai) {
        if (janpai.ji) {
            return false;
        }
        switch (janpai.number) {
        case 1:
            return hand.includes(janpai.next) && hand.includes(janpai.next.next);
        case 2:
            return hand.includes(janpai.next) && hand.includes(janpai.next.next) ||
                   hand.includes(janpai.prev) && hand.includes(janpai.next);
        case 8:
            return hand.includes(janpai.prev) && hand.includes(janpai.next) ||
                   hand.includes(janpai.prev) && hand.includes(janpai.prev.prev);
        case 9:
            return hand.includes(janpai.prev) && hand.includes(janpai.prev.prev);
        default:
            return hand.includes(janpai.next) && hand.includes(janpai.next.next) ||
                   hand.includes(janpai.prev) && hand.includes(janpai.next) ||
                   hand.includes(janpai.prev) && hand.includes(janpai.prev.prev);
        }
    }

    static chowableList(hand, janpai) {
        const chowableList = [];
        if (janpai.ji) {
            return chowableList;
        }
        const number = janpai.number;
        if (number > 2 && hand.includes(janpai.prev.prev) && hand.includes(janpai.prev)) {
            chowableList.push(Mentsu.createChowMentsu(janpai.prev.prev));
        }
        if (1 < number && number < 9 && hand.includes(janpai.prev) && hand.includes(janpai.next)) {
            chowableList.push(Mentsu.createChowMentsu(janpai.prev));
        }
        if (number < 8 && hand.includes(janpai.next) && hand.includes(janpai.next.next)) {
            chowableList.push(Mentsu.createChowMentsu(janpai));
        }
        return chowableList;
    }

    static count(target, janpai) {
        return target.filter((j) => { return j.equals(janpai) }).length;
    }
    
    static createDeck() {
        const deck = [];
        this.getAllJanpai().forEach((janpai) => {
            for (let i = 0; i < 4; i++) {
                deck.push(janpai.clone());
            }
        });
        return deck;
    }
    
    static getAllJanpai() {
        return Object.values(JanpaiID).map((id) => { return new Janpai(id) });
    }
    
    static hasJanpai(target, janpai) {
        return target.some((j) => { return j.equals(janpai) });
    }
    
    static hasSuit(target, suit) {
        return target.map((j) => { return j.suit }).includes(suit);
    }
    
    static janpaiList(objectList) {
        return objectList.map((o) => { return new Janpai(o.id, o.red) });
    }
    
    static janpaiListWith(target, janpai) {
        const janpaiListWith = [...target];
        janpaiListWith.push(janpai);
        this.sortJanpaiList(janpaiListWith);
        return janpaiListWith;
    }
    
    static nextWind(wind) {
        switch (wind) {
        case WIND.TON:
            return WIND.NAN;
        case WIND.NAN:
            return WIND.SHA;
        case WIND.SHA:
            return WIND.PEI;
        case WIND.PEI:
            return WIND.TON;
        default:
            throw new Error(`Unknown wind: ${wind}`);
        }
    }
    
    static numbers(target) {
        return target.map((j) => { return j.number });
    }
    
    static objectedList(target) {
        return target.map((j) => {return j.toObject()});
    }
    
    static objectedTable(target) {
        return Object.fromEntries(Object.entries(target).map(([k, v]) => {
            return [k, v.toObject()];
        }));
    }
    
    static remove(target, janpai, count = 1) {
        for (let i = 0; i < count; i++) {
            this._discard(target, janpai);
        }
    }
    
    static shuffleList(target) {
        for (let n = target.length; n > 0; n--) {
            const s = n - 1;
            const t = Math.floor(Math.random() * n);
            const temp = target[s];
            target[s] = target[t];
            target[t] = temp;
        }
    }
    
    static sortJanpaiList(target) {
        target.sort((s, t) => {
            let sIndex = undefined;
            let tIndex = undefined;
            Object.values(JanpaiID).some((id, index) => {
                if (id === s.id) {
                    sIndex = index;
                }
                if (id === t.id) {
                    tIndex = index;
                }
                return (sIndex !== undefined) && (tIndex !== undefined);
            });
            return (sIndex < tIndex) ? -1 : 1;
        });
    }
    
    static suitCount(target) {
        return (new Set(target.map((j) => { return j.suit }))).size;
    }
    
    static uniqueList(target) {
        const result = [];
        target.forEach((t) => {
            if (!result.some((r) => { return r.equals(t) })) {
                result.push(t);
            }
        });
        return result;
    }
    
    static _discard(target, janpai) {
        const found = target.find((j, index) => {
            if (j.equals(janpai)) {
                target.splice(index, 1);
                return true;
            }
            return false;
        });
        return found ? found.clone() : undefined;
    }
    
}

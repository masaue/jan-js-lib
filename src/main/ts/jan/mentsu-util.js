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

export default class MentsuUtil {
    
    static janpaiList(mentsuList) {
        const janpaiList = [];
        mentsuList.forEach((mentsu) => {
            janpaiList.push(...mentsu.janpaiList);
        });
        return janpaiList;
    }
    
    static mixed(mentsuList) {
        const suitSet = new Set(mentsuList.filter((m) => {
            return !m.hasJi;
        }).map((m) => { return m.suit }));
        return suitSet.size === mentsuList.length;
    }
    
    static multiplicative(mentsuList) {
        const numberSet = new Set(mentsuList.map((c) => { return c.head.number }));
        return numberSet.size === 1;
    }
    
    static shifted(mentsuList, shiftedCount, maxShiftNumber) {
        for (let number = 1; number <= maxShiftNumber; number++) {
            if (this._shifted(mentsuList, shiftedCount, number)) {
                return true;
            }
        }
        return false;
    }
    
    static shortStraight(mentsuList) {
        return this._shifted(mentsuList, 2, 3);
    }
    
    static sortMentsuList(target) {
        target.sort((s, t) => {
            let sIndex = undefined;
            let tIndex = undefined;
            Object.values(JANPAI_ID).some((id, index) => {
                if (id === s.head.id) {
                    sIndex = index;
                }
                if (id === t.head.id) {
                    tIndex = index;
                }
                return (sIndex !== undefined) && (tIndex !== undefined);
            });
            return (sIndex < tIndex) ? -1 : 1;
        });
    }
    
    static straight(mentsuList) {
        return this._shifted(mentsuList, 3, 3);
    }
    
    static terminalChows(mentsuList) {
        return this._shifted(mentsuList, 2, 6);
    }
    
    
    
    static _shifted(mentsuList, shiftedCount, shiftNumber) {
        const numberList = mentsuList.map((m) => { return m.head.number });
        numberList.sort();
        const expectedList = [];
        const number = numberList[0];
        for (let count = 0; count < shiftedCount; count++) {
            expectedList.push(number + shiftNumber * count);
        }
        return numberList.toString() === expectedList.toString();
    }
}

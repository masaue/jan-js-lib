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
import CompleteInfo from './complete-info';
import CompletePattern from './complete-pattern';
import Janpai from './janpai';
import JanpaiID from './janpai-id';
import JanUtil from './jan-util';
import KnittedStraight from './knitted-straight';
import Mentsu from './mentsu';
import YakuUtil from './yaku-util';

export default class HandUtil {
    
    static allJanpaiListWith(hand, janpai) {
        return JanUtil.janpaiListWith(hand.allJanpaiList, janpai);
    }
    
    static completable(hand, janpai) {
        const janpaiList = this.janpaiListWith(hand, janpai);
        const execludeHeadMap = this._execludeHeadMap(janpaiList);
        if (execludeHeadMap.size === 0) {
            return YakuUtil.honorsAndKnittedTiles(janpaiList);
        }
        const completable = [...execludeHeadMap].some(([k, v]) => {
            if (v.length === 0) {
                // 裸単騎状態で和了
                return true;
            }
            const pungList = this._pungList([...v]);
            // JanpaiIDは何でも問題ない
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01));
            return [...Array(2 ** pungList.length).keys()].some((number) => {
                return  this._completePattern(v, k, pungList, number, completeInfo, hand);
            });
        });
        if (completable) {
            return true;
        }
        if (YakuUtil.sevenPairs(janpaiList)) {
            return true;
        }
        return YakuUtil.thirteenOrphans(janpaiList);
    }
    // completable()でtrueだったhand, completeInfo.janpaiのみ保証する
    static completePatternList(hand, completeInfo) {
        const completePatternList = [];
        const janpaiList = this.janpaiListWith(hand, completeInfo.janpai);
        const execludeHeadMap = this._execludeHeadMap(janpaiList);
        execludeHeadMap.forEach((v, k) => {
            const pungList = this._pungList([...v]);
            [...Array(2 ** pungList.length).keys()].forEach((number) => {
                const completePattern = this._completePattern(v, k, pungList, number,
                                                              completeInfo, hand);
                if (completePattern) {
                    completePatternList.push(completePattern);
                }
            });
        });
        return completePatternList;
    }
    
    static janpaiListWith(hand, janpai) {
        return JanUtil.janpaiListWith(hand.janpaiList, janpai);
    }
    
    
    
    static _chowable(head, middle, tail) {
        if (head.ji || middle.ji || tail.ji) {
            return false;
        }
        return middle.equals(head.next) && tail.equals(middle.next);
    }
    
    static _chowList(janpaiList) {
        const chowList = [];
        let found;
        do {
            const uniqueList = JanUtil.uniqueList(janpaiList);
            found = uniqueList.slice(0, -2).some((head, index) => {
                const middle = uniqueList[index + 1];
                const tail = uniqueList[index + 2];
                if (this._chowable(head, middle, tail)) {
                    [ head, middle, tail ].forEach((j) => {
                        JanUtil.remove(janpaiList, j);
                    });
                    chowList.push(Mentsu.createChowMentsu(head, true));
                    return true;
                }
                return false;
            });
        }
        while (found && janpaiList.length !== 0);
        return chowList;
    }
    
    static _completePattern(janpaiList, head, pungList, number, completeInfo, hand) {
        const use = number.toString(2).padStart(pungList.length, "0");
        const useList = use.split('').map((n) => { return parseInt(n) });
        const removeList = pungList.filter((p, i) => { return useList[i] });
        const copyList = [...janpaiList];
        const pungMentsuList = this._PungMentsuList(copyList, removeList, completeInfo);
        pungMentsuList.push(...hand.fixedList);
        const mentsuList = this._mentsuList(copyList, pungMentsuList);
        if (mentsuList.length !== 0) {
            return new CompletePattern(mentsuList, head);
        }
        return undefined;
    }
    
    static _createLightPungMentsu(janpaiList, janpai, completeInfo) {
        return JanUtil.count(janpaiList, janpai) === 3 &&
               completeInfo.janpai.equals(janpai) && !completeInfo.type.tsumo;
    }
    
    static _execludeHeadMap(janpaiList) {
        const execludeHeadMap = new Map();
        JanUtil.uniqueList(janpaiList).forEach((j) => {
            if (JanUtil.count(janpaiList, j) >= 2) {
                const execludeHeadList = [...janpaiList];
                JanUtil.remove(execludeHeadList, j, 2);
                execludeHeadMap.set(j, execludeHeadList);
            }
        });
        return execludeHeadMap;
    }
    
    static _knittedChowList(janpaiList, knittedType) {
        const chowList = [];
        knittedType.split('').forEach((k, i) => {
            chowList.push(Mentsu.createKnittedChowMentsu(new Janpai(i + 1 + k.toLowerCase())));
        });
        this._removeKnittedStraight(janpaiList, knittedType);
        return chowList;
    }
    
    static _pungList(janpaiList) {
        return JanUtil.uniqueList(janpaiList).filter((j) => {
            if (JanUtil.count(janpaiList, j) >= 3) {
                JanUtil.remove(janpaiList, j, 3)
                return true;
            }
            return false;
        });
    }
    
    static _PungMentsuList(janpaiList, pungList, completeInfo) {
        return pungList.map((p) => {
            const light = this._createLightPungMentsu(janpaiList, p, completeInfo);
            // pungListを必ず削除できることは_pungList()で検証済み
            JanUtil.remove(janpaiList, p, 3);
            return Mentsu.createPungMentsu(p, !light);
        });
    }
    
    static _removeKnittedStraight(janpaiList, knittedType) {
        KnittedStraight[knittedType].forEach((j) => {
            JanUtil.remove(janpaiList, j);
        });
    }
    
    static _mentsuList(janpaiList, fixedList) {
        const copyList1 = [...janpaiList];
        const chowList1 = this._chowList(copyList1)
        if (copyList1.length === 0) {
            chowList1.push(...fixedList);
            return chowList1;
        }
        const copyList2 = [...janpaiList];
        const knittedType = YakuUtil.knittedStraight(copyList2);
        if (!knittedType) {
            return [];
        }
        const chowList2 = this._knittedChowList(copyList2, knittedType);
        chowList2.push(...this._chowList(copyList2));
        if (copyList2.length === 0) {
            chowList2.push(...fixedList);
            return chowList2;
        }
        return [];
    }
    
}

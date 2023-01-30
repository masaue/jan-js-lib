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
import {COMPLETE_TYPE} from './complete-type';
import HandUtil from './hand-util';
import Janpai from './janpai';
import {JANPAI_ID} from './janpai-id';
import JanUtil from './jan-util';
import KnittedStraight from './knitted-straight';
import MentsuUtil from './mentsu-util';
import {SUIT} from './suit';
import {ZJM_YAKU} from './zjm-yaku';

export default class YakuUtil {
    
    static allFives(completePattern) {
        return completePattern.head.five &&
               completePattern.mentsuList.every((m) => { return m.five });
    }
    
    static allGreen(janpaiList) {
        const greenList = [
            new Janpai(JANPAI_ID.SOU_02), new Janpai(JANPAI_ID.SOU_03),
            new Janpai(JANPAI_ID.SOU_04), new Janpai(JANPAI_ID.SOU_06),
            new Janpai(JANPAI_ID.SOU_08), new Janpai(JANPAI_ID.FA),
        ];
        return JanUtil.uniqueList(janpaiList).every((j) => {
            return JanUtil.hasJanpai(greenList, j);
        });
    }
    
    static allHonors(janpaiList) {
        return janpaiList.every((j) => { return j.ji });
    }
    
    static allSimples(janpaiList) {
        return !janpaiList.some((j) => { return j.yao });
    }
    
    static allTerminals(janpaiList) {
        return janpaiList.every((j) => { return j.yao && !j.ji });
    }
    
    static allTerminalsAndHonors(janpaiList) {
        return janpaiList.every((j) => { return j.yao }) &&
               !this.allHonors(janpaiList) &&
               !this.allTerminals(janpaiList);
    }
    
    static allTypes(janpaiList) {
        return JanUtil.suitCount(janpaiList) === 4 &&
               janpaiList.some((j) => { return j.wind }) &&
               janpaiList.some((j) => { return j.dragon });
    }
    
    static chickenHand(yakuList) {
        return yakuList.length === 0;
    }
    
    static closedWait(completePattern, janpai) {
        return completePattern.chowList.some((c) => {
            return c.middle.number === janpai.number && c.concealedChow;
        });
    }
    
    static concealedHand(hand, completeInfo) {
        return hand.callCount === 0 && !completeInfo.type.tsumo;
    }
    
    static doublePung(doublePung) {
        return this.mixedTripleChow(doublePung);
    }
    
    static edgeWait(completePattern, janpai) {
        return completePattern.chowList.some((c) => {
            return (c.head.number === 1 && c.head.next.next.equals(janpai) ||
                    c.head.number === 7 && c.head.equals(janpai)) && c.concealedChow;
        });
    }
    
    static fourPureShiftedPungs(fourPungs) {
        return this.fullFlush(MentsuUtil.janpaiList(fourPungs)) &&
               MentsuUtil.shifted(fourPungs, 4, 1);
    }
    
    static fourShiftedChows(fourChows) {
        return this.fullFlush(MentsuUtil.janpaiList(fourChows)) &&
               MentsuUtil.shifted(fourChows, 4, 2);
    }
    
    static fullFlush(janpaiList) {
        return JanUtil.suitCount(janpaiList) === 1 && !janpaiList[0].ji
    }
    
    static fullyConcealed(hand, completeInfo) {
        return hand.callCount === 0 && completeInfo.type.tsumo;
    }
    // honorsAndKnittedTiles()がtrueなjanpaiListのみ保証する
    static greaterHonorsAndKnittedTiles(janpaiList) {
        // janpaiListがuniqueであることはhonorsAndKnittedTiles()で判定済み
        return janpaiList.filter((j) => { return j.ji }).length === 7;
    }
    
    static halfFlush(janpaiList) {
        return JanUtil.suitCount(janpaiList) === 2 &&
               JanUtil.hasSuit(janpaiList, SUIT.JI);
    }
    
    static honorsAndKnittedTiles(janpaiList) {
        if (janpaiList.length !== JanUtil.uniqueList(janpaiList).length) {
            return false;
        }
        const numberTileList = janpaiList.filter((j) => { return !j.ji });
        switch (numberTileList.length) {
        case 7:
            return this._knittedStraight(numberTileList, this._knittedStraight);
        case 8:
            return this._knittedStraight(numberTileList);
        case 9:
            if (this.knittedStraight(numberTileList)) {
                return true;
            }
            break;
        }
        return false;
    }
    
    static incidentalBonusesYakuList(completeInfo) {
        switch (completeInfo.type) {
        case COMPLETE_TYPE.FINAL_DRAW_AND_WIN_ON_KONG:
            return [ ZJM_YAKU.FINAL_DRAW, ZJM_YAKU.WIN_ON_KONG ];
        case COMPLETE_TYPE.FINAL_DRAW:
            return [ ZJM_YAKU.FINAL_DRAW ];
        case COMPLETE_TYPE.FINAL_DISCARD:
            return [ ZJM_YAKU.FINAL_DISCARD ];
        case COMPLETE_TYPE.WIN_ON_KONG:
            return [ ZJM_YAKU.WIN_ON_KONG ];
        case COMPLETE_TYPE.ROBBING_A_KONG:
            return [ ZJM_YAKU.ROBBING_A_KONG ];
        }
        return [];
    }
    
    static knittedStraight(janpaiList) {
        return Object.keys(KnittedStraight).find((k) => {
            return KnittedStraight[k].every((j) => {
                return JanUtil.hasJanpai(janpaiList, j);
            });
        });
    }
    
    static lastTile(completeInfo) {
        return completeInfo.last;
    }
    
    static lowerFour(janpaiList) {
        return this._minToMax(janpaiList, 1, 4);
    }
    
    static lowerTiles(janpaiList) {
        return this._minToMax(janpaiList, 1, 3);
    }
    
    static meldedHand(hand, completeInfo) {
        return hand.callCount === 4 && !completeInfo.type.tsumo;
    }
    
    static middleTiles(janpaiList) {
        return this._minToMax(janpaiList, 4, 6);
    }
    
    static mixedDoubleChow(doubleChow) {
        return this.mixedTripleChow(doubleChow);
    }
    
    static mixedShiftedChows(threeChows) {
        return MentsuUtil.mixed(threeChows) && MentsuUtil.shifted(threeChows, 3, 1);
    }
    
    static mixedShiftedPungs(threePungs) {
        return this.mixedShiftedChows(threePungs);
    }
    
    static mixedStraight(threeChows) {
        return MentsuUtil.mixed(threeChows) && MentsuUtil.straight(threeChows);
    }
    
    static mixedTripleChow(tripleChow) {
        return MentsuUtil.mixed(tripleChow) && MentsuUtil.multiplicative(tripleChow);
    }
    
    static nineGates(janpaiList) {
        const numberList = JanUtil.numbers(janpaiList);
        return [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9].every((n, i) => {
                   return n === numberList[i];
               }) && this.fullFlush(janpaiList);
    }
    
    static noHonors(janpaiList) {
        return janpaiList.every((j) => { return !j.ji });
    }
    
    static oneVoidedSuit(janpaiList) {
        return JanUtil.suitCount(janpaiList.filter((j) => { return !j.ji })) === 2;
    }
    
    static pureDoubleChow(doubleChow) {
        return doubleChow[0].head.equals(doubleChow[1].head);
    }
    
    static pureShiftedChows(threeChows) {
        return this.fullFlush(MentsuUtil.janpaiList(threeChows)) &&
               MentsuUtil.shifted(threeChows, 3, 2);
    }
    
    static pureShiftedPungs(threePungs) {
        return this.fullFlush(MentsuUtil.janpaiList(threePungs)) &&
               MentsuUtil.shifted(threePungs, 3, 1);
    }
    
    static pureStraight(threeChows) {
        return this.fullFlush(MentsuUtil.janpaiList(threeChows)) &&
               MentsuUtil.straight(threeChows);
    }
    
    static pureTripleChow(tripleChow) {
        return tripleChow[0].head.equals(tripleChow[1].head) &&
               tripleChow[1].head.equals(tripleChow[2].head);
    }
    
    static quadrupleChow(quadrupleChow) {
        return quadrupleChow[0].head.equals(quadrupleChow[1].head) &&
               quadrupleChow[1].head.equals(quadrupleChow[2].head) &&
               quadrupleChow[2].head.equals(quadrupleChow[3].head);
    }
    
    static reversibleTiles(janpaiList) {
        const reversibleList = [
            new Janpai(JANPAI_ID.PIN_01), new Janpai(JANPAI_ID.PIN_02),
            new Janpai(JANPAI_ID.PIN_03), new Janpai(JANPAI_ID.PIN_04),
            new Janpai(JANPAI_ID.PIN_05), new Janpai(JANPAI_ID.PIN_08),
            new Janpai(JANPAI_ID.PIN_09), new Janpai(JANPAI_ID.SOU_02),
            new Janpai(JANPAI_ID.SOU_04), new Janpai(JANPAI_ID.SOU_05),
            new Janpai(JANPAI_ID.SOU_06), new Janpai(JANPAI_ID.SOU_08),
            new Janpai(JANPAI_ID.SOU_09), new Janpai(JANPAI_ID.BAI),
        ];
        return JanUtil.uniqueList(janpaiList).every((j) => {
            return JanUtil.hasJanpai(reversibleList, j);
        });
    }
    
    static selfDrawn(hand, completeInfo) {
        return hand.callCount !== 0 && completeInfo.type === COMPLETE_TYPE.DRAW;
    }
    
    static sevenPairs(janpaiList) {
        let pairCount = 0;
        JanUtil.uniqueList(janpaiList).every((u) => {
            let count = JanUtil.count(janpaiList, u);
            if (count % 2 !== 0) {
                return false;
            }
            pairCount += count / 2;
            return true;
        });
        return pairCount === 7;
    }
    // sevenPairs()がtrueなjanpaiListのみ保証する
    static sevenShiftedPairs(janpaiList) {
        if (janpaiList[0].number > 3) {
            return false;
        }
        const uniqueList = JanUtil.uniqueList(janpaiList);
        return uniqueList.slice(0, -1).every((j, i) => {
            return j.next.equals(uniqueList[i + 1]);
        }) && uniqueList.length === 7;
    }
    
    static shortStraight(twoChows) {
        return this.fullFlush(MentsuUtil.janpaiList(twoChows)) &&
               MentsuUtil.shortStraight(twoChows, 2, 3);
    }
    
    static singleWait(completePattern, janpai) {
        return completePattern.head.equals(janpai);
    }
    
    static terminalsYaku(completePattern) {
        if (completePattern.yaoAll) {
            if (completePattern.hasJi) {
                if (completePattern.pungList.length === 4) {
                    return ZJM_YAKU.MIXED_GREATER_TERMINALS;
                }
                return ZJM_YAKU.MIXED_LESSER_TERMINALS;
            }
            else {
                if (completePattern.pungList.length === 4) {
                    return ZJM_YAKU.PURE_GREATER_TERMINALS;
                }
                return ZJM_YAKU.PURE_LESSER_TERMINALS;
            }
        }
        return undefined;
    }
    
    static thirteenOrphans(janpaiList) {
        const uniqueList = JanUtil.uniqueList(janpaiList);
        return uniqueList.length === 13 && uniqueList.every((u) => {
            return u.yao;
        });
    }
    
    static tileHogCount(hand, janpai) {
        const janpaiList = HandUtil.allJanpaiListWith(hand, janpai);
        return JanUtil.uniqueList(janpaiList).filter((u) => {
            return JanUtil.count(janpaiList, u) === 4 &&
                   !hand.fixedList.some((f) => { return f.head.equals(u) && f.kong });
        }).length;
    }
    
    static triplePung(triplePung) {
        return this.mixedTripleChow(triplePung);
    }
    
    static twoIdenticalSequencesTwice(quadrupleChow) {
        const headList = quadrupleChow.map((m) => { return m.head });
        return JanUtil.uniqueList(headList).every((u) => {
            return headList.filter((h) => { return h.equals(u) }).length === 2;
        });
    }
    
    static twoTerminalChows(twoChows) {
        return this.fullFlush(MentsuUtil.janpaiList(twoChows)) &&
               MentsuUtil.terminalChows(twoChows);
    }
    
    static upperFour(janpaiList) {
        return this._minToMax(janpaiList, 6);
    }
    
    static upperTiles(janpaiList) {
        return this._minToMax(janpaiList, 7);
    }
    
    
    
    static _knittedStraight(janpaiList, callback = this.knittedStraight) {
        return JanUtil.getAllJanpai().some((j) => {
            if (j.ji || JanUtil.hasJanpai(janpaiList, j)) {
                return false;
            }
            const binded = callback.bind(this)
            return binded(JanUtil.janpaiListWith(janpaiList, j));
        });
    }
    
    static _minToMax(janpaiList, min, max = undefined) {
        const numberList = JanUtil.numbers(janpaiList);
        return max ? numberList.every((n) => { return min <= n && n <= max }) :
                     numberList.every((n) => { return n >= min });
    }
    
}

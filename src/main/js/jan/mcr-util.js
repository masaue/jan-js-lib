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
import HandUtil from './hand-util';
import JanUtil from './jan-util';
import McrComplete from './mcr-complete';
import McrYaku from './mcr-yaku';
import MentsuUtil from './mentsu-util';
import ZjmYaku from './zjm-yaku';
import YakuUtil from './yaku-util';

export default class McrUtil {
    
    static complete(hand, completeInfo) {
        const yakuList = [];
        const janpaiList = HandUtil.janpaiListWith(hand, completeInfo.janpai);
        if (YakuUtil.honorsAndKnittedTiles(janpaiList)) {
            yakuList.push(...this._brokenYakuList(janpaiList));
            yakuList.push(...this._beingWholeYakuList(hand, completeInfo));
            return new McrComplete(this._removeExecludeYaku(yakuList, completeInfo));
        }
        if (YakuUtil.thirteenOrphans(janpaiList)) {
            yakuList.push(McrYaku.THIRTEEN_ORPHANS);
            yakuList.push(...this._beingWholeYakuList(hand, completeInfo));
            return new McrComplete(this._removeExecludeYaku(yakuList, completeInfo));
        }
        yakuList.push(...this._mentsuYakuList(hand, completeInfo));
        const allJanpaiList = HandUtil.allJanpaiListWith(hand, completeInfo.janpai);
        // 七対と複合できるよう、字一色は_honorTilesYakuList()でなくここで判定
        if (YakuUtil.allHonors(allJanpaiList)) {
            yakuList.push(McrYaku.ALL_HONORS);
        }
        // 七対と複合できるよう、幺九類は幺九刻を除きここで判定
        this._push(yakuList, this._terminalsOrHonorsYaku(allJanpaiList));
        yakuList.push(...this._fullChowsYakuList(hand, completeInfo.janpai));
        yakuList.push(...this._limitedNumberYakuList(allJanpaiList));
        yakuList.push(...this._beingWholeYakuList(hand, completeInfo));
        this._specialYakuList(yakuList, hand, completeInfo.janpai);
        return new McrComplete(this._removeExecludeYaku(yakuList, completeInfo));
    }
    
    
    
    static _allChows(completePattern) {
        const length = completePattern.chowList.length + completePattern.knittedChowList.length;
        return length === 4 && !completePattern.head.ji;
    }
    
    static _allInvolvedYaku(completePattern) {
        switch (YakuUtil.terminalsYaku(completePattern)) {
        case ZjmYaku.PURE_LESSER_TERMINALS:
        case ZjmYaku.MIXED_LESSER_TERMINALS:
            return McrYaku.OUTSIDE_HAND;
        }
        // 全大、全中、全小、大于五、小于五、断幺は_limitedNumbersYakuList()で判定
        return YakuUtil.allFives(completePattern) ? McrYaku.ALL_FIVES : undefined;
    }
    
    static _allEvenPungs(completePattern) {
        return completePattern.head.even &&
               MentsuUtil.janpaiList(completePattern.mentsuList).every((j) => { return j.even });
    }
    
    static _beingWholeYakuList(hand, completeInfo) {
        const yakuList = YakuUtil.incidentalBonusesYakuList(completeInfo).map((y) => {
            switch(y) {
            case ZjmYaku.FINAL_DRAW:
                return McrYaku.LAST_TILE_DRAW;
            case ZjmYaku.FINAL_DISCARD:
                return McrYaku.LAST_TILE_CLAIM;
            case ZjmYaku.WIN_ON_KONG:
                return McrYaku.OUT_WITH_REPLACEMENT_TILE;
            case ZjmYaku.ROBBING_A_KONG:
                return McrYaku.ROBBING_THE_KONGS;
            }
        });
        if (YakuUtil.meldedHand(hand, completeInfo)) {
            yakuList.push(McrYaku.MELDED_HAND);
        }
        else if (YakuUtil.fullyConcealed(hand, completeInfo)) {
            yakuList.push(McrYaku.FULLY_CONCEALED);
        }
        else if (YakuUtil.concealedHand(hand, completeInfo)) {
            yakuList.push(McrYaku.CONCEALED_HAND);
        }
        else if (YakuUtil.selfDrawn(hand, completeInfo)) {
            yakuList.push(McrYaku.SELF_DRAWN);
        }
        if (YakuUtil.lastTile(completeInfo)) {
            yakuList.push(McrYaku.LAST_TILE);
        }
        // 待ち類は_mentsuYakuList()で判定
        return yakuList;
    }
    
    static _brokenYakuList(janpaiList) {
        if (YakuUtil.greaterHonorsAndKnittedTiles(janpaiList)) {
            return [ McrYaku.GREATER_HONORS_AND_KNITTED_TILES ];
        }
        const yakuList = [ McrYaku.LESSER_HONORS_AND_KNITTED_TILES ];
        if (YakuUtil.knittedStraight(janpaiList)) {
            yakuList.push(McrYaku.KNITTED_STRAIGHT);
        }
        return yakuList;
    }
    
    static _concealedPungsAndKongsYakuList(completePattern) {
        const yakuList = [];
        this._push(yakuList, this._concealedPungsYaku(completePattern));
        yakuList.push(...this._kongsYakuList(completePattern));
        if (yakuList.includes(McrYaku.TWO_CONCEALED_KONGS)) {
            return yakuList.filter((y) => { return y !== McrYaku.TWO_CONCEALED_PUNGS });
        }
        return yakuList;
    }
    
    static _concealedPungsYaku(completePattern) {
        switch (completePattern.concealedPungCount) {
        case 4:
            return McrYaku.FOUR_CONCEALED_PUNGS;
        case 3:
            return McrYaku.THREE_CONCEALED_PUNGS;
        case 2:
            return McrYaku.TWO_CONCEALED_PUNGS;
        }
        return undefined;
    }
    
    static _dragonsYaku(completePattern) {
        switch (completePattern.dragonCount) {
        case 3:
            return McrYaku.BIG_THREE_DRAGONS;
        case 2:
            if (completePattern.head.dragon) {
                return McrYaku.LITTLE_THREE_DRAGONS;
            }
            else {
                return McrYaku.TWO_DRAGON_PUNGS;
            }
        case 1:
            return McrYaku.DRAGON_PUNG;
        }
        return undefined;
    }
    
    static _fullChowsYakuList(hand, janpai) {
        if (YakuUtil.nineGates(hand.janpaiList)) {
            return [ McrYaku.NINE_GATES ];
        }
        const yakuList = [];
        const allJanpaiList = HandUtil.allJanpaiListWith(hand, janpai);
        if (YakuUtil.allGreen(allJanpaiList)) {
            yakuList.push(McrYaku.ALL_GREEN);
        }
        if (YakuUtil.fullFlush(allJanpaiList)) {
            yakuList.push(McrYaku.FULL_FLUSH);
        }
        else if (YakuUtil.halfFlush(allJanpaiList)) {
            yakuList.push(McrYaku.HALF_FLUSH);
        }
        else if (YakuUtil.allTypes(allJanpaiList)) {
            yakuList.push(McrYaku.ALL_TYPES);
        }
        else if (YakuUtil.oneVoidedSuit(allJanpaiList)) {
            yakuList.push(McrYaku.ONE_VOIDED_SUIT);
        }
        if (YakuUtil.noHonors(allJanpaiList)) {
            yakuList.push(McrYaku.NO_HONORS);
        }
        return yakuList;
    }
    
    static _higherYakuList(yakuList, newYakuList) {
        const complete = new McrComplete(yakuList);
        const newComplete = new McrComplete(newYakuList);
        return complete.point > newComplete.point ? yakuList : newYakuList;
    }
    
    static _honorTilesYakuList(completePattern, completeInfo) {
        const yakuList = [];
        // 字一色はyakuList()で判定
        yakuList.push(...this._windsYakuList(completePattern, completeInfo));
        this._push(yakuList, this._dragonsYaku(completePattern));
        return yakuList;
    }
    
    static _kongsYakuList(completePattern) {
        switch (completePattern.kongCount) {
        case 4:
            if (completePattern.darkKongCount === 1) {
                return [ McrYaku.FOUR_KONGS, McrYaku.CONCEALED_KONG ];
            }
            return [ McrYaku.FOUR_KONGS ];
        case 3:
            return [ McrYaku.THREE_KONGS ];
        case 2:
            switch (completePattern.darkKongCount) {
            case 2:
                return [ McrYaku.TWO_CONCEALED_KONGS ];
            case 1:
                return [ McrYaku.TWO_MELDED_KONGS, McrYaku.CONCEALED_KONG ];
            case 0:
                return [ McrYaku.TWO_MELDED_KONGS ];
            }
        case 1:
            if (completePattern.darkKongCount === 1) {
                return [ McrYaku.CONCEALED_KONG ];
            }
            else {
                return [ McrYaku.MELDED_KONG ];
            }
        }
        return [];
    }
    
    static _limitedNumberYakuList(janpaiList) {
        const yakuList = [];
        if (YakuUtil.upperTiles(janpaiList)) {
            yakuList.push(McrYaku.UPPER_TILES);
        }
        else if (YakuUtil.middleTiles(janpaiList)) {
            yakuList.push(McrYaku.MIDDLE_TILES);
        }
        else if (YakuUtil.lowerTiles(janpaiList)) {
            yakuList.push(McrYaku.LOWER_TILES);
        }
        else if (YakuUtil.upperFour(janpaiList)) {
            yakuList.push(McrYaku.UPPER_FOUR);
        }
        else if (YakuUtil.lowerFour(janpaiList)) {
            yakuList.push(McrYaku.LOWER_FOUR);
        }
        if (YakuUtil.allSimples(janpaiList)) {
            yakuList.push(McrYaku.ALL_SIMPLES);
        }
        return yakuList;
    }
    
    static _mentsuYakuList(hand, completeInfo) {
        const janpaiList = HandUtil.janpaiListWith(hand, completeInfo.janpai);
        let yakuList = YakuUtil.sevenPairs(janpaiList) ? [ this._sevenPairsYaku(janpaiList) ] :
                                                         [];
        HandUtil.completePatternList(hand, completeInfo).forEach((c) => {
            const newYakuList = [];
            newYakuList.push(...this._honorTilesYakuList(c, completeInfo));
            newYakuList.push(...this._numberTilesYakuList(c));
            newYakuList.push(...this._pungsYakuList(c));
            // _allInvolvedYaku(), _waitYaku()は面子が必要なため、ここで判定
            this._push(newYakuList, this._allInvolvedYaku(c));
            this._push(newYakuList, this._waitYaku(c, completeInfo.janpai,
                                                       hand.completableList));
            // removeExecludeYaku()ではcompletePattenがわからないため、ここで判定
            this._removeWaitYaku(newYakuList, c.knittedChowList, completeInfo.janpai);
            yakuList = this._higherYakuList(yakuList, newYakuList);
        });
        return yakuList;
    }
    
    static _numberTilesYakuList(completePattern) {
        const yakuList = [];
        if (this._allChows(completePattern)) {
            yakuList.push(McrYaku.ALL_CHOWS);
        }
        if (completePattern.knittedChowList.length === 3) {
            yakuList.push(McrYaku.KNITTED_STRAIGHT);
        }
        else {
            const chowList = completePattern.chowList;
            switch (chowList.length) {
            case 2:
                this._push(yakuList, this._twoChowsYaku(chowList));
                break;
            case 3:
                yakuList.push(...this._yakuListWithThreeChows(chowList));
                break;
            case 4:
                const head = completePattern.head;
                yakuList.push(...this._yakuListWithFourChows(chowList, head));
                break;
            }
        }
        return yakuList;
    }
    
    static _pungsOfTerminalsOrHonors(completePattern) {
        return completePattern.pungList.filter((p) => {
            return p.hasYao;
        }).fill(McrYaku.PUNG_OF_TERMINALS_OR_HONORS);
    }
    
    static _pungsYakuList(completePattern) {
        const yakuList = [];
        const pungList = completePattern.pungList;
        switch (pungList.length) {
        case 2:
            this._push(yakuList, this._twoPungsYaku(pungList));
            break;
        case 3:
            yakuList.push(...this._yakuListWithThreePungs(pungList));
            break;
        case 4:
            if (this._allEvenPungs(completePattern)) {
                yakuList.push(McrYaku.ALL_EVEN_PUNGS);
            }
            else {
                yakuList.push(McrYaku.ALL_PUNGS);
            }
            yakuList.push(...this._yakuListWithFourPungs(pungList));
            break;
        }
        yakuList.push(...this._pungsOfTerminalsOrHonors(completePattern));
        yakuList.push(...this._concealedPungsAndKongsYakuList(completePattern));
        return yakuList;
    }
    
    static _pureTerminalChows(fourChows, head) {
        const yakuList = this._twoMentsuYakuList(fourChows, 4);
        const expectedYakuList = [ McrYaku.PURE_DOUBLE_CHOW, McrYaku.TWO_TERMINAL_CHOWS,
                                   McrYaku.TWO_TERMINAL_CHOWS, McrYaku.PURE_DOUBLE_CHOW ];
        return expectedYakuList.every((y, i) => { return y === yakuList[i] }) &&
               head.five && fourChows[0].suit === head.suit;
    }
    
    static _push(yakuList, yaku) {
        if (yaku) {
            yakuList.push(yaku);
        }
    }
    
    static _removeExecludeYaku(yakuList, completeInfo) {
        let execludedYakuList = [...yakuList];
        yakuList.forEach((yaku) => {
            switch (yaku) {
            case McrYaku.ALL_TERMINALS:
                this._removeYaku(execludedYakuList, McrYaku.NO_HONORS);
            case McrYaku.BIG_FOUR_WINDS:
            case McrYaku.ALL_HONORS:
            case McrYaku.ALL_TERMINALS_AND_HONORS:
                execludedYakuList = execludedYakuList.filter((y) => {
                    return y !== McrYaku.ALL_PUNGS &&
                           y !== McrYaku.PUNG_OF_TERMINALS_OR_HONORS;
                });
                break;
            case McrYaku.BIG_THREE_DRAGONS:
            case McrYaku.LITTLE_FOUR_WINDS:
            case McrYaku.BIG_THREE_WINDS:
                this._removeYaku(execludedYakuList, McrYaku.PUNG_OF_TERMINALS_OR_HONORS);
            case McrYaku.LITTLE_THREE_DRAGONS:
            case McrYaku.TWO_DRAGON_PUNGS:
                this._removeYaku(execludedYakuList, McrYaku.PUNG_OF_TERMINALS_OR_HONORS);
            case McrYaku.DRAGON_PUNG:
                this._removeYaku(execludedYakuList, McrYaku.PUNG_OF_TERMINALS_OR_HONORS);
                break;
            case McrYaku.NINE_GATES:
                this._removeYaku(execludedYakuList, McrYaku.PUNG_OF_TERMINALS_OR_HONORS);
            case McrYaku.THIRTEEN_ORPHANS:
            case McrYaku.SEVEN_PAIRS:
            case McrYaku.GREATER_HONORS_AND_KNITTED_TILES:
            case McrYaku.LESSER_HONORS_AND_KNITTED_TILES:
                this._removeYaku(execludedYakuList, McrYaku.CONCEALED_HAND);
                break;
            case McrYaku.FOUR_KONGS:
                this._removeYaku(execludedYakuList, McrYaku.ALL_PUNGS);
            case McrYaku.MELDED_HAND:
                this._removeYaku(execludedYakuList, McrYaku.SINGLE_WAIT);
                break;
            case McrYaku.SEVEN_SHIFTED_PAIRS:
                this._removeYaku(execludedYakuList, McrYaku.FULL_FLUSH);
                this._removeYaku(execludedYakuList, McrYaku.CONCEALED_HAND);
                break;
            case McrYaku.FOUR_CONCEALED_PUNGS:
                this._removeYaku(execludedYakuList, McrYaku.CONCEALED_HAND);
            case McrYaku.FOUR_PURE_SHIFTED_PUNGS:
                this._removeYaku(execludedYakuList, McrYaku.ALL_PUNGS);
                break;
            case McrYaku.PURE_TERMINAL_CHOWS:
                this._removeYaku(execludedYakuList, McrYaku.FULL_FLUSH);
            case McrYaku.THREE_SUITED_TERMINAL_CHOWS:
                this._removeYaku(execludedYakuList, McrYaku.ALL_CHOWS);
                break;
            case McrYaku.QUADRUPLE_CHOW:
                execludedYakuList = execludedYakuList.filter((y) => {
                    return y !== McrYaku.TILE_HOG;
                });
                break;
            case McrYaku.ALL_EVEN_PUNGS:
            case McrYaku.MIDDLE_TILES:
            case McrYaku.ALL_FIVES:
                this._removeYaku(execludedYakuList, McrYaku.ALL_SIMPLES);
                break;
            case McrYaku.FULL_FLUSH:
            case McrYaku.UPPER_TILES:
            case McrYaku.LOWER_TILES:
            case McrYaku.UPPER_FOUR:
            case McrYaku.LOWER_FOUR:
            case McrYaku.ALL_CHOWS:
            case McrYaku.ALL_SIMPLES:
                this._removeYaku(execludedYakuList, McrYaku.NO_HONORS);
                break;
            case McrYaku.REVERSIBLE_TILES:
                this._removeYaku(execludedYakuList, McrYaku.ONE_VOIDED_SUIT);
                break;
            case McrYaku.ROBBING_THE_KONGS:
                this._removeYaku(execludedYakuList, McrYaku.LAST_TILE);
                break;
            case McrYaku.PREVALENT_WIND:
                if (completeInfo.prevalent &&
                    completeInfo.prevalent === completeInfo.seat) {
                    break;
                }
            case McrYaku.SEAT_WIND:
                if (yakuList.includes(McrYaku.LITTLE_FOUR_WINDS) ||
                    yakuList.includes(McrYaku.BIG_THREE_WINDS)) {
                    break;
                }
                this._removeYaku(execludedYakuList, McrYaku.PUNG_OF_TERMINALS_OR_HONORS);
                break;
            }
        });
        return this._removeExecludeYakuWithCombined(execludedYakuList, completeInfo);
    }
    
    static _removeExecludeYakuWithCombined(yakuList) {
        const execludedYakuList = [...yakuList];
        if (yakuList.includes(McrYaku.ALL_GREEN) && yakuList.includes(McrYaku.SEVEN_PAIRS)) {
            // TODO 削除対象は全てなのか、必ず重複する1つだけなのか調査
            this._removeYaku(execludedYakuList, McrYaku.TILE_HOG);
        }
        return execludedYakuList;
    }
    
    static _removePureDoubleChow(chowList) {
        return chowList.slice(0, -1).some((m1, i) => {
            return chowList.slice(i + 1).some((m2) => {
                if (YakuUtil.pureDoubleChow([m1, m2])) {
                    chowList.splice(i, 1);
                    return true;
                }
                return false;
            });
        });
    }
    
    static _removeWaitYaku(yakuList, knittedChowList, janpai) {
        if (yakuList.includes(McrYaku.ALL_CHOWS) && yakuList.includes(McrYaku.KNITTED_STRAIGHT) &&
            JanUtil.hasJanpai(MentsuUtil.janpaiList(knittedChowList), janpai)) {
            this._removeYaku(yakuList, McrYaku.EDGE_WAIT);
            this._removeYaku(yakuList, McrYaku.CLOSED_WAIT);
            this._removeYaku(yakuList, McrYaku.SINGLE_WAIT);
        }
    }
    
    static _removeYaku(yakuList, yaku) {
        const index = yakuList.indexOf(yaku);
        if (index >= 0) {
            yakuList.splice(index, 1);
        }
    }
    
    static _sevenPairsYaku(janpaiList) {
        if (YakuUtil.sevenShiftedPairs(janpaiList)) {
            return McrYaku.SEVEN_SHIFTED_PAIRS;
        }
        return McrYaku.SEVEN_PAIRS;
    }
    
    static _specialYakuList(yakuList, hand, janpai) {
        // 十三幺はyakuList()で判定
        if (YakuUtil.reversibleTiles(HandUtil.allJanpaiListWith(hand, janpai))) {
            yakuList.push(McrYaku.REVERSIBLE_TILES);
        }
        const count = YakuUtil.tileHogCount(hand, janpai);
        yakuList.push(...[...Array(count).keys()].fill(McrYaku.TILE_HOG));
        if (YakuUtil.chickenHand(yakuList)) {
            yakuList.push(McrYaku.CHICKEN_HAND);
        }
        // 花牌は未実装
    }
    
    static _terminalsOrHonorsYaku(janpaiList) {
        if (YakuUtil.allTerminals(janpaiList)) {
            return McrYaku.ALL_TERMINALS;
        }
        return YakuUtil.allTerminalsAndHonors(janpaiList) ? McrYaku.ALL_TERMINALS_AND_HONORS :
                                                            undefined;
    }
    
    static _threeChowsYaku(threeChows) {
        if (YakuUtil.pureTripleChow(threeChows)) {
            return McrYaku.PURE_TRIPLE_CHOW;
        }
        if (YakuUtil.pureStraight(threeChows)) {
            return McrYaku.PURE_STRAIGHT;
        }
        if (YakuUtil.pureShiftedChows(threeChows)) {
            return McrYaku.PURE_SHIFTED_CHOWS;
        }
        if (YakuUtil.mixedStraight(threeChows)) {
            return McrYaku.MIXED_STRAIGHT;
        }
        if (YakuUtil.mixedTripleChow(threeChows)) {
            return McrYaku.MIXED_TRIPLE_CHOW;
        }
        if (YakuUtil.mixedShiftedChows(threeChows)) {
            return McrYaku.MIXED_SHIFTED_CHOWS;
        }
        return undefined;
    }
    
    static _threeMentsuYakuListWithFourMentsu(fourMentsu, chow = true) {
        let yakuList = [];
        const threeMentsuCallBack = chow ? this._threeChowsYaku : this._threePungsYaku;
        fourMentsu.some((m, i) => {
            const execludedList = [...fourMentsu];
            execludedList.splice(i, 1);
            const threeMentsuYaku = threeMentsuCallBack(execludedList);
            if (threeMentsuYaku) {
                yakuList.push(threeMentsuYaku);
                execludedList.some((e) => {
                    const twoMentsu = [m, e];
                    MentsuUtil.sortMentsuList(twoMentsu);
                    const twoMentsuCallBack = chow ? this._twoChowsYaku : this._twoPungsYaku;
                    const yaku = twoMentsuCallBack(twoMentsu);
                    if (yaku) {
                        yakuList.push(yaku);
                        return true;
                    }
                    return false;
                });
                return true;
            }
            return false;
        });
        return yakuList;
    }
    
    static _threePungsYaku(threePungs) {
        if (YakuUtil.pureShiftedPungs(threePungs)) {
            return McrYaku.PURE_SHIFTED_PUNGS;
        }
        if (YakuUtil.triplePung(threePungs)) {
            return McrYaku.TRIPLE_PUNG;
        }
        if (YakuUtil.mixedShiftedPungs(threePungs)) {
            return McrYaku.MIXED_SHIFTED_PUNGS;
        }
        return undefined;
    }
    
    static _threeSuitedTerminalChows(fourChows, head) {
        const yakuList = this._twoMentsuYakuList(fourChows, 4);
        const expectedYakuList = [ McrYaku.TWO_TERMINAL_CHOWS, McrYaku.MIXED_DOUBLE_CHOW,
                                   McrYaku.MIXED_DOUBLE_CHOW, McrYaku.TWO_TERMINAL_CHOWS ];
        return expectedYakuList.every((y, i) => { return y === yakuList[i] }) &&
        head.five && fourChows[0].suit !== head.suit && fourChows[2].suit !== head.suit;
    }
    
    static _twoChowsYaku(twoChows) {
        if (YakuUtil.pureDoubleChow(twoChows)) {
            return McrYaku.PURE_DOUBLE_CHOW;
        }
        if (YakuUtil.mixedDoubleChow(twoChows)) {
            return McrYaku.MIXED_DOUBLE_CHOW;
        }
        if (YakuUtil.shortStraight(twoChows)) {
            return McrYaku.SHORT_STRAIGHT;
        }
        if (YakuUtil.twoTerminalChows(twoChows)) {
            return McrYaku.TWO_TERMINAL_CHOWS;
        }
        return undefined;
    }
    
    static _twoMentsuYakuList(mentsuList, max, chow = true) {
        const yakuList = [];
        const callBack = chow ? this._twoChowsYaku : this._twoPungsYaku;
        const execludedList = [...mentsuList];
        if (chow && this._removePureDoubleChow(execludedList)) {
            yakuList.push(McrYaku.PURE_DOUBLE_CHOW);
        }
        execludedList.slice(0, -1).some((m, i) => {
            return execludedList.slice(i + 1).some((e) => {
                this._push(yakuList, callBack([m, e]));
                if (yakuList.length === max) {
                    return true;
                }
                return false;
            });
        });
        return yakuList;
    }
    
    static _twoPungsYaku(twoPungs) {
        if (YakuUtil.doublePung(twoPungs)) {
            return McrYaku.DOUBLE_PUNG;
        }
        return undefined;
    }
    
    static _waitYaku(completePattern, janpai, completableList) {
        if (completableList.length !== 1) {
            return undefined;
        }
        if (YakuUtil.edgeWait(completePattern, janpai)) {
            return McrYaku.EDGE_WAIT;
        }
        if (YakuUtil.closedWait(completePattern, janpai)) {
            return McrYaku.CLOSED_WAIT;
        }
        return YakuUtil.singleWait(completePattern, janpai) ? McrYaku.SINGLE_WAIT :
                                                              undefined;
    }
    
    static _windsYakuList(completePattern, completeInfo) {
        const yakuList = [];
        switch (completePattern.windCount) {
        case 4:
            return [ McrYaku.BIG_FOUR_WINDS ];
        case 3:
            yakuList.push(completePattern.head.wind ? McrYaku.LITTLE_FOUR_WINDS :
                                                      McrYaku.BIG_THREE_WINDS);
            break;
        }
        completePattern.pungList.forEach((p) => {
            if (p.head.id === completeInfo.prevalent) {
                yakuList.push(McrYaku.PREVALENT_WIND);
            }
            if (p.head.id === completeInfo.seat) {
                yakuList.push(McrYaku.SEAT_WIND);
            }
        });
        return yakuList;
    }
    
    static _yakuListWithFourChows(fourChows, head) {
        if (this._pureTerminalChows(fourChows, head)) {
            return [ McrYaku.PURE_TERMINAL_CHOWS ];
        }
        if (YakuUtil.quadrupleChow(fourChows)) {
            return [ McrYaku.QUADRUPLE_CHOW ];
        }
        if (YakuUtil.fourShiftedChows(fourChows)) {
            return [ McrYaku.FOUR_SHIFTED_CHOWS ];
        }
        if (this._threeSuitedTerminalChows(fourChows, head)) {
            return [ McrYaku.THREE_SUITED_TERMINAL_CHOWS ];
        }
        const yakuList = this._threeMentsuYakuListWithFourMentsu(fourChows);
        if (yakuList.length > 0) {
            return yakuList;
        }
        return this._twoMentsuYakuList(fourChows, 3);
    }
    
    static _yakuListWithFourPungs(fourPungs) {
        if (YakuUtil.fourPureShiftedPungs(fourPungs)) {
            return [ McrYaku.FOUR_PURE_SHIFTED_PUNGS ];
        }
        const yakuList = this._threeMentsuYakuListWithFourMentsu(fourPungs, false);
        if (yakuList.length > 0) {
            return yakuList;
        }
        return this._twoMentsuYakuList(fourPungs, 2, false);
    }
    
    static _yakuListWithThreeChows(threeChows) {
        const yaku = this._threeChowsYaku(threeChows);
        if (yaku) {
            return [ yaku ];
        }
        return this._twoMentsuYakuList(threeChows, 2);
    }
    
    static _yakuListWithThreePungs(threePungs) {
        const yaku = this._threePungsYaku(threePungs);
        if (yaku) {
            return [ yaku ];
        }
        return this._twoMentsuYakuList(threePungs, 1, false);
    }
    
}

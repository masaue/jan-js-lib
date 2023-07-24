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
import {allJanpaiListWith} from './hand-util';
import {Janpai} from './janpai';
import {JANPAI_ID} from './janpai-id';
import * as JanUtil from './jan-util';
import {KNITTED_STRAIGHT, KnittedTypes} from './knitted-straight';
import * as MentsuUtil from './mentsu-util';
import {SUIT} from './suit';
import {ZJM_YAKU} from './zjm-yaku';
import {CompletePattern} from './complete-pattern';
import {McrYaku} from './mcr-yaku';
import {Hand} from './hand';
import {CompleteInfo} from './complete-info';
import {Mentsu} from './mentsu';

export function allFives(completePattern: CompletePattern) {
  return completePattern.head.five &&
          completePattern.mentsuList.every((m) => { return m.five });
}

export function allGreen(janpaiList: Janpai[]) {
  const greenList = [
    new Janpai(JANPAI_ID.SOU_02), new Janpai(JANPAI_ID.SOU_03),
    new Janpai(JANPAI_ID.SOU_04), new Janpai(JANPAI_ID.SOU_06),
    new Janpai(JANPAI_ID.SOU_08), new Janpai(JANPAI_ID.FA),
  ];
  return JanUtil.uniqueList(janpaiList).every((j) => {
    return JanUtil.hasJanpai(greenList, j);
  });
}

export function allHonors(janpaiList: Janpai[]) {
  return janpaiList.every((j) => { return j.ji });
}

export function allSimples(janpaiList: Janpai[]) {
  return !janpaiList.some((j) => { return j.yao });
}

export function allTerminals(janpaiList: Janpai[]) {
  return janpaiList.every((j) => { return j.yao && !j.ji });
}

export function allTerminalsAndHonors(janpaiList: Janpai[]) {
  return janpaiList.every((j) => { return j.yao }) &&
          !allHonors(janpaiList) &&
          !allTerminals(janpaiList);
}

export function allTypes(janpaiList: Janpai[]) {
  return JanUtil.suitCount(janpaiList) === 4 &&
          janpaiList.some((j) => { return j.wind }) &&
          janpaiList.some((j) => { return j.dragon });
}

export function chickenHand(yakuList: McrYaku[]) {
  return yakuList.length === 0;
}

export function closedWait(completePattern: CompletePattern, janpai: Janpai) {
  return completePattern.chowList.some((c) => {
    return c.middle.number === janpai.number && c.concealedChow;
  });
}

export function concealedHand(hand: Hand, completeInfo: CompleteInfo) {
  return hand.callCount === 0 && !completeInfo.type.tsumo;
}

export function doublePung(doublePung: Mentsu[]) {
  return mixedTripleChow(doublePung);
}

export function edgeWait(completePattern: CompletePattern, janpai: Janpai) {
  return completePattern.chowList.some((c) => {
    return (c.head.number === 1 && c.head.next.next.equals(janpai) ||
            c.head.number === 7 && c.head.equals(janpai)) && c.concealedChow;
  });
}

export function fourPureShiftedPungs(fourPungs: Mentsu[]) {
  return fullFlush(MentsuUtil.toJanpaiList(fourPungs)) &&
          MentsuUtil.shifted(fourPungs, 4, 1);
}

export function fourShiftedChows(fourChows: Mentsu[]) {
  return fullFlush(MentsuUtil.toJanpaiList(fourChows)) &&
          MentsuUtil.shifted(fourChows, 4, 2);
}

export function fullFlush(janpaiList: Janpai[]) {
  return JanUtil.suitCount(janpaiList) === 1 && !janpaiList[0].ji
}

export function fullyConcealed(hand: Hand, completeInfo: CompleteInfo) {
  return hand.callCount === 0 && completeInfo.type.tsumo;
}
// honorsAndKnittedTiles()がtrueなjanpaiListのみ保証する
export function greaterHonorsAndKnittedTiles(janpaiList: Janpai[]) {
  // janpaiListがuniqueであることはhonorsAndKnittedTiles()で判定済み
  return janpaiList.filter((j) => { return j.ji }).length === 7;
}

export function halfFlush(janpaiList: Janpai[]) {
  return JanUtil.suitCount(janpaiList) === 2 &&
          JanUtil.hasSuit(janpaiList, SUIT.JI);
}

export function honorsAndKnittedTiles(janpaiList: Janpai[]) {
  if (janpaiList.length !== JanUtil.uniqueList(janpaiList).length) {
    return false;
  }
  const numberTileList = janpaiList.filter((j) => { return !j.ji });
  switch (numberTileList.length) {
  case 7:
    return !!_knittedStraight(numberTileList, _knittedStraight);
  case 8:
    return !!_knittedStraight(numberTileList);
  case 9:
    return !!knittedStraight(numberTileList);
  }
  return false;
}

export function incidentalBonusesYakuList(completeInfo: CompleteInfo) {
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

export function knittedStraight(janpaiList: Janpai[]) {
  const knittedTypes = Object.keys(KNITTED_STRAIGHT) as KnittedTypes;
  return knittedTypes.find((k) => {
    return KNITTED_STRAIGHT[k].every((j) => {
      return JanUtil.hasJanpai(janpaiList, j);
    });
  });
}

export function lastTile(completeInfo: CompleteInfo) {
  return completeInfo.last;
}

export function lowerFour(janpaiList: Janpai[]) {
  return _minToMax(janpaiList, 1, 4);
}

export function lowerTiles(janpaiList: Janpai[]) {
  return _minToMax(janpaiList, 1, 3);
}

export function meldedHand(hand: Hand, completeInfo: CompleteInfo) {
  return hand.callCount === 4 && !completeInfo.type.tsumo;
}

export function middleTiles(janpaiList: Janpai[]) {
  return _minToMax(janpaiList, 4, 6);
}

export function mixedDoubleChow(doubleChow: Mentsu[]) {
  return mixedTripleChow(doubleChow);
}

export function mixedShiftedChows(threeChows: Mentsu[]) {
  return MentsuUtil.mixed(threeChows) && MentsuUtil.shifted(threeChows, 3, 1);
}

export function mixedShiftedPungs(threePungs: Mentsu[]) {
  return mixedShiftedChows(threePungs);
}

export function mixedStraight(threeChows: Mentsu[]) {
  return MentsuUtil.mixed(threeChows) && MentsuUtil.straight(threeChows);
}

export function mixedTripleChow(tripleChow: Mentsu[]) {
  return MentsuUtil.mixed(tripleChow) && MentsuUtil.multiplicative(tripleChow);
}

export function nineGates(janpaiList: Janpai[]) {
  const numberList = JanUtil.numbers(janpaiList);
  return [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9].every((n, i) => {
            return n === numberList[i];
          }) && fullFlush(janpaiList);
}

export function noHonors(janpaiList: Janpai[]) {
  return janpaiList.every((j) => { return !j.ji });
}

export function oneVoidedSuit(janpaiList: Janpai[]) {
  return JanUtil.suitCount(janpaiList.filter((j) => { return !j.ji })) === 2;
}

export function pureDoubleChow(doubleChow: Mentsu[]) {
  return doubleChow[0].head.equals(doubleChow[1].head);
}

export function pureShiftedChows(threeChows: Mentsu[]) {
  return fullFlush(MentsuUtil.toJanpaiList(threeChows)) &&
          MentsuUtil.shifted(threeChows, 3, 2);
}

export function pureShiftedPungs(threePungs: Mentsu[]) {
  return fullFlush(MentsuUtil.toJanpaiList(threePungs)) &&
          MentsuUtil.shifted(threePungs, 3, 1);
}

export function pureStraight(threeChows: Mentsu[]) {
  return fullFlush(MentsuUtil.toJanpaiList(threeChows)) &&
          MentsuUtil.straight(threeChows);
}

export function pureTripleChow(tripleChow: Mentsu[]) {
  return tripleChow[0].head.equals(tripleChow[1].head) &&
          tripleChow[1].head.equals(tripleChow[2].head);
}

export function quadrupleChow(quadrupleChow: Mentsu[]) {
  return quadrupleChow[0].head.equals(quadrupleChow[1].head) &&
          quadrupleChow[1].head.equals(quadrupleChow[2].head) &&
          quadrupleChow[2].head.equals(quadrupleChow[3].head);
}

export function reversibleTiles(janpaiList: Janpai[]) {
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

export function selfDrawn(hand: Hand, completeInfo: CompleteInfo) {
  return hand.callCount !== 0 && completeInfo.type === COMPLETE_TYPE.DRAW;
}

export function sevenPairs(janpaiList: Janpai[]) {
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
export function sevenShiftedPairs(janpaiList: Janpai[]) {
  if (janpaiList[0].number > 3) {
    return false;
  }
  const uniqueList = JanUtil.uniqueList(janpaiList);
  return uniqueList.slice(0, -1).every((j, i) => {
    return j.next.equals(uniqueList[i + 1]);
  }) && uniqueList.length === 7;
}

export function shortStraight(twoChows: Mentsu[]) {
  return fullFlush(MentsuUtil.toJanpaiList(twoChows)) &&
          MentsuUtil.shortStraight(twoChows);
}

export function singleWait(completePattern: CompletePattern, janpai: Janpai) {
  return completePattern.head.equals(janpai);
}

export function terminalsYaku(completePattern: CompletePattern) {
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

export function thirteenOrphans(janpaiList: Janpai[]) {
  const uniqueList = JanUtil.uniqueList(janpaiList);
  return uniqueList.length === 13 && uniqueList.every((u) => {
    return u.yao;
  });
}

export function tileHogCount(hand: Hand, janpai: Janpai) {
  const janpaiList = allJanpaiListWith(hand, janpai);
  return JanUtil.uniqueList(janpaiList).filter((u) => {
    return JanUtil.count(janpaiList, u) === 4 &&
            !hand.fixedList.some((f) => { return f.head.equals(u) && f.kong });
  }).length;
}

export function triplePung(triplePung: Mentsu[]) {
  return mixedTripleChow(triplePung);
}

export function twoIdenticalSequencesTwice(quadrupleChow: Mentsu[]) {
  const headList = quadrupleChow.map((m) => { return m.head });
  return JanUtil.uniqueList(headList).every((u) => {
    return headList.filter((h) => { return h.equals(u) }).length === 2;
  });
}

export function twoTerminalChows(twoChows: Mentsu[]) {
  return fullFlush(MentsuUtil.toJanpaiList(twoChows)) &&
          MentsuUtil.terminalChows(twoChows);
}

export function upperFour(janpaiList: Janpai[]) {
  return _minToMax(janpaiList, 6);
}

export function upperTiles(janpaiList: Janpai[]) {
  return _minToMax(janpaiList, 7);
}

function _knittedStraight(janpaiList: Janpai[], callback = knittedStraight) {
  const knittedTypes = Object.keys(KNITTED_STRAIGHT) as KnittedTypes;
  return knittedTypes.find((_) => {
    return JanUtil.getAllJanpai().some((j) => {
      if (j.ji || JanUtil.hasJanpai(janpaiList, j)) {
        return false;
      }
      return callback(JanUtil.janpaiListWith(janpaiList, j));
    });
  });
}

function _minToMax(janpaiList: Janpai[], min: number, max: number | undefined = undefined) {
  const numberList = JanUtil.numbers(janpaiList);
  return max ? numberList.every((n) => { return min <= n && n <= max }) :
                numberList.every((n) => { return n >= min });
}

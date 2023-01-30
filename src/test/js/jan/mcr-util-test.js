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
import assert from 'assert';

import CompleteInfo from '../../../main/js/jan/complete-info';
import CompletePattern from '../../../main/js/jan/complete-pattern';
import {COMPLETE_TYPE} from '../../../main/js/jan/complete-type';
import Hand from '../../../main/js/jan/hand';
import Janpai from '../../../main/js/jan/janpai';
import JanpaiID from '../../../main/js/jan/janpai-id';
import McrUtil from '../../../main/js/jan/mcr-util';
import McrYaku from '../../../main/js/jan/mcr-yaku';
import Mentsu from '../../../main/js/jan/mentsu';
import {WIND} from '../../../main/js/jan/wind';

describe('McrUtilTest', () => {
    
    describe('yakuList()', () => {
        
        it('is greater honors and knitted tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_08),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.SHA),
                new Janpai(JanpaiID.PEI),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.FA),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.CHUN));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.GREATER_HONORS_AND_KNITTED_TILES ]);
        });
        
        it('is thirteen Orphans and robbing the kong.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.SOU_09),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.SHA),
                new Janpai(JanpaiID.PEI),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.FA),
                new Janpai(JanpaiID.CHUN),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.CHUN),
                false, undefined, undefined, COMPLETE_TYPE.ROBBING_A_KONG );
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.THIRTEEN_ORPHANS, McrYaku.ROBBING_THE_KONG ]);
        });
        
        it('is seven shifted pairs.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_07));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.SEVEN_SHIFTED_PAIRS ]);
        });
        
        it('is big three dragons and all honors.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.NAN),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.FA)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.BIG_THREE_DRAGONS, McrYaku.ALL_HONORS ]);
        });
        
        it('is dragon pungs, mixed double chow, and two_concealed_pungs.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.CHUN),
                new Janpai(JanpaiID.CHUN),
                new Janpai(JanpaiID.CHUN),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.DRAGON_PUNG, McrYaku.MIXED_DOUBLE_CHOW, McrYaku.TWO_CONCEALED_PUNGS ]);
        });
        
        it('is nine gates.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.PURE_STRAIGHT, McrYaku.NINE_GATES, McrYaku.TILE_HOG ]);
        });
        
        it('is closed wait and middle tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_06),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_06)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_04)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_05));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.MIXED_SHIFTED_PUNGS, McrYaku.CLOSED_WAIT,
                  McrYaku.MIDDLE_TILES, McrYaku.TILE_HOG ]);
        });
        
        it('is chicken hand.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_08)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.SOU_06));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.CHICKEN_HAND ]);
        });
        
        it('is big four winds and half flush.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.SHA)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.PEI)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.BIG_FOUR_WINDS, McrYaku.HALF_FLUSH ]);
        });
        
        it('is big three dragons and one voided suit.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_02),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.FA)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.BIG_THREE_DRAGONS, McrYaku.ONE_VOIDED_SUIT ]);
        });
        
        it('is four kong and concealed kong.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_02), true));
            hand.fix(Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_03)));
            hand.fix(Mentsu.createKongMentsu(new Janpai(JanpaiID.PIN_05)));
            hand.fix(Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_07)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.FOUR_KONGS, McrYaku.CONCEALED_KONG ]);
        });
        
        it('is triple pung and all terminals.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.SOU_01),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_09)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.SOU_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.TRIPLE_PUNG, McrYaku.ALL_TERMINALS ]);
        });
        
        it('is little four winds, prevalent wind, seat wind and half flush.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.SHA)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.PEI)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_02), false, WIND.NAN, WIND.SHA);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.LITTLE_FOUR_WINDS, McrYaku.PREVALENT_WIND,
                  McrYaku.SEAT_WIND, McrYaku.HALF_FLUSH ]);
        });
        
        it('is little three dragons and one voided suit.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.BAI),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.FA)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.LITTLE_THREE_DRAGONS, McrYaku.ONE_VOIDED_SUIT ]);
        });
        
        it('is four concealed pungs and single wait.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.CHUN),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.CHUN));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.FOUR_CONCEALED_PUNGS, McrYaku.SINGLE_WAIT ]);
        });
        
        it('is pure terminal chows and concealed hand.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_09),
                new Janpai(JanpaiID.SOU_09),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.SOU_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.PURE_TERMINAL_CHOWS, McrYaku.CONCEALED_HAND ]);
        });
        
        it('is quadruple chow, half flush and concealed hand.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.SOU_02));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.QUADRUPLE_CHOW, McrYaku.HALF_FLUSH, McrYaku.CONCEALED_HAND ]);
        });
        
        it('is four pure shifted pungs and half flush.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_04)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_05));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.FOUR_PURE_SHIFTED_PUNGS, McrYaku.HALF_FLUSH ]);
        });
        
        it('is all terminals and honors and one voided suit.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.FA),
                new Janpai(JanpaiID.FA),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_09)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.NAN));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.ALL_TERMINALS_AND_HONORS, McrYaku.ONE_VOIDED_SUIT ]);
        });
        
        it('is all even pungs.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_04)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_06)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.SOU_08));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.ALL_EVEN_PUNGS ]);
        });
        
        it('is three suited terminal chows.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_05),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.THREE_SUITED_TERMINAL_CHOWS ]);
        });
        
        it('is all fives.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_05),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_05)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_05));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.ALL_FIVES ]);
        });
        
        it('is lesser honors and knitted tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.SHA),
                new Janpai(JanpaiID.PEI),
                new Janpai(JanpaiID.BAI),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.FA));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.LESSER_HONORS_AND_KNITTED_TILES ]);
        });
        
        it('is big three winds and others.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_05),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.SHA)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01), false, WIND.TON, WIND.NAN);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.BIG_THREE_WINDS, McrYaku.PREVALENT_WIND, McrYaku.SEAT_WIND,
                  McrYaku.ALL_PUNGS, McrYaku.PUNG_OF_TERMINALS_OR_HONORS, McrYaku.ONE_VOIDED_SUIT ]);
        });
        
        it('is reversible tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.BAI),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_03)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_05)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.SOU_08));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.REVERSIBLE_TILES ]);
        });
        
        it('is robbing the kong.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.BAI),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_03)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_05)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_09),
                true, undefined, undefined, COMPLETE_TYPE.ROBBING_A_KONG);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.ROBBING_THE_KONG ]);
        });
        
        it('is melded hand.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_08),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_06)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_05)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.SOU_08));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.ALL_SIMPLES, McrYaku.MELDED_HAND ]);
        });
        
        it('is two dragon pungs and others.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.NAN),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.FA)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.NAN), false, WIND.TON, WIND.NAN);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.SEAT_WIND, McrYaku.PREVALENT_WIND,
                  McrYaku.TWO_DRAGON_PUNGS, McrYaku.ALL_PUNGS, McrYaku.HALF_FLUSH ]);
        });
        
        it('is prevalent wind and seat wind.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_04),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_04), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.PREVALENT_WIND, McrYaku.SEAT_WIND,
                  McrYaku.PUNG_OF_TERMINALS_OR_HONORS ]);
        });
        
        it('is all chows, knitted straight and single wait.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_08),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_03)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_08), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.ALL_CHOWS, McrYaku.KNITTED_STRAIGHT, McrYaku.SINGLE_WAIT ]);
        });
        
        it('does not have closed wait, with all chows and knitted straight.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_09),
                new Janpai(JanpaiID.SOU_09),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.SOU_05), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.ALL_CHOWS, McrYaku.KNITTED_STRAIGHT, McrYaku.CONCEALED_HAND ]);
        });
        
        it('does not have edge wait, with all chows and knitted straight.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_09),
                new Janpai(JanpaiID.SOU_09),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_03), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.ALL_CHOWS, McrYaku.KNITTED_STRAIGHT, McrYaku.CONCEALED_HAND ]);
        });
        
        it('does not have single wait, with all chows and knitted straight.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_08),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_09), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.ALL_CHOWS, McrYaku.KNITTED_STRAIGHT, McrYaku.CONCEALED_HAND ]);
        });
        
        it('is seven pairs, all green and tile hog.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.FA),
                new Janpai(JanpaiID.FA),
                new Janpai(JanpaiID.FA),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.FA), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.SEVEN_PAIRS, McrYaku.ALL_GREEN, McrYaku.HALF_FLUSH, McrYaku.TILE_HOG ]);
        });
        
        it('does not have tile hog, with seven pairs and all green.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.FA),
                new Janpai(JanpaiID.FA),
                new Janpai(JanpaiID.FA),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.FA), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ McrYaku.SEVEN_PAIRS, McrYaku.ALL_GREEN, McrYaku.HALF_FLUSH ]);
        });
        
    });
    
    
    
    describe('_allInvolvedYaku()', () => {
        
        it('is outside hand(mixed lesser terminals).', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(McrUtil._allInvolvedYaku(completePattern),
                         McrYaku.OUTSIDE_HAND);
        });
        
        it('is outside hand(pure lesser terminals).', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_09)),
            ], new Janpai(JanpaiID.SOU_01));
            assert.equal(McrUtil._allInvolvedYaku(completePattern),
                         McrYaku.OUTSIDE_HAND);
        });
        
        it('is all fives.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_05)),
            ], new Janpai(JanpaiID.PIN_05));
            assert.equal(McrUtil._allInvolvedYaku(completePattern),
                         McrYaku.ALL_FIVES);
        });
        
    });
    
    describe('_allEvenPungs()', () => {
        
        it('is all even pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_06)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_08)),
            ], new Janpai(JanpaiID.MAN_08));
            assert(McrUtil._allEvenPungs(completePattern));
        });
        
        it('is not all even pungs, because of odd pung.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_06)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.MAN_08));
            assert(!McrUtil._allEvenPungs(completePattern));
        });
        
        it('is not all even pungs, because of odd head.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_06)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_08)),
            ], new Janpai(JanpaiID.MAN_07));
            assert(!McrUtil._allEvenPungs(completePattern));
        });
        
    });
    
    describe('_beingWholeYakuList()', () => {
        
        it('is final draw and win on kong.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON),
                false, undefined, undefined, COMPLETE_TYPE.FINAL_DRAW_AND_WIN_ON_KONG);
            assert.deepStrictEqual(McrUtil._beingWholeYakuList(hand, completeInfo),
                [ McrYaku.LAST_TILE_DRAW, McrYaku.OUT_WITH_REPLACEMENT_TILE ]);
        });
        
        it('is final discard and melded hand.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON),
                false, undefined, undefined, COMPLETE_TYPE.FINAL_DISCARD);
            assert.deepStrictEqual(McrUtil._beingWholeYakuList(hand, completeInfo),
                [ McrYaku.LAST_TILE_CLAIM, McrYaku.MELDED_HAND ]);
        });
        
        it('is robbing the kongs and last tile.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01),
                true, undefined, undefined, COMPLETE_TYPE.ROBBING_A_KONG);
            assert.deepStrictEqual(McrUtil._beingWholeYakuList(hand, completeInfo),
                [ McrYaku.ROBBING_THE_KONG, McrYaku.LAST_TILE ]);
        });
        
        it('is fully concealed hand.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON),
                false, undefined, undefined, COMPLETE_TYPE.DRAW);
            assert.deepStrictEqual(McrUtil._beingWholeYakuList(hand, completeInfo),
                [ McrYaku.FULLY_CONCEALED_HAND ]);
        });
        
        it('is concealed hand.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON));
            assert.deepStrictEqual(McrUtil._beingWholeYakuList(hand, completeInfo),
                [ McrYaku.CONCEALED_HAND ]);
        });
        
        it('is self drawn.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON),
                false, undefined, undefined, COMPLETE_TYPE.DRAW);
            assert.deepStrictEqual(McrUtil._beingWholeYakuList(hand, completeInfo),
                [ McrYaku.SELF_DRAWN ]);
        });
        
    });
    
    describe('_brokenYakuList()', () => {
        
        it('is greater honors and knitted tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_08),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.SHA),
                new Janpai(JanpaiID.PEI),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.FA),
                new Janpai(JanpaiID.CHUN),
            ];
            assert.deepStrictEqual(McrUtil._brokenYakuList(janpaiList),
                [ McrYaku.GREATER_HONORS_AND_KNITTED_TILES ]);
        });
        
        it('is lesser honors and knitted tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_08),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.SHA),
                new Janpai(JanpaiID.PEI),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.FA),
            ];
            assert.deepStrictEqual(McrUtil._brokenYakuList(janpaiList),
                [ McrYaku.LESSER_HONORS_AND_KNITTED_TILES ]);
        });
        
        it('is lesser honors and knitted tiles, and knitted straight.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_08),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_09),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.SHA),
                new Janpai(JanpaiID.PEI),
                new Janpai(JanpaiID.BAI),
            ];
            assert.deepStrictEqual(McrUtil._brokenYakuList(janpaiList),
                [ McrYaku.LESSER_HONORS_AND_KNITTED_TILES, McrYaku.KNITTED_STRAIGHT ]);
        });
        
    });
    // ちゅんま手引きver2_03.pdfのP.26に準拠
    describe('_concealedPungsAndKongsYakuList()', () => {
        
        it('is two concealed pungs and melded kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.TWO_CONCEALED_PUNGS, McrYaku.MELDED_KONG ]);
        });
        
        it('is three concealed pungs and melded kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.THREE_CONCEALED_PUNGS, McrYaku.MELDED_KONG ]);
        });
        
        it('is two concealed pungs and concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.TWO_CONCEALED_PUNGS, McrYaku.CONCEALED_KONG ]);
        });
        
        it('is three concealed pungs and concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.THREE_CONCEALED_PUNGS, McrYaku.CONCEALED_KONG ]);
        });
        
        it('is four concealed pungs and concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.FOUR_CONCEALED_PUNGS, McrYaku.CONCEALED_KONG ]);
        });
        
        it('is two concealed pungs and two melded kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.TWO_CONCEALED_PUNGS, McrYaku.TWO_MELDED_KONGS ]);
        });
        
        it('is two concealed pungs, two melded kongs and concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.TWO_CONCEALED_PUNGS, McrYaku.TWO_MELDED_KONGS, McrYaku.CONCEALED_KONG ]);
        });
        
        it('is three concealed pungs, two melded kongs and concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.THREE_CONCEALED_PUNGS, McrYaku.TWO_MELDED_KONGS, McrYaku.CONCEALED_KONG ]);
        });
        
        it('is three concealed pungs and two concealed kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.THREE_CONCEALED_PUNGS, McrYaku.TWO_CONCEALED_KONGS ]);
        });
        
        it('is four concealed pungs and two concealed kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.FOUR_CONCEALED_PUNGS, McrYaku.TWO_CONCEALED_KONGS ]);
        });
        
        it('is two concealed pungs and three kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.TWO_CONCEALED_PUNGS, McrYaku.THREE_KONGS ]);
        });
        
        it('is two concealed pungs and three kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.TWO_CONCEALED_PUNGS, McrYaku.THREE_KONGS ]);
        });
        
        it('is three concealed pungs and three kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.THREE_CONCEALED_PUNGS, McrYaku.THREE_KONGS ]);
        });
        
        it('is three concealed pungs and three kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.THREE_CONCEALED_PUNGS, McrYaku.THREE_KONGS ]);
        });
        
        it('is four concealed pungs and three kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.FOUR_CONCEALED_PUNGS, McrYaku.THREE_KONGS ]);
        });
        
        it('is two concealed pungs and four kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.TWO_CONCEALED_PUNGS, McrYaku.FOUR_KONGS ]);
        });
        
        it('is three concealed pungs and four kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.THREE_CONCEALED_PUNGS, McrYaku.FOUR_KONGS ]);
        });
        
        it('is four concealed pungs and four kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ McrYaku.FOUR_CONCEALED_PUNGS, McrYaku.FOUR_KONGS ]);
        });
        
    });
    
    describe('_concealedPungsYaku()', () => {
        
        it('is four concealed pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(McrUtil._concealedPungsYaku(completePattern), McrYaku.FOUR_CONCEALED_PUNGS);
        });
        
        it('is three concealed pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(McrUtil._concealedPungsYaku(completePattern), McrYaku.THREE_CONCEALED_PUNGS);
        });
        
        it('is two concealed pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(McrUtil._concealedPungsYaku(completePattern), McrYaku.TWO_CONCEALED_PUNGS);
        });
        
        it('is not concealed pungs yaku.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(McrUtil._concealedPungsYaku(completePattern), undefined);
        });
        
    });
    
    describe('_dragonsYaku()', () => {
        
        it('is big three dragons.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(McrUtil._dragonsYaku(completePattern), McrYaku.BIG_THREE_DRAGONS);
        });
        
        it('is little three dragons.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_09)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA)),
            ], new Janpai(JanpaiID.CHUN));
            assert.equal(McrUtil._dragonsYaku(completePattern), McrYaku.LITTLE_THREE_DRAGONS);
        });
        
        it('is two dragon pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_09)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(McrUtil._dragonsYaku(completePattern), McrYaku.TWO_DRAGON_PUNGS);
        });
        
        it('is dragon pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI)),
            ], new Janpai(JanpaiID.FA));
            assert.equal(McrUtil._dragonsYaku(completePattern), McrYaku.DRAGON_PUNG);
        });
        
        it('is not dragons yaku.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_09)),
            ], new Janpai(JanpaiID.CHUN));
            assert.equal(McrUtil._dragonsYaku(completePattern), undefined);
        });
        
    });
    
    describe('_fullChowsYakuList()', () => {
        
        it('is nine gates.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
            ];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JanpaiID.MAN_01);
            assert.deepStrictEqual(McrUtil._fullChowsYakuList(hand, janpai),
                [ McrYaku.NINE_GATES ]);
        });
        
        it('is all green and half flush', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.FA),
                new Janpai(JanpaiID.FA),
            ];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JanpaiID.FA);
            assert.deepStrictEqual(McrUtil._fullChowsYakuList(hand, janpai),
                [ McrYaku.ALL_GREEN, McrYaku.HALF_FLUSH ]);
        });
        
        it('is full flush.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
            ];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JanpaiID.MAN_03);
            assert.deepStrictEqual(McrUtil._fullChowsYakuList(hand, janpai),
                [ McrYaku.FULL_FLUSH, McrYaku.NO_HONORS ]);
        });
        
        it('is all types.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.CHUN),
                new Janpai(JanpaiID.CHUN),
            ];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JanpaiID.CHUN);
            assert.deepStrictEqual(McrUtil._fullChowsYakuList(hand, janpai),
                [ McrYaku.ALL_TYPES ]);
        });
        
        it('is one voided suit and no honors.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.PIN_09),
            ];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JanpaiID.PIN_08);
            assert.deepStrictEqual(McrUtil._fullChowsYakuList(hand, janpai),
                [ McrYaku.ONE_VOIDED_SUIT, McrYaku.NO_HONORS ]);
        });
        
    });
    
    describe('_honorTilesYakuList()', () => {
        
        it('is big three dragons.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.FA)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN)),
            ], new Janpai(JanpaiID.SOU_09));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.CHUN));
            assert.deepStrictEqual(McrUtil._honorTilesYakuList(completePattern, completeInfo),
                [ McrYaku.BIG_THREE_DRAGONS ]);
        });
        
        it('is big four winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SHA)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PEI)),
            ], new Janpai(JanpaiID.MAN_01));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.CHUN));
            assert.deepStrictEqual(McrUtil._honorTilesYakuList(completePattern, completeInfo),
                [ McrYaku.BIG_FOUR_WINDS ]);
        });
        
        it('is not honor tiles yaku.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_09)),
            ], new Janpai(JanpaiID.TON));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.CHUN));
            assert.deepStrictEqual(McrUtil._honorTilesYakuList(completePattern, completeInfo), []);
        });
        
    });
    
    describe('_kongsYakuList()', () => {
        
        it('is four kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ McrYaku.FOUR_KONGS ]);
        });
        
        it('is three kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ McrYaku.THREE_KONGS ]);
        });
        
        it('is two concealed kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ McrYaku.TWO_CONCEALED_KONGS ]);
        });
        
        it('is two melded kongs and concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ McrYaku.TWO_MELDED_KONGS, McrYaku.CONCEALED_KONG ]);
        });
        
        it('is two melded kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ McrYaku.TWO_MELDED_KONGS ]);
        });
        
        it('is concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ McrYaku.CONCEALED_KONG ]);
        });
        
        it('is melded kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ McrYaku.MELDED_KONG ]);
        });
        
        it('is not kongs yaku.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern), []);
        });
        
    });
    
    describe('_limitedNumbersYakuList()', () => {
        
        it('is upper tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_09),
                new Janpai(JanpaiID.SOU_09),
            ];
            assert.deepStrictEqual(McrUtil._limitedNumberYakuList(janpaiList),
                [ McrYaku.UPPER_TILES ]);
        });
        
        it('is middle tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_06),
            ];
            assert.deepStrictEqual(McrUtil._limitedNumberYakuList(janpaiList),
                [ McrYaku.MIDDLE_TILES, McrYaku.ALL_SIMPLES ]);
        });
        
        it('is lower tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_03),
            ];
            assert.deepStrictEqual(McrUtil._limitedNumberYakuList(janpaiList),
                [ McrYaku.LOWER_TILES ]);
        });
        
        it('is upper four and all simples.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
            ];
            assert.deepStrictEqual(McrUtil._limitedNumberYakuList(janpaiList),
                [ McrYaku.UPPER_FOUR, McrYaku.ALL_SIMPLES ]);
        });
        
        it('is lower four.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_03),
            ];
            assert.deepStrictEqual(McrUtil._limitedNumberYakuList(janpaiList),
                [ McrYaku.LOWER_FOUR ]);
        });
        
    });
    
    describe('_mentsuYakuList()', () => {
        
        it('is dragon pungs, mixed double chow, and two_concealed_pungs.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.CHUN),
                new Janpai(JanpaiID.CHUN),
                new Janpai(JanpaiID.CHUN),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01));
            assert.deepStrictEqual(McrUtil._mentsuYakuList(hand, completeInfo),
                [ McrYaku.DRAGON_PUNG, McrYaku.MIXED_DOUBLE_CHOW,
                  McrYaku.PUNG_OF_TERMINALS_OR_HONORS, McrYaku.TWO_CONCEALED_PUNGS ]);
        });
        
        it('is quadruple chow.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01));
            assert.deepStrictEqual(McrUtil._mentsuYakuList(hand, completeInfo),
                [ McrYaku.QUADRUPLE_CHOW, McrYaku.OUTSIDE_HAND ]);
        });
        
    });
    
    describe('_numberTilesYakuList()', () => {
        
        it('is pure double chow.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_08));
            assert.deepStrictEqual(McrUtil._numberTilesYakuList(completePattern),
                [ McrYaku.PURE_DOUBLE_CHOW ]);
        });
        
        it('is pure triple chow.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.CHUN), true),
            ], new Janpai(JanpaiID.SOU_08));
            assert.deepStrictEqual(McrUtil._numberTilesYakuList(completePattern),
                [ McrYaku.PURE_TRIPLE_CHOW ]);
        });
        
        it('is quadruple chow.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ], new Janpai(JanpaiID.TON));
            assert.deepStrictEqual(McrUtil._numberTilesYakuList(completePattern),
                [ McrYaku.QUADRUPLE_CHOW ]);
        });
        
        it('is all chows.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_06)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._numberTilesYakuList(completePattern),
                [ McrYaku.ALL_CHOWS ]);
        });
        
    });
    
    describe('_pungsOfTerminalsOrHonors()', () => {
        
        it('is pungs of terminals or honors.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_09)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_04)),
            ], new Janpai(JanpaiID.TON));
            assert.deepStrictEqual(McrUtil._pungsOfTerminalsOrHonors(completePattern),
                [ McrYaku.PUNG_OF_TERMINALS_OR_HONORS ]);
        });
        
        it('is not pungs of terminals or honors.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_08)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_04)),
            ], new Janpai(JanpaiID.TON));
            assert.deepStrictEqual(McrUtil._pungsOfTerminalsOrHonors(completePattern), []);
        });
        
    });
    
    describe('_pungsYakuList()', () => {
        
        it('is double pung and two concealed kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.PIN_03), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_03), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._pungsYakuList(completePattern),
                [ McrYaku.DOUBLE_PUNG, McrYaku.TWO_CONCEALED_KONGS ]);
        });
        
        it('is pure shifted pungs and pung of terminals or honors.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_08)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_09)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._pungsYakuList(completePattern),
                [ McrYaku.PURE_SHIFTED_PUNGS, McrYaku.PUNG_OF_TERMINALS_OR_HONORS ]);
        });
        
        it('is all even pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_06)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_08)),
            ], new Janpai(JanpaiID.MAN_08));
            assert.deepStrictEqual(McrUtil._pungsYakuList(completePattern),
                [ McrYaku.ALL_EVEN_PUNGS ]);
        });
        
        it('is all pungs and double "double pung".', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_05)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_05)),
            ], new Janpai(JanpaiID.MAN_08));
            assert.deepStrictEqual(McrUtil._pungsYakuList(completePattern),
                [ McrYaku.ALL_PUNGS, McrYaku.DOUBLE_PUNG, McrYaku.DOUBLE_PUNG ]);
        });
        
    });
    
    describe('_pureTerminalChows()', () => {
        
        it('is pure terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
            ];
            const head = new Janpai(JanpaiID.MAN_05);
            assert(McrUtil._pureTerminalChows(fourChows, head));
        });
        
        it('has short straight.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            const head = new Janpai(JanpaiID.MAN_05);
            assert(!McrUtil._pureTerminalChows(fourChows, head));
        });
        
        it('does not have 5 head.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
            ];
            const head = new Janpai(JanpaiID.PIN_04);
            assert(!McrUtil._pureTerminalChows(fourChows, head));
        });
        
        it('does not have same suit head.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
            ];
            const head = new Janpai(JanpaiID.PIN_05);
            assert(!McrUtil._pureTerminalChows(fourChows, head));
        });
        
    });
    
    describe('_push()', () => {
        
        it('is double pung.', () => {
            const yakuList = [];
            McrUtil._push(yakuList, McrYaku.DOUBLE_PUNG);
            assert.deepStrictEqual(yakuList, [ McrYaku.DOUBLE_PUNG ]);
        });
        
        it('is blank.', () => {
            const yakuList = [];
            McrUtil._push(yakuList, undefined);
            assert.deepStrictEqual(yakuList, []);
        });
        
    });
    // 呼び出し元である_twoMentsuYakuList()のテストで評価済み
    describe('_removePureDoubleChow()', () => {
    });
    
    describe('_sevenPairsYaku()', () => {
        
        it('is seven shifted pairs.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_07),
            ];
            assert.equal(McrUtil._sevenPairsYaku(janpaiList), McrYaku.SEVEN_SHIFTED_PAIRS );
        });
        
        it('is seven pairs.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_08),
            ];
            assert.equal(McrUtil._sevenPairsYaku(janpaiList), McrYaku.SEVEN_PAIRS );
        });
        
    });
    
    describe('_specialYakuList()', () => {
        
        it('is reversible tiles and tile hog', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.BAI),
            ];
            const yakuList = [];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JanpaiID.SOU_08);
            McrUtil._specialYakuList(yakuList, hand, janpai);
            assert.deepStrictEqual(yakuList,
                [ McrYaku.REVERSIBLE_TILES, McrYaku.TILE_HOG, McrYaku.TILE_HOG ]);
        });
        
        it('is chicken hand', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
            ];
            const yakuList = [];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_08)));
            const janpai = new Janpai(JanpaiID.SOU_06);
            McrUtil._specialYakuList(yakuList, hand, janpai);
            assert.deepStrictEqual(yakuList, [ McrYaku.CHICKEN_HAND ]);
        });
        
    });
    
    describe('_terminalsOrHonorsYaku()', () => {
        
        it('is all terminals.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.SOU_01),
            ];
            assert.equal(McrUtil._terminalsOrHonorsYaku(janpaiList), McrYaku.ALL_TERMINALS);
        });
        
        it('is all terminals and honors.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
            ];
            assert.equal(McrUtil._terminalsOrHonorsYaku(janpaiList),
                McrYaku.ALL_TERMINALS_AND_HONORS);
        });
        
    });
    
    describe('_threeChowsYaku()', () => {
        
        it('is pure triple chow.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), McrYaku.PURE_TRIPLE_CHOW);
        });
        
        it('is pure straight.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), McrYaku.PURE_STRAIGHT);
        });
        
        it('is pure shifted chows.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), McrYaku.PURE_SHIFTED_CHOWS);
        });
        
        it('is mixed straight.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), McrYaku.MIXED_STRAIGHT);
        });
        
        it('is mixed triple chow.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), McrYaku.MIXED_TRIPLE_CHOW);
        });
        
        it('is mixed shifted chows.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_03)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), McrYaku.MIXED_SHIFTED_CHOWS);
        });
        
        it('is not three chows yaku.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), undefined);
        });
        
    });
    
    describe('_threeMentsuYakuListWithFourMentsu()', () => {
        // ○○××
        it('is pure straight and pure double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ McrYaku.PURE_STRAIGHT, McrYaku.PURE_DOUBLE_CHOW ]);
        });
        // ○×○×
        it('is mixed straight and mixed double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ McrYaku.MIXED_STRAIGHT, McrYaku.MIXED_DOUBLE_CHOW ]);
        });
        // ○××○
        it('is pure triple chow and mixed double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ McrYaku.PURE_TRIPLE_CHOW, McrYaku.MIXED_DOUBLE_CHOW ]);
        });
        // ×○○×
        it('is mixed shifted chows and pure double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_06)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_06)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ McrYaku.MIXED_SHIFTED_CHOWS, McrYaku.PURE_DOUBLE_CHOW ]);
        });
        // ×○×○
        it('is pure shifted chows and short straight.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ McrYaku.PURE_SHIFTED_CHOWS, McrYaku.SHORT_STRAIGHT ]);
        });
        // ××○○
        it('is mixed triple chow and two terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ McrYaku.MIXED_TRIPLE_CHOW, McrYaku.TWO_TERMINAL_CHOWS ]);
        });
        
        it('is pure shifted pungs and double pung.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_06)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourPungs, false),
                [ McrYaku.PURE_SHIFTED_PUNGS, McrYaku.DOUBLE_PUNG ]);
        });
        
        it('is mixed shifted chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ McrYaku.MIXED_SHIFTED_CHOWS ]);
        });
        
        it('is empty yaku list.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows), []);
        });
        
    });
    
    describe('_threePungsYaku()', () => {
        
        it('is pure shifted pungs.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
            ];
            assert.equal(McrUtil._threePungsYaku(threePungs), McrYaku.PURE_SHIFTED_PUNGS);
        });
        
        it('is triple pung.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
            ];
            assert.equal(McrUtil._threePungsYaku(threePungs), McrYaku.TRIPLE_PUNG);
        });
        
        it('is mixed shifted pungs.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_03)),
            ];
            assert.equal(McrUtil._threePungsYaku(threePungs), McrYaku.MIXED_SHIFTED_PUNGS);
        });
        
        it('is not three pungs yaku.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            assert.equal(McrUtil._threePungsYaku(threePungs), undefined);
        });
        
    });
    
    describe('_threeSuitedTerminalChows()', () => {
        
        it('is three suited terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
            ];
            const head = new Janpai(JanpaiID.SOU_05);
            assert(McrUtil._threeSuitedTerminalChows(fourChows, head));
        });
        
        it('has short straight.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)),
            ];
            const head = new Janpai(JanpaiID.PIN_05);
            assert(!McrUtil._threeSuitedTerminalChows(fourChows, head));
        });
        
        it('does not have 5 head.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
            ];
            const head = new Janpai(JanpaiID.TON);
            assert(!McrUtil._threeSuitedTerminalChows(fourChows, head));
        });
        
        it('have first suit head.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
            ];
            const head = new Janpai(JanpaiID.PIN_05);
            assert(!McrUtil._threeSuitedTerminalChows(fourChows, head));
        });
        
        it('have second suit head.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
            ];
            const head = new Janpai(JanpaiID.MAN_05);
            assert(!McrUtil._threeSuitedTerminalChows(fourChows, head));
        });
        
    });
    
    describe('_twoChowsYaku()', () => {
        
        it('is pure double chow.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert.equal(McrUtil._twoChowsYaku(twoChows), McrYaku.PURE_DOUBLE_CHOW);
        });
        
        it('is mixed double chow.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            assert.equal(McrUtil._twoChowsYaku(twoChows), McrYaku.MIXED_DOUBLE_CHOW);
        });
        
        it('is short straight.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            assert.equal(McrUtil._twoChowsYaku(twoChows), McrYaku.SHORT_STRAIGHT);
        });
        
        it('is two terminal chows.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
            ];
            assert.equal(McrUtil._twoChowsYaku(twoChows), McrYaku.TWO_TERMINAL_CHOWS);
        });
        
        it('is not two chows yaku.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
            ];
            assert.equal(McrUtil._twoChowsYaku(twoChows), undefined);
        });
        
    });
    
    describe('_twoMentsuYakuList()', () => {
        // ○○○○
        it('is pure double chow, short straight and mixed double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3),
                [ McrYaku.PURE_DOUBLE_CHOW, McrYaku.SHORT_STRAIGHT, McrYaku.MIXED_DOUBLE_CHOW ]);
        });
        // ○○○×
        it('is pure double chow and two terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3),
                [ McrYaku.PURE_DOUBLE_CHOW, McrYaku.TWO_TERMINAL_CHOWS ]);
        });
        // ○○×○
        it('is short straight and mixed double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_06)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_03)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3),
                [ McrYaku.SHORT_STRAIGHT, McrYaku.MIXED_DOUBLE_CHOW ]);
        });
        // ○×○○
        it('is mixed double chow and two terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3),
                [ McrYaku.MIXED_DOUBLE_CHOW, McrYaku.TWO_TERMINAL_CHOWS ]);
        });
        // ×○○○
        it('is pure double chow and short straight.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_05)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3),
                [ McrYaku.PURE_DOUBLE_CHOW, McrYaku.SHORT_STRAIGHT ]);
        });
        // ○○◎◎
        it('is 1 of double "double pung".', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourPungs, 2, false),
                [ McrYaku.DOUBLE_PUNG, McrYaku.DOUBLE_PUNG ]);
        });
        // ○◎○◎
        it('is 2 of double "double pung".', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_04)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_04)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourPungs, 2, false),
                [ McrYaku.DOUBLE_PUNG, McrYaku.DOUBLE_PUNG ]);
        });
        // ○◎◎○
        it('is 3 of double "double pung".', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_06)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_06)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_05)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourPungs, 2, false),
                [ McrYaku.DOUBLE_PUNG, McrYaku.DOUBLE_PUNG ]);
        });
        // ○○××
        it('is two terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3),
                [ McrYaku.TWO_TERMINAL_CHOWS ]);
        });
        // ××××
        it('is empty yaku list.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_05)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3), []);
        });
        // ○○○
        it('is pure double chow and short straight.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(threeChows, 2),
                [ McrYaku.PURE_DOUBLE_CHOW, McrYaku.SHORT_STRAIGHT ]);
        });
        // ○○×
        it('is double pung.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(threePungs, 1, false),
                [ McrYaku.DOUBLE_PUNG ]);
        });
        // ×××
        it('is empty yaku list.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_04)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(threePungs, 1, false), []);
        });
        
    });
    
    describe('_twoPungsYaku()', () => {
        
        it('is double pung.', () => {
            const twoPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            assert.equal(McrUtil._twoPungsYaku(twoPungs), McrYaku.DOUBLE_PUNG);
        });
        
        it('is not two pungs yaku.', () => {
            const twoPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
            ];
            assert.equal(McrUtil._twoChowsYaku(twoPungs), undefined);
        });
        
    });
    
    describe('_waitYaku()', () => {
        
        it('is edge wait.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI), true),
            ], new Janpai(JanpaiID.FA));
            const janpai = new Janpai(JanpaiID.MAN_03);
            const completableList = [ new Janpai(JanpaiID.MAN_03) ];
            assert.equal(McrUtil._waitYaku(completePattern, janpai, completableList),
                McrYaku.EDGE_WAIT);
        });
        
        it('is closed wait.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03), true),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI), true),
            ], new Janpai(JanpaiID.FA));
            const janpai = new Janpai(JanpaiID.MAN_02);
            const completableList = [ new Janpai(JanpaiID.MAN_02) ];
            assert.equal(McrUtil._waitYaku(completePattern, janpai, completableList),
                McrYaku.CLOSED_WAIT);
        });
        
        it('is single wait.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03), true),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI), true),
            ], new Janpai(JanpaiID.FA));
            const janpai = new Janpai(JanpaiID.FA);
            const completableList = [ new Janpai(JanpaiID.FA) ];
            assert.equal(McrUtil._waitYaku(completePattern, janpai, completableList),
                McrYaku.SINGLE_WAIT);
        });
        
        it('is japanese edge wait.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03), true),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI), true),
            ], new Janpai(JanpaiID.FA));
            const janpai = new Janpai(JanpaiID.MAN_03);
            const completableList = [ new Janpai(JanpaiID.MAN_03), new Janpai(JanpaiID.MAN_06) ];
            assert.equal(McrUtil._waitYaku(completePattern, janpai, completableList), undefined);
        });
        
    });
    
    describe('_windsYakuList()', () => {
        
        it('is big four winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SHA)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PEI)),
            ], new Janpai(JanpaiID.MAN_01));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.SHA));
            assert.deepStrictEqual(McrUtil._windsYakuList(completePattern, completeInfo),
                [ McrYaku.BIG_FOUR_WINDS ]);
        });
        
        it('is little four winds and prevalent wind.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SHA)),
            ], new Janpai(JanpaiID.PEI));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.SHA), false, WIND.SHA, WIND.PEI);
            assert.deepStrictEqual(McrUtil._windsYakuList(completePattern, completeInfo),
                [ McrYaku.LITTLE_FOUR_WINDS, McrYaku.PREVALENT_WIND ]);
        });
        
        it('is big three winds, prevalent wind and seat wind.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SHA)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PEI)),
            ], new Janpai(JanpaiID.MAN_01));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.SHA), false, WIND.NAN, WIND.NAN);
            assert.deepStrictEqual(McrUtil._windsYakuList(completePattern, completeInfo),
                [ McrYaku.BIG_THREE_WINDS, McrYaku.PREVALENT_WIND, McrYaku.SEAT_WIND ]);
        });
        
        it('is not winds yaku.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_09)),
            ], new Janpai(JanpaiID.TON));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.SOU_09));
            assert.deepStrictEqual(McrUtil._windsYakuList(completePattern, completeInfo), []);
        });
        
    });
    
    describe('_yakuListWithFourChows()', () => {
        
        it('is pure terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
            ];
            const head = new Janpai(JanpaiID.MAN_05);
            assert.deepStrictEqual(McrUtil._yakuListWithFourChows(fourChows, head),
                [ McrYaku.PURE_TERMINAL_CHOWS ]);
        });
        
        it('is quadruple chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            const head = new Janpai(JanpaiID.TON);
            assert.deepStrictEqual(McrUtil._yakuListWithFourChows(fourChows, head),
                [ McrYaku.QUADRUPLE_CHOW ]);
        });
        
        it('is four pure shifted chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            const head = new Janpai(JanpaiID.TON);
            assert.deepStrictEqual(McrUtil._yakuListWithFourChows(fourChows, head),
                [ McrYaku.FOUR_PURE_SHIFTED_CHOWS ]);
        });
        
        it('is three suited terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
            ];
            const head = new Janpai(JanpaiID.SOU_05);
            assert.deepStrictEqual(McrUtil._yakuListWithFourChows(fourChows, head),
                [ McrYaku.THREE_SUITED_TERMINAL_CHOWS ]);
        });
        
        it('is pure triple chow and mixed double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            const head = new Janpai(JanpaiID.TON);
            assert.deepStrictEqual(McrUtil._yakuListWithFourChows(fourChows, head),
                [ McrYaku.PURE_TRIPLE_CHOW, McrYaku.MIXED_DOUBLE_CHOW ]);
        });
        
        it('is pure double chow, short straight and mixed double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
            ];
            const head = new Janpai(JanpaiID.TON);
            assert.deepStrictEqual(McrUtil._yakuListWithFourChows(fourChows, head),
                [ McrYaku.PURE_DOUBLE_CHOW, McrYaku.SHORT_STRAIGHT, McrYaku.MIXED_DOUBLE_CHOW ]);
        });
        
    });
    
    describe('_yakuListWithFourPungs()', () => {
        
        it('is four pure shifted pungs.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithFourPungs(fourPungs),
                [ McrYaku.FOUR_PURE_SHIFTED_PUNGS ]);
        });
        
        it('is pure shifted pungs and double pung.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_06)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithFourPungs(fourPungs),
                [ McrYaku.PURE_SHIFTED_PUNGS, McrYaku.DOUBLE_PUNG ]);
        });
        
        it('is double "double pung".', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithFourPungs(fourPungs),
                [ McrYaku.DOUBLE_PUNG, McrYaku.DOUBLE_PUNG ]);
        });
        
    });
    
    describe('_yakuListWithThreeChows()', () => {
        
        it('is pure triple chow.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithThreeChows(threeChows, 2),
                [ McrYaku.PURE_TRIPLE_CHOW ]);
        });
        
        it('is pure double chow and short straight.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithThreeChows(threeChows, 2),
                [ McrYaku.PURE_DOUBLE_CHOW, McrYaku.SHORT_STRAIGHT ]);
        });
        
    });
    
    describe('_yakuListWithThreePungs()', () => {
        
        it('is pure shifted pungs.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithThreePungs(threePungs),
                [ McrYaku.PURE_SHIFTED_PUNGS ]);
        });
        
        it('is double pung.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithThreePungs(threePungs),
                [ McrYaku.DOUBLE_PUNG ]);
        });
        
    });
    
    
    
    function createMcrUtil() {
        return new McrUtil();
    }
    
});

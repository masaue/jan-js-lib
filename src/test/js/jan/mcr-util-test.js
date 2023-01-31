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

import {CompleteInfo} from '../../../main/js/jan/complete-info';
import CompletePattern from '../../../main/js/jan/complete-pattern';
import {COMPLETE_TYPE} from '../../../main/js/jan/complete-type';
import Hand from '../../../main/js/jan/hand';
import {Janpai} from '../../../main/js/jan/janpai';
import {JANPAI_ID} from '../../../main/js/jan/janpai-id';
import McrUtil from '../../../main/js/jan/mcr-util';
import {MCR_YAKU} from '../../../main/js/jan/mcr-yaku';
import {Mentsu} from '../../../main/js/jan/mentsu';
import {WIND} from '../../../main/js/jan/wind';

describe('McrUtilTest', () => {
    
    describe('yakuList()', () => {
        
        it('is greater honors and knitted tiles.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_08),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.NAN),
                new Janpai(JANPAI_ID.SHA),
                new Janpai(JANPAI_ID.PEI),
                new Janpai(JANPAI_ID.BAI),
                new Janpai(JANPAI_ID.FA),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.CHUN));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.GREATER_HONORS_AND_KNITTED_TILES ]);
        });
        
        it('is thirteen Orphans and robbing the kong.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.SOU_01),
                new Janpai(JANPAI_ID.SOU_09),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.NAN),
                new Janpai(JANPAI_ID.SHA),
                new Janpai(JANPAI_ID.PEI),
                new Janpai(JANPAI_ID.BAI),
                new Janpai(JANPAI_ID.FA),
                new Janpai(JANPAI_ID.CHUN),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.CHUN),
                false, undefined, undefined, COMPLETE_TYPE.ROBBING_A_KONG );
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.THIRTEEN_ORPHANS, MCR_YAKU.ROBBING_THE_KONG ]);
        });
        
        it('is seven shifted pairs.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_07),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_07));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.SEVEN_SHIFTED_PAIRS ]);
        });
        
        it('is big three dragons and all honors.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.NAN),
                new Janpai(JANPAI_ID.NAN),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.NAN));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.BIG_THREE_DRAGONS, MCR_YAKU.ALL_HONORS ]);
        });
        
        it('is dragon pungs, mixed double chow, and two_concealed_pungs.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.CHUN),
                new Janpai(JANPAI_ID.CHUN),
                new Janpai(JANPAI_ID.CHUN),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.DRAGON_PUNG, MCR_YAKU.MIXED_DOUBLE_CHOW, MCR_YAKU.TWO_CONCEALED_PUNGS ]);
        });
        
        it('is nine gates.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.PURE_STRAIGHT, MCR_YAKU.NINE_GATES, MCR_YAKU.TILE_HOG ]);
        });
        
        it('is closed wait and middle tiles.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_06),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_06)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_04)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_05));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.MIXED_SHIFTED_PUNGS, MCR_YAKU.CLOSED_WAIT,
                  MCR_YAKU.MIDDLE_TILES, MCR_YAKU.TILE_HOG ]);
        });
        
        it('is chicken hand.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_04)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_08)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.SOU_06));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.CHICKEN_HAND ]);
        });
        
        it('is big four winds and half flush.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.NAN)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SHA)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PEI)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.TON));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.BIG_FOUR_WINDS, MCR_YAKU.HALF_FLUSH ]);
        });
        
        it('is big three dragons and one voided suit.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_02),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.BIG_THREE_DRAGONS, MCR_YAKU.ONE_VOIDED_SUIT ]);
        });
        
        it('is four kong and concealed kong.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_02), true));
            hand.fix(Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_03)));
            hand.fix(Mentsu.createKongMentsu(new Janpai(JANPAI_ID.PIN_05)));
            hand.fix(Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_07)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.TON));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.FOUR_KONGS, MCR_YAKU.CONCEALED_KONG ]);
        });
        
        it('is triple pung and all terminals.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.SOU_01),
                new Janpai(JANPAI_ID.SOU_01),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_09)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.SOU_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.TRIPLE_PUNG, MCR_YAKU.ALL_TERMINALS ]);
        });
        
        it('is little four winds, prevalent wind, seat wind and half flush.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.NAN)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SHA)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PEI)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_02), false, WIND.NAN, WIND.SHA);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.LITTLE_FOUR_WINDS, MCR_YAKU.PREVALENT_WIND,
                  MCR_YAKU.SEAT_WIND, MCR_YAKU.HALF_FLUSH ]);
        });
        
        it('is little three dragons and one voided suit.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.BAI),
                new Janpai(JANPAI_ID.BAI),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_02)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.LITTLE_THREE_DRAGONS, MCR_YAKU.ONE_VOIDED_SUIT ]);
        });
        
        it('is four concealed pungs and single wait.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.CHUN),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.CHUN));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.FOUR_CONCEALED_PUNGS, MCR_YAKU.SINGLE_WAIT ]);
        });
        
        it('is pure terminal chows and concealed hand.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.SOU_01),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_09),
                new Janpai(JANPAI_ID.SOU_09),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.SOU_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.PURE_TERMINAL_CHOWS, MCR_YAKU.CONCEALED_HAND ]);
        });
        
        it('is quadruple chow, half flush and concealed hand.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.SOU_02));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.QUADRUPLE_CHOW, MCR_YAKU.HALF_FLUSH, MCR_YAKU.CONCEALED_HAND ]);
        });
        
        it('is four pure shifted pungs and half flush.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_03)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_04)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_05));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.FOUR_PURE_SHIFTED_PUNGS, MCR_YAKU.HALF_FLUSH ]);
        });
        
        it('is all terminals and honors and one voided suit.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.NAN),
                new Janpai(JANPAI_ID.NAN),
                new Janpai(JANPAI_ID.FA),
                new Janpai(JANPAI_ID.FA),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_09)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SHA)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.NAN));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.ALL_TERMINALS_AND_HONORS, MCR_YAKU.ONE_VOIDED_SUIT ]);
        });
        
        it('is all even pungs.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_04)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_06)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.SOU_08));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.ALL_EVEN_PUNGS ]);
        });
        
        it('is three suited terminal chows.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_05),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_01));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.THREE_SUITED_TERMINAL_CHOWS ]);
        });
        
        it('is all fives.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_05),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_05)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_04)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_05));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.ALL_FIVES ]);
        });
        
        it('is lesser honors and knitted tiles.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.NAN),
                new Janpai(JANPAI_ID.SHA),
                new Janpai(JANPAI_ID.PEI),
                new Janpai(JANPAI_ID.BAI),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.FA));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.LESSER_HONORS_AND_KNITTED_TILES ]);
        });
        
        it('is big three winds and others.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_05),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.TON)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.NAN)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SHA)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_01), false, WIND.TON, WIND.NAN);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.BIG_THREE_WINDS, MCR_YAKU.PREVALENT_WIND, MCR_YAKU.SEAT_WIND,
                  MCR_YAKU.ALL_PUNGS, MCR_YAKU.PUNG_OF_TERMINALS_OR_HONORS, MCR_YAKU.ONE_VOIDED_SUIT ]);
        });
        
        it('is reversible tiles.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.BAI),
                new Janpai(JANPAI_ID.BAI),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_03)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_05)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.SOU_08));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.REVERSIBLE_TILES ]);
        });
        
        it('is robbing the kong.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.BAI),
                new Janpai(JANPAI_ID.BAI),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_03)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_05)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_09),
                true, undefined, undefined, COMPLETE_TYPE.ROBBING_A_KONG);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.ROBBING_THE_KONG ]);
        });
        
        it('is melded hand.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.SOU_08),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_06)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_04)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_05)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.SOU_08));
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.ALL_SIMPLES, MCR_YAKU.MELDED_HAND ]);
        });
        
        it('is two dragon pungs and others.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.NAN),
                new Janpai(JANPAI_ID.NAN),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.TON)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.NAN), false, WIND.TON, WIND.NAN);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.SEAT_WIND, MCR_YAKU.PREVALENT_WIND,
                  MCR_YAKU.TWO_DRAGON_PUNGS, MCR_YAKU.ALL_PUNGS, MCR_YAKU.HALF_FLUSH ]);
        });
        
        it('is prevalent wind and seat wind.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_04),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.TON)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_02)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_04), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.PREVALENT_WIND, MCR_YAKU.SEAT_WIND,
                  MCR_YAKU.PUNG_OF_TERMINALS_OR_HONORS ]);
        });
        
        it('is all chows, knitted straight and single wait.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_08),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_03)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_08), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.ALL_CHOWS, MCR_YAKU.KNITTED_STRAIGHT, MCR_YAKU.SINGLE_WAIT ]);
        });
        
        it('does not have closed wait, with all chows and knitted straight.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_09),
                new Janpai(JANPAI_ID.SOU_09),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.SOU_05), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.ALL_CHOWS, MCR_YAKU.KNITTED_STRAIGHT, MCR_YAKU.CONCEALED_HAND ]);
        });
        
        it('does not have edge wait, with all chows and knitted straight.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_09),
                new Janpai(JANPAI_ID.SOU_09),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_03), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.ALL_CHOWS, MCR_YAKU.KNITTED_STRAIGHT, MCR_YAKU.CONCEALED_HAND ]);
        });
        
        it('does not have single wait, with all chows and knitted straight.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_08),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_09), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.ALL_CHOWS, MCR_YAKU.KNITTED_STRAIGHT, MCR_YAKU.CONCEALED_HAND ]);
        });
        
        it('is seven pairs, all green and tile hog.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.FA),
                new Janpai(JANPAI_ID.FA),
                new Janpai(JANPAI_ID.FA),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.FA), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.SEVEN_PAIRS, MCR_YAKU.ALL_GREEN, MCR_YAKU.HALF_FLUSH, MCR_YAKU.TILE_HOG ]);
        });
        
        it('does not have tile hog, with seven pairs and all green.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.FA),
                new Janpai(JANPAI_ID.FA),
                new Janpai(JANPAI_ID.FA),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.FA), false, WIND.TON, WIND.TON);
            assert.deepStrictEqual(McrUtil.complete(hand, completeInfo).yakuList,
                [ MCR_YAKU.SEVEN_PAIRS, MCR_YAKU.ALL_GREEN, MCR_YAKU.HALF_FLUSH ]);
        });
        
    });
    
    
    
    describe('_allInvolvedYaku()', () => {
        
        it('is outside hand(mixed lesser terminals).', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.TON)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(McrUtil._allInvolvedYaku(completePattern),
                         MCR_YAKU.OUTSIDE_HAND);
        });
        
        it('is outside hand(pure lesser terminals).', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_09)),
            ], new Janpai(JANPAI_ID.SOU_01));
            assert.equal(McrUtil._allInvolvedYaku(completePattern),
                         MCR_YAKU.OUTSIDE_HAND);
        });
        
        it('is all fives.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_04)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_05)),
            ], new Janpai(JANPAI_ID.PIN_05));
            assert.equal(McrUtil._allInvolvedYaku(completePattern),
                         MCR_YAKU.ALL_FIVES);
        });
        
    });
    
    describe('_allEvenPungs()', () => {
        
        it('is all even pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_04)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_06)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_08)),
            ], new Janpai(JANPAI_ID.MAN_08));
            assert(McrUtil._allEvenPungs(completePattern));
        });
        
        it('is not all even pungs, because of odd pung.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_04)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_06)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.MAN_08));
            assert(!McrUtil._allEvenPungs(completePattern));
        });
        
        it('is not all even pungs, because of odd head.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_04)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_06)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_08)),
            ], new Janpai(JANPAI_ID.MAN_07));
            assert(!McrUtil._allEvenPungs(completePattern));
        });
        
    });
    
    describe('_beingWholeYakuList()', () => {
        
        it('is final draw and win on kong.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_04)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.TON),
                false, undefined, undefined, COMPLETE_TYPE.FINAL_DRAW_AND_WIN_ON_KONG);
            assert.deepStrictEqual(McrUtil._beingWholeYakuList(hand, completeInfo),
                [ MCR_YAKU.LAST_TILE_DRAW, MCR_YAKU.OUT_WITH_REPLACEMENT_TILE ]);
        });
        
        it('is final discard and melded hand.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_04)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.TON),
                false, undefined, undefined, COMPLETE_TYPE.FINAL_DISCARD);
            assert.deepStrictEqual(McrUtil._beingWholeYakuList(hand, completeInfo),
                [ MCR_YAKU.LAST_TILE_CLAIM, MCR_YAKU.MELDED_HAND ]);
        });
        
        it('is robbing the kongs and last tile.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_04)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_01),
                true, undefined, undefined, COMPLETE_TYPE.ROBBING_A_KONG);
            assert.deepStrictEqual(McrUtil._beingWholeYakuList(hand, completeInfo),
                [ MCR_YAKU.ROBBING_THE_KONG, MCR_YAKU.LAST_TILE ]);
        });
        
        it('is fully concealed hand.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.TON),
                false, undefined, undefined, COMPLETE_TYPE.DRAW);
            assert.deepStrictEqual(McrUtil._beingWholeYakuList(hand, completeInfo),
                [ MCR_YAKU.FULLY_CONCEALED_HAND ]);
        });
        
        it('is concealed hand.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.TON));
            assert.deepStrictEqual(McrUtil._beingWholeYakuList(hand, completeInfo),
                [ MCR_YAKU.CONCEALED_HAND ]);
        });
        
        it('is self drawn.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_04)));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.TON),
                false, undefined, undefined, COMPLETE_TYPE.DRAW);
            assert.deepStrictEqual(McrUtil._beingWholeYakuList(hand, completeInfo),
                [ MCR_YAKU.SELF_DRAWN ]);
        });
        
    });
    
    describe('_brokenYakuList()', () => {
        
        it('is greater honors and knitted tiles.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_08),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.NAN),
                new Janpai(JANPAI_ID.SHA),
                new Janpai(JANPAI_ID.PEI),
                new Janpai(JANPAI_ID.BAI),
                new Janpai(JANPAI_ID.FA),
                new Janpai(JANPAI_ID.CHUN),
            ];
            assert.deepStrictEqual(McrUtil._brokenYakuList(janpaiList),
                [ MCR_YAKU.GREATER_HONORS_AND_KNITTED_TILES ]);
        });
        
        it('is lesser honors and knitted tiles.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_08),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.NAN),
                new Janpai(JANPAI_ID.SHA),
                new Janpai(JANPAI_ID.PEI),
                new Janpai(JANPAI_ID.BAI),
                new Janpai(JANPAI_ID.FA),
            ];
            assert.deepStrictEqual(McrUtil._brokenYakuList(janpaiList),
                [ MCR_YAKU.LESSER_HONORS_AND_KNITTED_TILES ]);
        });
        
        it('is lesser honors and knitted tiles, and knitted straight.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_08),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_09),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.NAN),
                new Janpai(JANPAI_ID.SHA),
                new Janpai(JANPAI_ID.PEI),
                new Janpai(JANPAI_ID.BAI),
            ];
            assert.deepStrictEqual(McrUtil._brokenYakuList(janpaiList),
                [ MCR_YAKU.LESSER_HONORS_AND_KNITTED_TILES, MCR_YAKU.KNITTED_STRAIGHT ]);
        });
        
    });
    // ちゅんま手引きver2_03.pdfのP.26に準拠
    describe('_concealedPungsAndKongsYakuList()', () => {
        
        it('is two concealed pungs and melded kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.TWO_CONCEALED_PUNGS, MCR_YAKU.MELDED_KONG ]);
        });
        
        it('is three concealed pungs and melded kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.THREE_CONCEALED_PUNGS, MCR_YAKU.MELDED_KONG ]);
        });
        
        it('is two concealed pungs and concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.TWO_CONCEALED_PUNGS, MCR_YAKU.CONCEALED_KONG ]);
        });
        
        it('is three concealed pungs and concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.THREE_CONCEALED_PUNGS, MCR_YAKU.CONCEALED_KONG ]);
        });
        
        it('is four concealed pungs and concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.FOUR_CONCEALED_PUNGS, MCR_YAKU.CONCEALED_KONG ]);
        });
        
        it('is two concealed pungs and two melded kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.TWO_CONCEALED_PUNGS, MCR_YAKU.TWO_MELDED_KONGS ]);
        });
        
        it('is two concealed pungs, two melded kongs and concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.TWO_CONCEALED_PUNGS, MCR_YAKU.TWO_MELDED_KONGS, MCR_YAKU.CONCEALED_KONG ]);
        });
        
        it('is three concealed pungs, two melded kongs and concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.THREE_CONCEALED_PUNGS, MCR_YAKU.TWO_MELDED_KONGS, MCR_YAKU.CONCEALED_KONG ]);
        });
        
        it('is three concealed pungs and two concealed kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.THREE_CONCEALED_PUNGS, MCR_YAKU.TWO_CONCEALED_KONGS ]);
        });
        
        it('is four concealed pungs and two concealed kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.FOUR_CONCEALED_PUNGS, MCR_YAKU.TWO_CONCEALED_KONGS ]);
        });
        
        it('is two concealed pungs and three kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.TWO_CONCEALED_PUNGS, MCR_YAKU.THREE_KONGS ]);
        });
        
        it('is two concealed pungs and three kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.TWO_CONCEALED_PUNGS, MCR_YAKU.THREE_KONGS ]);
        });
        
        it('is three concealed pungs and three kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.THREE_CONCEALED_PUNGS, MCR_YAKU.THREE_KONGS ]);
        });
        
        it('is three concealed pungs and three kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.THREE_CONCEALED_PUNGS, MCR_YAKU.THREE_KONGS ]);
        });
        
        it('is four concealed pungs and three kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.FOUR_CONCEALED_PUNGS, MCR_YAKU.THREE_KONGS ]);
        });
        
        it('is two concealed pungs and four kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.TWO_CONCEALED_PUNGS, MCR_YAKU.FOUR_KONGS ]);
        });
        
        it('is three concealed pungs and four kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.THREE_CONCEALED_PUNGS, MCR_YAKU.FOUR_KONGS ]);
        });
        
        it('is four concealed pungs and four kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._concealedPungsAndKongsYakuList(completePattern),
                [ MCR_YAKU.FOUR_CONCEALED_PUNGS, MCR_YAKU.FOUR_KONGS ]);
        });
        
    });
    
    describe('_concealedPungsYaku()', () => {
        
        it('is four concealed pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(McrUtil._concealedPungsYaku(completePattern), MCR_YAKU.FOUR_CONCEALED_PUNGS);
        });
        
        it('is three concealed pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(McrUtil._concealedPungsYaku(completePattern), MCR_YAKU.THREE_CONCEALED_PUNGS);
        });
        
        it('is two concealed pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(McrUtil._concealedPungsYaku(completePattern), MCR_YAKU.TWO_CONCEALED_PUNGS);
        });
        
        it('is not concealed pungs yaku.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(McrUtil._concealedPungsYaku(completePattern), undefined);
        });
        
    });
    
    describe('_dragonsYaku()', () => {
        
        it('is big three dragons.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(McrUtil._dragonsYaku(completePattern), MCR_YAKU.BIG_THREE_DRAGONS);
        });
        
        it('is little three dragons.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_09)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA)),
            ], new Janpai(JANPAI_ID.CHUN));
            assert.equal(McrUtil._dragonsYaku(completePattern), MCR_YAKU.LITTLE_THREE_DRAGONS);
        });
        
        it('is two dragon pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_09)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(McrUtil._dragonsYaku(completePattern), MCR_YAKU.TWO_DRAGON_PUNGS);
        });
        
        it('is dragon pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI)),
            ], new Janpai(JANPAI_ID.FA));
            assert.equal(McrUtil._dragonsYaku(completePattern), MCR_YAKU.DRAGON_PUNG);
        });
        
        it('is not dragons yaku.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_09)),
            ], new Janpai(JANPAI_ID.CHUN));
            assert.equal(McrUtil._dragonsYaku(completePattern), undefined);
        });
        
    });
    
    describe('_fullChowsYakuList()', () => {
        
        it('is nine gates.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
            ];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JANPAI_ID.MAN_01);
            assert.deepStrictEqual(McrUtil._fullChowsYakuList(hand, janpai),
                [ MCR_YAKU.NINE_GATES ]);
        });
        
        it('is all green and half flush', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.FA),
                new Janpai(JANPAI_ID.FA),
            ];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JANPAI_ID.FA);
            assert.deepStrictEqual(McrUtil._fullChowsYakuList(hand, janpai),
                [ MCR_YAKU.ALL_GREEN, MCR_YAKU.HALF_FLUSH ]);
        });
        
        it('is full flush.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
            ];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JANPAI_ID.MAN_03);
            assert.deepStrictEqual(McrUtil._fullChowsYakuList(hand, janpai),
                [ MCR_YAKU.FULL_FLUSH, MCR_YAKU.NO_HONORS ]);
        });
        
        it('is all types.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.CHUN),
                new Janpai(JANPAI_ID.CHUN),
            ];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JANPAI_ID.CHUN);
            assert.deepStrictEqual(McrUtil._fullChowsYakuList(hand, janpai),
                [ MCR_YAKU.ALL_TYPES ]);
        });
        
        it('is one voided suit and no honors.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.PIN_09),
            ];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JANPAI_ID.PIN_08);
            assert.deepStrictEqual(McrUtil._fullChowsYakuList(hand, janpai),
                [ MCR_YAKU.ONE_VOIDED_SUIT, MCR_YAKU.NO_HONORS ]);
        });
        
    });
    
    describe('_honorTilesYakuList()', () => {
        
        it('is big three dragons.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.FA)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN)),
            ], new Janpai(JANPAI_ID.SOU_09));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.CHUN));
            assert.deepStrictEqual(McrUtil._honorTilesYakuList(completePattern, completeInfo),
                [ MCR_YAKU.BIG_THREE_DRAGONS ]);
        });
        
        it('is big four winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.TON)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.NAN)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SHA)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PEI)),
            ], new Janpai(JANPAI_ID.MAN_01));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.CHUN));
            assert.deepStrictEqual(McrUtil._honorTilesYakuList(completePattern, completeInfo),
                [ MCR_YAKU.BIG_FOUR_WINDS ]);
        });
        
        it('is not honor tiles yaku.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_09)),
            ], new Janpai(JANPAI_ID.TON));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.CHUN));
            assert.deepStrictEqual(McrUtil._honorTilesYakuList(completePattern, completeInfo), []);
        });
        
    });
    
    describe('_kongsYakuList()', () => {
        
        it('is four kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ MCR_YAKU.FOUR_KONGS ]);
        });
        
        it('is three kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ MCR_YAKU.THREE_KONGS ]);
        });
        
        it('is two concealed kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ MCR_YAKU.TWO_CONCEALED_KONGS ]);
        });
        
        it('is two melded kongs and concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ MCR_YAKU.TWO_MELDED_KONGS, MCR_YAKU.CONCEALED_KONG ]);
        });
        
        it('is two melded kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ MCR_YAKU.TWO_MELDED_KONGS ]);
        });
        
        it('is concealed kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ MCR_YAKU.CONCEALED_KONG ]);
        });
        
        it('is melded kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern),
                [ MCR_YAKU.MELDED_KONG ]);
        });
        
        it('is not kongs yaku.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._kongsYakuList(completePattern), []);
        });
        
    });
    
    describe('_limitedNumbersYakuList()', () => {
        
        it('is upper tiles.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_09),
                new Janpai(JANPAI_ID.SOU_09),
            ];
            assert.deepStrictEqual(McrUtil._limitedNumberYakuList(janpaiList),
                [ MCR_YAKU.UPPER_TILES ]);
        });
        
        it('is middle tiles.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_06),
            ];
            assert.deepStrictEqual(McrUtil._limitedNumberYakuList(janpaiList),
                [ MCR_YAKU.MIDDLE_TILES, MCR_YAKU.ALL_SIMPLES ]);
        });
        
        it('is lower tiles.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_03),
            ];
            assert.deepStrictEqual(McrUtil._limitedNumberYakuList(janpaiList),
                [ MCR_YAKU.LOWER_TILES ]);
        });
        
        it('is upper four and all simples.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
            ];
            assert.deepStrictEqual(McrUtil._limitedNumberYakuList(janpaiList),
                [ MCR_YAKU.UPPER_FOUR, MCR_YAKU.ALL_SIMPLES ]);
        });
        
        it('is lower four.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_03),
            ];
            assert.deepStrictEqual(McrUtil._limitedNumberYakuList(janpaiList),
                [ MCR_YAKU.LOWER_FOUR ]);
        });
        
    });
    
    describe('_mentsuYakuList()', () => {
        
        it('is dragon pungs, mixed double chow, and two_concealed_pungs.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.CHUN),
                new Janpai(JANPAI_ID.CHUN),
                new Janpai(JANPAI_ID.CHUN),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_01));
            assert.deepStrictEqual(McrUtil._mentsuYakuList(hand, completeInfo),
                [ MCR_YAKU.DRAGON_PUNG, MCR_YAKU.MIXED_DOUBLE_CHOW,
                  MCR_YAKU.PUNG_OF_TERMINALS_OR_HONORS, MCR_YAKU.TWO_CONCEALED_PUNGS ]);
        });
        
        it('is quadruple chow.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_01));
            assert.deepStrictEqual(McrUtil._mentsuYakuList(hand, completeInfo),
                [ MCR_YAKU.QUADRUPLE_CHOW, MCR_YAKU.OUTSIDE_HAND ]);
        });
        
    });
    
    describe('_numberTilesYakuList()', () => {
        
        it('is pure double chow.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_08));
            assert.deepStrictEqual(McrUtil._numberTilesYakuList(completePattern),
                [ MCR_YAKU.PURE_DOUBLE_CHOW ]);
        });
        
        it('is pure triple chow.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.CHUN), true),
            ], new Janpai(JANPAI_ID.SOU_08));
            assert.deepStrictEqual(McrUtil._numberTilesYakuList(completePattern),
                [ MCR_YAKU.PURE_TRIPLE_CHOW ]);
        });
        
        it('is quadruple chow.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
            ], new Janpai(JANPAI_ID.TON));
            assert.deepStrictEqual(McrUtil._numberTilesYakuList(completePattern),
                [ MCR_YAKU.QUADRUPLE_CHOW ]);
        });
        
        it('is all chows.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_06)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._numberTilesYakuList(completePattern),
                [ MCR_YAKU.ALL_CHOWS ]);
        });
        
    });
    
    describe('_pungsOfTerminalsOrHonors()', () => {
        
        it('is pungs of terminals or honors.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_09)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_04)),
            ], new Janpai(JANPAI_ID.TON));
            assert.deepStrictEqual(McrUtil._pungsOfTerminalsOrHonors(completePattern),
                [ MCR_YAKU.PUNG_OF_TERMINALS_OR_HONORS ]);
        });
        
        it('is not pungs of terminals or honors.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_08)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_04)),
            ], new Janpai(JANPAI_ID.TON));
            assert.deepStrictEqual(McrUtil._pungsOfTerminalsOrHonors(completePattern), []);
        });
        
    });
    
    describe('_pungsYakuList()', () => {
        
        it('is double pung and two concealed kongs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.PIN_03), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_03), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._pungsYakuList(completePattern),
                [ MCR_YAKU.DOUBLE_PUNG, MCR_YAKU.TWO_CONCEALED_KONGS ]);
        });
        
        it('is pure shifted pungs and pung of terminals or honors.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_07)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_08)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_09)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._pungsYakuList(completePattern),
                [ MCR_YAKU.PURE_SHIFTED_PUNGS, MCR_YAKU.PUNG_OF_TERMINALS_OR_HONORS ]);
        });
        
        it('is all even pungs.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_04)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_06)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_08)),
            ], new Janpai(JANPAI_ID.MAN_08));
            assert.deepStrictEqual(McrUtil._pungsYakuList(completePattern),
                [ MCR_YAKU.ALL_EVEN_PUNGS ]);
        });
        
        it('is all pungs and double "double pung".', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_05)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_05)),
            ], new Janpai(JANPAI_ID.MAN_08));
            assert.deepStrictEqual(McrUtil._pungsYakuList(completePattern),
                [ MCR_YAKU.ALL_PUNGS, MCR_YAKU.DOUBLE_PUNG, MCR_YAKU.DOUBLE_PUNG ]);
        });
        
    });
    
    describe('_pureTerminalChows()', () => {
        
        it('is pure terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
            ];
            const head = new Janpai(JANPAI_ID.MAN_05);
            assert(McrUtil._pureTerminalChows(fourChows, head));
        });
        
        it('has short straight.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_04)),
            ];
            const head = new Janpai(JANPAI_ID.MAN_05);
            assert(!McrUtil._pureTerminalChows(fourChows, head));
        });
        
        it('does not have 5 head.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)),
            ];
            const head = new Janpai(JANPAI_ID.PIN_04);
            assert(!McrUtil._pureTerminalChows(fourChows, head));
        });
        
        it('does not have same suit head.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ];
            const head = new Janpai(JANPAI_ID.PIN_05);
            assert(!McrUtil._pureTerminalChows(fourChows, head));
        });
        
    });
    
    describe('_push()', () => {
        
        it('is double pung.', () => {
            const yakuList = [];
            McrUtil._push(yakuList, MCR_YAKU.DOUBLE_PUNG);
            assert.deepStrictEqual(yakuList, [ MCR_YAKU.DOUBLE_PUNG ]);
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
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.MAN_07),
            ];
            assert.equal(McrUtil._sevenPairsYaku(janpaiList), MCR_YAKU.SEVEN_SHIFTED_PAIRS );
        });
        
        it('is seven pairs.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.MAN_08),
            ];
            assert.equal(McrUtil._sevenPairsYaku(janpaiList), MCR_YAKU.SEVEN_PAIRS );
        });
        
    });
    
    describe('_specialYakuList()', () => {
        
        it('is reversible tiles and tile hog', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.BAI),
                new Janpai(JANPAI_ID.BAI),
            ];
            const yakuList = [];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JANPAI_ID.SOU_08);
            McrUtil._specialYakuList(yakuList, hand, janpai);
            assert.deepStrictEqual(yakuList,
                [ MCR_YAKU.REVERSIBLE_TILES, MCR_YAKU.TILE_HOG, MCR_YAKU.TILE_HOG ]);
        });
        
        it('is chicken hand', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
            ];
            const yakuList = [];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_04)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_08)));
            const janpai = new Janpai(JANPAI_ID.SOU_06);
            McrUtil._specialYakuList(yakuList, hand, janpai);
            assert.deepStrictEqual(yakuList, [ MCR_YAKU.CHICKEN_HAND ]);
        });
        
    });
    
    describe('_terminalsOrHonorsYaku()', () => {
        
        it('is all terminals.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.SOU_01),
                new Janpai(JANPAI_ID.SOU_01),
            ];
            assert.equal(McrUtil._terminalsOrHonorsYaku(janpaiList), MCR_YAKU.ALL_TERMINALS);
        });
        
        it('is all terminals and honors.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
            ];
            assert.equal(McrUtil._terminalsOrHonorsYaku(janpaiList),
                MCR_YAKU.ALL_TERMINALS_AND_HONORS);
        });
        
    });
    
    describe('_threeChowsYaku()', () => {
        
        it('is pure triple chow.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), MCR_YAKU.PURE_TRIPLE_CHOW);
        });
        
        it('is pure straight.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), MCR_YAKU.PURE_STRAIGHT);
        });
        
        it('is pure shifted chows.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), MCR_YAKU.PURE_SHIFTED_CHOWS);
        });
        
        it('is mixed straight.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_04)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), MCR_YAKU.MIXED_STRAIGHT);
        });
        
        it('is mixed triple chow.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), MCR_YAKU.MIXED_TRIPLE_CHOW);
        });
        
        it('is mixed shifted chows.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_03)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), MCR_YAKU.MIXED_SHIFTED_CHOWS);
        });
        
        it('is not three chows yaku.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_04)),
            ];
            assert.equal(McrUtil._threeChowsYaku(threeChows), undefined);
        });
        
    });
    
    describe('_threeMentsuYakuListWithFourMentsu()', () => {
        // ○○××
        it('is pure straight and pure double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ MCR_YAKU.PURE_STRAIGHT, MCR_YAKU.PURE_DOUBLE_CHOW ]);
        });
        // ○×○×
        it('is mixed straight and mixed double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_04)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ MCR_YAKU.MIXED_STRAIGHT, MCR_YAKU.MIXED_DOUBLE_CHOW ]);
        });
        // ○××○
        it('is pure triple chow and mixed double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ MCR_YAKU.PURE_TRIPLE_CHOW, MCR_YAKU.MIXED_DOUBLE_CHOW ]);
        });
        // ×○○×
        it('is mixed shifted chows and pure double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_06)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_06)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ MCR_YAKU.MIXED_SHIFTED_CHOWS, MCR_YAKU.PURE_DOUBLE_CHOW ]);
        });
        // ×○×○
        it('is pure shifted chows and short straight.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ MCR_YAKU.PURE_SHIFTED_CHOWS, MCR_YAKU.SHORT_STRAIGHT ]);
        });
        // ××○○
        it('is mixed triple chow and two terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ MCR_YAKU.MIXED_TRIPLE_CHOW, MCR_YAKU.TWO_TERMINAL_CHOWS ]);
        });
        
        it('is pure shifted pungs and double pung.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_05)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_06)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourPungs, false),
                [ MCR_YAKU.PURE_SHIFTED_PUNGS, MCR_YAKU.DOUBLE_PUNG ]);
        });
        
        it('is mixed shifted chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_04)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows),
                [ MCR_YAKU.MIXED_SHIFTED_CHOWS ]);
        });
        
        it('is empty yaku list.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ];
            assert.deepStrictEqual(McrUtil._threeMentsuYakuListWithFourMentsu(fourChows), []);
        });
        
    });
    
    describe('_threePungsYaku()', () => {
        
        it('is pure shifted pungs.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_03)),
            ];
            assert.equal(McrUtil._threePungsYaku(threePungs), MCR_YAKU.PURE_SHIFTED_PUNGS);
        });
        
        it('is triple pung.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
            ];
            assert.equal(McrUtil._threePungsYaku(threePungs), MCR_YAKU.TRIPLE_PUNG);
        });
        
        it('is mixed shifted pungs.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_03)),
            ];
            assert.equal(McrUtil._threePungsYaku(threePungs), MCR_YAKU.MIXED_SHIFTED_PUNGS);
        });
        
        it('is not three pungs yaku.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_04)),
            ];
            assert.equal(McrUtil._threePungsYaku(threePungs), undefined);
        });
        
    });
    
    describe('_threeSuitedTerminalChows()', () => {
        
        it('is three suited terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)),
            ];
            const head = new Janpai(JANPAI_ID.SOU_05);
            assert(McrUtil._threeSuitedTerminalChows(fourChows, head));
        });
        
        it('has short straight.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_04)),
            ];
            const head = new Janpai(JANPAI_ID.PIN_05);
            assert(!McrUtil._threeSuitedTerminalChows(fourChows, head));
        });
        
        it('does not have 5 head.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ];
            const head = new Janpai(JANPAI_ID.TON);
            assert(!McrUtil._threeSuitedTerminalChows(fourChows, head));
        });
        
        it('have first suit head.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ];
            const head = new Janpai(JANPAI_ID.PIN_05);
            assert(!McrUtil._threeSuitedTerminalChows(fourChows, head));
        });
        
        it('have second suit head.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
            ];
            const head = new Janpai(JANPAI_ID.MAN_05);
            assert(!McrUtil._threeSuitedTerminalChows(fourChows, head));
        });
        
    });
    
    describe('_twoChowsYaku()', () => {
        
        it('is pure double chow.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
            ];
            assert.equal(McrUtil._twoChowsYaku(twoChows), MCR_YAKU.PURE_DOUBLE_CHOW);
        });
        
        it('is mixed double chow.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
            ];
            assert.equal(McrUtil._twoChowsYaku(twoChows), MCR_YAKU.MIXED_DOUBLE_CHOW);
        });
        
        it('is short straight.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_04)),
            ];
            assert.equal(McrUtil._twoChowsYaku(twoChows), MCR_YAKU.SHORT_STRAIGHT);
        });
        
        it('is two terminal chows.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
            ];
            assert.equal(McrUtil._twoChowsYaku(twoChows), MCR_YAKU.TWO_TERMINAL_CHOWS);
        });
        
        it('is not two chows yaku.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
            ];
            assert.equal(McrUtil._twoChowsYaku(twoChows), undefined);
        });
        
    });
    
    describe('_twoMentsuYakuList()', () => {
        // ○○○○
        it('is pure double chow, short straight and mixed double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3),
                [ MCR_YAKU.PURE_DOUBLE_CHOW, MCR_YAKU.SHORT_STRAIGHT, MCR_YAKU.MIXED_DOUBLE_CHOW ]);
        });
        // ○○○×
        it('is pure double chow and two terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3),
                [ MCR_YAKU.PURE_DOUBLE_CHOW, MCR_YAKU.TWO_TERMINAL_CHOWS ]);
        });
        // ○○×○
        it('is short straight and mixed double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_03)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_06)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_03)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3),
                [ MCR_YAKU.SHORT_STRAIGHT, MCR_YAKU.MIXED_DOUBLE_CHOW ]);
        });
        // ○×○○
        it('is mixed double chow and two terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3),
                [ MCR_YAKU.MIXED_DOUBLE_CHOW, MCR_YAKU.TWO_TERMINAL_CHOWS ]);
        });
        // ×○○○
        it('is pure double chow and short straight.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_05)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_04)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_04)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3),
                [ MCR_YAKU.PURE_DOUBLE_CHOW, MCR_YAKU.SHORT_STRAIGHT ]);
        });
        // ○○◎◎
        it('is 1 of double "double pung".', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourPungs, 2, false),
                [ MCR_YAKU.DOUBLE_PUNG, MCR_YAKU.DOUBLE_PUNG ]);
        });
        // ○◎○◎
        it('is 2 of double "double pung".', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_04)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_04)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourPungs, 2, false),
                [ MCR_YAKU.DOUBLE_PUNG, MCR_YAKU.DOUBLE_PUNG ]);
        });
        // ○◎◎○
        it('is 3 of double "double pung".', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_05)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_06)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_06)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_05)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourPungs, 2, false),
                [ MCR_YAKU.DOUBLE_PUNG, MCR_YAKU.DOUBLE_PUNG ]);
        });
        // ○○××
        it('is two terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_04)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3),
                [ MCR_YAKU.TWO_TERMINAL_CHOWS ]);
        });
        // ××××
        it('is empty yaku list.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_05)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(fourChows, 3), []);
        });
        // ○○○
        it('is pure double chow and short straight.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(threeChows, 2),
                [ MCR_YAKU.PURE_DOUBLE_CHOW, MCR_YAKU.SHORT_STRAIGHT ]);
        });
        // ○○×
        it('is double pung.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(threePungs, 1, false),
                [ MCR_YAKU.DOUBLE_PUNG ]);
        });
        // ×××
        it('is empty yaku list.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_04)),
            ];
            assert.deepStrictEqual(McrUtil._twoMentsuYakuList(threePungs, 1, false), []);
        });
        
    });
    
    describe('_twoPungsYaku()', () => {
        
        it('is double pung.', () => {
            const twoPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
            ];
            assert.equal(McrUtil._twoPungsYaku(twoPungs), MCR_YAKU.DOUBLE_PUNG);
        });
        
        it('is not two pungs yaku.', () => {
            const twoPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
            ];
            assert.equal(McrUtil._twoChowsYaku(twoPungs), undefined);
        });
        
    });
    
    describe('_waitYaku()', () => {
        
        it('is edge wait.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI), true),
            ], new Janpai(JANPAI_ID.FA));
            const janpai = new Janpai(JANPAI_ID.MAN_03);
            const completableList = [ new Janpai(JANPAI_ID.MAN_03) ];
            assert.equal(McrUtil._waitYaku(completePattern, janpai, completableList),
                MCR_YAKU.EDGE_WAIT);
        });
        
        it('is closed wait.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_03), true),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI), true),
            ], new Janpai(JANPAI_ID.FA));
            const janpai = new Janpai(JANPAI_ID.MAN_02);
            const completableList = [ new Janpai(JANPAI_ID.MAN_02) ];
            assert.equal(McrUtil._waitYaku(completePattern, janpai, completableList),
                MCR_YAKU.CLOSED_WAIT);
        });
        
        it('is single wait.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_03), true),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI), true),
            ], new Janpai(JANPAI_ID.FA));
            const janpai = new Janpai(JANPAI_ID.FA);
            const completableList = [ new Janpai(JANPAI_ID.FA) ];
            assert.equal(McrUtil._waitYaku(completePattern, janpai, completableList),
                MCR_YAKU.SINGLE_WAIT);
        });
        
        it('is japanese edge wait.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_03), true),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_07)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI), true),
            ], new Janpai(JANPAI_ID.FA));
            const janpai = new Janpai(JANPAI_ID.MAN_03);
            const completableList = [ new Janpai(JANPAI_ID.MAN_03), new Janpai(JANPAI_ID.MAN_06) ];
            assert.equal(McrUtil._waitYaku(completePattern, janpai, completableList), undefined);
        });
        
    });
    
    describe('_windsYakuList()', () => {
        
        it('is big four winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.TON)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.NAN)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SHA)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PEI)),
            ], new Janpai(JANPAI_ID.MAN_01));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.SHA));
            assert.deepStrictEqual(McrUtil._windsYakuList(completePattern, completeInfo),
                [ MCR_YAKU.BIG_FOUR_WINDS ]);
        });
        
        it('is little four winds and prevalent wind.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.TON)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.NAN)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SHA)),
            ], new Janpai(JANPAI_ID.PEI));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.SHA), false, WIND.SHA, WIND.PEI);
            assert.deepStrictEqual(McrUtil._windsYakuList(completePattern, completeInfo),
                [ MCR_YAKU.LITTLE_FOUR_WINDS, MCR_YAKU.PREVALENT_WIND ]);
        });
        
        it('is big three winds, prevalent wind and seat wind.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.NAN)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SHA)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PEI)),
            ], new Janpai(JANPAI_ID.MAN_01));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.SHA), false, WIND.NAN, WIND.NAN);
            assert.deepStrictEqual(McrUtil._windsYakuList(completePattern, completeInfo),
                [ MCR_YAKU.BIG_THREE_WINDS, MCR_YAKU.PREVALENT_WIND, MCR_YAKU.SEAT_WIND ]);
        });
        
        it('is not winds yaku.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_09)),
            ], new Janpai(JANPAI_ID.TON));
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.SOU_09));
            assert.deepStrictEqual(McrUtil._windsYakuList(completePattern, completeInfo), []);
        });
        
    });
    
    describe('_yakuListWithFourChows()', () => {
        
        it('is pure terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
            ];
            const head = new Janpai(JANPAI_ID.MAN_05);
            assert.deepStrictEqual(McrUtil._yakuListWithFourChows(fourChows, head),
                [ MCR_YAKU.PURE_TERMINAL_CHOWS ]);
        });
        
        it('is quadruple chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
            ];
            const head = new Janpai(JANPAI_ID.TON);
            assert.deepStrictEqual(McrUtil._yakuListWithFourChows(fourChows, head),
                [ MCR_YAKU.QUADRUPLE_CHOW ]);
        });
        
        it('is four pure shifted chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_04)),
            ];
            const head = new Janpai(JANPAI_ID.TON);
            assert.deepStrictEqual(McrUtil._yakuListWithFourChows(fourChows, head),
                [ MCR_YAKU.FOUR_PURE_SHIFTED_CHOWS ]);
        });
        
        it('is three suited terminal chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)),
            ];
            const head = new Janpai(JANPAI_ID.SOU_05);
            assert.deepStrictEqual(McrUtil._yakuListWithFourChows(fourChows, head),
                [ MCR_YAKU.THREE_SUITED_TERMINAL_CHOWS ]);
        });
        
        it('is pure triple chow and mixed double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
            ];
            const head = new Janpai(JANPAI_ID.TON);
            assert.deepStrictEqual(McrUtil._yakuListWithFourChows(fourChows, head),
                [ MCR_YAKU.PURE_TRIPLE_CHOW, MCR_YAKU.MIXED_DOUBLE_CHOW ]);
        });
        
        it('is pure double chow, short straight and mixed double chow.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
            ];
            const head = new Janpai(JANPAI_ID.TON);
            assert.deepStrictEqual(McrUtil._yakuListWithFourChows(fourChows, head),
                [ MCR_YAKU.PURE_DOUBLE_CHOW, MCR_YAKU.SHORT_STRAIGHT, MCR_YAKU.MIXED_DOUBLE_CHOW ]);
        });
        
    });
    
    describe('_yakuListWithFourPungs()', () => {
        
        it('is four pure shifted pungs.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_04)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithFourPungs(fourPungs),
                [ MCR_YAKU.FOUR_PURE_SHIFTED_PUNGS ]);
        });
        
        it('is pure shifted pungs and double pung.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_05)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_06)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithFourPungs(fourPungs),
                [ MCR_YAKU.PURE_SHIFTED_PUNGS, MCR_YAKU.DOUBLE_PUNG ]);
        });
        
        it('is double "double pung".', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithFourPungs(fourPungs),
                [ MCR_YAKU.DOUBLE_PUNG, MCR_YAKU.DOUBLE_PUNG ]);
        });
        
    });
    
    describe('_yakuListWithThreeChows()', () => {
        
        it('is pure triple chow.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithThreeChows(threeChows, 2),
                [ MCR_YAKU.PURE_TRIPLE_CHOW ]);
        });
        
        it('is pure double chow and short straight.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_05)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithThreeChows(threeChows, 2),
                [ MCR_YAKU.PURE_DOUBLE_CHOW, MCR_YAKU.SHORT_STRAIGHT ]);
        });
        
    });
    
    describe('_yakuListWithThreePungs()', () => {
        
        it('is pure shifted pungs.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_03)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithThreePungs(threePungs),
                [ MCR_YAKU.PURE_SHIFTED_PUNGS ]);
        });
        
        it('is double pung.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            assert.deepStrictEqual(McrUtil._yakuListWithThreePungs(threePungs),
                [ MCR_YAKU.DOUBLE_PUNG ]);
        });
        
    });
    
    
    
    function createMcrUtil() {
        return new McrUtil();
    }
    
});

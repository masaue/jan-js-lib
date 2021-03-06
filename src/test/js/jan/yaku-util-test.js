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
import CompleteType from '../../../main/js/jan/complete-type';
import Hand from '../../../main/js/jan/hand';
import Janpai from '../../../main/js/jan/janpai';
import JanpaiID from '../../../main/js/jan/janpai-id';
import McrYaku from '../../../main/js/jan/mcr-yaku';
import Mentsu from '../../../main/js/jan/mentsu';
import ZjmYaku from '../../../main/js/jan/zjm-yaku';
import YakuUtil from '../../../main/js/jan/yaku-util';

describe('YakuUtilTest', () => {
    
    describe('allFives()', () => {
        
        it('is all fives.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_05)),
            ], new Janpai(JanpaiID.PIN_05));
            assert(YakuUtil.allFives(completePattern));
        });
        
        it('is not all fives.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_05)),
            ], new Janpai(JanpaiID.PIN_05));
            assert(!YakuUtil.allFives(completePattern));
        });
        
        it('does not have five head.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_05)),
            ], new Janpai(JanpaiID.PIN_04));
            assert(!YakuUtil.allFives(completePattern));
        });
        
    });
    
    describe('allGreen()', () => {
        
        it('is all green', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.FA),
            ];
            assert(YakuUtil.allGreen(janpaiList));
        });
        
        it('is not all green.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_01),
            ];
            assert(!YakuUtil.allGreen(janpaiList));
        });
        
    });
    
    describe('allSimples()', () => {
        
        it('does not have a yao janpai.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
            ];
            assert(YakuUtil.allSimples(janpaiList));
        });
        
        it('has a yao janpai.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
            ];
            assert(!YakuUtil.allSimples(janpaiList));
        });
        
    });
    
    describe('allTerminals()', () => {
        
        it('is all terminals.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.SOU_09),
            ];
            assert(YakuUtil.allTerminals(janpaiList));
        });
        
        it('has simple tile.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.SOU_09),
            ];
            assert(!YakuUtil.allTerminals(janpaiList));
        });
        
        it('is not all terminals.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.SOU_09),
                new Janpai(JanpaiID.TON),
            ];
            assert(!YakuUtil.allTerminals(janpaiList));
        });
        
    });
    
    describe('allTerminalsAndHonors()', () => {
        
        it('is all terminals and honors.', () => {
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
            assert(YakuUtil.allTerminalsAndHonors(janpaiList));
        });
        
        it('is not all terminals and honors.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
            ];
            assert(!YakuUtil.allTerminalsAndHonors(janpaiList));
        });
        
        it('is all honors.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.SHA),
                new Janpai(JanpaiID.PEI),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.FA),
                new Janpai(JanpaiID.CHUN),
            ];
            assert(!YakuUtil.allTerminalsAndHonors(janpaiList));
        });
        
        it('is all terminals.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.SOU_09),
            ];
            assert(!YakuUtil.allTerminalsAndHonors(janpaiList));
        });
        
    });
    
    describe('allTypes()', () => {
        
        it('is all types.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.BAI),
            ];
            assert(YakuUtil.allTypes(janpaiList));
        });
        
        it('is not all types.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
            ];
            assert(!YakuUtil.allTypes(janpaiList));
        });
        
        it('does not have wind tile.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.BAI),
            ];
            assert(!YakuUtil.allTypes(janpaiList));
        });
        
        it('does not have dragon tile.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.TON),
            ];
            assert(!YakuUtil.allTypes(janpaiList));
        });
        
    });
    
    describe('chickenHand()', () => {
        
        it('is chicken hand.', () => {
            assert(YakuUtil.chickenHand([]));
        });
        
        it('is not chicken hand.', () => {
            assert(!YakuUtil.chickenHand([ McrYaku.NINE_GATES ]));
        });
        
    });
    
    describe('closedWait()', () => {
        
        it('is closed wait.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
            ], new Janpai(JanpaiID.PIN_01));
            const janpai = new Janpai(JanpaiID.MAN_02);
            assert(YakuUtil.closedWait(completePattern, janpai));
        });
        
        it('is not closed wait.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ], new Janpai(JanpaiID.PIN_01));
            const janpai = new Janpai(JanpaiID.MAN_03);
            assert(!YakuUtil.closedWait(completePattern, janpai));
        });
        
        it('does not have concealed chow.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02), true),
            ], new Janpai(JanpaiID.PIN_01));
            const janpai = new Janpai(JanpaiID.MAN_02);
            assert(!YakuUtil.closedWait(completePattern, janpai));
        });
        
        it('is knitted straight chow.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKnittedChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ], new Janpai(JanpaiID.PIN_01));
            const janpai = new Janpai(JanpaiID.MAN_04);
            assert(!YakuUtil.closedWait(completePattern, janpai));
        });
        
    });
    
    describe('concealedHand()', () => {
        
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
            assert(YakuUtil.concealedHand(hand, completeInfo));
        });
        
        it('is not concealed hand.', () => {
            const janpaiList = [
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
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON));
            assert(!YakuUtil.concealedHand(hand, completeInfo));
        });
        
        it('is fully concealed.', () => {
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
                false, undefined, undefined, CompleteType.DRAW);
            assert(!YakuUtil.concealedHand(hand, completeInfo));
        });
        
    });
    
    describe('doublePung()', () => {
        
        it('is double pung.', () => {
            const doublePung = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            assert(YakuUtil.doublePung(doublePung));
        });
        
        it('is not double pung.', () => {
            const doublePung = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert(!YakuUtil.doublePung(doublePung));
        });
        
    });
    
    describe('edgeWait()', () => {
        
        it('is edge wait(complete number is 3).', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
            ], new Janpai(JanpaiID.PIN_01));
            const janpai = new Janpai(JanpaiID.MAN_03);
            assert(YakuUtil.edgeWait(completePattern, janpai));
        });
        
        it('is edge wait(complete number is 7).', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07), true),
            ], new Janpai(JanpaiID.PIN_01));
            const janpai = new Janpai(JanpaiID.PIN_07);
            assert(YakuUtil.edgeWait(completePattern, janpai));
        });
        
        it('does not have expected head.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_06), true),
            ], new Janpai(JanpaiID.PIN_01));
            const janpai = new Janpai(JanpaiID.SOU_08);
            assert(!YakuUtil.edgeWait(completePattern, janpai));
        });
        
        it('is not edge wait(complete number is 2).', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
            ], new Janpai(JanpaiID.PIN_01));
            const janpai = new Janpai(JanpaiID.MAN_02);
            assert(!YakuUtil.edgeWait(completePattern, janpai));
        });
        
        it('is not edge wait(complete number is 8).', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07), true),
            ], new Janpai(JanpaiID.PIN_01));
            const janpai = new Janpai(JanpaiID.PIN_08);
            assert(!YakuUtil.edgeWait(completePattern, janpai));
        });
        
        it('does not have concealed chow.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02), true),
            ], new Janpai(JanpaiID.PIN_01));
            const janpai = new Janpai(JanpaiID.SOU_03);
            assert(!YakuUtil.edgeWait(completePattern, janpai));
        });
        
    });
    
    describe('fourPureShiftedPungs()', () => {
        
        it('is four pure shifted pungs.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            assert(YakuUtil.fourPureShiftedPungs(fourPungs));
        });
        
        it('has MAN and PIN.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_04)),
            ];
            assert(!YakuUtil.fourPureShiftedPungs(fourPungs));
        });
        
        it('is not four pure shifted pungs.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_05)),
            ];
            assert(!YakuUtil.fourPureShiftedPungs(fourPungs));
        });
        
    });
    
    describe('fourShiftedChows()', () => {
        
        it('is four shifted chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            assert(YakuUtil.fourShiftedChows(fourChows));
        });
        
        it('is four shifted chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
            ];
            assert(YakuUtil.fourShiftedChows(fourChows));
        });
        
        it('has MAN and PIN.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
            ];
            assert(!YakuUtil.fourShiftedChows(fourChows));
        });
        
        it('is not four shifted chows.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_06)),
            ];
            assert(!YakuUtil.fourShiftedChows(fourChows));
        });
        
    });
    
    describe('fullFlush()', () => {
        
        it('has only MAN.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
            ];
            assert(YakuUtil.fullFlush(janpaiList));
        });
        
        it('has only JI.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
            ];
            assert(!YakuUtil.fullFlush(janpaiList));
        });
        
        it('has MAN and PIN.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.PIN_01),
            ];
            assert(!YakuUtil.fullFlush(janpaiList));
        });
        
    });
    
    describe('fullyConcealed()', () => {
        
        it('is fully concealed.', () => {
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
                false, undefined, undefined, CompleteType.DRAW);
            assert(YakuUtil.fullyConcealed(hand, completeInfo));
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
                false, undefined, undefined, CompleteType.DRAW);
            assert(!YakuUtil.fullyConcealed(hand, completeInfo));
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
            assert(!YakuUtil.fullyConcealed(hand, completeInfo));
        });
        
    });
    
    describe('greaterHonorsAndKnittedTiles()', () => {
        
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
            assert(YakuUtil.greaterHonorsAndKnittedTiles(janpaiList));
        });
        
        it('is not greater honors and knitted tiles.', () => {
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
            assert(!YakuUtil.greaterHonorsAndKnittedTiles(janpaiList));
        });
        
    });
    
    describe('halfFlush()', () => {
        
        it('has MAN and JI.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.TON),
            ];
            assert(YakuUtil.halfFlush(janpaiList));
        });
        
        it('has only MAN.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
            ];
            assert(!YakuUtil.halfFlush(janpaiList));
        });
        
        it('has MAN and PIN.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.PIN_01),
            ];
            assert(!YakuUtil.halfFlush(janpaiList));
        });
        
    });
    
    describe('honorsAndKnittedTiles()', () => {
        
        it('has seven number tiles, and it returns true.', () => {
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
            assert(YakuUtil.honorsAndKnittedTiles(janpaiList));
        });
        
        it('has seven number tiles, and it returns false.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
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
            assert(!YakuUtil.honorsAndKnittedTiles(janpaiList));
        });
        
        it('has eight number tiles, and it returns true.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.SHA),
                new Janpai(JanpaiID.PEI),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.FA),
            ];
            assert(YakuUtil.honorsAndKnittedTiles(janpaiList));
        });
        
        it('has eight number tiles, and it returns false.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.SHA),
                new Janpai(JanpaiID.PEI),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.FA),
            ];
            assert(!YakuUtil.honorsAndKnittedTiles(janpaiList));
        });
        
        it('has nine number tiles, and it returns true.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.SHA),
                new Janpai(JanpaiID.PEI),
                new Janpai(JanpaiID.BAI),
            ];
            assert(YakuUtil.honorsAndKnittedTiles(janpaiList));
        });
        
        it('has nine number tiles, and it returns false.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.SHA),
                new Janpai(JanpaiID.PEI),
                new Janpai(JanpaiID.BAI),
            ];
            assert(!YakuUtil.honorsAndKnittedTiles(janpaiList));
        });
        
        it('does not have unique janpaiList.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.NAN),
                new Janpai(JanpaiID.SHA),
                new Janpai(JanpaiID.PEI),
                new Janpai(JanpaiID.PEI),
            ];
            assert(!YakuUtil.honorsAndKnittedTiles(janpaiList));
        });
        
    });
    
    describe('incidentalBonusesYakuList()', () => {
        
        it('is final draw and win on kong.', () => {
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON),
                false, undefined, undefined, CompleteType.FINAL_DRAW_AND_WIN_ON_KONG);
            assert.deepStrictEqual(YakuUtil.incidentalBonusesYakuList(completeInfo),
                [ ZjmYaku.FINAL_DRAW, ZjmYaku.WIN_ON_KONG ]);
        });
        
        it('is final draw.', () => {
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON),
                false, undefined, undefined, CompleteType.FINAL_DRAW);
            assert.deepStrictEqual(YakuUtil.incidentalBonusesYakuList(completeInfo),
                [ ZjmYaku.FINAL_DRAW ]);
        });
        
        it('is final discard.', () => {
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON),
                false, undefined, undefined, CompleteType.FINAL_DISCARD);
            assert.deepStrictEqual(YakuUtil.incidentalBonusesYakuList(completeInfo),
                [ ZjmYaku.FINAL_DISCARD ]);
        });
        
        it('is win on kong.', () => {
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON),
                false, undefined, undefined, CompleteType.WIN_ON_KONG);
            assert.deepStrictEqual(YakuUtil.incidentalBonusesYakuList(completeInfo),
                [ ZjmYaku.WIN_ON_KONG ]);
        });
        
        it('is win on kong.', () => {
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON),
                false, undefined, undefined, CompleteType.ROBBING_A_KONG);
            assert.deepStrictEqual(YakuUtil.incidentalBonusesYakuList(completeInfo),
                [ ZjmYaku.ROBBING_A_KONG ]);
        });
        
        it('is empty yaku list.', () => {
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON));
            assert.deepStrictEqual(YakuUtil.incidentalBonusesYakuList(completeInfo), []);
        });
        
    });
    
    describe('knittedStraight()', () => {
        
        it('is MPS knitted straight.', () => {
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
            ];
            assert(YakuUtil.knittedStraight(janpaiList));
        });
        
        it('is MSP knitted straight.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.PIN_09),
            ];
            assert(YakuUtil.knittedStraight(janpaiList));
        });
        
        it('is PSM knitted straight.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_09),
            ];
            assert(YakuUtil.knittedStraight(janpaiList));
        });
        
        it('is PMS knitted straight.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_09),
            ];
            assert(YakuUtil.knittedStraight(janpaiList));
        });
        
        it('is SMP knitted straight.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.PIN_09),
            ];
            assert(YakuUtil.knittedStraight(janpaiList));
        });
        
        it('is SPM knitted straight.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_08),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_09),
            ];
            assert(YakuUtil.knittedStraight(janpaiList));
        });
        
        it('is not knitted straight.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_08),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_09),
            ];
            assert.equal(YakuUtil.knittedStraight(janpaiList), undefined);
        });
        
    });
    
    describe('lastTile()', () => {
        
        it('is last tile.', () => {
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON), true);
            assert(YakuUtil.lastTile(completeInfo));
        });
        
        it('is not last tile.', () => {
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON));
            assert(!YakuUtil.lastTile(completeInfo));
        });
        
    });
    
    describe('lowerFour()', () => {
        
        it('is lower four.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_04),
            ];
            assert(YakuUtil.lowerFour(janpaiList));
        });
        
        it('is not lower four.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_05),
            ];
            assert(!YakuUtil.lowerFour(janpaiList));
        });
        
    });
    
    describe('lowerTiles()', () => {
        
        it('is lower tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_03),
            ];
            assert(YakuUtil.lowerTiles(janpaiList));
        });
        
        it('is not lower tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_04),
            ];
            assert(!YakuUtil.lowerTiles(janpaiList));
        });
        
    });
    
    describe('middleTiles()', () => {
        
        it('is middle tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_05),
            ];
            assert(YakuUtil.middleTiles(janpaiList));
        });
        
        it('is not middle tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_07),
            ];
            assert(!YakuUtil.middleTiles(janpaiList));
        });
        
    });
    
    describe('meldedHand()', () => {
        
        it('is melded hand.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON));
            assert(YakuUtil.meldedHand(hand, completeInfo));
        });
        
        it('is not melded hand.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)));
            hand.fix(Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_05), true));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)));
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON));
            assert(!YakuUtil.meldedHand(hand, completeInfo));
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
                false, undefined, undefined, CompleteType.DRAW);
            assert(!YakuUtil.meldedHand(hand, completeInfo));
        });
        
    });
    
    describe('mixedDoubleChow()', () => {
        
        it('is mixed double chow.', () => {
            const doubleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            assert(YakuUtil.mixedDoubleChow(doubleChow));
        });
        
        it('does not have two suits.', () => {
            const doubleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert(!YakuUtil.mixedDoubleChow(doubleChow));
        });
        
        it('is not mixed double chow.', () => {
            const doubleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert(!YakuUtil.mixedDoubleChow(doubleChow));
        });
        
    });
    
    describe('mixedShiftedChows()', () => {
        
        it('is mixed shifted chows.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
            ];
            assert(YakuUtil.mixedShiftedChows(threeChows));
        });
        
        it('does not have three suits.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_03)),
            ];
            assert(!YakuUtil.mixedShiftedChows(threeChows));
        });
        
        it('is not mixed shifted chows.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)),
            ];
            assert(!YakuUtil.mixedShiftedChows(threeChows));
        });
        
    });
    
    describe('mixedShiftedPungs()', () => {
        
        it('is mixed shifted pungs.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_03)),
            ];
            assert(YakuUtil.mixedShiftedPungs(threePungs));
        });
        
        it('does not have three suits.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03)),
            ];
            assert(!YakuUtil.mixedShiftedPungs(threePungs));
        });
        
        it('is not mixed shifted pungs.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_04)),
            ];
            assert(!YakuUtil.mixedShiftedPungs(threePungs));
        });
        
    });
    
    describe('mixedStraight()', () => {
        
        it('is mixed straight.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_07)),
            ];
            assert(YakuUtil.mixedStraight(threeChows));
        });
        
        it('does not have three suits.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
            ];
            assert(!YakuUtil.mixedStraight(threeChows));
        });
        
        it('is not mixed straight.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_06)),
            ];
            assert(!YakuUtil.mixedStraight(threeChows));
        });
        
    });
    
    describe('mixedTripleChow()', () => {
        
        it('is mixed triple chow.', () => {
            const tripleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
            ];
            assert(YakuUtil.mixedTripleChow(tripleChow));
        });
        
        it('does not have three suits.', () => {
            const tripleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            assert(!YakuUtil.mixedTripleChow(tripleChow));
        });
        
        it('is not mixed triple chow.', () => {
            const tripleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert(!YakuUtil.mixedTripleChow(tripleChow));
        });
        
    });
    
    describe('nineGates()', () => {
        
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
            assert(YakuUtil.nineGates(janpaiList));
        });
        
        it('is not nine gates pattern.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
            ];
            assert(!YakuUtil.nineGates(janpaiList));
        });
        
        it('is not nine gates.', () => {
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
            ];
            assert(!YakuUtil.nineGates(janpaiList));
        });
        
        it('is not fullflush.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.PIN_01),
            ];
            assert(!YakuUtil.nineGates(janpaiList));
        });
        
    });
    
    describe('noHonors()', () => {
        
        it('is no honors.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
            ];
            assert(YakuUtil.noHonors(janpaiList));
        });
        
        it('is not no honors.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.TON),
            ];
            assert(!YakuUtil.noHonors(janpaiList));
        });
        
    });
    
    describe('oneVoidedSuit()', () => {
        
        it('is one voided suit.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.TON),
            ];
            assert(YakuUtil.oneVoidedSuit(janpaiList));
        });
        
        it('is not one voided suit.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.SOU_01),
            ];
            assert(!YakuUtil.oneVoidedSuit(janpaiList));
        });
        
    });
    
    describe('pureDoubleChow()', () => {
        
        it('is pure double chow.', () => {
            const doubleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert(YakuUtil.pureDoubleChow(doubleChow));
        });
        
        it('is not pure double chow.', () => {
            const doubleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
            ];
            assert(!YakuUtil.pureDoubleChow(doubleChow));
        });
        
    });
    
    describe('pureShiftedChows()', () => {
        
        it('is pure shifted chows.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
            ];
            assert(YakuUtil.pureShiftedChows(threeChows));
        });
        
        it('is three shifted chows.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_05)),
            ];
            assert(YakuUtil.pureShiftedChows(threeChows));
        });
        
        it('has MAN and PIN.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_05)),
            ];
            assert(!YakuUtil.pureShiftedChows(threeChows));
        });
        
        it('is not three shifted chows.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            assert(!YakuUtil.pureShiftedChows(threeChows));
        });
        
    });
    
    describe('pureShiftedPungs()', () => {
        
        it('is pure shifted pungs.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
            ];
            assert(YakuUtil.pureShiftedPungs(threePungs));
        });
        
        it('has MAN and PIN.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03)),
            ];
            assert(!YakuUtil.pureShiftedPungs(threePungs));
        });
        
        it('is not pure shifted pungs.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            assert(!YakuUtil.pureShiftedPungs(threePungs));
        });
        
    });
    
    describe('pureStraight()', () => {
        
        it('is pure straight.', () => {
            const tripleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
            ];
            assert(YakuUtil.pureStraight(tripleChow));
        });
        
        it('has MAN and PIN.', () => {
            const tripleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
            ];
            assert(!YakuUtil.pureStraight(tripleChow));
        });
        
        it('is not pure straight.', () => {
            const tripleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_06)),
            ];
            assert(!YakuUtil.pureStraight(tripleChow));
        });
        
    });
    
    describe('pureTripleChow()', () => {
        
        it('is pure triple chow.', () => {
            const tripleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert(YakuUtil.pureTripleChow(tripleChow));
        });
        
        it('is not pure triple chow.', () => {
            const tripleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert(!YakuUtil.pureTripleChow(tripleChow));
        });
        
        it('is not pure triple chow.', () => {
            const tripleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
            ];
            assert(!YakuUtil.pureTripleChow(tripleChow));
        });
        
    });
    
    describe('quadrupleChow()', () => {
        
        it('is quadruple chow.', () => {
            const quadrupleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert(YakuUtil.quadrupleChow(quadrupleChow));
        });
        
        it('is not quadruple chow.', () => {
            const quadrupleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert(!YakuUtil.quadrupleChow(quadrupleChow));
        });
        
        it('is not quadruple chow.', () => {
            const quadrupleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert(!YakuUtil.quadrupleChow(quadrupleChow));
        });
        
        it('is not quadruple chow.', () => {
            const quadrupleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
            ];
            assert(!YakuUtil.quadrupleChow(quadrupleChow));
        });
        
    });
    
    describe('reversibleTiles()', () => {
        
        it('is reversible tiles', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_08),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_09),
                new Janpai(JanpaiID.BAI),
            ];
            assert(YakuUtil.reversibleTiles(janpaiList));
        });
        
        it('is not reversible tiles', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_01),
            ];
            assert(!YakuUtil.reversibleTiles(janpaiList));
        });
        
    });
    
    describe('selfDrawn()', () => {
        
        it('is self drawn.', () => {
            const janpaiList = [
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
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON),
                false, undefined, undefined, CompleteType.DRAW);
            assert(YakuUtil.selfDrawn(hand, completeInfo));
        });
        
        it('is fully concealed.', () => {
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
                false, undefined, undefined, CompleteType.DRAW);
            assert(!YakuUtil.selfDrawn(hand, completeInfo));
        });
        
        it('is not self drawn.', () => {
            const janpaiList = [
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
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)));
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.TON));
            assert(!YakuUtil.selfDrawn(hand, completeInfo));
        });
        
    });
    
    describe('sevenPairs()', () => {
        
        it('is seven pairs.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
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
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_08),
            ];
            assert(YakuUtil.sevenPairs(janpaiList));
        });
        
        it('is not seven pairs.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
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
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_09),
            ];
            assert(!YakuUtil.sevenPairs(janpaiList));
        });
        
        it('is four pairs.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_05),
            ];
            assert(!YakuUtil.sevenPairs(janpaiList));
        });
        
    });
    
    describe('sevenShiftedPairs()', () => {
        
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
            assert(YakuUtil.sevenShiftedPairs(janpaiList));
        });
        
        it('has unexpected top.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
            ];
            assert(!YakuUtil.sevenShiftedPairs(janpaiList));
        });
        
        it('s uniqueList length is not 7.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
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
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
            ];
            assert(!YakuUtil.sevenShiftedPairs(janpaiList));
        });
        
        it('is not seven shifted pairs.', () => {
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
            assert(!YakuUtil.sevenShiftedPairs(janpaiList));
        });
        
    });
    
    describe('shortStraight()', () => {
        
        it('is short straight.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            assert(YakuUtil.shortStraight(twoChows));
        });
        
        it('has MAN and PIN.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04)),
            ];
            assert(!YakuUtil.shortStraight(twoChows));
        });
        
        it('is not short straight.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
            ];
            assert(!YakuUtil.shortStraight(twoChows));
        });
        
    });
    
    describe('singleWait()', () => {
        
        it('is single wait.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
            ], new Janpai(JanpaiID.PIN_01));
            const janpai = new Janpai(JanpaiID.PIN_01);
            assert(YakuUtil.singleWait(completePattern, janpai));
        });
        
        it('is not single wait.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKnittedChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ], new Janpai(JanpaiID.PIN_01));
            const janpai = new Janpai(JanpaiID.PIN_02);
            assert(!YakuUtil.singleWait(completePattern, janpai));
        });
        
    });
    
    describe('terminalsYaku()', () => {
        
        it('is mixed greater terminals.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_09)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(YakuUtil.terminalsYaku(completePattern),
                         ZjmYaku.MIXED_GREATER_TERMINALS);
        });
        
        it('is mixed lesser terminals.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(YakuUtil.terminalsYaku(completePattern),
                         ZjmYaku.MIXED_LESSER_TERMINALS);
        });
        
        it('is pure greater terminals.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_09)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_09)),
            ], new Janpai(JanpaiID.SOU_01));
            assert.equal(YakuUtil.terminalsYaku(completePattern),
                         ZjmYaku.PURE_GREATER_TERMINALS);
        });
        
        it('is pure lesser terminals.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_09)),
            ], new Janpai(JanpaiID.SOU_01));
            assert.equal(YakuUtil.terminalsYaku(completePattern),
                         ZjmYaku.PURE_LESSER_TERMINALS);
        });
        
        it('does not have yao mentsu.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_09)),
            ], new Janpai(JanpaiID.SOU_01));
            assert.equal(YakuUtil.terminalsYaku(completePattern), undefined);
        });
        
    });
    
    describe('thirteenOrphans()', () => {
        
        it('is thirteen orphans.', () => {
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
                new Janpai(JanpaiID.CHUN),
            ];
            assert(YakuUtil.thirteenOrphans(janpaiList));
        });
        
        it('has twelve unique tiles', () => {
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
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.FA),
                new Janpai(JanpaiID.FA),
            ];
            assert(!YakuUtil.thirteenOrphans(janpaiList));
        });
        
        it('has simple tile.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
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
                new Janpai(JanpaiID.FA),
            ];
            assert(!YakuUtil.thirteenOrphans(janpaiList));
        });
        
    });
    
    describe('tileHogCount()', () => {
        
        it('has three tile hog.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
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
                new Janpai(JanpaiID.MAN_04),
            ];
            const hand = new Hand(janpaiList);
            const janpai = new Janpai(JanpaiID.MAN_04);
            assert.equal(YakuUtil.tileHogCount(hand, janpai), 3);
        });
        
        it('is thirteen orphans.', () => {
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
            const janpai = new Janpai(JanpaiID.CHUN);
            assert.equal(YakuUtil.tileHogCount(hand, janpai), 0);
        });
        
        it('has one tile hog.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_05),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01)));
            hand.fix(Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_02)));
            hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)));
            const janpai = new Janpai(JanpaiID.MAN_03);
            assert.equal(YakuUtil.tileHogCount(hand, janpai), 1);
        });
        
    });
    
    describe('triplePung()', () => {
        
        it('is triple pung.', () => {
            const triplePung = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
            ];
            assert(YakuUtil.triplePung(triplePung));
        });
        
        it('is not triple pung.', () => {
            const triplePung = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert(!YakuUtil.triplePung(triplePung));
        });
        
    });
    
    describe('twoIdenticalSequencesTwice()', () => {
        
        it('is two identical sequences twice.', () => {
            const quadrupleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            assert(YakuUtil.twoIdenticalSequencesTwice(quadrupleChow));
        });
        
        it('is not two identical sequences twice.', () => {
            const quadrupleChow = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_03)),
            ];
            assert(!YakuUtil.twoIdenticalSequencesTwice(quadrupleChow));
        });
        
    });
    
    describe('twoTerminalChows()', () => {
        
        it('is two terminal chows.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
            ];
            assert(YakuUtil.twoTerminalChows(twoChows));
        });
        
        it('has MAN and PIN.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
            ];
            assert(!YakuUtil.twoTerminalChows(twoChows));
        });
        
        it('is not two terminal chows.', () => {
            const twoChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_06)),
            ];
            assert(!YakuUtil.twoTerminalChows(twoChows));
        });
        
    });
    
    describe('upperFour()', () => {
        
        it('is upper four.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_06),
            ];
            assert(YakuUtil.upperFour(janpaiList));
        });
        
        it('is not upper four.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_05),
            ];
            assert(!YakuUtil.upperFour(janpaiList));
        });
        
    });
    
    describe('upperTiles()', () => {
        
        it('is upper tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_07),
            ];
            assert(YakuUtil.upperTiles(janpaiList));
        });
        
        it('is not upper tiles.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_06),
            ];
            assert(!YakuUtil.upperTiles(janpaiList));
        });
        
    });
    
    
    
    function createYakuUtil() {
        return new YakuUtil();
    }
    
});

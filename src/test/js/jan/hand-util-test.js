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

import CompleteInfo from './complete-info';
import CompletePattern from './complete-pattern';
import Hand from './hand';
import HandUtil from './hand-util';
import Janpai from './janpai';
import JanpaiID from './janpai-id';
import Mentsu from './mentsu';

describe('HandUtilTest', () => {
    
    describe('completable()', () => {
        
        it('is single wait.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
            ];
            const hand = new Hand(janpaiList);
            assert(HandUtil.completable(hand, new Janpai(JanpaiID.MAN_01)));
        });
        
        it('deals with chowList as priority.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_09),
                new Janpai(JanpaiID.SOU_09),
                new Janpai(JanpaiID.SOU_09),
            ];
            const hand = new Hand(janpaiList);
            assert(HandUtil.completable(hand, new Janpai(JanpaiID.MAN_01)));
        });
        
        it('deals with pungList as priority.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
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
            assert(HandUtil.completable(hand, new Janpai(JanpaiID.MAN_01)));
        });
        
        it('deals with knitted straight, and chowList as priority.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_09),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            assert(HandUtil.completable(hand, new Janpai(JanpaiID.PIN_01)));
        });
        
        it('deals with knitted straight, and pungList as priority.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.BAI),
            ];
            const hand = new Hand(janpaiList);
            assert(HandUtil.completable(hand, new Janpai(JanpaiID.SOU_01)));
        });
        
        it('is not completable.', () => {
            const janpaiList = [
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
            const hand = new Hand(janpaiList);
            assert(!HandUtil.completable(hand, new Janpai(JanpaiID.MAN_01)));
        });
        
    });
    
    describe('completePatternList()', () => {
        
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
            assert.deepStrictEqual(HandUtil.completePatternList(hand, completeInfo), [
                new CompletePattern([
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                ], new Janpai(JanpaiID.TON)),
                new CompletePattern([
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                    Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01), true),
                    Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02), true),
                    Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03), true),
                ], new Janpai(JanpaiID.TON)),
            ]);
        });
        
        it('is four pure shifted pungs.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01));
            assert.deepStrictEqual(HandUtil.completePatternList(hand, completeInfo), [
                new CompletePattern([
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                    Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_04), true),
                ], new Janpai(JanpaiID.TON)),
                new CompletePattern([
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02), true),
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02), true),
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02), true),
                    Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                ], new Janpai(JanpaiID.TON)),
                new CompletePattern([
                    Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                    Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02), true),
                    Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03), true),
                    Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_04), true),
                ], new Janpai(JanpaiID.TON)),
            ]);
        });
        
        it('is two tile hog.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.PIN_08),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.PIN_04));
            assert.deepStrictEqual(HandUtil.completePatternList(hand, completeInfo), [
                new CompletePattern([
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_03), true),
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_04), true),
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_06), true),
                    Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_07), true),
                ], new Janpai(JanpaiID.PIN_04)),
                new CompletePattern([
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_03), true),
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_05), true),
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_06), true),
                    Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_04), true),
                ], new Janpai(JanpaiID.PIN_07)),
            ]);
        });
        
        it('is knitted straight.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_08),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_09),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01));
            assert.deepStrictEqual(HandUtil.completePatternList(hand, completeInfo), [
                new CompletePattern([
                    Mentsu.createKnittedChowMentsu(new Janpai(JanpaiID.MAN_01)),
                    Mentsu.createKnittedChowMentsu(new Janpai(JanpaiID.PIN_02)),
                    Mentsu.createKnittedChowMentsu(new Janpai(JanpaiID.SOU_03)),
                    Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01), true),
                ], new Janpai(JanpaiID.TON)),
            ]);
        });
        
    });
    
    describe('_pungList()', () => {
        
        it('has three pungs.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.SOU_01),
            ];
            const pungList = [ new Janpai(JanpaiID.MAN_09), new Janpai(JanpaiID.PIN_09) ];
            assert.deepEqual(HandUtil._pungList(janpaiList), pungList);
        });
        
    });
    
    
    
    function createHandUtil() {
        return new HandUtil();
    }
    
});

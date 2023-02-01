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
import {CompletePattern} from '../../../main/js/jan/complete-pattern';
import Hand from '../../../main/js/jan/hand';
import HandUtil from '../../../main/js/jan/hand-util';
import {Janpai} from '../../../main/js/jan/janpai';
import {JANPAI_ID} from '../../../main/js/jan/janpai-id';
import {Mentsu} from '../../../main/js/jan/mentsu';

describe('HandUtilTest', () => {
    
    describe('completable()', () => {
        
        it('is single wait.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
            ];
            const hand = new Hand(janpaiList);
            assert(HandUtil.completable(hand, new Janpai(JANPAI_ID.MAN_01)));
        });
        
        it('deals with chowList as priority.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_09),
                new Janpai(JANPAI_ID.SOU_09),
                new Janpai(JANPAI_ID.SOU_09),
            ];
            const hand = new Hand(janpaiList);
            assert(HandUtil.completable(hand, new Janpai(JANPAI_ID.MAN_01)));
        });
        
        it('deals with pungList as priority.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
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
            assert(HandUtil.completable(hand, new Janpai(JANPAI_ID.MAN_01)));
        });
        
        it('deals with knitted straight, and chowList as priority.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_09),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            assert(HandUtil.completable(hand, new Janpai(JANPAI_ID.PIN_01)));
        });
        
        it('deals with knitted straight, and pungList as priority.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.BAI),
                new Janpai(JANPAI_ID.BAI),
            ];
            const hand = new Hand(janpaiList);
            assert(HandUtil.completable(hand, new Janpai(JANPAI_ID.SOU_01)));
        });
        
        it('is not completable.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
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
                new Janpai(JANPAI_ID.FA),
            ];
            const hand = new Hand(janpaiList);
            assert(!HandUtil.completable(hand, new Janpai(JANPAI_ID.MAN_01)));
        });
        
    });
    
    describe('completePatternList()', () => {
        
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
            assert.deepStrictEqual(HandUtil.completePatternList(hand, completeInfo), [
                new CompletePattern([
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                ], new Janpai(JANPAI_ID.TON)),
                new CompletePattern([
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                    Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                    Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02), true),
                    Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_03), true),
                ], new Janpai(JANPAI_ID.TON)),
            ]);
        });
        
        it('is four pure shifted pungs.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_01));
            assert.deepStrictEqual(HandUtil.completePatternList(hand, completeInfo), [
                new CompletePattern([
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                    Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_04), true),
                ], new Janpai(JANPAI_ID.TON)),
                new CompletePattern([
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02), true),
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02), true),
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02), true),
                    Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                ], new Janpai(JANPAI_ID.TON)),
                new CompletePattern([
                    Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                    Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02), true),
                    Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_03), true),
                    Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_04), true),
                ], new Janpai(JANPAI_ID.TON)),
            ]);
        });
        
        it('is two tile hog.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.PIN_08),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.PIN_04));
            assert.deepStrictEqual(HandUtil.completePatternList(hand, completeInfo), [
                new CompletePattern([
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_03), true),
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_04), true),
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_06), true),
                    Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_07), true),
                ], new Janpai(JANPAI_ID.PIN_04)),
                new CompletePattern([
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_03), true),
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_05), true),
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_06), true),
                    Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_04), true),
                ], new Janpai(JANPAI_ID.PIN_07)),
            ]);
        });
        
        it('is knitted straight.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_08),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_09),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
            ];
            const hand = new Hand(janpaiList);
            const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_01));
            assert.deepStrictEqual(HandUtil.completePatternList(hand, completeInfo), [
                new CompletePattern([
                    Mentsu.createKnittedChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                    Mentsu.createKnittedChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                    Mentsu.createKnittedChowMentsu(new Janpai(JANPAI_ID.SOU_03)),
                    Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                ], new Janpai(JANPAI_ID.TON)),
            ]);
        });
        
    });
    
    describe('_pungList()', () => {
        
        it('has three pungs.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.SOU_01),
                new Janpai(JANPAI_ID.SOU_01),
            ];
            const pungList = [ new Janpai(JANPAI_ID.MAN_09), new Janpai(JANPAI_ID.PIN_09) ];
            assert.deepEqual(HandUtil._pungList(janpaiList), pungList);
        });
        
    });
    
    
    
    function createHandUtil() {
        return new HandUtil();
    }
    
});

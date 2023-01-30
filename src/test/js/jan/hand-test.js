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

import {CALL_TYPE} from '../../../main/js/jan/call-type';
import Hand from '../../../main/js/jan/hand';
import Janpai from '../../../main/js/jan/janpai';
import JanpaiID from '../../../main/js/jan/janpai-id';
import Mentsu from '../../../main/js/jan/mentsu';
import {MENTSU_TYPE} from '../../../main/js/jan/mentsu-type';

describe('HandTest', () => {
    
    describe('completableList()', () => {
        
        it('is 5th janpai bugfix.', () => {
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
            const chowableList = [
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
            ];
            assert.deepEqual(hand.completableList, chowableList);
        });
        
        it('is full flush bugfix.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_08),
            ];
            const hand = new Hand(janpaiList);
            const chowableList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_09),
            ];
            assert.deepEqual(hand.completableList, chowableList);
        });
        
    });
    
    describe('toObject()', () => {
        
        it('has fixedList, janpaiList, and waitTable.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.TON),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.BAI),
                new Janpai(JanpaiID.BAI),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)));
            hand.fix(Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_09), true));
            hand.updateWaitTable();
            const expected = {
                fixedList: [
                    { dark: false, janpaiList: [
                        {id: JanpaiID.PIN_07, red: false},
                        {id: JanpaiID.PIN_08, red: false},
                        {id: JanpaiID.PIN_09, red: false},
                    ], type: MENTSU_TYPE.CHOW},
                    { dark: true, janpaiList: [
                        {id: JanpaiID.SOU_09, red: false},
                        {id: JanpaiID.SOU_09, red: false},
                        {id: JanpaiID.SOU_09, red: false},
                        {id: JanpaiID.SOU_09, red: false},
                    ], type: MENTSU_TYPE.KONG},
                ],
                janpaiList: [
                    {id: JanpaiID.MAN_02, red: false},
                    {id: JanpaiID.MAN_03, red: false},
                    {id: JanpaiID.TON, red: false},
                    {id: JanpaiID.TON, red: false},
                    {id: JanpaiID.BAI, red: false},
                    {id: JanpaiID.BAI, red: false},
                    {id: JanpaiID.BAI, red: false},
                ],
                waitTable: {
                    [CALL_TYPE.CHI]: [
                        {id: JanpaiID.MAN_01, red: false},
                        {id: JanpaiID.MAN_04, red: false},
                    ],
                    [CALL_TYPE.KAN_LIGHT]: [
                        {id: JanpaiID.BAI, red: false},
                    ],
                    [CALL_TYPE.PON]: [
                        {id: JanpaiID.TON, red: false},
                        {id: JanpaiID.BAI, red: false},
                    ],
                    [CALL_TYPE.RON]: [
                        {id: JanpaiID.MAN_01, red: false},
                        {id: JanpaiID.MAN_04, red: false},
                    ],
                },
            };
            assert.deepStrictEqual(hand.toObject(), expected);
        });
        
    });
    
    describe('updateWaitTable()', () => {
        
        it('has first half janpaiList.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_04),
            ];
            const hand = new Hand(janpaiList);
            hand.updateWaitTable();
            const chowableList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_04),
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_03),
                new Janpai(JanpaiID.PIN_04),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.SOU_01),
                new Janpai(JanpaiID.SOU_02),
                new Janpai(JanpaiID.SOU_03),
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_05),
            ];
            assert.deepEqual(hand.waitTable[CALL_TYPE.CHI], chowableList);
        });
        
        it('has latter half janpaiList.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.PIN_08),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.SOU_08),
            ];
            const hand = new Hand(janpaiList);
            hand.updateWaitTable();
            const chowableList = [
                new Janpai(JanpaiID.MAN_05),
                new Janpai(JanpaiID.MAN_06),
                new Janpai(JanpaiID.MAN_07),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_09),
                new Janpai(JanpaiID.PIN_05),
                new Janpai(JanpaiID.PIN_06),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.PIN_08),
                new Janpai(JanpaiID.PIN_09),
                new Janpai(JanpaiID.SOU_05),
                new Janpai(JanpaiID.SOU_06),
                new Janpai(JanpaiID.SOU_07),
                new Janpai(JanpaiID.SOU_08),
                new Janpai(JanpaiID.SOU_09),
            ];
            assert.deepEqual(hand.waitTable[CALL_TYPE.CHI], chowableList);
        });
        
    });
    
    
    
    function createHand() {
        return new Hand();
    }
    
});

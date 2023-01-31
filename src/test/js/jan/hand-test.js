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
import {Janpai} from '../../../main/js/jan/janpai';
import {JANPAI_ID} from '../../../main/js/jan/janpai-id';
import Mentsu from '../../../main/js/jan/mentsu';
import {MENTSU_TYPE} from '../../../main/js/jan/mentsu-type';

describe('HandTest', () => {
    
    describe('completableList()', () => {
        
        it('is 5th janpai bugfix.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_01),
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
                new Janpai(JANPAI_ID.MAN_04),
            ];
            const hand = new Hand(janpaiList);
            const chowableList = [
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_05),
            ];
            assert.deepEqual(hand.completableList, chowableList);
        });
        
        it('is full flush bugfix.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.MAN_08),
            ];
            const hand = new Hand(janpaiList);
            const chowableList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_09),
            ];
            assert.deepEqual(hand.completableList, chowableList);
        });
        
    });
    
    describe('toObject()', () => {
        
        it('has fixedList, janpaiList, and waitTable.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.TON),
                new Janpai(JANPAI_ID.BAI),
                new Janpai(JANPAI_ID.BAI),
                new Janpai(JANPAI_ID.BAI),
            ];
            const hand = new Hand(janpaiList);
            hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_07)));
            hand.fix(Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_09), true));
            hand.updateWaitTable();
            const expected = {
                fixedList: [
                    { dark: false, janpaiList: [
                        {id: JANPAI_ID.PIN_07, red: false},
                        {id: JANPAI_ID.PIN_08, red: false},
                        {id: JANPAI_ID.PIN_09, red: false},
                    ], type: MENTSU_TYPE.CHOW},
                    { dark: true, janpaiList: [
                        {id: JANPAI_ID.SOU_09, red: false},
                        {id: JANPAI_ID.SOU_09, red: false},
                        {id: JANPAI_ID.SOU_09, red: false},
                        {id: JANPAI_ID.SOU_09, red: false},
                    ], type: MENTSU_TYPE.KONG},
                ],
                janpaiList: [
                    {id: JANPAI_ID.MAN_02, red: false},
                    {id: JANPAI_ID.MAN_03, red: false},
                    {id: JANPAI_ID.TON, red: false},
                    {id: JANPAI_ID.TON, red: false},
                    {id: JANPAI_ID.BAI, red: false},
                    {id: JANPAI_ID.BAI, red: false},
                    {id: JANPAI_ID.BAI, red: false},
                ],
                waitTable: {
                    [CALL_TYPE.CHI]: [
                        {id: JANPAI_ID.MAN_01, red: false},
                        {id: JANPAI_ID.MAN_04, red: false},
                    ],
                    [CALL_TYPE.KAN_LIGHT]: [
                        {id: JANPAI_ID.BAI, red: false},
                    ],
                    [CALL_TYPE.PON]: [
                        {id: JANPAI_ID.TON, red: false},
                        {id: JANPAI_ID.BAI, red: false},
                    ],
                    [CALL_TYPE.RON]: [
                        {id: JANPAI_ID.MAN_01, red: false},
                        {id: JANPAI_ID.MAN_04, red: false},
                    ],
                },
            };
            assert.deepStrictEqual(hand.toObject(), expected);
        });
        
    });
    
    describe('updateWaitTable()', () => {
        
        it('has first half janpaiList.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_04),
            ];
            const hand = new Hand(janpaiList);
            hand.updateWaitTable();
            const chowableList = [
                new Janpai(JANPAI_ID.MAN_01),
                new Janpai(JANPAI_ID.MAN_02),
                new Janpai(JANPAI_ID.MAN_03),
                new Janpai(JANPAI_ID.MAN_04),
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.PIN_01),
                new Janpai(JANPAI_ID.PIN_02),
                new Janpai(JANPAI_ID.PIN_03),
                new Janpai(JANPAI_ID.PIN_04),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.SOU_01),
                new Janpai(JANPAI_ID.SOU_02),
                new Janpai(JANPAI_ID.SOU_03),
                new Janpai(JANPAI_ID.SOU_04),
                new Janpai(JANPAI_ID.SOU_05),
            ];
            assert.deepEqual(hand.waitTable[CALL_TYPE.CHI], chowableList);
        });
        
        it('has latter half janpaiList.', () => {
            const janpaiList = [
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.PIN_08),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.SOU_08),
            ];
            const hand = new Hand(janpaiList);
            hand.updateWaitTable();
            const chowableList = [
                new Janpai(JANPAI_ID.MAN_05),
                new Janpai(JANPAI_ID.MAN_06),
                new Janpai(JANPAI_ID.MAN_07),
                new Janpai(JANPAI_ID.MAN_08),
                new Janpai(JANPAI_ID.MAN_09),
                new Janpai(JANPAI_ID.PIN_05),
                new Janpai(JANPAI_ID.PIN_06),
                new Janpai(JANPAI_ID.PIN_07),
                new Janpai(JANPAI_ID.PIN_08),
                new Janpai(JANPAI_ID.PIN_09),
                new Janpai(JANPAI_ID.SOU_05),
                new Janpai(JANPAI_ID.SOU_06),
                new Janpai(JANPAI_ID.SOU_07),
                new Janpai(JANPAI_ID.SOU_08),
                new Janpai(JANPAI_ID.SOU_09),
            ];
            assert.deepEqual(hand.waitTable[CALL_TYPE.CHI], chowableList);
        });
        
    });
    
    
    
    function createHand() {
        return new Hand();
    }
    
});

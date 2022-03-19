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

import Hand from '../../../main/js/jan/hand';
import Janpai from '../../../main/js/jan/janpai';
import JanpaiID from '../../../main/js/jan/janpai-id';
import JanUtil from '../../../main/js/jan/jan-util';
import Mentsu from '../../../main/js/jan/mentsu';

describe('JanUtilTest', () => {
    
    describe('chowableList()', () => {
        
        it('has chow of 1m.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_02),
                new Janpai(JanpaiID.MAN_03),
                new Janpai(JanpaiID.MAN_08),
                new Janpai(JanpaiID.MAN_09),
            ];
            const hand = new Hand(janpaiList);
            const chowableList = JanUtil.chowableList(hand, new Janpai(JanpaiID.MAN_01));
            const expectedMentsuList = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert.deepEqual(chowableList, expectedMentsuList);
        });
        
        it('has chow of 7p.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_01),
                new Janpai(JanpaiID.PIN_02),
                new Janpai(JanpaiID.PIN_07),
                new Janpai(JanpaiID.PIN_08),
            ];
            const hand = new Hand(janpaiList);
            const chowableList = JanUtil.chowableList(hand, new Janpai(JanpaiID.PIN_09));
            const expectedMentsuList = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
            ];
            assert.deepEqual(chowableList, expectedMentsuList);
        });
        
        it('has chow of 4s.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.SOU_04),
                new Janpai(JanpaiID.SOU_06),
            ];
            const hand = new Hand(janpaiList);
            const chowableList = JanUtil.chowableList(hand, new Janpai(JanpaiID.SOU_05));
            const expectedMentsuList = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_04)),
            ];
            assert.deepEqual(chowableList, expectedMentsuList);
        });
        
        it('has chow of 1m.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
            ];
            const hand = new Hand(janpaiList);
            const chowableList = JanUtil.chowableList(hand, new Janpai(JanpaiID.MAN_03));
            const expectedMentsuList = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert.deepEqual(chowableList, expectedMentsuList);
        });
        
        it('has chow of 7p.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.PIN_08),
                new Janpai(JanpaiID.PIN_09),
            ];
            const hand = new Hand(janpaiList);
            const chowableList = JanUtil.chowableList(hand, new Janpai(JanpaiID.PIN_07));
            const expectedMentsuList = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_07)),
            ];
            assert.deepEqual(chowableList, expectedMentsuList);
        });
        
    });
    
    describe('objectedList()', () => {
        
        it('has janpaiList.', () => {
            const janpaiList = [
                new Janpai(JanpaiID.MAN_01),
                new Janpai(JanpaiID.MAN_02),
            ];
            const objectedList = JanUtil.objectedList(janpaiList);
            const expectedList = [
                {id: JanpaiID.MAN_01, red: false},
                {id: JanpaiID.MAN_02, red: false},
            ];
            assert.deepStrictEqual(objectedList, expectedList);
        });
        
    });
    
    
    
    function createJanUtil() {
        return new JanUtil();
    }
    
});

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

import CompletePattern from '../../../main/js/jan/complete-pattern';
import Janpai from '../../../main/js/jan/janpai';
import JanpaiID from '../../../main/js/jan/janpai-id';
import Mentsu from '../../../main/js/jan/mentsu';

describe('CompletePatternTest', () => {
    
    describe('hasJi()', () => {
        
        it('has ji mentsu.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
            ], new Janpai(JanpaiID.SOU_09));
            assert(completePattern.hasJi);
        });
        
        it('has ji head.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_09)),
            ], new Janpai(JanpaiID.TON));
            assert(completePattern.hasJi);
        });
        
        it('does not have ji.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_09)),
            ], new Janpai(JanpaiID.SOU_01));
            assert(!completePattern.hasJi);
        });
        
    });
    
    describe('jiAll()', () => {
        
        it('is ji.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SHA)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PEI)),
            ], new Janpai(JanpaiID.BAI));
            assert(completePattern.jiAll);
        });
        
        it('does not have ji mentsu.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SHA)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PEI)),
            ], new Janpai(JanpaiID.BAI));
            assert(!completePattern.jiAll);
        });
        
        it('does not have ji head.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SHA)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PEI)),
            ], new Janpai(JanpaiID.MAN_01));
            assert(!completePattern.jiAll);
        });
        
    });
    
    describe('yaoAll()', () => {
        
        it('is yao.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
            ], new Janpai(JanpaiID.SOU_09));
            assert(completePattern.yaoAll);
        });
        
        it('does not have yao mentsu.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
            ], new Janpai(JanpaiID.SOU_09));
            assert(!completePattern.yaoAll);
        });
        
        it('does not have yao head.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
            ], new Janpai(JanpaiID.SOU_08));
            assert(!completePattern.yaoAll);
        });
        
    });
    
    
    
    function createCompletePattern() {
        return new CompletePattern();
    }
    
});

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

import CompletePattern from './complete-pattern';
import Janpai from './janpai';
import JanpaiID from './janpai-id';
import Mentsu from './mentsu';
import ZjmUtil from './zjm-util';
import ZjmYaku from './zjm-yaku';

describe('ZjmUtilTest', () => {
    
    describe('_concealedTripletsYaku()', () => {
        
        it('has four concealed triplets.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_05), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_07), true),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._concealedTripletsYaku(completePattern),
                         ZjmYaku.FOUR_CONCEALED_TRIPLETS);
        });
        
        it('has three concealed triplets.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_05), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._concealedTripletsYaku(completePattern),
                         ZjmYaku.THREE_CONCEALED_TRIPLETS);
        });
        
        it('has two concealed triplets.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03), true),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_05)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._concealedTripletsYaku(completePattern),
                         ZjmYaku.TWO_CONCEALED_TRIPLETS);
        });
        
        it('has one concealed triplets.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_05)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._concealedTripletsYaku(completePattern),
                         undefined);
        });
        
    });
    
    describe('_dragonsYaku()', () => {
        
        it('has big three dragons.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._dragonsYaku(completePattern),
                         ZjmYaku.BIG_THREE_DRAGONS);
        });
        
        it('has small three dragons.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.CHUN));
            assert.equal(ZjmUtil._dragonsYaku(completePattern),
                         ZjmYaku.SMALL_THREE_DRAGONS);
        });
        
        it('has two dragons.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._dragonsYaku(completePattern), undefined);
        });
        
    });
    
    describe('_honorTilesYakuList()', () => {
        
        it('is all honors.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SHA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.PEI)),
            ], new Janpai(JanpaiID.BAI));
            const yakuList = [ ZjmYaku.BIG_FOUR_WINDS, ZjmYaku.ALL_HONORS ];
            assert.deepEqual(ZjmUtil._honorTilesYakuList(completePattern), yakuList);
        });
        
        it('is not all honors.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.FA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.CHUN)),
            ], new Janpai(JanpaiID.TON));
            const yakuList = [ ZjmYaku.BIG_THREE_DRAGONS ];
            assert.deepEqual(ZjmUtil._honorTilesYakuList(completePattern), yakuList);
        });
        
    });
    
    describe('_kongYaku()', () => {
        
        it('has four kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_05)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._kongYaku(completePattern),
                         ZjmYaku.FOUR_KONG);
        });
        
        it('has three kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_05)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._kongYaku(completePattern),
                         ZjmYaku.THREE_KONG);
        });
        
        it('has two kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_05)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._kongYaku(completePattern),
                         ZjmYaku.TWO_KONG);
        });
        
        it('has one kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_05)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._kongYaku(completePattern),
                         ZjmYaku.ONE_KONG);
        });
        
        it('does not have kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_05)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._kongYaku(completePattern), undefined);
        });
        
    });
    
    describe('_prevNumberMentsuYaku()', () => {
        
        it('has nine tile straight.', () => {
            const callBack = ZjmUtil._threeChowsYaku;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourChows, undefined),
                         ZjmYaku.NINE_TILE_STRAIGHT);
        });
        
        it('has three similar sequenes.', () => {
            const callBack = ZjmUtil._threeChowsYaku;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourChows, undefined),
                         ZjmYaku.THREE_SIMILAR_SEQUENCES);
        });
        
        it('has three similar sequenes.', () => {
            const callBack = ZjmUtil._threeChowsYaku;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourChows, undefined),
                         ZjmYaku.THREE_SIMILAR_SEQUENCES);
        });
        
        it('has three similar sequenes.', () => {
            const callBack = ZjmUtil._threeChowsYaku;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourChows, undefined),
                         ZjmYaku.THREE_SIMILAR_SEQUENCES);
        });
        
        it('has three concealed triplets.', () => {
            const callBack = ZjmUtil._threePungsYaku;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            const head = new Janpai(JanpaiID.SOU_01);
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourPungs, head),
                         ZjmYaku.THREE_CONCEALED_TRIPLETS);
        });
        
        it('has three similar triplets.', () => {
            const callBack = ZjmUtil._threePungsYaku;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            const head = new Janpai(JanpaiID.PIN_01);
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourPungs, head),
                         ZjmYaku.THREE_SIMILAR_TRIPLETS);
        });
        
        it('has three similar triplets.', () => {
            const callBack = ZjmUtil._threePungsYaku;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            const head = new Janpai(JanpaiID.MAN_01);
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourPungs, head),
                         ZjmYaku.THREE_SIMILAR_TRIPLETS);
        });
        
        it('has three similar triplets.', () => {
            const callBack = ZjmUtil._threePungsYaku;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            const head = new Janpai(JanpaiID.SOU_01);
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourPungs, head),
                         ZjmYaku.THREE_SIMILAR_TRIPLETS);
        });
        
        it('has two indentical sequences.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, threeChows, undefined),
                         ZjmYaku.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            const head = new Janpai(JanpaiID.SOU_01);
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, threePungs, head),
                         ZjmYaku.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('does not have mentsu yaku.', () => {
            const callBack = ZjmUtil._threeChowsYaku;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_03)),
            ];
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourChows, undefined),
                         undefined);
        });
        
    });
    
    describe('_threeChowsYaku()', () => {
        
        it('is three indentical sequenes.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert.equal(ZjmUtil._threeChowsYaku(threeChows),
                         ZjmYaku.THREE_INDENTICAL_SEQUENCES);
        });
        
        it('is nine tile straight.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_07)),
            ];
            assert.equal(ZjmUtil._threeChowsYaku(threeChows),
                         ZjmYaku.NINE_TILE_STRAIGHT);
        });
        
        it('is three similar sequenes.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_01)),
            ];
            assert.equal(ZjmUtil._threeChowsYaku(threeChows),
                         ZjmYaku.THREE_SIMILAR_SEQUENCES);
        });
        
        it('does not have chow yaku.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert.equal(ZjmUtil._threeChowsYaku(threeChows), undefined);
        });
        
    });
    
    describe('_threePungsYaku()', () => {
        
        it('is three similar triplets.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
            ];
            assert.equal(ZjmUtil._threePungsYaku(threePungs),
                         ZjmYaku.THREE_SIMILAR_TRIPLETS);
        });
        
        it('is three concealed triplets.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
            ];
            assert.equal(ZjmUtil._threePungsYaku(threePungs),
                         ZjmYaku.THREE_CONCEALED_TRIPLETS);
        });
        
        it('does not have pung yaku.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            assert.equal(ZjmUtil._threePungsYaku(threePungs), undefined);
        });
        
    });
    
    describe('_tripletsAndKongYakuList()', () => {
        
        it('has all triplets.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_05)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SOU_07)),
            ], new Janpai(JanpaiID.SOU_09));
            const yakuList = [ ZjmYaku.ALL_TRIPLETS, ZjmYaku.FOUR_KONG ];
            assert.deepEqual(ZjmUtil._tripletsAndKongYakuList(completePattern), yakuList);
        });
        
        it('does not have all triplets.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_05), true),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_07), true),
            ], new Janpai(JanpaiID.SOU_09));
            const yakuList = [ ZjmYaku.THREE_CONCEALED_TRIPLETS ];
            assert.deepEqual(ZjmUtil._tripletsAndKongYakuList(completePattern), yakuList);
        });
        
    });
    
    describe('_twoMentsuYakuWithFourMentsu()', () => {
        
        it('has two indentical sequenes.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_03)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         ZjmYaku.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_03)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         ZjmYaku.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         ZjmYaku.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_03)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         ZjmYaku.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         ZjmYaku.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_03)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         ZjmYaku.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_03)),
            ];
            const head = new Janpai(JanpaiID.SOU_01);
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourPungs, head),
                         ZjmYaku.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            const head = new Janpai(JanpaiID.PIN_01);
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourPungs, head),
                         ZjmYaku.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
            ];
            const head = new Janpai(JanpaiID.PIN_01);
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourPungs, head),
                         ZjmYaku.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            const head = new Janpai(JanpaiID.MAN_01);
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourPungs, head),
                         ZjmYaku.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
            ];
            const head = new Janpai(JanpaiID.MAN_01);
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourPungs, head),
                         ZjmYaku.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
            ];
            const head = new Janpai(JanpaiID.MAN_01);
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourPungs, head),
                         ZjmYaku.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('does not have mentsu yaku.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_03)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         undefined);
        });
        
    });
    
    describe('_windsYaku()', () => {
        
        it('has big four winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.TON)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SHA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.PEI)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._windsYaku(completePattern),
                         ZjmYaku.BIG_FOUR_WINDS);
        });
        
        it('has small four winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SHA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.PEI)),
            ], new Janpai(JanpaiID.TON));
            assert.equal(ZjmUtil._windsYaku(completePattern),
                         ZjmYaku.SMALL_FOUR_WINDS);
        });
        
        it('has big three winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.NAN)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SHA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.PEI)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._windsYaku(completePattern),
                         ZjmYaku.BIG_THREE_WINDS);
        });
        
        it('has small three winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SHA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.PEI)),
            ], new Janpai(JanpaiID.TON));
            assert.equal(ZjmUtil._windsYaku(completePattern),
                         ZjmYaku.SMALL_THREE_WINDS);
        });
        
        it('has two winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_03)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.SHA)),
                Mentsu.createKongMentsu(new Janpai(JanpaiID.PEI)),
            ], new Janpai(JanpaiID.SOU_09));
            assert.equal(ZjmUtil._windsYaku(completePattern), undefined);
        });
        
    });
    
    describe('_yakuWithFourChows()', () => {
        
        it('is four indentical sequenes.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert.equal(ZjmUtil._yakuWithFourChows(fourChows),
                         ZjmYaku.FOUR_INDENTICAL_SEQUENCES);
        });
        
        it('is two indentical sequenes twice.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            assert.equal(ZjmUtil._yakuWithFourChows(fourChows),
                         ZjmYaku.TWO_INDENTICAL_SEQUENCES_TWICE);
        });
        
        it('has three indentical sequenes.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            assert.equal(ZjmUtil._yakuWithFourChows(fourChows),
                         ZjmYaku.THREE_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.SOU_03)),
            ];
            assert.equal(ZjmUtil._yakuWithFourChows(fourChows),
                         ZjmYaku.TWO_INDENTICAL_SEQUENCES);
        });
        
    });
    
    describe('_yakuWithFourChows()', () => {
        
        it('is four consecutive triplets.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_04)),
            ];
            const head = new Janpai(JanpaiID.SOU_01);
            assert.equal(ZjmUtil._yakuWithFourPungs(fourPungs, head),
                         ZjmYaku.FOUR_CONSECUTIVE_TRIPLETS);
        });
        
        it('has three similar triplets.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            const head = new Janpai(JanpaiID.MAN_02);
            assert.equal(ZjmUtil._yakuWithFourPungs(fourPungs, head),
                         ZjmYaku.THREE_SIMILAR_TRIPLETS);
        });
        
        it('has small three similar triplets.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_03)),
            ];
            const head = new Janpai(JanpaiID.SOU_01);
            assert.equal(ZjmUtil._yakuWithFourPungs(fourPungs, head),
                         ZjmYaku.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
    });
    
    describe('_yakuWithThreeChows()', () => {
        
        it('is three indentical sequenes.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
            ];
            assert.equal(ZjmUtil._yakuWithThreeChows(threeChows),
                         ZjmYaku.THREE_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)),
            ];
            assert.equal(ZjmUtil._yakuWithThreeChows(threeChows),
                         ZjmYaku.TWO_INDENTICAL_SEQUENCES);
        });
        
    });
    
    describe('_yakuWithThreePungs()', () => {
        
        it('is three similar triplets.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_01)),
            ];
            const head = new Janpai(JanpaiID.SOU_02);
            assert.equal(ZjmUtil._yakuWithThreePungs(threePungs, head),
                         ZjmYaku.THREE_SIMILAR_TRIPLETS);
        });
        
        it('is small three similar triplets.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JanpaiID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_02)),
            ];
            const head = new Janpai(JanpaiID.SOU_01);
            assert.equal(ZjmUtil._yakuWithThreePungs(threePungs, head),
                         ZjmYaku.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
    });
    
    
    
    function createZjmUtil() {
        return new ZjmUtil();
    }
    
});

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
import {Janpai} from '../../../main/js/jan/janpai';
import {JANPAI_ID} from '../../../main/js/jan/janpai-id';
import {Mentsu} from '../../../main/js/jan/mentsu';
import ZjmUtil from '../../../main/js/jan/zjm-util';
import {ZJM_YAKU} from '../../../main/js/jan/zjm-yaku';

describe('ZjmUtilTest', () => {
    
    describe('_concealedTripletsYaku()', () => {
        
        it('has four concealed triplets.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_05), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_07), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._concealedTripletsYaku(completePattern),
                         ZJM_YAKU.FOUR_CONCEALED_TRIPLETS);
        });
        
        it('has three concealed triplets.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_05), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._concealedTripletsYaku(completePattern),
                         ZJM_YAKU.THREE_CONCEALED_TRIPLETS);
        });
        
        it('has two concealed triplets.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03), true),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_05)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._concealedTripletsYaku(completePattern),
                         ZJM_YAKU.TWO_CONCEALED_TRIPLETS);
        });
        
        it('has one concealed triplets.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_05)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._concealedTripletsYaku(completePattern),
                         undefined);
        });
        
    });
    
    describe('_dragonsYaku()', () => {
        
        it('has big three dragons.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._dragonsYaku(completePattern),
                         ZJM_YAKU.BIG_THREE_DRAGONS);
        });
        
        it('has small three dragons.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.CHUN));
            assert.equal(ZjmUtil._dragonsYaku(completePattern),
                         ZJM_YAKU.SMALL_THREE_DRAGONS);
        });
        
        it('has two dragons.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._dragonsYaku(completePattern), undefined);
        });
        
    });
    
    describe('_honorTilesYakuList()', () => {
        
        it('is all honors.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.TON)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.NAN)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SHA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.PEI)),
            ], new Janpai(JANPAI_ID.BAI));
            const yakuList = [ ZJM_YAKU.BIG_FOUR_WINDS, ZJM_YAKU.ALL_HONORS ];
            assert.deepEqual(ZjmUtil._honorTilesYakuList(completePattern), yakuList);
        });
        
        it('is not all honors.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.BAI)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.FA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.CHUN)),
            ], new Janpai(JANPAI_ID.TON));
            const yakuList = [ ZJM_YAKU.BIG_THREE_DRAGONS ];
            assert.deepEqual(ZjmUtil._honorTilesYakuList(completePattern), yakuList);
        });
        
    });
    
    describe('_kongYaku()', () => {
        
        it('has four kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_05)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._kongYaku(completePattern),
                         ZJM_YAKU.FOUR_KONG);
        });
        
        it('has three kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_05)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._kongYaku(completePattern),
                         ZJM_YAKU.THREE_KONG);
        });
        
        it('has two kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_05)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._kongYaku(completePattern),
                         ZJM_YAKU.TWO_KONG);
        });
        
        it('has one kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_05)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._kongYaku(completePattern),
                         ZJM_YAKU.ONE_KONG);
        });
        
        it('does not have kong.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_05)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._kongYaku(completePattern), undefined);
        });
        
    });
    
    describe('_prevNumberMentsuYaku()', () => {
        
        it('has nine tile straight.', () => {
            const callBack = ZjmUtil._threeChowsYaku;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
            ];
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourChows, undefined),
                         ZJM_YAKU.NINE_TILE_STRAIGHT);
        });
        
        it('has three similar sequenes.', () => {
            const callBack = ZjmUtil._threeChowsYaku;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourChows, undefined),
                         ZJM_YAKU.THREE_SIMILAR_SEQUENCES);
        });
        
        it('has three similar sequenes.', () => {
            const callBack = ZjmUtil._threeChowsYaku;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourChows, undefined),
                         ZJM_YAKU.THREE_SIMILAR_SEQUENCES);
        });
        
        it('has three similar sequenes.', () => {
            const callBack = ZjmUtil._threeChowsYaku;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourChows, undefined),
                         ZJM_YAKU.THREE_SIMILAR_SEQUENCES);
        });
        
        it('has three concealed triplets.', () => {
            const callBack = ZjmUtil._threePungsYaku;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
            ];
            const head = new Janpai(JANPAI_ID.SOU_01);
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourPungs, head),
                         ZJM_YAKU.THREE_CONCEALED_TRIPLETS);
        });
        
        it('has three similar triplets.', () => {
            const callBack = ZjmUtil._threePungsYaku;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            const head = new Janpai(JANPAI_ID.PIN_01);
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourPungs, head),
                         ZJM_YAKU.THREE_SIMILAR_TRIPLETS);
        });
        
        it('has three similar triplets.', () => {
            const callBack = ZjmUtil._threePungsYaku;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            const head = new Janpai(JANPAI_ID.MAN_01);
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourPungs, head),
                         ZJM_YAKU.THREE_SIMILAR_TRIPLETS);
        });
        
        it('has three similar triplets.', () => {
            const callBack = ZjmUtil._threePungsYaku;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            const head = new Janpai(JANPAI_ID.SOU_01);
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourPungs, head),
                         ZJM_YAKU.THREE_SIMILAR_TRIPLETS);
        });
        
        it('has two indentical sequences.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
            ];
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, threeChows, undefined),
                         ZJM_YAKU.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            const head = new Janpai(JANPAI_ID.SOU_01);
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, threePungs, head),
                         ZJM_YAKU.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('does not have mentsu yaku.', () => {
            const callBack = ZjmUtil._threeChowsYaku;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_03)),
            ];
            assert.equal(ZjmUtil._prevNumberMentsuYaku(callBack, fourChows, undefined),
                         undefined);
        });
        
    });
    
    describe('_threeChowsYaku()', () => {
        
        it('is three indentical sequenes.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
            ];
            assert.equal(ZjmUtil._threeChowsYaku(threeChows),
                         ZJM_YAKU.THREE_INDENTICAL_SEQUENCES);
        });
        
        it('is nine tile straight.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_04)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_07)),
            ];
            assert.equal(ZjmUtil._threeChowsYaku(threeChows),
                         ZJM_YAKU.NINE_TILE_STRAIGHT);
        });
        
        it('is three similar sequenes.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_01)),
            ];
            assert.equal(ZjmUtil._threeChowsYaku(threeChows),
                         ZJM_YAKU.THREE_SIMILAR_SEQUENCES);
        });
        
        it('does not have chow yaku.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            assert.equal(ZjmUtil._threeChowsYaku(threeChows), undefined);
        });
        
    });
    
    describe('_threePungsYaku()', () => {
        
        it('is three similar triplets.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
            ];
            assert.equal(ZjmUtil._threePungsYaku(threePungs),
                         ZJM_YAKU.THREE_SIMILAR_TRIPLETS);
        });
        
        it('is three concealed triplets.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_03)),
            ];
            assert.equal(ZjmUtil._threePungsYaku(threePungs),
                         ZJM_YAKU.THREE_CONCEALED_TRIPLETS);
        });
        
        it('does not have pung yaku.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            assert.equal(ZjmUtil._threePungsYaku(threePungs), undefined);
        });
        
    });
    
    describe('_tripletsAndKongYakuList()', () => {
        
        it('has all triplets.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_05)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SOU_07)),
            ], new Janpai(JANPAI_ID.SOU_09));
            const yakuList = [ ZJM_YAKU.ALL_TRIPLETS, ZJM_YAKU.FOUR_KONG ];
            assert.deepEqual(ZjmUtil._tripletsAndKongYakuList(completePattern), yakuList);
        });
        
        it('does not have all triplets.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_05), true),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_07), true),
            ], new Janpai(JANPAI_ID.SOU_09));
            const yakuList = [ ZJM_YAKU.THREE_CONCEALED_TRIPLETS ];
            assert.deepEqual(ZjmUtil._tripletsAndKongYakuList(completePattern), yakuList);
        });
        
    });
    
    describe('_twoMentsuYakuWithFourMentsu()', () => {
        
        it('has two indentical sequenes.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_03)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         ZJM_YAKU.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_03)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         ZJM_YAKU.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_03)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         ZJM_YAKU.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_03)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         ZJM_YAKU.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_03)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         ZJM_YAKU.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_03)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         ZJM_YAKU.TWO_INDENTICAL_SEQUENCES);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_03)),
            ];
            const head = new Janpai(JANPAI_ID.SOU_01);
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourPungs, head),
                         ZJM_YAKU.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            const head = new Janpai(JANPAI_ID.PIN_01);
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourPungs, head),
                         ZJM_YAKU.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
            ];
            const head = new Janpai(JANPAI_ID.PIN_01);
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourPungs, head),
                         ZJM_YAKU.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            const head = new Janpai(JANPAI_ID.MAN_01);
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourPungs, head),
                         ZJM_YAKU.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
            ];
            const head = new Janpai(JANPAI_ID.MAN_01);
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourPungs, head),
                         ZJM_YAKU.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('has small three similar triplets.', () => {
            const callBack = ZjmUtil._smallThreeSimilarTriplets;
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
            ];
            const head = new Janpai(JANPAI_ID.MAN_01);
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourPungs, head),
                         ZJM_YAKU.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
        it('does not have mentsu yaku.', () => {
            const callBack = ZjmUtil._twoIndenticalSequences;
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_03)),
            ];
            assert.equal(ZjmUtil._twoMentsuYakuWithFourMentsu(callBack, fourChows, undefined),
                         undefined);
        });
        
    });
    
    describe('_windsYaku()', () => {
        
        it('has big four winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.TON)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.NAN)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SHA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.PEI)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._windsYaku(completePattern),
                         ZJM_YAKU.BIG_FOUR_WINDS);
        });
        
        it('has small four winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.NAN)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SHA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.PEI)),
            ], new Janpai(JANPAI_ID.TON));
            assert.equal(ZjmUtil._windsYaku(completePattern),
                         ZJM_YAKU.SMALL_FOUR_WINDS);
        });
        
        it('has big three winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.NAN)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SHA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.PEI)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._windsYaku(completePattern),
                         ZJM_YAKU.BIG_THREE_WINDS);
        });
        
        it('has small three winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SHA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.PEI)),
            ], new Janpai(JANPAI_ID.TON));
            assert.equal(ZjmUtil._windsYaku(completePattern),
                         ZJM_YAKU.SMALL_THREE_WINDS);
        });
        
        it('has two winds.', () => {
            const completePattern = new CompletePattern([
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_03)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.SHA)),
                Mentsu.createKongMentsu(new Janpai(JANPAI_ID.PEI)),
            ], new Janpai(JANPAI_ID.SOU_09));
            assert.equal(ZjmUtil._windsYaku(completePattern), undefined);
        });
        
    });
    
    describe('_yakuWithFourChows()', () => {
        
        it('is four indentical sequenes.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
            ];
            assert.equal(ZjmUtil._yakuWithFourChows(fourChows),
                         ZJM_YAKU.FOUR_INDENTICAL_SEQUENCES);
        });
        
        it('is two indentical sequenes twice.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
            ];
            assert.equal(ZjmUtil._yakuWithFourChows(fourChows),
                         ZJM_YAKU.TWO_INDENTICAL_SEQUENCES_TWICE);
        });
        
        it('has three indentical sequenes.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
            ];
            assert.equal(ZjmUtil._yakuWithFourChows(fourChows),
                         ZJM_YAKU.THREE_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const fourChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_02)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.SOU_03)),
            ];
            assert.equal(ZjmUtil._yakuWithFourChows(fourChows),
                         ZJM_YAKU.TWO_INDENTICAL_SEQUENCES);
        });
        
    });
    
    describe('_yakuWithFourChows()', () => {
        
        it('is four consecutive triplets.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_03)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_04)),
            ];
            const head = new Janpai(JANPAI_ID.SOU_01);
            assert.equal(ZjmUtil._yakuWithFourPungs(fourPungs, head),
                         ZJM_YAKU.FOUR_CONSECUTIVE_TRIPLETS);
        });
        
        it('has three similar triplets.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            const head = new Janpai(JANPAI_ID.MAN_02);
            assert.equal(ZjmUtil._yakuWithFourPungs(fourPungs, head),
                         ZJM_YAKU.THREE_SIMILAR_TRIPLETS);
        });
        
        it('has small three similar triplets.', () => {
            const fourPungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_03)),
            ];
            const head = new Janpai(JANPAI_ID.SOU_01);
            assert.equal(ZjmUtil._yakuWithFourPungs(fourPungs, head),
                         ZJM_YAKU.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
    });
    
    describe('_yakuWithThreeChows()', () => {
        
        it('is three indentical sequenes.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
            ];
            assert.equal(ZjmUtil._yakuWithThreeChows(threeChows),
                         ZJM_YAKU.THREE_INDENTICAL_SEQUENCES);
        });
        
        it('has two indentical sequenes.', () => {
            const threeChows = [
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)),
            ];
            assert.equal(ZjmUtil._yakuWithThreeChows(threeChows),
                         ZJM_YAKU.TWO_INDENTICAL_SEQUENCES);
        });
        
    });
    
    describe('_yakuWithThreePungs()', () => {
        
        it('is three similar triplets.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_01)),
            ];
            const head = new Janpai(JANPAI_ID.SOU_02);
            assert.equal(ZjmUtil._yakuWithThreePungs(threePungs, head),
                         ZJM_YAKU.THREE_SIMILAR_TRIPLETS);
        });
        
        it('is small three similar triplets.', () => {
            const threePungs = [
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.MAN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.PIN_01)),
                Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_02)),
            ];
            const head = new Janpai(JANPAI_ID.SOU_01);
            assert.equal(ZjmUtil._yakuWithThreePungs(threePungs, head),
                         ZJM_YAKU.SMALL_THREE_SIMILAR_TRIPLETS);
        });
        
    });
    
    
    
    function createZjmUtil() {
        return new ZjmUtil();
    }
    
});

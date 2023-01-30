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
import {COMPLETE_TYPE} from './complete-type';

export default class CompleteInfo {
    
    constructor(janpai, last = false, prevalent = undefined,
                seat = undefined, type = COMPLETE_TYPE.DISCARD) {
        this._janpai = janpai;
        this._last = last;
        this._prevalent = prevalent;
        this._seat = seat;
        this._type = type;
    }
    
    get janpai() {
        return this._janpai;
    }
    
    get last() {
        return this._last;
    }
    
    get prevalent() {
        return this._prevalent;
    }
    
    get seat() {
        return this._seat;
    }
    
    get type() {
        return this._type;
    }
    
}

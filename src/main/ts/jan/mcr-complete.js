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
export default class McrComplete {
    
    constructor(yakuList) {
        this._yakuList = yakuList;
        this._point = this._totalPoint(yakuList);
    }
    
    get point() {
        return this._point;
    }
    
    get yakuList() {
        return this._yakuList;
    }
    
    toObject() {
        const object = {};
        object.yakuList = this._yakuList;
        return object;
    }
    
    
    _totalPoint(yakuList) {
        return yakuList.length === 0 ? 0 : yakuList.map((y) => {
            return y.point;
        }).reduce((p, c) => { return p + c; } );
    }
    
}

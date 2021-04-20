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
import Janpai from './janpai';
import JanpaiID from './janpai-id';

export default {
    
    MPS: [ new Janpai(JanpaiID.MAN_01),
           new Janpai(JanpaiID.MAN_04),
           new Janpai(JanpaiID.MAN_07),
           new Janpai(JanpaiID.PIN_02),
           new Janpai(JanpaiID.PIN_05),
           new Janpai(JanpaiID.PIN_08),
           new Janpai(JanpaiID.SOU_03),
           new Janpai(JanpaiID.SOU_06),
           new Janpai(JanpaiID.SOU_09) ],
    MSP: [ new Janpai(JanpaiID.MAN_01),
           new Janpai(JanpaiID.MAN_04),
           new Janpai(JanpaiID.MAN_07),
           new Janpai(JanpaiID.SOU_02),
           new Janpai(JanpaiID.SOU_05),
           new Janpai(JanpaiID.SOU_08),
           new Janpai(JanpaiID.PIN_03),
           new Janpai(JanpaiID.PIN_06),
           new Janpai(JanpaiID.PIN_09) ],
    PSM: [ new Janpai(JanpaiID.PIN_01),
           new Janpai(JanpaiID.PIN_04),
           new Janpai(JanpaiID.PIN_07),
           new Janpai(JanpaiID.SOU_02),
           new Janpai(JanpaiID.SOU_05),
           new Janpai(JanpaiID.SOU_08),
           new Janpai(JanpaiID.MAN_03),
           new Janpai(JanpaiID.MAN_06),
           new Janpai(JanpaiID.MAN_09) ],
    PMS: [ new Janpai(JanpaiID.PIN_01),
           new Janpai(JanpaiID.PIN_04),
           new Janpai(JanpaiID.PIN_07),
           new Janpai(JanpaiID.MAN_02),
           new Janpai(JanpaiID.MAN_05),
           new Janpai(JanpaiID.MAN_08),
           new Janpai(JanpaiID.SOU_03),
           new Janpai(JanpaiID.SOU_06),
           new Janpai(JanpaiID.SOU_09) ],
    SMP: [ new Janpai(JanpaiID.SOU_01),
           new Janpai(JanpaiID.SOU_04),
           new Janpai(JanpaiID.SOU_07),
           new Janpai(JanpaiID.MAN_02),
           new Janpai(JanpaiID.MAN_05),
           new Janpai(JanpaiID.MAN_08),
           new Janpai(JanpaiID.PIN_03),
           new Janpai(JanpaiID.PIN_06),
           new Janpai(JanpaiID.PIN_09) ],
    SPM: [ new Janpai(JanpaiID.SOU_01),
           new Janpai(JanpaiID.SOU_04),
           new Janpai(JanpaiID.SOU_07),
           new Janpai(JanpaiID.PIN_02),
           new Janpai(JanpaiID.PIN_05),
           new Janpai(JanpaiID.PIN_08),
           new Janpai(JanpaiID.MAN_03),
           new Janpai(JanpaiID.MAN_06),
           new Janpai(JanpaiID.MAN_09) ],
    
}

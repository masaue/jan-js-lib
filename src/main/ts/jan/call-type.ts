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
export const CALL_TYPE = {
  RON      : 'RON',
  CHI      : 'CHI',
  PON      : 'PON',
  KAN_LIGHT: 'KAN_LIGHT',
  KAN_ADD  : 'KAN_ADD',
  KAN_DARK : 'KAN_DARK',
} as const;

export type CallType = typeof CALL_TYPE[keyof typeof CALL_TYPE];

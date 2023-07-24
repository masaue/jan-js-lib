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
import {Hand, HandObject} from './hand';
import {Janpai, JanpaiObject} from './janpai';
import {JANPAI_ID} from './janpai-id';
import {Mentsu, MentsuObject} from './mentsu';
import {Suit} from './suit';
import {Wind, WIND} from './wind';

export function chowable(hand: Hand, janpai: Janpai) {
  if (janpai.ji) {
    return false;
  }
  switch (janpai.number) {
  case 1:
    return hand.includes(janpai.next) && hand.includes(janpai.next.next);
  case 2:
    return hand.includes(janpai.next) && hand.includes(janpai.next.next) ||
           hand.includes(janpai.prev) && hand.includes(janpai.next);
  case 8:
    return hand.includes(janpai.prev) && hand.includes(janpai.next) ||
           hand.includes(janpai.prev) && hand.includes(janpai.prev.prev);
  case 9:
    return hand.includes(janpai.prev) && hand.includes(janpai.prev.prev);
  default:
    return hand.includes(janpai.next) && hand.includes(janpai.next.next) ||
           hand.includes(janpai.prev) && hand.includes(janpai.next) ||
           hand.includes(janpai.prev) && hand.includes(janpai.prev.prev);
  }
}

export function chowableList(hand: Hand, janpai: Janpai) {
  const chowableList: Mentsu[] = [];
  if (janpai.ji) {
    return chowableList;
  }
  const number = janpai.number;
  if (number > 2 && hand.includes(janpai.prev.prev) && hand.includes(janpai.prev)) {
    chowableList.push(Mentsu.createChowMentsu(janpai.prev.prev));
  }
  if (1 < number && number < 9 && hand.includes(janpai.prev) && hand.includes(janpai.next)) {
    chowableList.push(Mentsu.createChowMentsu(janpai.prev));
  }
  if (number < 8 && hand.includes(janpai.next) && hand.includes(janpai.next.next)) {
    chowableList.push(Mentsu.createChowMentsu(janpai));
  }
  return chowableList;
}

export function count(target: Janpai[], janpai: Janpai) {
  return target.filter((j) => { return j.equals(janpai) }).length;
}

export function createDeck() {
  const deck: Janpai[] = [];
  getAllJanpai().forEach((janpai) => {
    for (let i = 0; i < 4; i++) {
      deck.push(janpai.clone());
    }
  });
  return deck;
}

export function discard(target: Janpai[], janpai: Janpai) {
  const found = target.find((j, index) => {
    if (j.equals(janpai)) {
      target.splice(index, 1);
      return true;
    }
    return false;
  });
  return found ? found.clone() : undefined;
}

export function getAllJanpai() {
  return Object.values(JANPAI_ID).map((id) => { return new Janpai(id) });
}

export function hasJanpai(target: Janpai[], janpai: Janpai) {
  return target.some((j) => { return j.equals(janpai) });
}

export function hasSuit(target: Janpai[], suit: Suit) {
  return target.map((j) => { return j.suit }).includes(suit);
}

export function janpaiList(objectList: JanpaiObject[]) {
  return objectList.map((o) => { return new Janpai(o.id, o.red) });
}

export function janpaiListWith(target: Janpai[], janpai: Janpai) {
  const janpaiListWith = [...target];
  janpaiListWith.push(janpai);
  sortJanpaiList(janpaiListWith);
  return janpaiListWith;
}

export function nextWind(wind: Wind) {
  switch (wind) {
  case WIND.TON:
    return WIND.NAN;
  case WIND.NAN:
    return WIND.SHA;
  case WIND.SHA:
    return WIND.PEI;
  case WIND.PEI:
    return WIND.TON;
  }
}

export function numbers(target: Janpai[]) {
  return target.map((j) => { return j.number });
}

type ToObjectedList<T> = T extends Janpai ? JanpaiObject : MentsuObject;

export function objectedList<T extends Janpai | Mentsu>(target: T[]) {
  return target.map((t) => {
    return t.toObject() as ToObjectedList<T>;
  });
}

type ToObjectedTable<T> = T extends Janpai ? JanpaiObject : HandObject;

export function objectedTable<T extends Janpai | Hand>(targetTable: {[target: string]: T}) {
  return Object.fromEntries(Object.entries(targetTable).map(([k, v]) => {
    return [k, v.toObject() as ToObjectedTable<T>];
  }));
}

export function remove(target: Janpai[], janpai: Janpai, count = 1) {
  for (let i = 0; i < count; i++) {
    discard(target, janpai);
  }
}

export function shuffleList(target: Janpai[]) {
  for (let n = target.length; n > 0; n--) {
    const s = n - 1;
    const t = Math.floor(Math.random() * n);
    const temp = target[s];
    target[s] = target[t];
    target[t] = temp;
  }
}

export function sortJanpaiList(target: Janpai[]) {
  target.sort((s, t) => {
    const sIndex = Object.values(JANPAI_ID).findIndex((id) => { return id === s.id });
    const tIndex = Object.values(JANPAI_ID).findIndex((id) => { return id === t.id });
    return (sIndex < tIndex) ? -1 : 1;
  });
}

export function suitCount(target: Janpai[]) {
  return (new Set(target.map((j) => { return j.suit }))).size;
}

export function uniqueList(target: Janpai[]) {
  const result: Janpai[] = [];
  target.forEach((t) => {
    if (!result.some((r) => { return r.equals(t) })) {
      result.push(t);
    }
  });
  return result;
}

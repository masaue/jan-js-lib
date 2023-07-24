[日本語版 README はこちら](README-ja.md)

# jan-js-lib - Mahjong Score Calculator Library
Rules supported by this library.

- Mahjong Competition Rules
- (work-in-progress)Zung Jung Mahjong

## Example
```
import {
  CompleteInfo,
  COMPLETE_TYPE,
  Hand,
  Janpai,
  JANPAI_ID,
  McrUtil,
  Mentsu,
  WIND,
} from '@masaue/jan-js-lib';

(() => {
  // concealed hand
  const janpaiList = [
    new Janpai(JANPAI_ID.MAN_01),
  ];
  // hand
  const hand = new Hand(janpaiList);
  // chow
  hand.fix(Mentsu.createChowMentsu(new Janpai(JANPAI_ID.PIN_01)));
  // pung
  hand.fix(Mentsu.createPungMentsu(new Janpai(JANPAI_ID.SOU_09)));
  // melded kong
  hand.fix(Mentsu.createKongMentsu(new Janpai(JANPAI_ID.TON)));
  // concealed kong
  hand.fix(Mentsu.createKongMentsu(new Janpai(JANPAI_ID.BAI), true));
  // complete tile, is last, prevalent, seat, complete type
  const completeInfo = new CompleteInfo(new Janpai(JANPAI_ID.MAN_01),
    false, WIND.TON, WIND.NAN, COMPLETE_TYPE.FINAL_DRAW_AND_WIN_ON_KONG);

  const complete = McrUtil.complete(hand, completeInfo);
  const yakuList = complete.yakuList.map((yaku) => {
    return {
      point: yaku.point,
      yaku: yaku.englishName,
    }
  });
  console.log({point: complete.point, yakuList});
})();
```

### Result
```
{
  point: 38,
  yakuList: [
    { point: 2, yaku: 'Prevalent Wind' },
    { point: 2, yaku: 'Dragon Pung' },
    { point: 1, yaku: 'Pung of Terminals or Honors' },
    { point: 4, yaku: 'Two Melded Kongs' },
    { point: 2, yaku: 'Concealed Kong' },
    { point: 4, yaku: 'Outside Hand' },
    { point: 1, yaku: 'Single Wait' },
    { point: 6, yaku: 'All Types' },
    { point: 8, yaku: 'Last Tile Draw' },
    { point: 8, yaku: 'Out with Replacement Tile' }
  ]
}
```

## Documents
- [The various kinds of MCR Yaku](./documents/McrYakuPattern.md)
- [how to publish](./documents/HowToPublish.md)

## License
[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)

&copy; 2021 [masaue](mailto:masayuki.uegaki@gmail.com)

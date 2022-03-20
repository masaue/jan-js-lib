# jan-js-lib - 麻雀点数計算ライブラリ

対応ルールは以下の通り。

- 国際公式ルール(Mahjong Competition Rules)
- (実装中)中庸麻雀(Zung Jung Mahjong)

## サンプル
```
import {
  CompleteInfo,
  CompleteType,
  Hand,
  Janpai,
  JanpaiID,
  McrUtil,
  Mentsu,
  Wind,
} from '@masaue/jan-js-lib';

(() => {
  // 純手牌
  const janpaiList = [
    new Janpai(JanpaiID.MAN_01),
  ];
  // 手牌
  const hand = new Hand(janpaiList);
  // チー
  hand.fix(Mentsu.createChowMentsu(new Janpai(JanpaiID.PIN_01)));
  // ポン
  hand.fix(Mentsu.createPungMentsu(new Janpai(JanpaiID.SOU_09)));
  // 大明槓、加槓
  hand.fix(Mentsu.createKongMentsu(new Janpai(JanpaiID.TON)));
  // 暗槓
  hand.fix(Mentsu.createKongMentsu(new Janpai(JanpaiID.BAI), true));
  // 和了牌、4枚目かどうか、場風、自風、和了タイプ(自摸、槓上開花など)
  const completeInfo = new CompleteInfo(new Janpai(JanpaiID.MAN_01),
    false, Wind.TON, Wind.NAN, CompleteType.FINAL_DRAW_AND_WIN_ON_KONG);

  const complete = McrUtil.complete(hand, completeInfo);
  const yakuList = complete.yakuList.map((yaku) => {
    return {
      point: yaku.point,
      yaku: yaku.name,
    }
  });
  console.log({point: complete.point, yakuList});
})();
```

### 実行結果
```
{
  point: 38,
  yakuList: [
    { point: 2, yaku: '圈風刻' },
    { point: 2, yaku: '箭刻' },
    { point: 1, yaku: '幺九刻' },
    { point: 4, yaku: '双明槓' },
    { point: 2, yaku: '暗槓' },
    { point: 4, yaku: '全帯幺' },
    { point: 1, yaku: '単調将' },
    { point: 6, yaku: '五門斉' },
    { point: 8, yaku: '妙手回春' },
    { point: 8, yaku: '槓上開花' }
  ]
}
```

## 今後の予定
- d.tsの導入
- 設計資料をドキュメントへ追加

## ドキュメント
- [公開手順](./documents/HowToPublish.md)

## ライセンス
[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)で配布します。

&copy; 2021 [masaue](mailto:masayuki.uegaki@gmail.com)

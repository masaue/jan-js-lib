# 公開手順

1. テスト
```
npm link
# from user repository
npm link @masaue/jan-js-lib
```

2. 公開
```
npm version (major | minor | patch)
git push origin --tags
npm run publish
```

3. 後片付け
```
# from user repository
npm unlink @masaue/jan-js-lib

npm unlink (-g)
```

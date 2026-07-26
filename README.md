# HoriCraft VPM Listing

HoriCraft の Unity ツールを VCC（VRChat Creator Companion）から入れるためのリポジトリです。

## 使い方

1. VCC を開く
2. **Settings** → **Packages** → **Add Repository**
3. 次の URL を貼り付ける

```
https://horicraft.github.io/vpm/index.json
```

登録すると、プロジェクトの **Manage Project** 画面に HoriCraft のツールが並びます。

## 収録パッケージ

| パッケージ | 内容 |
|---|---|
| [TexSlim（テックスリム）](https://github.com/HoriCraft/texslim) | アバターのテクスチャを非破壊で軽くする |

---

## 中の人向け

`index.json` は手で書きません。`sources.json` に並べたリポジトリの GitHub Release を
ワークフローが読み、各リリース zip の中の `package.json` をそのまま版情報にして組み立てます。
リリースと一覧がズレないようにするためです。

### パッケージを増やすとき

`sources.json` の `repos` に1行足すだけです。

```json
{
  "repos": [
    "HoriCraft/texslim",
    "HoriCraft/kaepon"
  ]
}
```

足したあと **Actions → Build VPM Listing → Run workflow** を実行してください。

### 更新のタイミング

- パッケージ側でリリースしても、このリポジトリのワークフローは**自動では動きません**
  （別リポジトリのイベントを受け取るには PAT が必要なため、あえて依存を増やしていません）
- 反映したいときは **Actions → Build VPM Listing → Run workflow** を手動実行してください
- 押し忘れても、毎日 1 回の定期実行で拾われます

### 前提

`sources.json` に並べるリポジトリは **公開リポジトリ**である必要があります。
非公開だと `GITHUB_TOKEN` ではリリース資産を読めません。

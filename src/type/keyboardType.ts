// **1. 기본 글자 그룹**
export const baseKanaKeys = [
  "あ",
  "か",
  "さ",
  "た",
  "BACK",
  "な",
  "は",
  "ま",
  "ら",
  "わ",
] as const;

export type KanaRowKey = (typeof baseKanaKeys)[number];

export const baseKana = {
  あ: ["あ", "い", "う", "え", "お"],
  か: ["か", "き", "く", "け", "こ"],
  さ: ["さ", "し", "す", "せ", "そ"],
  た: ["た", "ち", "つ", "て", "と"],
  BACK: [],
  な: ["な", "に", "ぬ", "ね", "の"],
  は: ["は", "ひ", "ふ", "へ", "ほ"],
  ま: ["ま", "み", "む", "め", "も"],
  ら: ["ら", "り", "る", "れ", "ろ"],
  わ: ["わ", "を", "", "", ""],
} satisfies Record<KanaRowKey, string[]>;

// **2. 변형을 일으키는 글자 (Modifiers)**
export type Modifier = "゛" | "゜" | "ゃ" | "ゅ" | "ょ" | "っ";
export const modifiers: Modifier[] = ["゛", "゜", "ゃ", "ゅ", "ょ", "っ"];

// **3. 변형된 기본 글자 (Transformed Kana)**
// **(1) 탁점 변형 (゛)**
export const dakutenMap = {
  か: "が",
  き: "ぎ",
  く: "ぐ",
  け: "げ",
  こ: "ご",
  さ: "ざ",
  し: "じ",
  す: "ず",
  せ: "ぜ",
  そ: "ぞ",
  た: "だ",
  ち: "ぢ",
  つ: "づ",
  て: "で",
  と: "ど",
  は: "ば",
  ひ: "び",
  ふ: "ぶ",
  へ: "べ",
  ほ: "ぼ",
} as const;

export type DakutenKey = keyof typeof dakutenMap;
export const dakutenMapTyped: Record<DakutenKey, string> = dakutenMap;

// **(2) 반탁점 변형 (゜)**
export const handakutenMap = {
  は: "ぱ",
  ひ: "ぴ",
  ふ: "ぷ",
  へ: "ぺ",
  ほ: "ぽ",
} as const;

export type HandakutenKey = keyof typeof handakutenMap;
export const handakutenMapTyped: Record<HandakutenKey, string> = handakutenMap;

// **(3) 작은 글자 변형 (ゃ, ゅ, ょ)**
export const smallKanaMap = {
  き: { ゃ: "きゃ", ゅ: "きゅ", ょ: "きょ" },
  し: { ゃ: "しゃ", ゅ: "しゅ", ょ: "しょ" },
  ち: { ゃ: "ちゃ", ゅ: "ちゅ", ょ: "ちょ" },
  に: { ゃ: "にゃ", ゅ: "にゅ", ょ: "にょ" },
  ひ: { ゃ: "ひゃ", ゅ: "ひゅ", ょ: "ひょ" },
  み: { ゃ: "みゃ", ゅ: "みゅ", ょ: "みょ" },
  り: { ゃ: "りゃ", ゅ: "りゅ", ょ: "りょ" },
} as const;

export type SmallKanaKey = keyof typeof smallKanaMap;
export const smallKanaMapTyped: Record<
  SmallKanaKey,
  Record<"ゃ" | "ゅ" | "ょ", string>
> = smallKanaMap;

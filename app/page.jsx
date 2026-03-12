"use client";
import { useState } from "react";

const IMAGES = {
  whale:     "/images/whale.webp",
  hedgehog:  "/images/otter.webp",
  elephant:  "/images/elephant.webp",
  deer:      "/images/owl.webp",
  bee:       "/images/bee.webp",
  butterfly: "/images/butterfly.webp",
  cheetah:   "/images/cheetah.webp",
  eagle:     "/images/eagle.webp",
  dolphin:   "/images/dolphin.webp",
  fox:       "/images/fox.webp",
  stone:     "/images/stone.webp",
};;

const DIMENSIONS = {
  D: {
    label: "深度處理", en: "Depth of Processing",
    desc: "這組題目在看你處理資訊的深度，你傾向於想得淺還是想得深？",
    levels: {
      low: "你處理事情的方式很直接，做了決定就往前走，不太會回頭反覆檢視，別人還在想的時候，你已經在做了。",
      mid: "你會想，但你知道什麼時候該停下來，有時候一件事會在腦子裡多轉幾圈，但你通常能在想清楚和想太多之間找到那條線。",
      high: "你的腦子很少真正安靜下來，一句話、一個決定、一次對話，都可能在你心裡展開成一張複雜的網，叫自己別想太多，但那個念頭本身又變成另一個值得想的事，睡前是最難的時候，因為沒有其他事情可以分散注意力了。",
    },
  },
  O: {
    label: "過度刺激", en: "Overstimulation",
    desc: "這組題目在看你對過度刺激的耐受度，你多快會感到超載？",
    levels: {
      low: "嘈雜的環境、密集的行程、突然的變化，這些對你的影響相對小，你能在各種狀況下保持狀態，不太需要特別的時間或空間來恢復。",
      mid: "忙碌的環境會讓你有點疲憊，但給你一點空間就能恢復，你知道自己有個耐受上限，也大概知道在哪裡。",
      high: "你的耗損速度比別人快，有時候連自己也沒發現，吵雜的餐廳、塞滿行程的週末、被打斷了好幾次的工作日，結束之後那種疲憊會壓過來，連思考都變得模糊，離開那個環境之後才意識到自己一直繃著，回到一個人的空間，是你一天裡最需要的一刻。",
    },
  },
  E: {
    label: "情緒同理", en: "Emotional Reactivity",
    desc: "這組題目在看你對他人情緒的感知力，你多容易感受到周圍的情緒？",
    levels: {
      low: "別人的情緒對你來說是可以觀察的事，但不容易直接影響你的狀態，你能理解別人在感受什麼，但你和那個感受之間有一層距離。",
      mid: "你有同理心，也知道什麼時候該抽身，別人的難過你感受得到，但你通常不會一直帶著別人的情緒走。",
      high: "別人的情緒對你來說從來都不是抽象的，朋友說沒事，但你知道他不是真的沒事，一個空間裡有人不高興，你在門口就感覺到了，這讓你很容易成為別人傾訴的對象，但有時候你承接了很多，卻沒有人問過你還好嗎。",
    },
  },
  S: {
    label: "感官敏感", en: "Sensory Sensitivity",
    desc: "這組題目在看你對感官刺激的敏感度，光線、聲音、氣味對你影響多大？",
    levels: {
      low: "感官刺激對你的影響相對小，光線、聲音、氣味你能注意到但不太困擾，在各種環境下都能保持狀態。",
      mid: "你對感官細節有一定的感知力，某些環境會讓你不太舒服，但你通常能找到辦法調整，不會被它佔據太多注意力。",
      high: "你的感官一直都是開著的，別人沒注意到的氣味、背景音樂的音量、衣服領口的觸感，這些對你來說是真實存在的干擾，那個不舒服就是在那裡，很難靠意志力讓它消失，有時候一個環境好不好，你走進去的瞬間就知道了。",
    },
  },
  HSS: {
    label: "感覺尋求", en: "High Sensation Seeking",
    desc: "有些高敏感的人同時也渴望新刺激，這組題目在看你是否屬於這類型。",
    levels: {
      low: "你在熟悉的事物裡找到踏實感，不需要持續的新刺激，日常的規律對你來說是一種安穩，而不是限制。",
      mid: "你偶爾會想要一點新鮮感，但不會為此坐立難安，你在穩定和變化之間找到了自己的節奏，能享受規律，也能接受偶爾的不同。",
      high: "你同時住著兩個互相拉扯的自己，一個需要安靜、需要恢復、需要不被打擾，另一個悶了就想出走，看到沒去過的地方就想進去，熟悉的事情做久了就開始覺得哪裡不對，明明容易累，卻又靜不下來。",
    },
  },
};

const QUESTIONS = [
  { id: "D1", dim: "D", scenario: "你做了一個決定，事後發現結果不如預期。你通常會？", options: [{ label: "很快接受，繼續往前走", value: 1 }, { label: "想一下哪裡出錯，得出結論就放下", value: 2 }, { label: "放不下，需要把整件事從頭到尾想一遍，確認每個環節都理解了才能繼續往前", value: 3 }, { label: "很久之後還是會突然想起來，在腦子裡重演，想著如果當時某個選擇不同，現在會不會不一樣", value: 4 }] },
  { id: "D2", dim: "D", scenario: "朋友隨口分享了一件事（不管是不是你感興趣的話題），說完就換話題了。但你？", options: [{ label: "跟著換話題，沒特別放心上", value: 1 }, { label: "當下有多想一下，之後就忘了", value: 2 }, { label: "事後還會想起來，試著理解對方為什麼這樣說、當時的心情是什麼", value: 3 }, { label: "那句話變成一個入口，開始想到自己、想到某段關係、想到一些更大的問題，越想越深", value: 4 }] },
  { id: "D3", dim: "D", scenario: "開會時主管提了一個新方向，大家都點頭說好。你？", options: [{ label: "覺得可以就跟著點頭，不會多想", value: 1 }, { label: "有疑問，但告訴自己先觀察看看", value: 2 }, { label: "腦子裡開始拆解邏輯，會在心裡把疑點一條一條整理清楚，不整理完就覺得不踏實", value: 3 }, { label: "回家之後還在想，把整個方向的可能風險在腦子裡跑了一遍，睡前才終於放下", value: 4 }] },
  { id: "D4", dim: "D", scenario: "你看完一部電影，朋友問你覺得怎樣。你通常？", options: [{ label: "說好看或不好看，大概就這樣", value: 1 }, { label: "聊一下劇情和感受，說完就結束了", value: 2 }, { label: "會從導演意圖、角色動機、故事結構去分析，說起來可以講很久", value: 3 }, { label: "某個畫面或一句台詞會一直浮現，觸發很多自己的東西，那種感覺好幾天都在", value: 4 }] },
  { id: "D5", dim: "D", scenario: "你和別人發生了一點小摩擦，對方好像已經沒事了。你？", options: [{ label: "對方沒事你也沒事，過了就過了", value: 1 }, { label: "稍微想了一下，確認沒問題就放下", value: 2 }, { label: "會反覆回想當時的每句話，試著從對方的角度理解，直到在腦子裡把這件事「解釋通」才能放下", value: 3 }, { label: "不只想這次，還會開始想這段關係的整體模式、自己在關係裡習慣扮演什麼角色，一個小摩擦變成很長的自我審視", value: 4 }] },
  { id: "O1", dim: "O", scenario: "你走進一間燈光很亮、音樂很大聲的餐廳，朋友說「好有氣氛喔」。你的感受是？", options: [{ label: "跟朋友一樣覺得很有氣氛，沒特別困擾", value: 1 }, { label: "有注意到吵，但投入聊天之後就忘了", value: 2 }, { label: "整頓飯都有點分心，但還是可以聊天", value: 3 }, { label: "會想辦法換位子或提早離開，待在那裡讓我很不舒服", value: 4 }] },
  { id: "O2", dim: "O", scenario: "你連續工作了幾個小時，中間沒有休息。你通常？", options: [{ label: "狀態還好，繼續做沒問題", value: 1 }, { label: "有點疲憊，但撐一下就過了", value: 2 }, { label: "效率下降，出去走走或喝杯水之後可以繼續", value: 3 }, { label: "就算休息了也很難再進入狀態，只能把剩下的事留到明天", value: 4 }] },
  { id: "O3", dim: "O", scenario: "一個週末你參加了整天的活動（假設是你不討厭的那種），人很多、行程很滿。結束後你？", options: [{ label: "覺得很充實，精力還很好", value: 1 }, { label: "有點累，睡一覺就恢復了", value: 2 }, { label: "撐完了，但當天晚上必須完全獨處才能恢復，否則隔天還是累", value: 3 }, { label: "活動進行到一半就已經開始覺得撐不住，需要找藉口提早離開才能恢復", value: 4 }] },
  { id: "O4", dim: "O", scenario: "你正在專心做一件事，同事突然走過來問你問題。你？", options: [{ label: "自然地切換，回答完繼續做，沒什麼影響", value: 1 }, { label: "有點被打斷的感覺，但很快就接回來了", value: 2 }, { label: "需要幾分鐘才能重新進入狀態，心裡有點煩", value: 3 }, { label: "不只是思路被打斷，整個情緒都被影響了，需要很久才能恢復", value: 4 }] },
  { id: "O5", dim: "O", scenario: "你同時收到很多訊息、郵件、待辦事項需要處理。你的反應是？", options: [{ label: "整理一下優先順序，逐一處理，不會特別有壓力", value: 1 }, { label: "有點煩，但處理完就好了", value: 2 }, { label: "會先把所有事情列出來整理，不整理清楚就沒辦法開始", value: 3 }, { label: "那些待辦事項會在腦子裡一直轉，即使沒有在處理也無法真正放鬆", value: 4 }] },
  { id: "E1", dim: "E", scenario: "朋友跟你說他最近過得不太好，但沒有說細節。你？", options: [{ label: "說一句「加油」或「會好的」，讓他知道你支持他", value: 1 }, { label: "問他發生什麼事，想了解情況", value: 2 }, { label: "光是聽到他說不太好，自己也開始感覺到一種沉重", value: 3 }, { label: "那天之後還是會惦記著他，忍不住主動傳訊問他還好嗎", value: 4 }] },
  { id: "E2", dim: "E", scenario: "你在看一部電影，裡面有一個角色失去了最重要的人。你通常？", options: [{ label: "覺得劇情很好，但情緒上沒有特別大的波動", value: 1 }, { label: "有點難過，但出了電影院就恢復了", value: 2 }, { label: "那種難過會持續一陣子，需要時間才能從角色的情緒裡抽出來", value: 3 }, { label: "看完之後會反覆想那個角色的處境，甚至替他感到不平或心疼", value: 4 }] },
  { id: "E3", dim: "E", scenario: "開會時你發現一個不太熟的同事看起來心情很差，但沒有人提。你？", options: [{ label: "專注在會議內容，沒有特別注意", value: 1 }, { label: "有注意到，但告訴自己不關我的事", value: 2 }, { label: "沒辦法假裝沒看到，會用眼神或表情讓對方知道你注意到他了", value: 3 }, { label: "整個會議都感覺到那個氣氛，很難完全專注在討論上", value: 4 }] },
  { id: "E4", dim: "E", scenario: "你身邊有人在吵架或關係緊張，即使不是針對你。你？", options: [{ label: "不太受影響，那是他們的事", value: 1 }, { label: "有感覺到氣氛不對，但可以切換注意力", value: 2 }, { label: "會不自覺地想緩和氣氛或做些什麼", value: 3 }, { label: "那種緊張感會滲進你的情緒裡，就算離開現場，心還是留在那裡，一直掛著", value: 4 }] },
  { id: "E5", dim: "E", scenario: "你在路上看到一個陌生人似乎很難過。你？", options: [{ label: "注意到了，但繼續走，沒有特別放心上", value: 1 }, { label: "有一點在意，但很快就轉移注意力了", value: 2 }, { label: "會停下來多看幾眼，想確認他是否需要幫助", value: 3 }, { label: "那個畫面會留在腦子裡一段時間，自己也跟著感覺到一種莫名的低落", value: 4 }] },
  { id: "S1", dim: "S", scenario: "你走進一個剛打掃過、充滿清潔劑味道的房間。你？", options: [{ label: "沒特別注意到味道，繼續做自己的事", value: 1 }, { label: "有聞到，但幾分鐘後就適應了", value: 2 }, { label: "味道讓你不舒服，一定要開窗才能繼續待在那裡", value: 3 }, { label: "就算開了窗還是受不了，會找藉口提早離開那個空間", value: 4 }] },
  { id: "S2", dim: "S", scenario: "你在咖啡廳工作，旁邊桌的人開始小聲講電話。你？", options: [{ label: "完全沒注意到，專注在自己的事情上", value: 1 }, { label: "有聽到，但很快就過濾掉了", value: 2 }, { label: "會分心，需要戴耳機或換位子才能繼續", value: 3 }, { label: "對那個聲音的來源和內容會忍不住注意，很難不去聽", value: 4 }] },
  { id: "S3", dim: "S", scenario: "你穿了一件領口有點緊的衣服去上班。你？", options: [{ label: "穿習慣之後就忘了，不影響一整天", value: 1 }, { label: "偶爾會注意到，但不會特別困擾", value: 2 }, { label: "整天都意識到，會一直去拉衣服或調整領口，沒辦法假裝沒這件事", value: 3 }, { label: "就算調整了還是不舒服，最後會選擇提早回家換衣服或乾脆請假", value: 4 }] },
  { id: "S4", dim: "S", scenario: "你在吃一道菜，裡面有一個你不太喜歡的味道。你？", options: [{ label: "吃得出來但不影響，繼續吃完", value: 1 }, { label: "有點不喜歡，但可以接受", value: 2 }, { label: "那個味道讓你很難繼續吃，需要配其他東西蓋過去", value: 3 }, { label: "光是聞到或想到那個味道就已經讓你不舒服，很難入口", value: 4 }] },
  { id: "S5", dim: "S", scenario: "你正在專心工作，辦公室的日光燈開始有點閃爍。你？", options: [{ label: "沒有注意到", value: 1 }, { label: "注意到了，但沒有特別影響", value: 2 }, { label: "有點干擾，會試著調整座位或角度來減少影響", value: 3 }, { label: "除了視覺干擾，還會開始感到頭痛或眼睛不舒服等身體反應", value: 4 }] },
  { id: "HSS1", dim: "HSS", scenario: "你的工作內容已經很熟悉，每天大概知道會做什麼。你的感受是？", options: [{ label: "很好，穩定讓我有安全感", value: 1 }, { label: "還可以，偶爾有點無聊但不影響", value: 2 }, { label: "會開始主動找新的挑戰或學新東西，不然會悶", value: 3 }, { label: "重複的事情讓我很難保持動力，會想換環境或換工作", value: 4 }] },
  { id: "HSS2", dim: "HSS", scenario: "朋友提議去一個你完全沒去過、評價也不多的餐廳。你？", options: [{ label: "有點猶豫，比較想去有把握的地方", value: 1 }, { label: "無所謂，去哪都可以", value: 2 }, { label: "覺得有趣，喜歡試新的東西", value: 3 }, { label: "這種不確定感反而讓你更想去，越沒人去過越吸引你", value: 4 }] },
  { id: "HSS3", dim: "HSS", scenario: "你有一個週末完全自由，沒有任何安排。你通常？", options: [{ label: "維持日常作息，做熟悉的事就很滿足", value: 1 }, { label: "可能會看看有什麼活動，但不會特別去找刺激", value: 2 }, { label: "會主動安排沒做過的事，不想把時間浪費在重複的事情上", value: 3 }, { label: "如果沒有新的計畫會感到坐立難安，需要一些新的體驗才覺得這個週末有意義", value: 4 }] },
  { id: "HSS4", dim: "HSS", scenario: "你在一個已經很熟悉的領域被交付一個全新的、有點冒險的專案。你？", options: [{ label: "有點擔心，希望有更多資訊和把握再開始", value: 1 }, { label: "接受了，但會盡量在熟悉的框架內進行", value: 2 }, { label: "覺得很有趣，這種有點陌生的挑戰反而讓你更有動力", value: 3 }, { label: "熟悉的反而讓你無聊，這種有點冒險的才是你最在狀態的時候", value: 4 }] },
  { id: "HSS5", dim: "HSS", scenario: "你發現自己最近的生活很規律，每天差不多。你的反應是？", options: [{ label: "覺得很踏實，規律讓你有安全感", value: 1 }, { label: "沒有特別感覺，規律或不規律都可以", value: 2 }, { label: "會開始想安排一些不一樣的事，打破一下日常", value: 3 }, { label: "規律的生活讓你感到悶，甚至有點焦慮，需要主動製造變化", value: 4 }] },
];

const ANIMALS = {
  whale:     { key: "whale",     name: "藍鯨",  trait: "深淵者",   desc: "你在深海獨自思考世界，旁人看起來你很安靜，但你的內心一直在運轉，分析、連結、沉澱，你不需要很多刺激，但你需要足夠的深度。" },
  hedgehog:  { key: "hedgehog",  name: "水獺",  trait: "界線者",   desc: "你有自己的節奏，也知道怎麼保護它，環境太吵、太滿的時候，你會找到一個安靜的角落恢復自己，這種對自身狀態的敏感度，讓你比多數人更懂得照顧自己。" },
  elephant:  { key: "elephant",  name: "大象",  trait: "記憶者",   desc: "你記得每一種情緒的重量，別人的喜悅和悲傷你都感受得到，有時甚至比對方本人更深刻，這種深度的情感連結，讓你成為很多人願意靠近的存在。" },
  deer:      { key: "deer",      name: "貓頭鷹",  trait: "感知者",   desc: "你的感官一直都是開著的，細微的光線變化、空氣裡的氣味、背景裡的聲音，這些對你來說都是真實存在的訊息，讓你對美的事物有極深的感受力，也讓你走進某些空間的瞬間就知道那裡對不對。" },
  bee:       { key: "bee",       name: "蜜蜂",  trait: "織網者", desc: "你是感知全開的存在，深度思考、容易過載、情感豐富、感官細膩，四個面向你都有，世界對你來說既豐富又疲憊，但你比任何人都活得更完整。" },
  dolphin:   { key: "dolphin",   name: "海豚",  trait: "探索者",   desc: "你又敏感又充滿活力，喜歡深度思考，但也需要新的刺激和冒險，在變化中找到意義，在探索中找到自己。" },
  fox:       { key: "fox",       name: "狐狸",  trait: "遊蕩者",       desc: "你同時住著兩種衝動，一個說太吵了我要走，一個說好無聊我要出去，容易被環境耗損，但悶著更難受，總是在剛好太多和剛好不夠之間來回，找不到完美的位置，但你已經學會在移動中找到平衡。" },
  butterfly: { key: "butterfly", name: "蝴蝶",  trait: "共鳴者",   desc: "你帶著開放的心感受世界，對人的情緒極度敏感，同時又渴望不同的體驗和相遇，每一次新的接觸都讓你的內心世界更豐富。" },
  cheetah:   { key: "cheetah",   name: "獵豹",  trait: "疾行者",   desc: "你的感官和行動力同樣強大，能察覺到最細微的變化，同時也有強烈的衝動去體驗、去移動、去嘗試，活在當下，全力以赴。" },
  eagle:     { key: "eagle",     name: "老鷹",  trait: "全觀者", desc: "你是感知全開又充滿衝勁的存在，敏銳的感官、豐富的情感、深度的思考，加上對新刺激的渴望，你同時承載著最大的敏感和最強的驅動力。" },
  stone:     { key: "stone",     name: "隱者",  trait: "靜定者",   desc: "外面的世界吵不吵，你的內在節奏都不太會被打亂，你有一種天生的穩定感，能在各種環境裡保持自己的狀態，這在這個時代是很難得的能力。" },
};

const ANIMAL_COLORS = {
  whale:     "#3a6ea8",
  hedgehog:  "#5a8a3a",
  elephant:  "#8a5aaa",
  deer:      "#4a9a7a",
  bee:       "#c8921a",
  butterfly: "#c05a8a",
  cheetah:   "#c86020",
  eagle:     "#5060a0",
  dolphin:   "#2090b0",
  fox:       "#c86a30",
  stone:     "#7a8a7a",
};

const DIM_ORDER = ["D", "O", "E", "S", "HSS"];

function calcScores(answers) {
  const scores = { D: 0, O: 0, E: 0, S: 0, HSS: 0 };
  QUESTIONS.forEach(q => { if (answers[q.id]) scores[q.dim] += answers[q.id]; });
  return scores;
}

function getAnimals(scores) {
  const isHSS = scores.HSS >= 13;
  const does = { D: scores.D, O: scores.O, E: scores.E, S: scores.S };
  const THRESHOLD = 13;

  // All DOES >= 13
  const allHigh = Object.values(does).every(v => v >= THRESHOLD);
  if (allHigh) return isHSS ? [ANIMALS.eagle] : [ANIMALS.bee];

  // Find dims that are both highest AND >= threshold
  const max = Math.max(...Object.values(does));
  const topDims = Object.entries(does)
    .filter(([, v]) => v === max && v >= THRESHOLD)
    .map(([k]) => k);

  // If no dim reaches threshold -> stone (隱者)
  if (topDims.length === 0) return [ANIMALS.stone];

  const map = isHSS
    ? { D: ANIMALS.dolphin, O: ANIMALS.fox, E: ANIMALS.butterfly, S: ANIMALS.cheetah }
    : { D: ANIMALS.whale,   O: ANIMALS.hedgehog, E: ANIMALS.elephant, S: ANIMALS.deer };

  return [...new Map(topDims.map(d => [map[d].name, map[d]])).values()];
}

function getLevel(s) { return s >= 16 ? "high" : s >= 11 ? "mid" : "low"; }
function scoreLabel(s) { return s >= 17 ? "非常高" : s >= 13 ? "偏高" : s >= 9 ? "中等" : "偏低"; }

// Hand-drawn border SVG as background
const sketchBorder = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect x='2' y='2' width='calc(100%25-4px)' height='calc(100%25-4px)' fill='none' stroke='%23c8b89a' stroke-width='1.5' stroke-dasharray='6,3,2,3' rx='12' opacity='0.6'/%3E%3C/svg%3E")`;

export default function DOESQuiz() {
  const [step, setStep]             = useState("intro");
  const [answers, setAnswers]       = useState({});
  const [currentQ, setCurrentQ]     = useState(0);
  const [result, setResult]         = useState(null);
  const [pendingAnswers, setPending] = useState(null);
  const [currentSelection, setCurrentSelection] = useState(null);


  const q        = QUESTIONS[currentQ];
  const prevDim  = currentQ > 0 ? QUESTIONS[currentQ - 1].dim : null;
  const isNewDim = q?.dim !== prevDim;
  const progress = currentQ / QUESTIONS.length;
  const isLastQ  = currentQ === QUESTIONS.length - 1;

  const primaryColor = result ? ANIMAL_COLORS[result.animals[0].key] : "#8a7a6a";

  const handleAnswer = (val) => {
    setCurrentSelection(val);
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);
    if (isLastQ) { setPending(newAnswers); }
  };

  const handleNext = () => {
    if (!currentSelection) return;
    setCurrentSelection(null);
    setCurrentQ(c => c + 1);
  };

  const handleShowResult = () => {
    const final = pendingAnswers || answers;
    const scores = calcScores(final);
    setResult({ scores, animals: getAnimals(scores) });
    setStep("result");
  };

  const handleBack = () => {
    if (currentQ === 0) { setStep("intro"); return; }
    const prevIdx = currentQ - 1;
    const prevQid = QUESTIONS[prevIdx]?.id;
    setCurrentQ(prevIdx);
    setCurrentSelection(answers[prevQid] ?? null);
  };

  const reset = () => { setStep("intro"); setAnswers({}); setCurrentQ(0); setResult(null); setPending(null); setCurrentSelection(null); };

  return (
    <div style={{ minHeight: "100vh", background: "#fdf6f8", fontFamily: "Zen Maru Gothic, Noto Sans TC, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 22px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Zen+Maru+Gothic:wght@400;500;700&family=Klee+One&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeOut  { from{opacity:1} to{opacity:0;transform:translateY(-10px)} }
        @keyframes floatIn  { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
        @keyframes twinkle  { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes dimFade  { from{opacity:0;max-height:0;margin-bottom:0} to{opacity:1;max-height:80px;margin-bottom:22px} }
        .opt { transition: all 0.15s ease; cursor: pointer; }
        .opt:hover { transform: translateX(4px); background: #fff0f4 !important; }
        .cta-btn { transition: all 0.18s ease; cursor: pointer; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.10); }
        .back-btn:hover { background: #fce8f0 !important; }
        .bar-fill { transition: width 1.2s cubic-bezier(.4,0,.2,1); }
        .star1 { animation: twinkle 2.2s ease-in-out infinite; }
        .star2 { animation: twinkle 2.8s ease-in-out infinite 0.5s; }
        .star3 { animation: twinkle 3.2s ease-in-out infinite 1s; }
        .sketch-box {
          position: relative;
          border-radius: 18px;
          background: #fffdf8;
        }
        .sketch-box::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 18px;
          border: 1.5px solid #ddd0b8;
          pointer-events: none;
        }
        .sketch-box::after {
          content: '';
          position: absolute; inset: 4px;
          border-radius: 14px;
          border: 1px dashed #ece0cc;
          pointer-events: none;
          opacity: 0.55;
        }
        .result-img { animation: floatIn 0.9s ease-out; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 560, paddingBottom: 72, paddingLeft: 16, paddingRight: 16, boxSizing: "border-box" }}>

        {/* ── INTRO ── */}
        {step === "intro" && (
          <div style={{ animation: "fadeUp 0.6s ease-out", paddingTop: 56 }}>
            {/* decorative top line */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #f0b0c0)" }} />
              <span style={{ fontSize: 10, letterSpacing: 4, color: "#c898a8", fontFamily: "Noto Sans TC, sans-serif" }}>DOES</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #f0b0c0, transparent)" }} />
            </div>

            <div style={{ textAlign: "center", marginBottom: 32, position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span className="star1" style={{ fontSize: 10, color: "#e890a0" }}>✦</span>
                <span className="star2" style={{ fontSize: 7, color: "#f0a8b8" }}>✦</span>
                <span className="star3" style={{ fontSize: 10, color: "#e890a0" }}>✦</span>
              </div>
              <h1 style={{ fontFamily: "Klee One, serif", fontSize: 30, color: "#3d2e3a", lineHeight: 1.3, margin: "0 0 8px", fontWeight: 400 }}>
                測出你的感知角色
              </h1>
              <p style={{ fontSize: 12, color: "#c098a0", fontFamily: "Noto Sans TC, sans-serif", margin: 0, letterSpacing: 2 }}>DOES 高敏感人格測驗</p>
            </div>

            {/* sketch card */}
            <div className="sketch-box" style={{ padding: "20px 22px", marginBottom: 24 }}>
              <p style={{ fontSize: 10, letterSpacing: 3, color: "#c898a8", margin: "0 0 10px", fontFamily: "Noto Sans TC, sans-serif" }}>什麼是高敏感人格？</p>
              <p style={{ fontSize: "clamp(12px, 3.5vw, 13.5px)", color: "#7a5a64", lineHeight: 1.9, margin: 0, fontFamily: "Noto Sans TC, sans-serif" }}>
                高敏感人格（HSP）不是病，也不是你想太多。大約 15-20% 的人天生對外在刺激和內在情緒感知得更深，心理學家 Elaine Aron 把這個特質整理成四個面向，縮寫為 <span style={{whiteSpace: "nowrap"}}><strong style={{color: "#cc6878"}}>DOES</strong></span>。
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
              {[["D","深度處理","Depth of Processing"],["O","過度刺激","Overstimulation"],["E","情緒同理","Emotional Reactivity"],["S","感官敏感","Sensory Sensitivity"]].map(([k,zh,en]) => (
                <div key={k} className="sketch-box" style={{ padding: "14px 16px" }}>
                  <p style={{ fontSize: 22, fontFamily: "Klee One, serif", color: "#cc6878", margin: "0 0 4px", letterSpacing: 1 }}>{k}</p>
                  <p style={{ fontSize: 12, color: "#6a4a55", margin: 0, fontFamily: "Noto Sans TC, sans-serif" }}>{zh}</p>
                  <p style={{ fontSize: 10, color: "#c898a8", margin: "3px 0 0", fontFamily: "Noto Sans TC, sans-serif" }}>{en}</p>
                </div>
              ))}
            </div>

            <button className="cta-btn" onClick={() => setTimeout(() => setStep("quiz"), 50)} style={{
              width: "100%", padding: "15px",
              background: "linear-gradient(135deg, #e07888, #f0a0a8)", border: "none", borderRadius: 50,
              color: "#fff5f5", fontSize: 14, fontWeight: 700,
              fontFamily: "Zen Maru Gothic, sans-serif", letterSpacing: 3,
              cursor: "pointer", boxShadow: "0 4px 16px rgba(90,74,56,0.25)",
            }}>
              開始測驗 ✦
            </button>
            <p style={{ textAlign: "center", marginTop: 14, fontSize: 11, color: "#d4a8b4", fontFamily: "Noto Sans TC, sans-serif" }}>25 題 · 約 5 分鐘 · 不需要登入</p>
          </div>
        )}

        {/* ── QUIZ ── */}
        {step === "quiz" && q && (
          <div style={{ paddingTop: 52 }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <button className="back-btn" onClick={handleBack} style={{
                  background: "transparent", border: "1px solid #f0c0cc", borderRadius: 20,
                  padding: "4px 14px", fontSize: 11, color: "#c098a0",
                  cursor: "pointer", fontFamily: "Noto Sans TC, sans-serif", transition: "background 0.15s",
                }}>← 返回</button>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 10, letterSpacing: 2, color: "#c898a8", fontFamily: "Noto Sans TC, sans-serif" }}>{DIMENSIONS[q.dim]?.label}</span>
                  <span style={{ fontSize: 11, color: "#d4a8b4", fontFamily: "Noto Sans TC, sans-serif" }}>{currentQ + 1} / {QUESTIONS.length}</span>
                </div>
              </div>
              <div style={{ height: 3, background: "#fce8f0", borderRadius: 2 }}>
                <div className="bar-fill" style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, #e888a0, #f0a8b8)", width: `${progress * 100}%` }} />
              </div>
            </div>

            <div key={q.id + "_content"} style={{ animation: "fadeUp 0.3s ease-out", minHeight: 420 }}>

            {isNewDim && (
              <div style={{ borderLeft: "2px solid #f0c0cc", paddingLeft: 12, marginBottom: 22 }}>
                <p style={{ fontSize: 11, color: "#c090a0", margin: 0, fontFamily: "Noto Sans TC, sans-serif", lineHeight: 1.8 }}>{DIMENSIONS[q.dim]?.desc}</p>
              </div>
            )}

            <h2 style={{ fontSize: 16, color: "#3d2e3a", lineHeight: 1.85, margin: "0 0 24px", fontWeight: 500, fontFamily: "Noto Sans TC, sans-serif" }}>{q.scenario}</h2>

            <div key={q.id} style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {q.options.map((opt, i) => (
                <button key={`${q.id}-${i}`} className="opt" onClick={() => handleAnswer(opt.value)} style={{
                  padding: "13px 18px",
                  background: currentSelection === opt.value ? "#fce8ee" : "#fff",
                  border: `1.5px solid ${currentSelection === opt.value ? "#d06878" : "#e8d8dc"}`,
                  borderRadius: 12, textAlign: "left", fontSize: 13.5,
                  color: currentSelection === opt.value ? "#a03050" : "#7a5a64",
                  lineHeight: 1.7, fontFamily: "Noto Sans TC, sans-serif", cursor: "pointer",
                }}>{opt.label}</button>
              ))}
            </div>

            <div style={{ marginTop: 20 }}>
              {!isLastQ && (
                <button className="cta-btn" onClick={handleNext} disabled={!currentSelection} style={{
                  width: "100%", padding: "14px",
                  background: currentSelection ? "#d06878" : "#f0dde0",
                  border: "none", borderRadius: 50,
                  color: currentSelection ? "#fff5f5" : "#c8a8b0",
                  fontSize: 14, fontWeight: 600, letterSpacing: 2,
                  fontFamily: "Noto Sans TC, sans-serif",
                  cursor: currentSelection ? "pointer" : "default",
                  transition: "all 0.2s ease",
                }}>下一題 →</button>
              )}
              {isLastQ && pendingAnswers && (
                <div style={{ animation: "fadeUp 0.4s ease-out" }}>
                  <div style={{ width: "100%", height: 1, background: "#fad8e0", marginBottom: 22 }} />
                  <button className="cta-btn" onClick={handleShowResult} style={{
                    width: "100%", padding: "15px",
                    background: "#d06878", border: "none", borderRadius: 50,
                    color: "#fff5f5", fontSize: 14, fontWeight: 600,
                    fontFamily: "Noto Sans TC, sans-serif", letterSpacing: 2, cursor: "pointer",
                  }}>查看結果 ✦</button>
                </div>
              )}
            </div>
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {step === "result" && result && (
          <div style={{ animation: "fadeUp 0.7s ease-out", paddingTop: 40 }}>

            {result.animals.map((animal, idx) => {
              const color = ANIMAL_COLORS[animal.key];
              return (
                <div key={idx} style={{ marginBottom: 24 }}>
                  {/* Full-width image banner */}
                  <div style={{
                    width: "calc(100% + 32px)", marginLeft: -16,
                    borderRadius: "0 0 32px 32px", overflow: "hidden",
                    position: "relative", marginBottom: 0,
                  }}>
                    <img className="result-img" src={IMAGES[animal.key]} alt={animal.name}
                      style={{ width: "100%", height: 380, objectFit: "cover", objectPosition: "top center", display: "block", mixBlendMode: "multiply" }} />
                    {/* gradient fade */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(transparent, #faf6ef)" }} />
                    {/* decorative corner dots */}
                    <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: 4, fontFamily: "Noto Sans TC, sans-serif" }}>✦ DOES ✦</span>
                  </div>
                  <div style={{ position: "absolute", top: 14, right: 14 }}>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>✦</span>
                  </div>
                  </div>

                  {/* Name block */}
                  <div style={{ padding: "8px 0 24px", animation: "fadeUp 0.5s ease-out 0.3s both" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <div style={{ width: 28, height: 2, background: color, borderRadius: 1 }} />
                      <p style={{ fontSize: 10, letterSpacing: 3, color: color, margin: 0, fontFamily: "Noto Sans TC, sans-serif" }}>{animal.trait}</p>
                    </div>
                    <h1 style={{ fontFamily: "Klee One, serif", fontSize: 44, color: "#3d2e3a", margin: "0 0 16px", fontWeight: 400, lineHeight: 1 }}>{animal.name}</h1>
                    <p style={{ fontSize: 14, color: "#7a5a64", lineHeight: 1.95, margin: 0, fontFamily: "Noto Sans TC, sans-serif" }}>{animal.desc}</p>
                  </div>
                </div>
              );
            })}

            {/* divider with ornament */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0 32px" }}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #d4c4a8)" }} />
              <span style={{ color: "#e8a8b8", fontSize: 12 }}>✦</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #d4c4a8, transparent)" }} />
            </div>

            {/* Dim profile */}
            <p style={{ fontSize: 10, letterSpacing: 4, color: "#c898a8", margin: "0 0 28px", fontFamily: "Noto Sans TC, sans-serif" }}>感知輪廓</p>

            {DIM_ORDER.map(dim => {
              const score = result.scores[dim];
              const level = getLevel(score);
              const pct   = ((score - 5) / 15) * 100;
              const col   = "#d06878";
              return (
                <div key={dim} className="sketch-box" style={{ padding: "18px 20px", marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#3d2e3a", fontWeight: 600, fontFamily: "Noto Sans TC, sans-serif" }}>{DIMENSIONS[dim].label}</span>
                    <span style={{ fontSize: 11, color: col, fontWeight: 600, fontFamily: "Noto Sans TC, sans-serif" }}>{scoreLabel(score)}</span>
                  </div>
                  <div style={{ height: 4, background: "#fce8f0", borderRadius: 2, marginBottom: 12 }}>
                    <div className="bar-fill" style={{ height: "100%", borderRadius: 2, background: col, width: `${pct}%`, opacity: 0.8 }} />
                  </div>
                  <p style={{ fontSize: 13, color: "#7a5a64", lineHeight: 1.85, margin: 0, fontFamily: "Noto Sans TC, sans-serif" }}>
                    {DIMENSIONS[dim].levels[level]}
                  </p>
                </div>
              );
            })}

            {/* disclaimer */}
            <p style={{ fontSize: 11, color: "#d4a8b4", lineHeight: 1.8, margin: "24px 0 20px", fontFamily: "Noto Sans TC, sans-serif", textAlign: "center" }}>
              參考 Elaine Aron 的 DOES 高敏感人格量表設計<br/>結果僅供自我認識參考，不構成任何心理診斷
            </p>

            <button className="cta-btn" onClick={reset} style={{
              width: "100%", padding: "14px",
              background: "transparent", border: "1.5px solid #f0bcc8", borderRadius: 50,
              color: "#c098a0", fontSize: 13, cursor: "pointer",
              fontFamily: "Zen Maru Gothic, sans-serif", letterSpacing: 2,
            }}>重新測驗</button>
          </div>
        )}
      </div>
    </div>
  );
}

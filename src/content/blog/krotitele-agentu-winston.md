---
title: "Krotitelé agentů: jak jsem Winstonem zatnul tipec projekťákům"
date: 2026-07-14
readTime: 6
category: "AI"
featured: true
excerpt: "Interní soutěž v agentní AI platformě, 87 zapojených lidí, tři fáze a finále před porotou. Já do toho šel obráceně: nejdřív přihláška, pak hledání problému. A vyšlo z toho první místo."
coverImage: "../../assets/images/blog/krotitele-agentu-winston/cover.jpg"
coverImageAlt: "Přebírání zlaté trofeje za první místo v soutěži Krotitelé agentů"
---

V Etnetera Core si stavíme vlastní platformu pro běh workflow autonomních AI agentů. Postavit platformu je jedna věc, ale jak ji dostat mezi vývojáře, aby si ji všichni pořádně očuchali? Přesně na to vznikla interní soutěž **Krotitelé agentů**. Tři fáze, 87 zapojených lidí a nakonec 7 finálových řešení odprezentovaných před porotou. A protože tenhle příběh skončil trofejí na mém stole, sepíšu ho i tady.

## Tři fáze, od šifry po reálný kód

První fáze byla vlastně takové seznamovací kolo, **Cipher Hunt**. Úkol: rozchodit si platformu lokálně v Dockeru, postavit v ní agenta a pustit ho ven na internet slídit na web Etnetery. Sešlo se 96 řešení s téměř stoprocentní úspěšností a infrastruktura při tom protočila přes 460 milionů tokenů. Slušná zatěžkávací zkouška hned na úvod.

Druhá fáze, **Agent as Developer**, už oddělila zrno od plev. Agenti se pustili do skutečného kódu a do konce to dotáhlo 13 lidí. No a pak přišlo finále: 7 komplexních řešení od 6 nejlepších krotitelů, prezentace naživo a hybridní porota: tři lidé a k tomu virtuální agenti v rolích Ady Lovelace, Alana Turinga a Steva Jobse. Když už soutěž o agentech, ať taky agenti hodnotí.

## Já to pojal obráceně

Většina finalistů měla nějaký problém na projektu nebo v každodenní práci a pomocí platformy se ho jala řešit. Já postupoval přesně naopak. Nejdřív jsem si řekl, že se zúčastním, a teprve pak jsem začal hledat problém, který budu řešit.

O obchodu nevím téměř nic, takže tudy cesta nevedla. Svoji vývojářskou větev si pod sebou logicky nepodříznu. Zbývala tedy jasná volba. Rozhodl jsem se, že zatnu tipec projekťákům.

## Winston. Řeším problémy.

Přišel jsem s ekosystémem agentů na úklid Jiry, hlídání toku práce, pošťouchávání zaseklých issues, doplňování dokumentace a další záležitosti, které jsou pro vývojáře nudné, ale někdo je dělat musí. Agent sleduje dění v Jiře, GitLabu i Slacku, umí rozlišit, jestli je nahlášený bug skutečně bug, nebo změnový požadavek, a podle toho s ním naloží.

Nazval jsem ho **Winston**, podle legendárního Wolfa z Pulp Fiction. Toho pána, co přijede, když je potřeba uklidit nepořádek, a do půl hodiny je hotovo. Přesně tuhle roli má hrát v projektovém řízení. A aby to nebylo jen o dobrém pocitu, spočítal jsem i pesimistický odhad úspor: kolem 300 tisíc per projekt ročně.

Porotu to přesvědčilo a bylo z toho krásné první místo.

## Konkurence ale rozhodně nespala

Co mě na finále bavilo nejvíc, byla pestrost nápadů. Jirka Novotný obsadil druhé místo s agentem pro práci s legacy kódem, který generuje přehledné reporty z logů a databází, jeden report za zhruba 8 korun. Karel Murgaš dovezl do finále rovnou dva projekty: automatizaci cookies a bugfix agenta, který sám vytváří pull requesty. K tomu automatizace maintenance dvaceti upstream pluginů od Pavla Vodrážky nebo Chrome extension pro testery od Richarda Kousala, která automaticky porovnává frontend s Figmou.

## Co si z toho odnáším

Soutěž splnila přesně to, co měla. Místo školení nebo povinných workshopů si desítky lidí na platformu reálně sáhly a každý si našel vlastní use-case. A ukázalo se, že agenti dnes zvládnou smysluplně pokrýt překvapivě širokou paletu práce: od úklidu Jiry přes legacy kód až po vizuální testování.

Pokud vás zajímá celý průběh a detaily všech finálových řešení, mrkněte na [článek na firemním blogu](https://www.etnetera.cz/blog/krotitele-agentu-jak-87-nasich-lidi-otestovalo-limity-ai-ve-vlastni-platforme).

Jo a zároveň pořád hledáme nadějné a schopné vývojáře, devopsáky a další role. Ozvěte se.

---
title: "Orchestrátor, subagenti a workflow: praktický pohled backend vývojáře"
date: 2026-02-24
readTime: 5
category: "AI"
featured: false
excerpt: "Agentní systémy jsou všude. Rozhodl jsem se postavit vlastní lehkou orchestraci pro každodenní backend vývoj – s konkrétními rolemi, skills a workflow scénáři. Takhle to dopadlo."
coverImage: "/images/blog/orchestrator-ai-vyvoj/cover-agents.webp"
coverImageAlt: "Orchestrátor a subagenti v AI-asistovaném vývoji"
---

Agentní systémy, orchestrace, agentní workflows, skills… Ze všech stran, kdo to nedělá, za rok je bez práce. Říkal jsem si, že si zkusím udělat vlastní orchestraci pro vývoj – se subagenty s konkrétními rolemi, se skills pro různé typy opakujících se tasků a s workflow, které pokrývá to, co dělám u každé iterace: diskuzi, analýzu, vývoj, testy, kontroly.

Podmínka: nechci složitý systém. Chci něco lehkého, co se dá použít napříč platformami (Copilot, Claude, cokoliv dalšího).

Zkusil jsem kombinaci **Copilot + OpenCode**.

## Jak to funguje

Vytvořil jsem si **Orchestrator agenta** (Opus 4.6) s přesně popsaným workflow – jak má postupovat pro různé typy úloh, kdy se může ptát uživatele a na co. Z pohledu práce je to jediný primární agent, se kterým komunikuju.
K dispozici má několik specializovaných subagentů: **Analytik, Backend architekt, Backend vývojář, Code Reviewer, Quality Reviewer, Test specialist**. Orchestrátor ví, jak s nimi pracovat, jak jim předávat zprávy a jak pracovat s jejich výstupy. 

Základ celého systému je tzv. **Context Passing Protocol** – šablonovací systém, který přesně definuje, jak má vypadat zadání předávané každému subagentovi a v jakém formátu se očekává výstup. Každý přechod mezi agenty má svoji šablonu: co dostane na vstup, co musí vrátit, v jaké struktuře. Díky tomu Orchestrátor nepotřebuje "chápat" obsah – jen plní šablony daty z předchozího kroku a předává dál. Součástí přístupu je i to, že šablony předávají jen to nejnutnější: místo celého obsahu souboru třeba jen cestu k němu. Subagent si ho načte sám, když ho potřebuje – a kontext zůstane čistý. 

Dá se nastavit míra, do které chci jako uživatel vstupovat – jestli má jet od A do Z, nebo po každém subagentovi počkat na moji kontrolu.
Subagenti jsou vedeni jako samostatné procesy spouštěné Orchestrátorem, někdy i paralelně. Navzájem spolu neinteragují. Každý má v `opencode.json` definovaná práva, nastavený model (pro vývoj stačí Sonnet 4.6) a další konfigurační parametry, kterými se dají tunit.

Klíčová věc: v Backend developer agentovi mám popsaná pouze vývojová specifika daného projektu – ne obecný "clean code" balast. Analytik o tom nemusí nic vědět a neznečišťuji mu tím kontext. Pro různé subagenty mám definované i specifické skills (kompletní guide integrace, nebo postup při přepisu Java → Kotlin), které dostávají podle typu tasku.

Výstupy z agentů ukládám do složky dle issue a Orchestrátor je předává dál nebo sám vyhodnocuje.

## Konkrétní příklad

Orchestrátorovi řeknu, že chci v integraci doplnit metody a něco přepsat (zadání vytvořím v md souboru, nebo ho napojím na Jiru). On se doptá na číslo issue, režim ve kterém pojede a typ problému – ten má vliv na to, kteří agenti se použijí. Pak si nechá schválit postup.

Následně zadání poladí a předá ho **Analytikovi**. Ten vytvoří kompletní analýzu podle definované struktury do md souboru. Architekt se přeskočí. **Developer** dostane zadání a napíše kód – bez potřeby zkoumat codebase, s čistým kontextem.

Až skončí, Orchestrátor spustí paralelně **Code Review** a **Quality Check**. Z toho vypadnou výstupy do souborů a summary s typy chyb (`must fix`, `critical`, `minor`…). Orchestrátor buď rovnou spustí Developer subagenta s opravou critical chyb, nebo se doptá, jestli chci řešit i minor. Postupnou iterací se kód začistí a nakonec Orchestrátor vytvoří výsledný summary soubor.

## Co si z toho odnáším

Zatím se mi tenhle přístup osvědčil – každý agent pracuje jen s tím, co skutečně potřebuje, a workflow je čitelné a opakovatelné. Nevýhody tam samozřejmě taky jsou: orchestrace má svou režii, ladění promptů zabere čas a při složitějších změnách se občas vyplatí víc přímá práce než průchod celým pipeline.

Směr to ale podle mě je. Střední vrstva mezi "AI píše metody v IDE" a "AI řídí celý počítač" je přesně tam, kde to pro běžný denní vývoj dává smysl.

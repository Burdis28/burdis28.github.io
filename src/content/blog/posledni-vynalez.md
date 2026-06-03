---
title: "Poslední Vynález: jak jsme za hackathon postavili hru o AGI a nasadili ji do Azure"
date: 2025-09-26
readTime: 6
category: "AI"
featured: false
excerpt: "Na AI Bábovky hackathonu jsme za pár týdnů vytvořili webovou tahovou strategii inspirovanou studií AI 2027. Kotlin backend, React frontend, deployment do Azure, nula databáze a spousta chaosu. Skončili jsme třetí."
coverImage: "/images/blog/posledni-vynalez/prezentace.jpg"
coverImageAlt: "Herní dashboard Poslední Vynález - Kolo 19, Éra zralosti"
---

V létě 2025 jsme v Etnetera Core rozjeli **AI Bábovky**. Komunitní hackathon, kde si každý tým mohl vybrat vlastní projekt a za pár týdnů ho dotáhnout do podoby funkční webové aplikace. Podmínky byly jednoduché: používat AI při vývoji, nasadit do Azure, prezentovat na Techlunch finále.

Vybrali jsme si téma, které nás oba bavilo: webová hra inspirovaná studií **AI 2027**.

## Nápad: závod o přežití lidstva

**Poslední Vynález** je tahová webová hra o závodě v budování AGI. Hráč hraje za CEO společnosti OpenBrain a snaží se vyvinout bezpečnou Obecnou Umělou Inteligenci dřív, než ho předběhne konkurence v podobě fiktivního DeepCentu. Přitom musí balancovat mezi pokrokem, bezpečností a veřejným míněním.

Nápad vychází ze studie **AI 2027**, realistické spekulace několika vědců o tom, jak by mohla vypadat cesta k AGI. Přišlo nám zajímavé ji převést do interaktivní formy, kde si člověk na vlastní kůži zkusí, jaké volby jsou u takového projektu na stole. Co se stane, když vsadíte všechno na rychlý pokrok a zanedbáte bezpečnost? Nebo naopak, budete příliš opatrní a DeepCent vás předběhne?

## Stack: Kotlin, React a žádná databáze

Záměrně jsme sáhli po kombinaci, která nás bavila, ne nutně po té nejrozumnější:

- **Kotlin (Ktor)** na backendu. Celá herní logika, tahy, events, stav hry.
- **React** na frontendu. UI postavené s pomocí Lovable.
- **Žádná databáze.** Stav hry žije v paměti backendu, seed zajišťuje reprodukovatelnost.
- **Azure Static Web Apps** pro frontend, **Azure Container Apps** pro backend.

Kotlin na backendu byl vědomá volba. Chtěl jsem si vyzkoušet, jak daleko se dá dostat s čistě in-memory stavem bez databáze, a seed jako mechanismus pro reprodukovatelné hry mi přišel elegantní. V praxi to znamenalo, že každá hra je deterministická, ale sdílení rozehrané partie je komplikovanější.

Kód byl místy opravdu ošklivý. Kolega to komentoval slovy, které vystihují celý projekt lépe než cokoliv jiného:

> *"Ty krávo to je drsný, já to čtu a vůbec nevím co to dělá."*

## Vývoj: vibecoding na plné obrátky

![Vibecoding](/images/blog/posledni-vynalez/foto-2.jpg)

Ještě než vznikl jediný řádek kódu, proběhlo několik iterací s Gemini čistě na úrovni návrhu. Co bude jádrem hry, jak bude fungovat herní smyčka, jaké zdroje hráč spravuje, jak se bude projevovat konkurenční tlak DeepCentu. Gemini posloužil jako myšlenkový partner pro ujasnění mechanik, hraní si s různými variantami a postupné dotahování zadání do podoby, kde bylo jasné co vlastně stavíme. Teprve pak přišlo přetavení návrhu do kódu.

Vývoj samotný pak probíhal čistě přes AI. Gemini a GPT si přehazovaly zadání jako horký brambor. Workflow vypadal nějak takto:

1. Napsat Gemini: *"Jsi senior Kotlin developer, naprogramuj mi zadání bez chyb, jinak půjdeš do vězení"*
2. Warp AI frčí 3 hodiny
3. Nekompiluje to
4. Hodit Gradle wrapper do kontextu a nechat napsat testy
5. Funguje to
6. Podívat se na frontend... fuj
7. Lovable help
8. Frontend frčí
9. Nano Banano help
10. Azure not ready
11. **It's alive!**

Nezní to jako strukturovaný proces, protože to strukturovaný proces nebyl. Bylo to střílení od boku, iterování přes chyby a spoléhání na to, že AI zvládne vygenerovat dost funkčního kódu, aby se to celé nějak sestavilo. A fungovalo to, i když výsledek vypadal odpovídajícím způsobem.

Bezpečnostní díry? Názor byl jasný:

> *"Vulnerability sere pes, důležité je, kdo je první na trhu."*

![This is fine](/images/blog/posledni-vynalez/foto-4.jpg)

## Jak hra funguje

Hráč dostane každé kolo zdroje: peníze, výzkum a výpočetní výkon. Rozhoduje, jak je investovat mezi pokrokem AGI, bezpečnostním sladěním (alignment) a PR aktivitami. Každé kolo navíc přináší náhodné události, průlom ve výzkumu, B2B integraci, regulační tlak nebo sabotáž od DeepCentu. Hra má 6 fází s různými podmínkami a každou chvíli musíte reagovat na dilemata — masivní škálování, nebo postupné zlepšování? Občas vás DeepCent pošle do kolen sabotáží a vy se musíte vzpamatovat.

<div class="blog-carousel" data-carousel>
  <div class="blog-carousel__viewport">
    <div class="blog-carousel__track">
      <figure class="blog-carousel__slide">
        <img src="/images/blog/posledni-vynalez/foto-5.jpg" alt="Herní dashboard - Kolo 19, Éra zralosti" />
        <figcaption>Herní dashboard - Kolo 19, Éra zralosti</figcaption>
      </figure>
      <figure class="blog-carousel__slide">
        <img src="/images/blog/posledni-vynalez/foto-6.jpg" alt="Aktuální fáze hry" />
        <figcaption>Aktuální fáze hry</figcaption>
      </figure>
      <figure class="blog-carousel__slide">
        <img src="/images/blog/posledni-vynalez/foto-7.jpg" alt="Událost: Úspěšná B2B integrace" />
        <figcaption>Událost: Úspěšná B2B integrace</figcaption>
      </figure>
      <figure class="blog-carousel__slide">
        <img src="/images/blog/posledni-vynalez/foto-10.jpg" alt="Sabotáž: Únik informací zevnitř" />
        <figcaption>Sabotáž: Únik informací zevnitř</figcaption>
      </figure>
      <figure class="blog-carousel__slide">
        <img src="/images/blog/posledni-vynalez/foto-8.jpg" alt="Výherní obrazovka: Úspěšně jste vyvinuli bezpečnou AGI" />
        <figcaption>Výherní obrazovka: Úspěšně jste vyvinuli bezpečnou AGI</figcaption>
      </figure>
      <figure class="blog-carousel__slide">
        <img src="/images/blog/posledni-vynalez/foto-9.jpg" alt="Dilema: Masivní škálování vs. postupné zlepšování" />
        <figcaption>Dilema: Masivní škálování vs. postupné zlepšování</figcaption>
      </figure>
    </div>
    <button class="blog-carousel__btn blog-carousel__btn--prev" aria-label="Předchozí">&#8249;</button>
    <button class="blog-carousel__btn blog-carousel__btn--next" aria-label="Další">&#8250;</button>
  </div>
  <div class="blog-carousel__thumbs"></div>
</div>

## Testování: nejvíc času zabralo hraní

Paradoxně největší část vývoje nezabralo programování, ale testování. Sednout si ke hře, zahrát ji od začátku do konce, a pak si říct: *tohle není zábava*.

Balancování herních mechanik je práce, která se navenek moc nevidí, ale bez ní hra prostě nefunguje. Je rozdíl mezi tím, že hra technicky funguje, a tím, že se v ní dají dělat smysluplná rozhodnutí. Opakovaně jsme procházeli otázkami jako: Je to vůbec dosažitelné vyhrát? Nebo je hra naopak příliš snadná a výsledek předvídatelný od kola tři? Dává cenu investovat do bezpečnosti, nebo je to zbytečné? Jsou náhodné události příliš kruté, nebo příliš bezvýznamné?

Každá taková iterace znamenala zahrát hru, identifikovat kde se kazí zážitek, upravit čísla nebo pravidlo, a hrát znovu. Mockrát. Tenhle cyklus byl pomalý, trochu nudný a naprosto nezbytný. Výsledkem bylo, že hra dostala tvar, kde rozhodnutí hráče skutečně mají váhu a kde prohra není náhoda, ale důsledek.

A tohle je přesně ta část, kterou AI objektivně dělat nemůže. Jenom člověk dokáže říct, jestli ho hra baví, jestli ho rozhodnutí vtahují, nebo jestli má pocit, že celá věc nemá smysl. AI může generovat mechaniky, navrhnout čísla, udělat prototyp za hodinu, ale nedokáže posoudit, jestli je to zábava. Na to potřebujete sedět u hry a skutečně ji hrát. AI byla v tomhle projektu nepostradatelná pro rychlé prototypování, ale zábavnou hru by sama nevytvořila.

## Výsledek: 3. místo a spokojení hráči

Na finálové prezentaci Techlunch jsme skončili **třetí**, s rozdílem jediného bodu od druhého místa. Porota ocenila dotažení prototypu a nápad. Diváci si hru zahrát chtěli, což byl pro nás asi nejlepší možný feedback.

Celý projekt potvrdil jednu věc: s AI nástrojema a pár dny volného času se dá postavit překvapivě funkční produkt, i když kód vypadá tak, že mu autor sám nerozumí.

# Blog příspěvky

Každý `.md` soubor v této složce je jeden blog článek. Název souboru = URL slug.

## Frontmatter (povinné pole)

```yaml
---
title: "Název článku"
date: 2024-05-12          # Datum vydání (YYYY-MM-DD)
readTime: 10              # Odhadovaná doba čtení v minutách
category: "Backend"       # Kategorie — volný text
featured: false           # true = zobrazí se jako hlavní featured karta
excerpt: "Krátký popis článku, max ~160 znaků."
coverImage: "/images/blog/<slug>/cover.jpg"
coverImageAlt: "Popis obrázku pro screen readery"
---
```

## Přidání nového článku

1. Vytvoř soubor `<slug>.md` v této složce
   - Slug = URL adresa článku, např. `kotlin-coroutines.md` → `/blog/kotlin-coroutines`
   - Malá písmena, slova oddělena pomlčkou
2. Vyplň frontmatter dle šablony výše
3. Přidej cover obrázek do `public/images/blog/<slug>/cover.jpg`
4. Napiš obsah článku ve standardním Markdownu pod frontmatter blokem

## Aktuální články

| Soubor                              | Slug                          | Featured |
|-------------------------------------|-------------------------------|----------|
| `future-port-youth-ai.md`           | future-port-youth-ai          | ano      |
| `upce-esports-pribeh-spolku.md`     | upce-esports-pribeh-spolku    | ne       |

> Pozn.: Maximálně jeden článek by měl mít `featured: true`. Tento článek se zobrazuje jako velká hero karta na stránce blogu.

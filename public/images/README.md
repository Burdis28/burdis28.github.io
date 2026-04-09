# Obrázky webu

Tato složka obsahuje všechny statické obrázky webu, dostupné na URL `/images/...`.

## Struktura

```
images/
├── blog/
│   └── <slug-clanku>/       # Složka pojmenovaná stejně jako soubor v src/content/blog/
│       ├── cover.jpg        # Hlavní cover obrázek článku (POVINNÝ)
│       └── *.jpg            # Další obrázky použité v těle článku
│
├── projects/
│   └── <slug-projektu>/     # Složka pojmenovaná podle ID projektu v projects.json
│       ├── cover.jpg        # Hlavní obrázek projektu (POVINNÝ)
│       └── *.jpg            # Screenshoty, galerie apod.
│
└── profile/
    ├── avatar.jpg           # Profilová fotka (čtvercový formát, min 400×400 px)
    └── hero-banner.jpg      # Hero banner na hlavní stránce (doporučeno 1440×600 px)
```

## Konvence pojmenování

- Název složky = slug článku / ID projektu (stejný jako v `src/content/`)
- Hlavní obrázek vždy `cover.jpg`
- Malá písmena, slova oddělena pomlčkou (`kebab-case`)
- Pouze `.jpg` nebo `.webp` — **ne** `.jpeg`, `.JPG`, `.png`

## Doporučené rozměry

| Typ             | Rozměry       | Poznámka                         |
|-----------------|---------------|----------------------------------|
| Blog cover      | 1200 × 630 px | Poměr 16:9, také pro OG meta tag |
| Projekt cover   | 800 × 450 px  | Poměr 16:9                       |
| Avatar          | 400 × 400 px  | Čtvercový, bude oříznut na kruh  |
| Hero banner     | 1440 × 600 px | Široký formát                    |

## Přidání nového článku

1. Vytvoř složku `public/images/blog/<slug>/`
2. Přidej `cover.jpg` (viz doporučené rozměry)
3. V `src/content/blog/<slug>.md` nastav `coverImage: "/images/blog/<slug>/cover.jpg"`

## Přidání nového projektu

1. Vytvoř složku `public/images/projects/<id>/`
2. Přidej `cover.jpg`
3. V `src/content/data/projects.json` nastav `"imageUrl": "/images/projects/<id>/cover.jpg"`

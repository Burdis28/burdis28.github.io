# Data webu (JSON)

Tato složka obsahuje veškerý strukturovaný obsah webu. **Žádné komponenty není potřeba upravovat** — stačí editovat tyto JSON soubory.

## Soubory

| Soubor            | Obsah                                    | Stránka                |
|-------------------|------------------------------------------|------------------------|
| `profile.json`    | Základní info, bio, sociální sítě        | Všechny stránky        |
| `experience.json` | Pracovní zkušenosti (timeline)           | `/experience`          |
| `education.json`  | Vzdělání a certifikace                   | `/experience`          |
| `projects.json`   | Projekty a portfolio                     | `/projects`            |
| `skills.json`     | Technické dovednosti dle kategorií       | `/projects`            |

## profile.json — klíčová pole

```jsonc
{
  "name": "...",
  "title": "...",
  "tagline": "...",
  "avatarUrl": "/images/profile/avatar.jpg",       // čtvercová fotka
  "heroBannerUrl": "/images/profile/hero-banner.jpg",
  "social": {
    "github": "https://github.com/...",
    "linkedin": "https://linkedin.com/in/...",
    "email": "adresa@example.com"
  }
}
```

## projects.json — přidání projektu

```jsonc
{
  "id": "nazev-projektu",                          // unikátní ID, kebab-case
  "title": "Název projektu",
  "description": "Popis...",
  "featured": false,                               // true = zobrazí se první
  "imageUrl": "/images/projects/nazev-projektu/cover.jpg",
  "imageAlt": "Popis obrázku",
  "tags": ["Java", "Spring Boot"],
  "links": {
    "demo": "https://...",                         // nebo null
    "source": "https://github.com/..."             // nebo null
  }
}
```

## experience.json — přidání pracovní zkušenosti

Pole se řadí chronologicky sestupně (nejnovější nahoře). Příklad položky:

```jsonc
{
  "id": "firma-pozice",
  "company": "Název firmy",
  "role": "Pozice / titul",
  "period": "2022 – současnost",
  "location": "Praha, CZ",
  "description": "Popis role...",
  "technologies": ["Kotlin", "Spring Boot", "PostgreSQL"]
}
```

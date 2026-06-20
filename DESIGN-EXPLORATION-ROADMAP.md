# MPCOM Design System & Visual Exploration Roadmap

## Cel

Zbudować dopracowane portfolio marketingowe w czystym Astro, wykorzystując
code-first workflow do stworzenia design systemu, kilku kierunków wizualnych
oraz udokumentowanej historii procesu projektowego.

Dokument pełni trzy funkcje:

1. checklisty bieżącej pracy,
2. źródła kontekstu dla Codexa,
3. materiału do późniejszej prezentacji procesu klientowi lub agencji.

## Status

- `[x]` zakończone
- `[~]` w trakcie
- `[ ]` zaplanowane

**Aktualny etap:** architektura zmiennych i tokenów.

---

## 0. Fundament Techniczny

- [x] Oddzielić publiczne portfolio od przyszłego dashboardu klienta.
- [x] Wybrać Astro dla warstwy marketingowej.
- [x] Przywrócić na `main` czysty projekt Astro bez wymagań Meno.
- [x] Zachować eksperymentalną wersję Meno na branchu
  `codex/meno-native-archive`.
- [x] Potwierdzić poprawny build wszystkich sześciu tras.
- [x] Umieścić profil Macieja na dole lewego sidebara zamiast obok CTA
  `Contact`.

**Rezultat:** stabilny punkt techniczny do dalszego projektowania.

---

## 1. Architektura Zmiennych

- [~] Zebrać screeny i opis dotychczasowego systemu zmiennych z Figmy.
- [ ] Opisać tekstowo poziomy i zależności tokenów.
- [ ] Uzgodnić nazewnictwo tokenów.
- [ ] Ustalić podział na:
  - primitive tokens,
  - semantic tokens,
  - component tokens.
- [ ] Ustalić obsługę light i dark mode.
- [ ] Ustalić model breakpointów oraz wartości responsywnych.
- [ ] Zdefiniować grupy:
  - color,
  - typography,
  - spacing,
  - sizing,
  - grid i layout,
  - border i radius,
  - shadow,
  - motion,
  - z-index.
- [ ] Zatwierdzić architekturę przed implementacją.

**Rezultat:** tekstowa specyfikacja systemu tokenów.

---

## 2. Implementacja Design Systemu W Kodzie

- [ ] Utworzyć strukturę CSS custom properties.
- [ ] Wprowadzić wartości bazowe i tokeny semantyczne.
- [ ] Przygotować light i dark mode.
- [ ] Podłączyć typografię, spacing, sizing i layout do tokenów.
- [ ] Zastąpić przypadkowe wartości w istniejącym CSS.
- [ ] Podłączyć komponenty oraz wszystkie publiczne podstrony.
- [ ] Sprawdzić spójność i brak wartości omijających system.
- [ ] Uruchomić pełny build i przegląd wizualny.

**Rezultat:** cały interfejs sterowany przez wspólną architekturę zmiennych.

---

## 3. Clean Starting Point

- [ ] Skorygować architekturę informacji.
- [ ] Uporządkować hierarchię i strukturę contentu.
- [ ] Ujednolicić strukturę komponentów.
- [ ] Doprowadzić neutralny layout do kompletnego i stabilnego stanu.
- [ ] Zweryfikować wszystkie trasy oraz interakcje.
- [ ] Utworzyć branch `clean-starting-point`.
- [ ] Otagować lub opisać commit jako bazę wszystkich eksploracji.

**Rezultat:** neutralny starter, do którego można zawsze wrócić.

**Stop rule:** po zapisaniu tego brancha nie rozwijamy na nim konkretnego
kierunku wizualnego.

---

## 4. Moodboard I Kryteria Eksploracji

- [ ] Zebrać inspiracje dla:
  - koloru,
  - typografii,
  - kompozycji i grida,
  - fotografii,
  - contentu wizualnego,
  - ikonografii,
  - ilustracji,
  - interakcji i motion.
- [ ] Opisać, co konkretnie jest wartościowe w każdej inspiracji.
- [ ] Wyodrębnić powtarzające się zasady.
- [ ] Zdefiniować 2-3 kompletne kierunki wizualne.
- [ ] Nazwać kierunki na podstawie ich charakteru, nie numeru koloru lub fontu.

**Rezultat:** brief dla każdej eksploracji wizualnej.

---

## 5. Visual Explorations

Każda wersja powstaje bezpośrednio z brancha `clean-starting-point`.

### Exploration 01

- [ ] Utworzyć branch `exploration/01-[nazwa-kierunku]`.
- [ ] Zdefiniować typografię, kolor, kompozycję i obrazowanie.
- [ ] Wprowadzić wartości poprzez tokeny.
- [ ] Zastosować kierunek na kluczowych widokach.
- [ ] Zapisać założenia i wnioski.

### Exploration 02

- [ ] Utworzyć branch `exploration/02-[nazwa-kierunku]`.
- [ ] Zdefiniować alternatywny system wizualny.
- [ ] Wprowadzić wartości poprzez tokeny.
- [ ] Zastosować kierunek na kluczowych widokach.
- [ ] Zapisać założenia i wnioski.

### Exploration 03

- [ ] Utworzyć branch `exploration/03-[nazwa-kierunku]`.
- [ ] Zdefiniować trzeci kierunek, jeżeli wnosi realnie inną hipotezę.
- [ ] Wprowadzić wartości poprzez tokeny.
- [ ] Zastosować kierunek na kluczowych widokach.
- [ ] Zapisać założenia i wnioski.

**Rezultat:** 2-3 porównywalne, kompletne wersje portfolio.

---

## 6. Zasady Historii Git

Każda eksploracja powinna mieć czytelną historię commitów:

1. `Define visual direction foundations`
2. `Apply typography and color tokens`
3. `Explore composition and grid`
4. `Update core components`
5. `Apply direction across pages`
6. `Polish interactions and details`

Nie łączymy eksploracji ze sobą przed podjęciem decyzji o wyborze kierunku.

---

## 7. Porównanie I Wybór Kierunku

Każdą wersję oceniamy według tych samych kryteriów:

- zgodność ze strategią marki,
- komunikowanie pozycji Design Engineera,
- czytelność oferty,
- rozpoznawalność,
- jakość typografii i kompozycji,
- skalowalność design systemu,
- potencjał rozwoju portfolio,
- wartość jako proof dla klientów i agencji.

- [ ] Przygotować porównanie wszystkich kierunków.
- [ ] Zapisać mocne strony, ryzyka i ograniczenia.
- [ ] Wybrać kierunek do dalszego rozwoju.
- [ ] Udokumentować uzasadnienie decyzji.

**Rezultat:** wybrany kierunek wizualny i zapis procesu decyzyjnego.

---

## 8. Rozwój Wybranego Kierunku

- [ ] Kontynuować pracę na wybranym branchu.
- [ ] Dopracować wszystkie komponenty i stany.
- [ ] Rozwinąć responsywność.
- [ ] Uzupełnić finalne zdjęcia i content.
- [ ] Dopracować motion i interakcje.
- [ ] Sprawdzić dostępność i wydajność.
- [ ] Połączyć wybrany kierunek z `main`.
- [ ] Zachować pozostałe branche jako historię eksploracji.

**Rezultat:** produkcyjna wersja portfolio na `main`.

---

## 9. Materiał Do Prezentacji I Case Study

- [ ] Pokazać punkt wyjścia.
- [ ] Wyjaśnić architekturę tokenów.
- [ ] Pokazać moodboardy i wyciągnięte zasady.
- [ ] Pokazać wszystkie eksploracje.
- [ ] Opisać kryteria wyboru.
- [ ] Pokazać ewolucję komponentów.
- [ ] Udokumentować code-first i AI-assisted workflow.
- [ ] Przygotować finalne case study.

**Rezultat:** materiał pokazujący nie tylko finalny design, ale cały proces.

---

## Decision Log

| Data | Decyzja | Uzasadnienie | Wpływ |
| --- | --- | --- | --- |
| 2026-06-20 | Publiczne portfolio rozwijamy w czystym Astro | Pełna kontrola nad layoutem i brak ograniczeń dialektu Meno | Meno pozostaje eksperymentem na archiwalnym branchu |
| 2026-06-20 | Reactowy dashboard jest punktem referencyjnym, nie bieżącym produktem | Priorytetem jest marketingowe portfolio i proof systemowego podejścia | Dashboard klienta przechodzi do późniejszej fazy |
| 2026-06-20 | Eksploracje powstaną na osobnych branchach | Historia Git ma dokumentować proces projektowy | Każdy kierunek pozostanie dostępny do prezentacji |

## Kolejny Krok

Maciej przekazuje screeny oraz opis architektury zmiennych używanej dotychczas
w Figma. Najpierw uzgadniamy ją tekstowo. Kod zmieniamy dopiero po potwierdzeniu
modelu.

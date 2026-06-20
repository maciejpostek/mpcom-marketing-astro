# MPCOM Variable Architecture & Design System Assumptions

## Cel Dokumentu

Ten dokument jest źródłem prawdy dla architektury zmiennych używanej w
portfolio MPCOM. Aktualizujemy go po przeanalizowaniu każdej kolejnej kolekcji
zmiennych.

System ma być:

- czytelny dla projektanta, developera i AI,
- możliwy do zastosowania w light i dark mode,
- wystarczająco szczegółowy, aby komponenty miały kompletne stany,
- wystarczająco prosty, aby można nim było zarządzać,
- przygotowany do eksploracji wizualnych poprzez zmianę tokenów zamiast
  przebudowy komponentów.

## Status

| Obszar | Status |
| --- | --- |
| Color primitives | Założenia zatwierdzone |
| Global color semantics | Architektura robocza do zatwierdzenia |
| Component color tokens | Architektura robocza do zatwierdzenia |
| Light / dark mode | Mechanizm zatwierdzony |
| System statuses | Architektura robocza do zatwierdzenia |
| Interaction states | Architektura robocza do zatwierdzenia |
| Size primitives | Jeszcze nieprzeanalizowane |
| Size semantics | Jeszcze nieprzeanalizowane |
| Typography | Jeszcze nieprzeanalizowane |
| Layout | Jeszcze nieprzeanalizowane |

---

# 1. Ogólna Hierarchia Tokenów

Przyjmujemy cztery poziomy:

```text
Primitive tokens
  ↓
Global semantic tokens
  ↓
Component tokens
  ↓
CSS properties w interfejsie
```

Przykład:

```css
--color-neutral-950: #0a0a0a;

--color-text-primary: var(--color-neutral-950);

--button-primary-text-default: var(--color-text-inverse);

.button--primary {
  color: var(--button-primary-text-default);
}
```

## Zasada zależności

- Komponenty nie korzystają bezpośrednio z tokenów prymitywnych.
- Globalne tokeny semantyczne wskazują tokeny prymitywne.
- Tokeny komponentowe wskazują globalne tokeny semantyczne.
- Bezpośrednia wartość HEX może występować wyłącznie w primitives.
- Wyjątek wymaga świadomego uzasadnienia i udokumentowania.

---

# 2. Color Primitives

## Rola

Color primitives przechowują surowe wartości palet. Nie opisują funkcji koloru
i nie są używane bezpośrednio w komponentach.

```css
--color-neutral-0: #ffffff;
--color-neutral-50: #fafafa;
--color-neutral-500: #737373;
--color-neutral-950: #0a0a0a;

--color-accent-50: #f5f3ff;
--color-accent-500: #8b5cf6;
--color-accent-950: #2e1065;
```

## Zasady

- Każda paleta ma nazwę opisującą kolor, nie jego funkcję.
- `0` jest technicznym końcem skali neutralnej i oznacza czystą biel.
- `50` oznacza najjaśniejszy stopień właściwej rampy po czystej bieli.
- `500` jest głównym odcieniem palety.
- `950` oznacza bardzo ciemny szary znajdujący się blisko czerni.
- Przyjmujemy konwencję:
  `0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`.
- Liczba stopni może różnić się między paletami, jeżeli wynika to z realnej
  potrzeby.
- Używamy jednej pełnej palety `neutral` zamiast osobnych palet `light` i
  `dark`.
- Palety statusów mogą mieć własne skale, np. `success`, `warning`, `error` i
  `info`.
- Wartość `transparent` traktujemy jako prymityw techniczny.

## Spójność Pomiędzy Paletami

Numer odcienia ma oznaczać zbliżoną **rolę percepcyjną**, a nie matematycznie
identyczne nasycenie.

Przykładowo:

- `neutral/500` i `accent/500` powinny mieć zbliżony ciężar wizualny,
- `50` powinno zawsze działać jako bardzo jasna powierzchnia,
- `900` i `950` powinny zawsze działać jako bardzo ciemne kolory,
- ten sam stopień nie musi mieć identycznej wartości nasycenia dla żółtego,
  niebieskiego i szarego.

Palety budujemy w przestrzeni `OKLCH`, ponieważ pozwala ona kontrolować osobno:

```text
L — percepcyjną jasność,
C — chromę, czyli intensywność koloru,
H — hue, czyli jego odcień.
```

Wszystkie palety powinny korzystać ze wspólnej rampy jasności `L`. Chroma jest
dopasowywana do konkretnego hue oraz ograniczeń gamutu. Dzięki temu ten sam
numer ma podobną hierarchię wizualną, mimo że żółty i niebieski nie mogą mieć
identycznych parametrów i nadal wyglądać równie dobrze.

Nie generujemy palet poprzez mechaniczne rozjaśnianie i przyciemnianie koloru
HEX. Najpierw ustalamy wspólną rampę jasności, następnie kalibrujemy chromę i
sprawdzamy kontrast najważniejszych par semantycznych.

## Czego primitives nie robią

- Nie wiedzą, czy kolor jest tekstem, tłem lub borderem.
- Nie definiują wariantu komponentu.
- Nie definiują trybu light lub dark.
- Nie powinny pojawiać się w CSS komponentów.

---

# 3. Podział Semantyki Kolorów

Dotychczasowa kolekcja `Colors - semantic` zawierała dwa różne poziomy. W kodzie
rozdzielamy je logicznie:

## 3.1 Global Color Semantics

Opisują role działające w całym produkcie, niezależnie od komponentu.

Proponowany namespace:

```text
color.background.*
color.text.*
color.border.*
color.icon.*
color.accent.*
color.status.*
color.state.*
```

W CSS:

```css
--color-background-canvas;
--color-text-primary;
--color-border-subtle;
--color-status-error-background;
--color-state-focus-ring;
```

## 3.2 Component Color Tokens

Opisują kolor konkretnej części, wariantu i stanu komponentu.

Proponowany namespace:

```text
component.[component].[variant].[property].[state]
```

W CSS pomijamy słowo `component`, ponieważ nazwa komponentu już wyznacza
namespace:

```css
--button-primary-background-default;
--button-primary-background-hover;
--button-primary-background-pressed;
--button-primary-text-disabled;

--input-border-default;
--input-border-focus;
--input-text-disabled;
```

## Dlaczego rozdzielamy te warstwy

- Global semantics odpowiadają na pytanie: „jaką rolę pełni ten kolor?”.
- Component tokens odpowiadają na pytanie: „jak wygląda ten element tego
  komponentu w tym wariancie i stanie?”.
- AI nie musi interpretować nieprecyzyjnego `primary` bez kontekstu.
- Możemy zmienić pojedynczy komponent bez naruszania całego systemu.
- Możemy zmienić cały theme poprzez przepięcie global semantics.

---

# 4. Globalne Role Kolorów

## Problem z `primary`, `secondary`, `tertiary`

Same nazwy nie wyjaśniają AI, projektantowi ani developerowi, gdzie token ma
zostać użyty. Dlatego nie używamy ich jako jedynego opisu powierzchni.

Nie oznacza to całkowitej rezygnacji z tych nazw. Stosujemy model hybrydowy:

- powierzchnie otrzymują nazwy funkcjonalne,
- tekst może zachować hierarchię `primary`, `secondary`, `tertiary`,
- warianty komponentów nadal mogą nazywać się `primary`, `secondary`,
  `tertiary`,
- każda nazwa hierarchiczna musi występować wewnątrz jednoznacznego namespace.

Przykłady czytelne:

```text
text/primary
button/primary/background/default
button/secondary/text/hover
```

Przykład nieczytelny:

```text
color/primary
```

W ostatnim przypadku AI nie wie, czy jest to kolor marki, główny tekst,
powierzchnia strony czy wariant przycisku.

Zamiast:

```text
background/primary
background/secondary
background/tertiary
```

proponujemy role opisujące funkcję:

## 4.1 Background

```text
background/canvas
background/surface
background/subtle
background/muted
background/inverse
background/accent
```

### Definicje

| Token | Funkcja |
| --- | --- |
| `canvas` | Główne tło strony lub aplikacji. Największa powierzchnia. |
| `surface` | Domyślna powierzchnia komponentów osadzonych na canvasie. |
| `subtle` | Delikatnie odróżniona sekcja, panel lub grupa treści. |
| `muted` | Mocniej odseparowana neutralna powierzchnia o niższej hierarchii. |
| `inverse` | Powierzchnia o odwróconym kontraście wobec canvasu. |
| `accent` | Powierzchnia wykorzystująca kolor marki do wyróżnienia. |

### Logika warstw na przykładzie

```text
background/canvas
└── główne tło strony
    background/surface
    └── karta, panel lub sidebar
        background/subtle
        └── delikatnie wydzielona grupa wewnątrz komponentu
```

`muted` służy do powierzchni celowo obniżonej w hierarchii, natomiast `inverse`
odwraca relację jasności całego fragmentu. Nazwy opisują funkcję powierzchni,
dlatego nie wymagają znajomości konkretnej palety ani aktualnego theme'u.

## 4.2 Text

```text
text/primary
text/secondary
text/tertiary
text/inverse
text/accent
text/disabled
```

### Definicje

| Token | Funkcja |
| --- | --- |
| `primary` | Główna treść i nagłówki wymagające najwyższej czytelności. |
| `secondary` | Tekst wspierający, opisy i mniej istotne informacje. |
| `tertiary` | Metadane, placeholdery i treści o najniższej hierarchii. |
| `inverse` | Tekst umieszczony na powierzchni `inverse` lub ciemnym akcencie. |
| `accent` | Tekst służący do brandowego wyróżnienia. |
| `disabled` | Treść elementu niedostępnego. |

## 4.3 Border

```text
border/subtle
border/default
border/strong
border/inverse
border/accent
border/disabled
```

### Definicje

| Token | Funkcja |
| --- | --- |
| `subtle` | Najdelikatniejszy podział struktury. |
| `default` | Standardowy border komponentu. |
| `strong` | Wyraźne oddzielenie lub podkreślenie hierarchii. |
| `inverse` | Border na powierzchniach o odwróconym kontraście. |
| `accent` | Brandowe wyróżnienie lub zaznaczenie. |
| `disabled` | Border elementu niedostępnego. |

## 4.4 Icon

Ikony powinny domyślnie dziedziczyć `currentColor`. Osobne tokeny ikon stosujemy
tylko wtedy, gdy ikona ma inną rolę niż towarzyszący jej tekst.

```text
icon/primary
icon/secondary
icon/tertiary
icon/inverse
icon/accent
icon/disabled
```

## 4.5 Accent

`accent` opisuje kolor brandowy i wizualne wyróżnienie. Nie oznacza
automatycznie interakcji.

Może być używany przez:

- dekoracyjne linie i markery,
- wyróżnione bordery,
- selected state,
- ikony brandowe,
- akcentowane powierzchnie,
- komponenty CTA poprzez ich własne tokeny.

Na tym etapie nie tworzymy osobnej globalnej grupy `interactive`. Jeżeli w
trakcie implementacji okaże się, że kilka komponentów wymaga wspólnej palety
akcji, dodamy wąską grupę `action`, a nie rozbudowany równoległy system.

---

# 5. Proporcje Kolorów

Proporcje są zasadą kompozycyjną, nie nazwą techniczną tokenów.

Punkt wyjścia dla eksploracji:

```text
60% canvas i dominujące powierzchnie
30% surface, subtle i muted
10% accent, inverse i kluczowe wyróżnienia
```

## Zasady

- Proporcja opisuje oczekiwaną obecność koloru w całym widoku.
- Nie musi być matematycznie identyczna na każdej podstronie.
- `accent` powinien pozostać ograniczony, aby zachować hierarchię.
- `inverse` może chwilowo zajmować większą powierzchnię w sekcji specjalnej,
  ale nie powinien bez powodu dominować nad canvasem.
- Komponenty korzystają z nazw funkcjonalnych, nie z nazw `60`, `30` i `10`.

To rozwiązuje problem czytelności dla AI: nazwa mówi, gdzie użyć tokena, a
osobna reguła kompozycyjna mówi, jak często powinien występować.

---

# 6. Light I Dark Mode

## Zasada

API tokenów semantycznych i komponentowych pozostaje identyczne. Zmieniają się
wyłącznie wskazane tokeny prymitywne.

```css
:root,
[data-theme="light"] {
  --color-background-canvas: var(--color-neutral-50);
  --color-background-surface: var(--color-neutral-100);
  --color-text-primary: var(--color-neutral-950);
}

[data-theme="dark"] {
  --color-background-canvas: var(--color-neutral-950);
  --color-background-surface: var(--color-neutral-900);
  --color-text-primary: var(--color-neutral-50);
}
```

## Konsekwencje

- Komponent nie wie, który mode jest aktywny.
- Przełączenie theme'u nie zmienia nazw używanych przez komponent.
- Atrybut `data-theme` może być ustawiony na całym dokumencie lub lokalnej
  sekcji.
- Lokalny dark section może istnieć wewnątrz strony działającej w light mode.
- Primitives nie zmieniają wartości między trybami.
- Każdy theme musi przejść osobną kontrolę kontrastu i dostępności.

---

# 7. Statusy Systemowe

Status opisuje znaczenie komunikatu, nie stan interakcji.

```text
status/success/*
status/warning/*
status/error/*
status/info/*
```

Każdy status ma ten sam kontrakt:

```text
background
border
text
icon
```

Przykład:

```css
--color-status-error-background;
--color-status-error-border;
--color-status-error-text;
--color-status-error-icon;
```

## Zastosowanie

- alerty,
- validation messages,
- status badges,
- komunikaty formularzy,
- oznaczenia sukcesu, błędu, ostrzeżenia i informacji.

Komponent statusowy korzysta z globalnych tokenów statusu. Nie tworzymy
oddzielnego zestawu kolorów `error` dla każdego komponentu, chyba że komponent
ma uzasadniony, specyficzny wariant.

---

# 8. Stany Interakcji

## Kluczowa decyzja

Nie próbujemy definiować jednego globalnego koloru `hover` lub `active` dla
wszystkich komponentów.

Button primary, button secondary, karta, tab i tag mają różne wartości bazowe,
więc ich stany hover i pressed muszą być definiowane w kontekście komponentu.

## Podział stanów

### Globalnie reużywane

```text
state/focus/ring
state/focus/ring-offset

state/disabled/background
state/disabled/border
state/disabled/text
state/disabled/icon
```

Są wspólne, ponieważ ich znaczenie i wymagania dostępności są systemowe.

`focus` nie otrzymuje globalnego backgroundu i tekstu. Zmiana focusu nie
powinna usuwać charakteru wariantu komponentu. Globalny jest przede wszystkim
widoczny ring oraz jego offset. Komponent może dodatkowo aliasować własny
`border/focus` do globalnego koloru focusu.

### Definiowane w komponencie

```text
default
hover
pressed
selected
```

Są zależne od wariantu komponentu.

## Precyzyjne znaczenia

| Stan | Znaczenie |
| --- | --- |
| `default` | Stan spoczynkowy komponentu. |
| `hover` | Wskaźnik znajduje się nad elementem. |
| `pressed` | Przejściowy stan podczas aktywacji przycisku lub kontrolki. |
| `selected` | Trwały wybór, np. aktywny tab, tag lub element nawigacji. |
| `focus` | Element ma focus klawiatury; używamy głównie `focus-visible`. |
| `disabled` | Element jest niedostępny i nie przyjmuje interakcji. |

Nie używamy ogólnego `active`, ponieważ w CSS i języku projektowym może
oznaczać zarówno `pressed`, jak i `selected`.

## Aliasowanie stanów globalnych

Komponent może wskazać token globalny:

```css
--button-primary-background-disabled:
  var(--color-state-disabled-background);
--button-primary-text-disabled:
  var(--color-state-disabled-text);
--button-focus-ring:
  var(--color-state-focus-ring);
```

Jeżeli dany komponent wymaga innego disabled state, może nadpisać alias na
poziomie component token, ale wyjątek powinien być świadomy.

---

# 9. Component Color Tokens

## Kontrakt

Token komponentowy powinien określać:

```text
component
variant
property
state
```

Przykład buttona:

```text
button/primary/background/default
button/primary/border/default
button/primary/text/default

button/primary/background/hover
button/primary/border/hover
button/primary/text/hover

button/primary/background/pressed
button/primary/border/pressed
button/primary/text/pressed

button/primary/background/disabled
button/primary/border/disabled
button/primary/text/disabled

button/focus-ring
```

## Zasada minimalnego zestawu

Nie każdy komponent musi otrzymać wszystkie możliwe tokeny. Dodajemy tylko:

- właściwości, które komponent faktycznie posiada,
- stany, które komponent faktycznie obsługuje,
- warianty, które istnieją w produkcie.

Przykłady:

- Label bez interakcji nie potrzebuje hover ani pressed.
- Eyebrow może potrzebować tylko text, icon, background i border.
- Link potrzebuje default, hover, focus i visited tylko wtedy, gdy visited
  jest istotny.
- Tab potrzebuje default, hover, selected, focus i disabled.
- Input potrzebuje default, hover, focus, invalid, valid i disabled.

To zapobiega rozrastaniu systemu „na zapas”.

---

# 10. Walidacja Formularzy A Statusy

`success`, `warning` i `error` nie są globalnymi stanami interakcji. Są
statusami systemowymi.

Dla inputów stosujemy semantyczne stany:

```text
input/default/*
input/hover/*
input/focus/*
input/invalid/*
input/valid/*
input/disabled/*
```

`invalid` może aliasować `status/error`, a `valid` może aliasować
`status/success`.

```css
--input-border-invalid: var(--color-status-error-border);
--input-text-invalid: var(--color-status-error-text);
--input-border-valid: var(--color-status-success-border);
```

---

# 11. Proponowana Struktura W Kodzie

Docelowo tokeny kolorów mogą zostać rozdzielone na:

```text
src/styles/tokens/
  color-primitives.css
  color-semantic.css
  color-components.css
```

## `color-primitives.css`

- surowe palety,
- brak light/dark mode,
- brak zależności od komponentów.

## `color-semantic.css`

- globalne role,
- light/dark mode,
- statusy,
- focus i disabled.

## `color-components.css`

- aliasy dla komponentów,
- warianty,
- stany komponentów.

Ta struktura jest propozycją do zatwierdzenia przed implementacją.

---

# 12. Zatwierdzone Decyzje

- Primitives są jedynym miejscem przechowującym surowe wartości kolorów.
- Komponenty nie korzystają bezpośrednio z primitives.
- Light i dark mode mają identyczne API tokenów.
- Theme jest przełączany przez atrybut `data-theme`.
- Theme może działać globalnie lub lokalnie na sekcji.
- Statusy `success`, `warning`, `error` i `info` mają `background`, `border`,
  `text` i `icon`.
- Accent jest rolą brandową, nie automatycznie interaktywną.
- Hover, pressed i selected są definiowane na poziomie komponentów.
- Focus i disabled mają globalne podstawy reużywane przez komponenty.
- Nie używamy wieloznacznego `active`; rozdzielamy `pressed` i `selected`.
- Proporcja 60/30/10 jest regułą kompozycyjną, nie nazwą tokenów.
- Używamy jednej palety neutralnej od `neutral/0` do `neutral/950`.
- `neutral/0` jest czystą bielą, a `neutral/950` bardzo ciemnym szarym blisko
  czerni.
- Palety kolorów będą kalibrowane w `OKLCH` poprzez wspólną rampę jasności.
- Nie tworzymy na tym etapie globalnej grupy `action` lub `interactive`.
- Zaczynamy od jednego globalnego zestawu tokenów `disabled`.
- W kodzie używamy krótkiej nazwy `info`.
- Statusy systemowe i disabled posiadają kontrakt `background`, `border`,
  `text`, `icon`.
- Globalny focus posiada `ring` i `ring-offset`; pozostałe zmiany focusu
  definiuje komponent.

---

# 13. Otwarte Decyzje

## 13.1 Nazwy Powierzchni

Czy akceptujemy:

```text
canvas
surface
subtle
muted
inverse
accent
```

zamiast:

```text
primary
secondary
tertiary
contrast
accent
```

**Rekomendacja:** przyjąć nazwy funkcjonalne. Są bardziej jednoznaczne dla AI.

To jedyna nierozstrzygnięta decyzja architektoniczna w warstwie semantycznych
kolorów.

## 13.2 Wartości Palet

Konkretna rampa `OKLCH`, wartości chromy i finalne kolory nie są już decyzją o
architekturze. Zostaną ustalone podczas implementacji i eksploracji wizualnej,
a następnie sprawdzone pod kątem kontrastu.

---

# 14. Następny Krok

1. Zatwierdzić lub skorygować nazwy powierzchni z sekcji 13.
2. Przejść do analizy kolekcji `Sizes - primitives`.
3. Po przeanalizowaniu wszystkich kolekcji stworzyć finalną mapę tokenów.
4. Dopiero wtedy rozpocząć implementację CSS.

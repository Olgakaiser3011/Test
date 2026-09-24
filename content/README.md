# Content: Yoga trifft Wissenschaft

Reels (9:16) und Instagram-Karussells (4:5) im gleichen hellen Stil.

| Ordner | Thema |
|---|---|
| `atemuebungen/` | Atemübungen: Nervensystem, Seufzer, Box Breathing, 4-7-8 |
| `beweglichkeit/` | Beweglichkeit beginnt im Kopf: richtig dehnen für Anfänger |
| `yoga-wirkung/` | Was Yoga in deinem Körper verändert: Stunde bis 12 Wochen |

`shared/` enthält Stil (`video.css`, `carousel.css`) und die Animations-Engine (`engine.js`) für neue Themen.

## Rendern

```bash
npm i playwright            # plus ffmpeg im PATH oder via FFMPEG=/pfad/zu/ffmpeg
node render.mjs <ordner> video       # -> <ordner>/<ordner>-reel.mp4
node render.mjs <ordner> carousel    # -> <ordner>/karussell/*.png
node render.mjs <ordner> stills 5,20 # Vorschaubilder bei Sekunde 5 und 20
```

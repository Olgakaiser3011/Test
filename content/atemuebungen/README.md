# Atemübungen: Yoga trifft Wissenschaft

Visuelles Material für Yoga-Kurse (Anfänger & Fortgeschrittene).

## Dateien

| Datei | Format | Einsatz |
|---|---|---|
| `atemuebungen-reel.mp4` | 1080×1920, ~100 s, ohne Ton | Instagram Reel / Story / TikTok, oder im Kurs am Tablet zeigen |
| `karussell/slide-01…09.png` | 1080×1350 (4:5) | Instagram-Karussell, Ausdruck als Handout |
| `video.html`, `carousel.html` | Quellen | Texte hier ändern, dann neu rendern |

## Inhalt

1. Hook: 20.000 Atemzüge am Tag, fast keiner bewusst
2. Atem = Fernbedienung fürs Nervensystem
3. Gaspedal (Sympathikus) & Bremse (Parasympathikus/Vagus)
4. Warum die Ausatmung beruhigt (respiratorische Sinusarrhythmie)
5. Pranayama ↔ HRV (+ Hirnstamm-Fakt für Fortgeschrittene)
6. Physiologischer Seufzer (Stanford 2023)
7. Box Breathing 4-4-4-4
8. 4-7-8 Atmung (+ Anfänger-Variante 2-3,5-4)
9. Bonus: Resonanzatmung ~6/min
10. 4 goldene Regeln

## Caption-Vorschlag

> Dein Atem ist die einzige Tür in dein Nervensystem, die du selbst öffnen kannst. 🌿
>
> Was Yogis seit Jahrtausenden Pranayama nennen, misst die Neurowissenschaft heute als Herzratenvariabilität.
> Die Regel dahinter ist simpel: **Atme länger aus als ein.**
>
> 3 Techniken, die wirklich erforscht sind:
> 01 Physiologischer Seufzer: bei akutem Stress
> 02 Box Breathing: für Fokus unter Druck
> 03 4-7-8: zum Einschlafen
>
> Speichern & heute Abend ausprobieren. Welche ist deine?
>
> #atemübung #pranayama #yoga #nervensystem #vagusnerv #stressabbau #boxbreathing #478atmung #achtsamkeit #yogalehrerin

## Quellen

- Balban et al. (2023). Brief structured respiration practices enhance mood and reduce physiological arousal. *Cell Reports Medicine.*
- Yackle et al. (2017). Breathing control center neurons that promote arousal in mice. *Science.*
- Lehrer & Gevirtz (2014). Heart rate variability biofeedback: how and why does it work? *Frontiers in Psychology.*
- Bernardi et al. (2001). Effect of rosary prayer and yoga mantras on autonomic cardiovascular rhythms. *BMJ.*
- Zaccaro et al. (2018). How breath-control can change your life. *Frontiers in Human Neuroscience.*

## Neu rendern

```bash
npm i playwright            # plus ffmpeg im PATH oder via FFMPEG=/pfad/zu/ffmpeg
node render.mjs atemuebungen video     # -> atemuebungen-reel.mp4 (aus content/)
node render.mjs atemuebungen carousel  # -> karussell/*.png
node render.mjs atemuebungen stills 5,20
```

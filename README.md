# iNurse — Índices y escalas clínicas

Aplicación web (React + TypeScript + Vite) con calculadoras clínicas en español, al estilo
MDCalc: cada escala tiene sus criterios con botones **No/Sí** (mostrando los puntos), sus
desplegables para las opciones múltiples y un **panel de resultado fijo** que se actualiza en
vivo con la puntuación y su interpretación.

> ⚠️ Herramienta de apoyo docente y de cálculo. No sustituye el juicio clínico ni los
> protocolos de cada centro.

## Ejecutar en local

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # compilación de producción en dist/
```

## Añadir una calculadora nueva

Cada calculadora es un objeto `Calculator` (ver `src/engine/types.ts`) dentro de
`src/calculators/*.ts`: se declaran las entradas (`boolean`, `select`, `number`) y una función
`compute` que devuelve puntuación, interpretación y nivel de riesgo. El formulario y el panel
de resultado se generan automáticamente.

La portada permite filtrar por especialidad (**Anestesiología** y **Cardiología**); las escalas
que figuran en la biblioteca de ambas especialidades aparecen en los dos filtros.

## Escalas implementadas — Cardiología

### Fibrilación auricular y anticoagulación
- CHA₂DS₂-VASc · CHA₂DS₂-VA (ESC 2024) · CHADS₂
- HAS-BLED · ORBIT · ATRIA (hemorragia) · HEMORR₂HAGES · Puntuación DAPT

### Síndrome coronario agudo y dolor torácico
- HEART · EDACS · TIMI (angina inestable/IAMSEST) · TIMI (STEMI) · Índice de riesgo TIMI
- Criterios de Sgarbossa (originales y modificados) · Killip · Cinta de correr de Duke
- Criterios de Brugada para taquicardia ventricular · Mehran (nefropatía por contraste)

### Insuficiencia cardíaca y síncope
- NYHA · Estadios ACC/AHA · Criterios de Framingham · H₂FPEF · CCS (angina)
- Regla de San Francisco · EGSYS · OESIL · Puntuación canadiense de síncope (CSRS)

### Tromboembolismo venoso
- Wells (EP y TVP) · PERC · Ginebra revisada · PESI · sPESI · Hestia
- Padua · IMPROVE · DASH · RIETE · Dímero D ajustado por edad · Villalta

### Criterios diagnósticos
- Duke modificados (endocarditis) · ISTH (CID) · Jones (fiebre reumática) · Kawasaki

### Gravedad y pronóstico
- RoPE · MEWS · mMRC · Índice LACE

### Fórmulas y cálculos clínicos
- QTc (Bazett, Fridericia, Framingham, Hodges y Rautaharju) · Tisdale
- Cockcroft-Gault · LDL de Friedewald · Calcio corregido · Gasto cardíaco (Fick)
- Potencia cardíaca (CPO) · PAPi · Criterios de Light · Fluidos de mantenimiento (4-2-1)
- Diuresis y balance hídrico · Índice de producción reticulocitaria
- Marcha de 6 minutos · Dosificación de alteplasa y tenecteplasa

## Escalas implementadas — Anestesiología

### Riesgo perioperatorio
- Índice de riesgo cardíaco revisado (RCRI / Lee)
- STOP-BANG (apnea obstructiva del sueño)
- ARISCAT (complicaciones pulmonares postoperatorias)
- Escala de Apfel (náuseas y vómitos postoperatorios)
- Clasificación del estado físico ASA
- Puntuación de Apgar quirúrgica (SAS)
- Puntuación CARE (anestesia cardíaca)
- Puntuación de fractura de cadera de Nottingham (NHFS)
- Índice de comorbilidad de Charlson (CCI)
- Índice de estado de actividad de Duke (DASI)

### Dolor
- FLACC · BPS · NVPS · CHEOPS · BOPS · Escala de Abbey · Escala de dolor neuropático (NPS)

### Vía aérea
- Mallampati modificada · Índice de El-Ganzouri (EGRI) · Criterios HEAVEN

### Respiratorio y ventilación
- Relación SpO₂/FiO₂ · RDOS

### Hemodinámica y fluidos
- Presión arterial media (PAM) · Pérdida máxima de sangre permitida (PMSP) ·
  Líquidos intraoperatorios (regla 4-2-1) · VExUS

### Neurológico, sedación y gravedad
- Puntuación motora simplificada (SMS) · SOFA · Escala de somnolencia de Stanford

### Alcohol y abstinencia
- CIWA-Ar · BAWS · CAGE

### Infecciones
- DRIP (neumonía por patógenos resistentes)

### Farmacología y dosificación
- Dosis máxima de anestésicos locales · Masa libre de grasa (Janmahasatian)

## Pendientes (hoja de ruta)

Escalas de las listas de MDCalc que requieren verificar coeficientes publicados o resolver
dudas antes de implementarlas con garantías.

### Cardiología

| Escala | Motivo |
| --- | --- |
| GRACE (SCA) | Modelo de regresión con tablas de puntos por variable continua: verificar con la publicación |
| CRUSADE (hemorragia post-IAM) | Ídem, tablas de puntos por rangos |
| PRECISE-DAPT | Nomograma con variables continuas |
| ASCVD (AHA/ACC 2013), PREVENT, SCORE2 / SCORE2-OP / SCORE2-Diabetes, Framingham de riesgo coronario, Reynolds, PCP-HF | Ecuaciones de riesgo con coeficientes por sexo y etnia; requieren verificación cuidadosa y elegir la ecuación adecuada para población española |
| EuroSCORE II, ACEF II, Thakar, EUROMACS-RHF, RiskE, SAVE, RESCUE-IHCA | Modelos logísticos con coeficientes publicados en apéndices |
| MAGGIC, Seattle, GWTG-HF, ADHERE, EHMRG, OHFRS | Modelos pronósticos de insuficiencia cardíaca con múltiples coeficientes |
| GARFIELD-AF, DOAC score, ARC-HBR | Modelos y criterios de consenso extensos |
| ISCVID 2023 (endocarditis) | Actualización de los criterios de Duke: incorporar sobre la versión ya implementada |
| REVEAL 2.0, Gillmore, Grogan, HCM Risk-SCD, PRIMaCY | Escalas de subespecialidad con variables muy específicas |
| Escalas de ictus (ASTRAL, PLAN, ASCOD, SOAR, CP-SSS, TIA canadiense, PASCAL) | Corresponden a Neurología; se implementarán con esa especialidad |
| Cardio-oncología HFA-ICOS (6 herramientas) | Requieren las tablas completas de la posición de la ESC |
| Guías de práctica clínica (ACEP, control del colesterol, prevención primaria, HTA pediátrica AAP) | Son guías, no calculadoras: valorar cómo presentarlas |

### Anestesiología

| Escala | Motivo |
| --- | --- |
| Riesgo de insuficiencia respiratoria postoperatoria (Gupta) | Regresión logística con coeficientes por tipo de cirugía: verificar con el artículo original |
| Riesgo de neumonía postoperatoria (Gupta) | Ídem |
| POSSUM (morbimortalidad operatoria) | 18 variables con umbrales exactos que conviene verificar |
| VOCAL-Penn (cirrosis) | Modelo estadístico complejo con coeficientes publicados en apéndice |
| Calculadora de conversión de opiáceos | Sensible desde el punto de vista de seguridad: requiere revisión detallada de tablas equianalgésicas |
| SOFA-2 (revisión 2025) | Incorporar la actualización publicada; de momento se incluye el SOFA clásico |
| COMM (uso indebido de opioides) | Instrumento con licencia: revisar condiciones de uso |
| ORT-OUD (riesgo de consumo de opioides) | Verificar ítems exactos de la versión revisada |
| C-DIVA (acceso venoso difícil) | Verificar ítems y puntos de la herramienta |
| EMBED (buprenorfina en urgencias) | Es una vía clínica interactiva más que una calculadora |
| Sedación en urgencias (ACEP 2013) y Amigdalectomía en niños (AAO-HNS) | Son guías clínicas, no calculadoras: valorar cómo presentarlas |

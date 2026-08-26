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

## Escalas implementadas (especialidad: Anestesiología)

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

Escalas de la lista de Anestesiología que requieren verificar coeficientes publicados o
resolver dudas antes de implementarlas con garantías:

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

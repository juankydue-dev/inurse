import type { Calculator } from '../engine/types'
import { riesgo } from './riesgo'
import { dolor } from './dolor'
import { viaAerea } from './viaaerea'
import { respiratorio } from './respiratorio'
import { hemodinamica } from './hemodinamica'
import { neuro } from './neuro'
import { alcohol } from './alcohol'
import { infecciones } from './infecciones'
import { farmacologia } from './farmacologia'

/** Orden de las categorías en la pantalla principal. */
export const CATEGORIES = [
  'Riesgo perioperatorio',
  'Dolor',
  'Vía aérea',
  'Respiratorio y ventilación',
  'Hemodinámica y fluidos',
  'Neurológico, sedación y gravedad',
  'Alcohol y abstinencia',
  'Infecciones',
  'Farmacología y dosificación',
]

export const CALCULATORS: Calculator[] = [
  ...riesgo,
  ...dolor,
  ...viaAerea,
  ...respiratorio,
  ...hemodinamica,
  ...neuro,
  ...alcohol,
  ...infecciones,
  ...farmacologia,
]

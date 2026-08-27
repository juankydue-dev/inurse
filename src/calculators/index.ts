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
import { cardioFA } from './cardio-fa'
import { cardioSCA } from './cardio-sca'
import { cardioTEV } from './cardio-tev'
import { cardioICSincope } from './cardio-ic-sincope'
import { cardioVarios } from './cardio-varios'
import { formulas } from './formulas'

/** Orden de las categorías en la pantalla principal. */
export const CATEGORIES = [
  'Riesgo perioperatorio',
  'Vía aérea',
  'Fibrilación auricular y anticoagulación',
  'Síndrome coronario agudo y dolor torácico',
  'Insuficiencia cardíaca',
  'Síncope',
  'Tromboembolismo venoso',
  'Criterios diagnósticos',
  'Gravedad y pronóstico',
  'Dolor',
  'Respiratorio y ventilación',
  'Hemodinámica y fluidos',
  'Neurológico, sedación y gravedad',
  'Alcohol y abstinencia',
  'Infecciones',
  'Farmacología y dosificación',
  'Fórmulas y cálculos clínicos',
]

export const SPECIALTIES = ['Anestesiología', 'Cardiología']

/**
 * Escalas que aparecen en la biblioteca de más de una especialidad; se les añade
 * la etiqueta correspondiente para que aparezcan al filtrar por cualquiera de ellas.
 */
const EXTRA_SPECIALTIES: Record<string, string[]> = {
  pam: ['Cardiología'],
  rcri: ['Cardiología'],
  dasi: ['Cardiología'],
  charlson: ['Cardiología'],
  care: ['Cardiología'],
  cage: ['Cardiología'],
  vexus: ['Cardiología'],
  'fluidos-mantenimiento': ['Anestesiología'],
  'cockcroft-gault': ['Anestesiología'],
  'calcio-corregido': ['Anestesiología'],
  qtc: ['Anestesiología'],
  diuresis: ['Anestesiología'],
  light: ['Anestesiología'],
  mews: ['Anestesiología'],
  mmrc: ['Anestesiología'],
}

const ALL: Calculator[] = [
  ...riesgo,
  ...viaAerea,
  ...cardioFA,
  ...cardioSCA,
  ...cardioICSincope,
  ...cardioTEV,
  ...cardioVarios,
  ...dolor,
  ...respiratorio,
  ...hemodinamica,
  ...neuro,
  ...alcohol,
  ...infecciones,
  ...farmacologia,
  ...formulas,
]

export const CALCULATORS: Calculator[] = ALL.map((c) => {
  const extra = EXTRA_SPECIALTIES[c.id]
  return extra ? { ...c, specialty: [...c.specialty, ...extra] } : c
})

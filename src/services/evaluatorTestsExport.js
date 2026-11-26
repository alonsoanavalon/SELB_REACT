// Pure helpers that turn the "tests por evaluador" API rows into
// array-of-arrays (for XLSX.utils.aoa_to_sheet) and build file names.
// Student RUT is never part of the exported data.

export const SUMMARY_HEADERS = [
  'Evaluador',
  'Correo',
  'Rol',
  'Tests enviados',
  'Alumnos',
  'Primer envío',
  'Último envío',
]

export const DETAIL_HEADERS = [
  'Fecha de guardado',
  'Instrumento',
  'Alumno',
  'Colegio',
  'Curso',
  'Estudio',
  'Momento',
]

const pad = value => String(value).padStart(2, '0')

const parseDate = value => {
  if (!value) {
    return null
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const formatDate = date => `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`

// dd-mm-yyyy HH:mm in local time; empty string when the value is missing or invalid.
export const formatDateTime = value => {
  const date = parseDate(value)
  if (!date) {
    return ''
  }

  return `${formatDate(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

// Moment dates are plain YYYY-MM-DD values: reformat them without timezone shifts.
const formatPlainDate = value => {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value || ''))
  return match ? `${match[3]}-${match[2]}-${match[1]}` : ''
}

const joinWords = (...parts) =>
  parts
    .filter(part => part !== null && part !== undefined && String(part).trim() !== '')
    .map(part => String(part).trim())
    .join(' ')

export const formatPersonName = person => joinWords(person && person.name, person && person.surname)

export const formatCourse = row => {
  const label = joinWords(row.courseLevel, row.courseLetter)
  return row.courseYear ? joinWords(label, `(${row.courseYear})`) : label
}

export const formatMoment = row => {
  const begin = formatPlainDate(row.momentBegin)
  const until = formatPlainDate(row.momentUntil)

  if (begin && until) {
    return `${begin} – ${until}`
  }

  return row.momentId ? `#${row.momentId}` : ''
}

export const buildSummarySheet = rows => [
  SUMMARY_HEADERS,
  ...rows.map(row => [
    formatPersonName(row),
    row.email || '',
    row.role || '',
    Number(row.tests) || 0,
    Number(row.students) || 0,
    formatDateTime(row.firstDate),
    formatDateTime(row.lastDate),
  ]),
]

export const buildDetailSheet = rows => [
  DETAIL_HEADERS,
  ...rows.map(row => [
    formatDateTime(row.savedAt),
    row.instrumentName || `#${row.instrumentId}`,
    joinWords(row.studentName, row.studentSurname),
    row.schoolName || '',
    formatCourse(row),
    row.studyName || '',
    formatMoment(row),
  ]),
]

const isoDay = now => `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`

const slugify = text =>
  String(text || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const buildSummaryFilename = (now = new Date()) => `tests-por-evaluador-${isoDay(now)}.xlsx`

export const buildDetailFilename = (evaluator, now = new Date()) => {
  const slug = slugify(formatPersonName(evaluator || {})) || 'evaluador'
  return `tests-${slug}-${isoDay(now)}.xlsx`
}

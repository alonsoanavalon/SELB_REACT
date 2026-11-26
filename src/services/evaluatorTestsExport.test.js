import {
  DETAIL_HEADERS,
  SUMMARY_HEADERS,
  buildDetailFilename,
  buildDetailSheet,
  buildSummaryFilename,
  buildSummarySheet,
  formatDateTime,
} from './evaluatorTestsExport'

const pad = value => String(value).padStart(2, '0')
const localStamp = date =>
  `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ` +
  `${pad(date.getHours())}:${pad(date.getMinutes())}`

describe('evaluatorTestsExport', () => {
  const detailRow = {
    testId: 10,
    savedAt: '2026-03-02T12:30:00.000Z',
    instrumentId: 1,
    instrumentName: 'Wally',
    studentId: 7,
    studentName: 'Ana',
    studentSurname: 'Perez',
    courseLevel: '1° Básico',
    courseLetter: 'A',
    courseYear: '2026',
    schoolId: 5,
    schoolName: 'Colegio Uno',
    studyId: 3,
    studyName: 'Estudio X',
    studyYear: '2026',
    momentId: 4,
    momentBegin: '2026-03-01',
    momentUntil: '2026-03-31',
    rut: '11.111.111-1',
  }

  it('uses the Spanish headers from the spec', () => {
    expect(SUMMARY_HEADERS).toEqual([
      'Evaluador', 'Correo', 'Rol', 'Tests enviados', 'Alumnos', 'Primer envío', 'Último envío',
    ])
    expect(DETAIL_HEADERS).toEqual([
      'Fecha de guardado', 'Instrumento', 'Alumno', 'Colegio', 'Curso', 'Estudio', 'Momento',
    ])
  })

  it('formats dates as dd-mm-yyyy HH:mm in local time and tolerates empty values', () => {
    const iso = '2026-03-02T12:30:00.000Z'
    expect(formatDateTime(iso)).toBe(localStamp(new Date(iso)))
    expect(formatDateTime(null)).toBe('')
    expect(formatDateTime('not a date')).toBe('')
  })

  it('builds the summary sheet', () => {
    const sheet = buildSummarySheet([
      {
        evaluatorId: 2, name: 'Eva', surname: 'Uno', email: 'e@example.test', role: 'Evaluator',
        tests: 3, students: 2, firstDate: '2026-01-02T10:00:00.000Z', lastDate: '2026-02-03T10:00:00.000Z',
      },
    ])
    expect(sheet[0]).toEqual(SUMMARY_HEADERS)
    expect(sheet[1]).toEqual([
      'Eva Uno', 'e@example.test', 'Evaluator', 3, 2,
      localStamp(new Date('2026-01-02T10:00:00.000Z')), localStamp(new Date('2026-02-03T10:00:00.000Z')),
    ])
  })

  it('builds the detail sheet with course and moment formatting and no RUT', () => {
    const sheet = buildDetailSheet([
      detailRow,
      { ...detailRow, testId: 11, courseLetter: null, momentBegin: null, momentUntil: null },
    ])
    expect(sheet[0]).toEqual(DETAIL_HEADERS)
    expect(sheet[1]).toEqual([
      localStamp(new Date('2026-03-02T12:30:00.000Z')),
      'Wally',
      'Ana Perez',
      'Colegio Uno',
      '1° Básico A (2026)',
      'Estudio X',
      '01-03-2026 – 31-03-2026',
    ])
    expect(sheet[2][4]).toBe('1° Básico (2026)')
    expect(sheet[2][6]).toBe('#4')
    expect(JSON.stringify(sheet)).not.toContain('11.111.111-1')
    expect(sheet[0]).not.toContain('RUT')
  })

  it('builds filenames with an ASCII evaluator slug', () => {
    const now = new Date(2026, 2, 5, 10, 0, 0)
    expect(buildSummaryFilename(now)).toBe('tests-por-evaluador-2026-03-05.xlsx')
    expect(buildDetailFilename({ name: 'María José', surname: 'Peña Ñuñoa' }, now)).toBe(
      'tests-maria-jose-pena-nunoa-2026-03-05.xlsx'
    )
    expect(buildDetailFilename({ name: '', surname: '' }, now)).toBe('tests-evaluador-2026-03-05.xlsx')
  })
})

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import * as XLSX from 'xlsx'
import EvaluatorTestsPanel from './EvaluatorTestsPanel'
import {
  getEvaluatorTestsSummary,
  listEvaluatorTests,
  listStudyMoments,
} from '../services/adminV1Api'

jest.mock('../services/adminV1Api', () => ({
  getEvaluatorTestsSummary: jest.fn(),
  listEvaluatorTests: jest.fn(),
  listStudyMoments: jest.fn(),
}))

jest.mock('xlsx', () => ({
  utils: {
    book_new: jest.fn(() => ({ sheets: [] })),
    book_append_sheet: jest.fn(),
    aoa_to_sheet: jest.fn(rows => ({ rows })),
  },
  writeFile: jest.fn(),
}))

const studies = [{ id: 3, name: 'Estudio X', year: '2026' }]
const schools = [{ id: 5, name: 'Colegio Uno' }]

const summaryRow = {
  evaluatorId: 2,
  name: 'Eva',
  surname: 'Uno',
  email: 'eva@example.test',
  role: 'Evaluator',
  tests: 3,
  students: 2,
  firstDate: '2026-03-01T12:00:00.000Z',
  lastDate: '2026-03-20T12:00:00.000Z',
}

const buildDetailRow = index => ({
  testId: index,
  savedAt: '2026-03-02T12:00:00.000Z',
  instrumentId: 1,
  instrumentName: 'Wally',
  studentId: index,
  studentName: `Alumno${index}`,
  studentSurname: 'Prueba',
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
})

beforeEach(() => {
  jest.clearAllMocks()
  getEvaluatorTestsSummary.mockResolvedValue({ data: [summaryRow], meta: { total: 1 }, error: null })
  listStudyMoments.mockResolvedValue({
    data: [{ id: 4, study_id: 3, begin: '2026-03-01', until: '2026-03-31' }],
  })
  listEvaluatorTests.mockResolvedValue({
    data: [buildDetailRow(1), buildDetailRow(2)],
    meta: { total: 2, truncated: false },
  })
})

test('renders the filters and loads the summary', async () => {
  render(<EvaluatorTestsPanel studies={studies} schools={schools} />)

  expect(screen.getByLabelText('Estudio')).toBeInTheDocument()
  expect(screen.getByLabelText('Momento')).toBeDisabled()
  expect(screen.getByLabelText('Colegio')).toBeInTheDocument()
  expect(screen.getByLabelText('Desde')).toBeInTheDocument()
  expect(screen.getByLabelText('Hasta')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Limpiar' })).toBeInTheDocument()

  expect(await screen.findByText('Eva Uno')).toBeInTheDocument()
  expect(getEvaluatorTestsSummary).toHaveBeenCalledWith({})
})

test('sends only the filled filters, enables moments for a study and clears them', async () => {
  render(<EvaluatorTestsPanel studies={studies} schools={schools} />)
  await screen.findByText('Eva Uno')

  fireEvent.change(screen.getByLabelText('Estudio'), { target: { value: '3' } })
  await waitFor(() => expect(listStudyMoments).toHaveBeenCalledWith('3'))
  await waitFor(() => expect(screen.getByLabelText('Momento')).toBeEnabled())
  await screen.findByRole('option', { name: '01-03-2026 – 31-03-2026' })

  fireEvent.change(screen.getByLabelText('Momento'), { target: { value: '4' } })
  fireEvent.change(screen.getByLabelText('Colegio'), { target: { value: '5' } })
  fireEvent.change(screen.getByLabelText('Desde'), { target: { value: '2026-03-01' } })
  fireEvent.click(screen.getByRole('button', { name: 'Buscar' }))

  await waitFor(() =>
    expect(getEvaluatorTestsSummary).toHaveBeenLastCalledWith({
      studyId: '3',
      momentId: '4',
      schoolId: '5',
      from: '2026-03-01',
    })
  )

  fireEvent.click(screen.getByRole('button', { name: 'Limpiar' }))
  await waitFor(() => expect(getEvaluatorTestsSummary).toHaveBeenLastCalledWith({}))
  expect(screen.getByLabelText('Momento')).toBeDisabled()
})

test('shows the detail of an evaluator using the applied filters', async () => {
  render(<EvaluatorTestsPanel studies={studies} schools={schools} />)
  await screen.findByText('Eva Uno')

  fireEvent.click(screen.getByRole('button', { name: 'Ver detalle' }))

  expect(await screen.findByText('Alumno1 Prueba')).toBeInTheDocument()
  expect(listEvaluatorTests).toHaveBeenCalledWith({ evaluatorId: 2 })
  expect(screen.getByText('Detalle de Eva Uno (3 tests)')).toBeInTheDocument()
  expect(screen.getAllByText('Wally')).toHaveLength(2)
})

test('limits the detail preview to 200 rows and warns when the API truncated it', async () => {
  const rows = Array.from({ length: 250 }, (_value, index) => buildDetailRow(index + 1))
  listEvaluatorTests.mockResolvedValue({ data: rows, meta: { total: 250, truncated: true } })

  render(<EvaluatorTestsPanel studies={studies} schools={schools} />)
  await screen.findByText('Eva Uno')
  fireEvent.click(screen.getByRole('button', { name: 'Ver detalle' }))

  await screen.findByText('Mostrando 200 de 250; el Excel incluye todos.')
  expect(screen.getByText(/se muestran y exportan solo los/)).toBeInTheDocument()
  const tables = screen.getAllByRole('table')
  expect(within(tables[1]).getAllByRole('row')).toHaveLength(201)
})

test('downloads the summary and the detail as Excel files', async () => {
  render(<EvaluatorTestsPanel studies={studies} schools={schools} />)
  await screen.findByText('Eva Uno')

  fireEvent.click(screen.getAllByRole('button', { name: 'Descargar Excel' })[0])
  expect(XLSX.writeFile).toHaveBeenCalledTimes(1)
  expect(XLSX.writeFile.mock.calls[0][1]).toMatch(/^tests-por-evaluador-\d{4}-\d{2}-\d{2}\.xlsx$/)
  const summarySheet = XLSX.utils.aoa_to_sheet.mock.calls[0][0]
  expect(summarySheet[0][0]).toBe('Evaluador')
  expect(summarySheet[1][0]).toBe('Eva Uno')

  fireEvent.click(screen.getByRole('button', { name: 'Ver detalle' }))
  await screen.findByText('Alumno1 Prueba')
  fireEvent.click(screen.getAllByRole('button', { name: 'Descargar Excel' })[1])

  expect(XLSX.writeFile).toHaveBeenCalledTimes(2)
  expect(XLSX.writeFile.mock.calls[1][1]).toMatch(/^tests-eva-uno-\d{4}-\d{2}-\d{2}\.xlsx$/)
  const detailSheet = XLSX.utils.aoa_to_sheet.mock.calls[1][0]
  expect(detailSheet[0]).toContain('Fecha de guardado')
  expect(detailSheet).toHaveLength(3)
})

test('shows a Spanish error when the summary cannot be loaded', async () => {
  getEvaluatorTestsSummary.mockRejectedValue(new Error('network'))

  render(<EvaluatorTestsPanel studies={studies} schools={schools} />)

  expect(await screen.findByText('No fue posible cargar el resumen de tests.')).toBeInTheDocument()
})

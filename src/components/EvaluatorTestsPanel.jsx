import { useCallback, useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import {
  getEvaluatorTestsSummary,
  listEvaluatorTests,
  listStudyMoments,
} from '../services/adminV1Api'
import {
  DETAIL_HEADERS,
  SUMMARY_HEADERS,
  buildDetailFilename,
  buildDetailSheet,
  buildSummaryFilename,
  buildSummarySheet,
  formatCourse,
  formatDateTime,
  formatMoment,
  formatPersonName,
} from '../services/evaluatorTestsExport'

const DETAIL_PREVIEW_LIMIT = 200

const EMPTY_FILTERS = { studyId: '', momentId: '', schoolId: '', from: '', to: '' }

const extractErrorMessage = (error, fallbackMessage) => {
  const backendMessage =
    error && error.response && error.response.data && error.response.data.error
      ? error.response.data.error.message
      : ''

  return backendMessage || fallbackMessage
}

const toQuery = filters =>
  Object.entries(filters).reduce((params, [key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      params[key] = value
    }
    return params
  }, {})

const downloadSheet = (rows, sheetName, filename) => {
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(rows), sheetName)
  XLSX.writeFile(workbook, filename)
}

function EvaluatorTestsPanel({ studies = [], schools = [] }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS)
  const [moments, setMoments] = useState([])
  const [summary, setSummary] = useState([])
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [summaryError, setSummaryError] = useState('')
  const [selectedEvaluator, setSelectedEvaluator] = useState(null)
  const [detail, setDetail] = useState({ rows: [], truncated: false })
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [detailError, setDetailError] = useState('')

  const loadSummary = useCallback(async nextFilters => {
    setIsLoadingSummary(true)
    setSummaryError('')
    setSelectedEvaluator(null)
    setDetail({ rows: [], truncated: false })
    setDetailError('')

    try {
      const response = await getEvaluatorTestsSummary(toQuery(nextFilters))
      setSummary(Array.isArray(response.data) ? response.data : [])
      setAppliedFilters(nextFilters)
    } catch (error) {
      setSummary([])
      setSummaryError(extractErrorMessage(error, 'No fue posible cargar el resumen de tests.'))
    } finally {
      setIsLoadingSummary(false)
    }
  }, [])

  useEffect(() => {
    loadSummary(EMPTY_FILTERS)
  }, [loadSummary])

  useEffect(() => {
    if (!filters.studyId) {
      setMoments([])
      return undefined
    }

    let cancelled = false
    listStudyMoments(filters.studyId)
      .then(response => {
        if (!cancelled) {
          setMoments(Array.isArray(response.data) ? response.data : [])
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMoments([])
        }
      })

    return () => {
      cancelled = true
    }
  }, [filters.studyId])

  const updateFilter = (field, value) => {
    setFilters(current => ({
      ...current,
      [field]: value,
      ...(field === 'studyId' ? { momentId: '' } : {}),
    }))
  }

  const handleSearch = event => {
    event.preventDefault()
    loadSummary(filters)
  }

  const handleClear = () => {
    setFilters(EMPTY_FILTERS)
    loadSummary(EMPTY_FILTERS)
  }

  const handleShowDetail = async evaluator => {
    setSelectedEvaluator(evaluator)
    setDetail({ rows: [], truncated: false })
    setDetailError('')
    setIsLoadingDetail(true)

    try {
      const response = await listEvaluatorTests({
        ...toQuery(appliedFilters),
        evaluatorId: evaluator.evaluatorId,
      })
      setDetail({
        rows: Array.isArray(response.data) ? response.data : [],
        truncated: Boolean(response.meta && response.meta.truncated),
      })
    } catch (error) {
      setDetailError(extractErrorMessage(error, 'No fue posible cargar el detalle de tests.'))
    } finally {
      setIsLoadingDetail(false)
    }
  }

  const handleDownloadSummary = () => {
    downloadSheet(buildSummarySheet(summary), 'Resumen', buildSummaryFilename())
  }

  const handleDownloadDetail = () => {
    downloadSheet(buildDetailSheet(detail.rows), 'Detalle', buildDetailFilename(selectedEvaluator))
  }

  const previewRows = detail.rows.slice(0, DETAIL_PREVIEW_LIMIT)

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Tests por evaluador</h5>
        <p className="text-muted mb-3">
          Cantidad de tests enviados por cada evaluador. Las fechas corresponden al momento en que
          se guardó el test.
        </p>

        <form className="row g-2 mb-3" onSubmit={handleSearch}>
          <div className="col-12 col-md-4">
            <label className="form-label" htmlFor="evaluator-tests-study">Estudio</label>
            <select
              id="evaluator-tests-study"
              className="form-select form-select-sm"
              value={filters.studyId}
              onChange={event => updateFilter('studyId', event.target.value)}
            >
              <option value="">Todos</option>
              {studies.map(study => (
                <option key={study.id} value={study.id}>
                  {study.name} ({study.year})
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label" htmlFor="evaluator-tests-moment">Momento</label>
            <select
              id="evaluator-tests-moment"
              className="form-select form-select-sm"
              value={filters.momentId}
              disabled={!filters.studyId}
              onChange={event => updateFilter('momentId', event.target.value)}
            >
              <option value="">Todos</option>
              {moments.map(moment => (
                <option key={moment.id} value={moment.id}>
                  {formatMoment({
                    momentId: moment.id,
                    momentBegin: moment.begin,
                    momentUntil: moment.until,
                  })}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label" htmlFor="evaluator-tests-school">Colegio</label>
            <select
              id="evaluator-tests-school"
              className="form-select form-select-sm"
              value={filters.schoolId}
              onChange={event => updateFilter('schoolId', event.target.value)}
            >
              <option value="">Todos</option>
              {schools.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <label className="form-label" htmlFor="evaluator-tests-from">Desde</label>
            <input
              id="evaluator-tests-from"
              className="form-control form-control-sm"
              type="date"
              value={filters.from}
              onChange={event => updateFilter('from', event.target.value)}
            />
          </div>
          <div className="col-6 col-md-3">
            <label className="form-label" htmlFor="evaluator-tests-to">Hasta</label>
            <input
              id="evaluator-tests-to"
              className="form-control form-control-sm"
              type="date"
              value={filters.to}
              onChange={event => updateFilter('to', event.target.value)}
            />
          </div>
          <div className="col-12 col-md-6 d-flex align-items-end gap-2">
            <button className="btn btn-sm btn-primary" type="submit" disabled={isLoadingSummary}>
              Buscar
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              onClick={handleClear}
              disabled={isLoadingSummary}
            >
              Limpiar
            </button>
          </div>
        </form>

        {summaryError ? (
          <div className="alert alert-danger" role="alert">
            {summaryError}
          </div>
        ) : null}

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="m-0">Resumen por evaluador</h6>
          <button
            className="btn btn-sm btn-outline-success"
            type="button"
            onClick={handleDownloadSummary}
            disabled={isLoadingSummary || summary.length === 0}
          >
            Descargar Excel
          </button>
        </div>

        {isLoadingSummary ? (
          <p className="text-muted">Cargando resumen...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-sm table-striped align-middle">
              <thead>
                <tr>
                  {SUMMARY_HEADERS.map(header => (
                    <th key={header}>{header}</th>
                  ))}
                  <th />
                </tr>
              </thead>
              <tbody>
                {summary.map(row => (
                  <tr key={row.evaluatorId}>
                    <td>{formatPersonName(row)}</td>
                    <td>{row.email}</td>
                    <td>{row.role}</td>
                    <td>{row.tests}</td>
                    <td>{row.students}</td>
                    <td>{formatDateTime(row.firstDate)}</td>
                    <td>{formatDateTime(row.lastDate)}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        type="button"
                        onClick={() => handleShowDetail(row)}
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
                {summary.length === 0 && !summaryError ? (
                  <tr>
                    <td colSpan={SUMMARY_HEADERS.length + 1} className="text-muted">
                      Sin tests para los filtros seleccionados.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        )}

        {selectedEvaluator ? (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="m-0">
                Detalle de {formatPersonName(selectedEvaluator)} ({selectedEvaluator.tests} tests)
              </h6>
              <button
                className="btn btn-sm btn-outline-success"
                type="button"
                onClick={handleDownloadDetail}
                disabled={isLoadingDetail || detail.rows.length === 0}
              >
                Descargar Excel
              </button>
            </div>

            {detailError ? (
              <div className="alert alert-danger" role="alert">
                {detailError}
              </div>
            ) : null}

            {detail.truncated ? (
              <div className="alert alert-warning" role="alert">
                Hay más de {detail.rows.length} tests; se muestran y exportan solo los{' '}
                {detail.rows.length} más recientes. Acota el rango de fechas para ver el resto.
              </div>
            ) : null}

            {isLoadingDetail ? (
              <p className="text-muted">Cargando detalle...</p>
            ) : (
              <>
                {detail.rows.length > DETAIL_PREVIEW_LIMIT ? (
                  <p className="text-muted small">
                    Mostrando {DETAIL_PREVIEW_LIMIT} de {detail.rows.length}; el Excel incluye todos.
                  </p>
                ) : null}
                <div className="table-responsive">
                  <table className="table table-sm table-striped align-middle">
                    <thead>
                      <tr>
                        {DETAIL_HEADERS.map(header => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewRows.map(row => (
                        <tr key={row.testId}>
                          <td>{formatDateTime(row.savedAt)}</td>
                          <td>{row.instrumentName}</td>
                          <td>{`${row.studentName} ${row.studentSurname}`.trim()}</td>
                          <td>{row.schoolName}</td>
                          <td>{formatCourse(row)}</td>
                          <td>{row.studyName}</td>
                          <td>{formatMoment(row)}</td>
                        </tr>
                      ))}
                      {previewRows.length === 0 && !detailError ? (
                        <tr>
                          <td colSpan={DETAIL_HEADERS.length} className="text-muted">
                            Sin tests para este evaluador con los filtros aplicados.
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default EvaluatorTestsPanel

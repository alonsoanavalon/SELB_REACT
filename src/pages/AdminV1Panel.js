import { useEffect, useMemo, useState } from 'react'
import {
  createAssignation,
  createCourse,
  createSchool,
  createStudy,
  createStudyMoment,
  createStudent,
  transferStudent,
  createUser,
  deleteAssignation,
  listAssignations,
  listCourses,
  listSchools,
  listStudies,
  listStudyMoments,
  listStudents,
  listUsers,
  patchUserStatus,
  resetUserPassword,
} from '../services/adminV1Api'

const initialStudyForm = {
  year: String(new Date().getFullYear()),
  name: '',
  active: '1',
}

const initialMomentForm = {
  begin: '',
  until: '',
}

const initialSchoolForm = {
  commune_id: '',
  name: '',
  street: '',
  number: '',
  phone: '',
  active: '1',
}

const initialCourseForm = {
  school_id: '',
  level: '',
  letter: '',
  year: String(new Date().getFullYear()),
}

const initialStudentForm = {
  course_id: '',
  name: '',
  surname: '',
  rut: '',
  age: '',
  gender: 'M',
  birthday: '',
}

const initialStudentTransferForm = {
  student_id: '',
  course_id: '',
}

const initialUserForm = {
  email: '',
  password: '',
  name: '',
  surname: '',
  role: '',
  picture: '',
  gender: '',
  rut: '',
}

const initialAssignationForm = {
  user_id: '',
  school_id: '',
  student_rut: '',
  assignation_type_id: '',
}

const extractErrorMessage = (error, fallbackMessage) => {
  const backendMessage =
    error && error.response && error.response.data && error.response.data.error
      ? error.response.data.error.message
      : ''

  return backendMessage || fallbackMessage
}

function AdminV1Panel() {
  const [activeModule, setActiveModule] = useState('studies')
  const [studies, setStudies] = useState([])
  const [selectedStudyId, setSelectedStudyId] = useState(null)
  const [moments, setMoments] = useState([])
  const [schools, setSchools] = useState([])
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])
  const [users, setUsers] = useState([])
  const [assignations, setAssignations] = useState([])
  const [studyForm, setStudyForm] = useState(initialStudyForm)
  const [momentForm, setMomentForm] = useState(initialMomentForm)
  const [schoolForm, setSchoolForm] = useState(initialSchoolForm)
  const [courseForm, setCourseForm] = useState(initialCourseForm)
  const [studentForm, setStudentForm] = useState(initialStudentForm)
  const [studentTransferForm, setStudentTransferForm] = useState(initialStudentTransferForm)
  const [userForm, setUserForm] = useState(initialUserForm)
  const [assignationForm, setAssignationForm] = useState(initialAssignationForm)
  const [isLoadingStudies, setIsLoadingStudies] = useState(false)
  const [isLoadingMoments, setIsLoadingMoments] = useState(false)
  const [isLoadingSchools, setIsLoadingSchools] = useState(false)
  const [isLoadingCourses, setIsLoadingCourses] = useState(false)
  const [isLoadingStudents, setIsLoadingStudents] = useState(false)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [isLoadingAssignations, setIsLoadingAssignations] = useState(false)
  const [feedback, setFeedback] = useState({
    type: null,
    message: '',
  })

  const selectedStudy = useMemo(
    () => studies.find(study => study.id === selectedStudyId) || null,
    [studies, selectedStudyId]
  )

  const assignationUsers = useMemo(
    () => users.map(user => ({ id: user.id, label: `${user.email} (#${user.id})` })),
    [users]
  )

  const assignationSchools = useMemo(
    () => schools.map(school => ({ id: school.id, label: `${school.name} (#${school.id})` })),
    [schools]
  )

  const loadSchools = async () => {
    setIsLoadingSchools(true)
    try {
      const response = await listSchools({ page: 1, pageSize: 100 })
      const rows = Array.isArray(response.data) ? response.data : []
      setSchools(rows)
      if (!courseForm.school_id && rows.length > 0) {
        setCourseForm(current => ({ ...current, school_id: String(rows[0].id) }))
      }
      if (!assignationForm.school_id && rows.length > 0) {
        setAssignationForm(current => ({ ...current, school_id: String(rows[0].id) }))
      }
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible cargar colegios.'),
      })
    } finally {
      setIsLoadingSchools(false)
    }
  }

  const loadCourses = async () => {
    setIsLoadingCourses(true)
    try {
      const response = await listCourses({ page: 1, pageSize: 100 })
      const rows = Array.isArray(response.data) ? response.data : []
      setCourses(rows)
      if (!studentForm.course_id && rows.length > 0) {
        setStudentForm(current => ({ ...current, course_id: String(rows[0].id) }))
      }
      if (!studentTransferForm.course_id && rows.length > 0) {
        setStudentTransferForm(current => ({ ...current, course_id: String(rows[0].id) }))
      }
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible cargar cursos.'),
      })
    } finally {
      setIsLoadingCourses(false)
    }
  }

  const loadStudents = async () => {
    setIsLoadingStudents(true)
    try {
      const response = await listStudents({ page: 1, pageSize: 100 })
      const rows = Array.isArray(response.data) ? response.data : []
      setStudents(rows)
      if (!studentTransferForm.student_id && rows.length > 0) {
        setStudentTransferForm(current => ({ ...current, student_id: String(rows[0].id) }))
      }
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible cargar alumnos.'),
      })
    } finally {
      setIsLoadingStudents(false)
    }
  }

  const loadUsers = async () => {
    setIsLoadingUsers(true)
    try {
      const response = await listUsers({ page: 1, pageSize: 100 })
      const rows = Array.isArray(response.data) ? response.data : []
      setUsers(rows)
      if (!assignationForm.user_id && rows.length > 0) {
        setAssignationForm(current => ({ ...current, user_id: String(rows[0].id) }))
      }
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible cargar usuarios.'),
      })
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const loadAssignations = async () => {
    setIsLoadingAssignations(true)
    try {
      const response = await listAssignations({ page: 1, pageSize: 100 })
      setAssignations(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible cargar asignaciones.'),
      })
    } finally {
      setIsLoadingAssignations(false)
    }
  }

  const loadStudies = async () => {
    setIsLoadingStudies(true)
    try {
      const response = await listStudies({ page: 1, pageSize: 100 })
      const rows = Array.isArray(response.data) ? response.data : []
      setStudies(rows)
      if (rows.length === 0) {
        setSelectedStudyId(null)
      } else {
        const currentExists = rows.some(study => study.id === selectedStudyId)
        if (!currentExists) {
          setSelectedStudyId(rows[0].id)
        }
      }
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible cargar estudios desde API admin v1.'),
      })
    } finally {
      setIsLoadingStudies(false)
    }
  }

  const loadMoments = async studyId => {
    if (!studyId) {
      setMoments([])
      return
    }

    setIsLoadingMoments(true)
    try {
      const response = await listStudyMoments(studyId)
      setMoments(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(
          error,
          'No fue posible cargar momentos del estudio seleccionado.'
        ),
      })
    } finally {
      setIsLoadingMoments(false)
    }
  }

  useEffect(() => {
    loadSchools()
    loadCourses()
    loadStudents()
    loadUsers()
    loadAssignations()
    loadStudies()
  }, [])

  useEffect(() => {
    loadMoments(selectedStudyId)
  }, [selectedStudyId])

  const handleCreateStudy = async event => {
    event.preventDefault()
    setFeedback({ type: null, message: '' })

    try {
      await createStudy(studyForm)
      setStudyForm(initialStudyForm)
      setFeedback({
        type: 'success',
        message: 'Estudio creado en admin v1.',
      })
      await loadStudies()
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible crear el estudio. Revisa los datos enviados.'),
      })
    }
  }

  const handleCreateMoment = async event => {
    event.preventDefault()
    if (!selectedStudyId) {
      setFeedback({
        type: 'warning',
        message: 'Selecciona un estudio antes de crear un momento.',
      })
      return
    }

    setFeedback({ type: null, message: '' })

    try {
      await createStudyMoment(selectedStudyId, momentForm)
      setMomentForm(initialMomentForm)
      setFeedback({
        type: 'success',
        message: 'Momento creado en admin v1.',
      })
      await loadMoments(selectedStudyId)
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible crear el momento. Verifica fechas y permisos.'),
      })
    }
  }

  const handleCreateSchool = async event => {
    event.preventDefault()
    setFeedback({ type: null, message: '' })

    try {
      await createSchool(schoolForm)
      setSchoolForm(initialSchoolForm)
      setFeedback({
        type: 'success',
        message: 'Colegio creado en admin v1.',
      })
      await loadSchools()
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible crear el colegio.'),
      })
    }
  }

  const handleCreateCourse = async event => {
    event.preventDefault()
    setFeedback({ type: null, message: '' })

    try {
      await createCourse(courseForm)
      setCourseForm(initialCourseForm)
      setFeedback({
        type: 'success',
        message: 'Curso creado en admin v1.',
      })
      await loadCourses()
      await loadStudents()
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible crear el curso.'),
      })
    }
  }

  const handleCreateStudent = async event => {
    event.preventDefault()
    setFeedback({ type: null, message: '' })

    try {
      await createStudent({
        ...studentForm,
        age: Number(studentForm.age),
      })
      setStudentForm(initialStudentForm)
      setFeedback({
        type: 'success',
        message: 'Alumno creado en admin v1.',
      })
      await loadStudents()
      await loadAssignations()
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible crear el alumno.'),
      })
    }
  }

  const handleCreateUser = async event => {
    event.preventDefault()
    setFeedback({ type: null, message: '' })

    try {
      await createUser(userForm)
      setUserForm(initialUserForm)
      setFeedback({
        type: 'success',
        message: 'Usuario creado en admin v1.',
      })
      await loadUsers()
      await loadAssignations()
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible crear el usuario.'),
      })
    }
  }

  const handleTransferStudent = async event => {
    event.preventDefault()
    setFeedback({ type: null, message: '' })

    if (!studentTransferForm.student_id || !studentTransferForm.course_id) {
      setFeedback({
        type: 'warning',
        message: 'Selecciona alumno y curso destino para transferir.',
      })
      return
    }

    try {
      await transferStudent(studentTransferForm.student_id, {
        course_id: Number(studentTransferForm.course_id),
      })
      setFeedback({
        type: 'success',
        message: 'Alumno transferido de curso en admin v1.',
      })
      await loadStudents()
      await loadAssignations()
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible transferir el alumno de curso.'),
      })
    }
  }

  const handleUserStatus = async (userId, status) => {
    setFeedback({ type: null, message: '' })

    try {
      await patchUserStatus(userId, { status })
      setFeedback({
        type: 'success',
        message: `Estado de usuario actualizado: ${status}.`,
      })
      await loadUsers()
    } catch (error) {
      setFeedback({
        type: 'warning',
        message: extractErrorMessage(error, 'No fue posible cambiar el estado del usuario.'),
      })
    }
  }

  const handleResetPassword = async userId => {
    setFeedback({ type: null, message: '' })

    try {
      const response = await resetUserPassword(userId)
      const temporaryPassword = response && response.data ? response.data.temporaryPassword : ''
      setFeedback({
        type: 'success',
        message: temporaryPassword
          ? `Contrasena temporal generada para usuario #${userId}: ${temporaryPassword}`
          : `Contrasena temporal generada para usuario #${userId}.`,
      })
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible regenerar contrasena temporal.'),
      })
    }
  }

  const handleCreateAssignation = async event => {
    event.preventDefault()
    setFeedback({ type: null, message: '' })

    try {
      await createAssignation(assignationForm)
      setAssignationForm(initialAssignationForm)
      setFeedback({
        type: 'success',
        message: 'Asignacion creada en admin v1.',
      })
      await loadAssignations()
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible crear la asignacion.'),
      })
    }
  }

  const handleDeleteAssignation = async assignationId => {
    setFeedback({ type: null, message: '' })

    try {
      await deleteAssignation(assignationId)
      setFeedback({
        type: 'success',
        message: `Asignacion #${assignationId} eliminada.`,
      })
      await loadAssignations()
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible eliminar la asignacion.'),
      })
    }
  }

  const moduleButtonClass = moduleName =>
    `btn btn-sm ${activeModule === moduleName ? 'btn-dark' : 'btn-outline-dark'}`

  return (
    <section className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Admin v1</h2>
        <span className="badge bg-secondary">MANAGEMENT-003</span>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3">
        <button className={moduleButtonClass('studies')} onClick={() => setActiveModule('studies')}>
          Estudios y momentos
        </button>
        <button className={moduleButtonClass('schools')} onClick={() => setActiveModule('schools')}>
          Colegios
        </button>
        <button className={moduleButtonClass('courses')} onClick={() => setActiveModule('courses')}>
          Cursos
        </button>
        <button className={moduleButtonClass('students')} onClick={() => setActiveModule('students')}>
          Alumnos
        </button>
        <button className={moduleButtonClass('users')} onClick={() => setActiveModule('users')}>
          Usuarios
        </button>
        <button
          className={moduleButtonClass('assignations')}
          onClick={() => setActiveModule('assignations')}
        >
          Asignaciones
        </button>
      </div>

      {feedback.type ? (
        <div className={`alert alert-${feedback.type}`} role="alert">
          {feedback.message}
        </div>
      ) : null}

      {activeModule === 'studies' ? <div className="row g-3">
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Estudios</h5>
              <p className="text-muted mb-3">
                Consume GET/POST de /api/admin/v1/studies.
              </p>

              <form className="row g-2 mb-3" onSubmit={handleCreateStudy}>
                <div className="col-12 col-md-3">
                  <input
                    className="form-control"
                    placeholder="Año"
                    value={studyForm.year}
                    onChange={event =>
                      setStudyForm(current => ({ ...current, year: event.target.value }))
                    }
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    className="form-control"
                    placeholder="Nombre estudio"
                    value={studyForm.name}
                    onChange={event =>
                      setStudyForm(current => ({ ...current, name: event.target.value }))
                    }
                  />
                </div>
                <div className="col-12 col-md-3">
                  <select
                    className="form-select"
                    value={studyForm.active}
                    onChange={event =>
                      setStudyForm(current => ({ ...current, active: event.target.value }))
                    }
                  >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                  </select>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    Crear estudio
                  </button>
                </div>
              </form>

              {isLoadingStudies ? (
                <p className="text-muted">Cargando estudios...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm table-hover align-middle">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Año</th>
                        <th>Nombre</th>
                        <th>Activo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studies.map(study => (
                        <tr
                          key={study.id}
                          role="button"
                          className={study.id === selectedStudyId ? 'table-primary' : ''}
                          onClick={() => setSelectedStudyId(study.id)}
                        >
                          <td>{study.id}</td>
                          <td>{study.year}</td>
                          <td>{study.name}</td>
                          <td>{study.active}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Momentos</h5>
              <p className="text-muted mb-3">
                {selectedStudy
                  ? `Estudio seleccionado: ${selectedStudy.name} (#${selectedStudy.id})`
                  : 'Selecciona un estudio para ver sus momentos.'}
              </p>

              <form className="row g-2 mb-3" onSubmit={handleCreateMoment}>
                <div className="col-6">
                  <input
                    type="date"
                    className="form-control"
                    value={momentForm.begin}
                    onChange={event =>
                      setMomentForm(current => ({ ...current, begin: event.target.value }))
                    }
                  />
                </div>
                <div className="col-6">
                  <input
                    type="date"
                    className="form-control"
                    value={momentForm.until}
                    onChange={event =>
                      setMomentForm(current => ({ ...current, until: event.target.value }))
                    }
                  />
                </div>
                <div className="col-12">
                  <button className="btn btn-outline-primary" type="submit">
                    Crear momento
                  </button>
                </div>
              </form>

              {isLoadingMoments ? (
                <p className="text-muted">Cargando momentos...</p>
              ) : (
                <ul className="list-group">
                  {moments.map(moment => (
                    <li key={moment.id} className="list-group-item d-flex justify-content-between">
                      <span>#{moment.id}</span>
                      <span>{moment.begin}</span>
                      <span>{moment.until}</span>
                    </li>
                  ))}
                  {moments.length === 0 ? (
                    <li className="list-group-item text-muted">Sin momentos para este estudio.</li>
                  ) : null}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div> : null}

      {activeModule === 'schools' ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Colegios</h5>
            <p className="text-muted mb-3">Consume GET/POST de /api/admin/v1/schools.</p>

            <form className="row g-2 mb-3" onSubmit={handleCreateSchool}>
              <div className="col-12 col-md-2">
                <input
                  className="form-control"
                  placeholder="Commune ID"
                  value={schoolForm.commune_id}
                  onChange={event =>
                    setSchoolForm(current => ({ ...current, commune_id: event.target.value }))
                  }
                />
              </div>
              <div className="col-12 col-md-3">
                <input
                  className="form-control"
                  placeholder="Nombre"
                  value={schoolForm.name}
                  onChange={event =>
                    setSchoolForm(current => ({ ...current, name: event.target.value }))
                  }
                />
              </div>
              <div className="col-12 col-md-3">
                <input
                  className="form-control"
                  placeholder="Calle"
                  value={schoolForm.street}
                  onChange={event =>
                    setSchoolForm(current => ({ ...current, street: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="Numero"
                  value={schoolForm.number}
                  onChange={event =>
                    setSchoolForm(current => ({ ...current, number: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="Telefono"
                  value={schoolForm.phone}
                  onChange={event =>
                    setSchoolForm(current => ({ ...current, phone: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-2">
                <select
                  className="form-select"
                  value={schoolForm.active}
                  onChange={event =>
                    setSchoolForm(current => ({ ...current, active: event.target.value }))
                  }
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
              </div>
              <div className="col-6 col-md-2">
                <button className="btn btn-primary w-100" type="submit">
                  Crear
                </button>
              </div>
            </form>

            {isLoadingSchools ? (
              <p className="text-muted">Cargando colegios...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-sm table-hover align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Commune</th>
                      <th>Direccion</th>
                      <th>Telefono</th>
                      <th>Activo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schools.map(school => (
                      <tr key={school.id}>
                        <td>{school.id}</td>
                        <td>{school.name}</td>
                        <td>{school.commune_name || school.commune_id}</td>
                        <td>{`${school.street || ''} ${school.number || ''}`.trim()}</td>
                        <td>{school.phone || '-'}</td>
                        <td>{school.active}</td>
                      </tr>
                    ))}
                    {schools.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-muted">
                          Sin colegios disponibles.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {activeModule === 'courses' ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Cursos</h5>
            <p className="text-muted mb-3">Consume GET/POST de /api/admin/v1/courses.</p>

            <form className="row g-2 mb-3" onSubmit={handleCreateCourse}>
              <div className="col-12 col-md-3">
                <select
                  className="form-select"
                  value={courseForm.school_id}
                  onChange={event =>
                    setCourseForm(current => ({ ...current, school_id: event.target.value }))
                  }
                >
                  <option value="">Colegio</option>
                  {schools.map(school => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-3">
                <input
                  className="form-control"
                  placeholder="Nivel"
                  value={courseForm.level}
                  onChange={event =>
                    setCourseForm(current => ({ ...current, level: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="Letra"
                  value={courseForm.letter}
                  onChange={event =>
                    setCourseForm(current => ({ ...current, letter: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="Ano"
                  value={courseForm.year}
                  onChange={event =>
                    setCourseForm(current => ({ ...current, year: event.target.value }))
                  }
                />
              </div>
              <div className="col-12 col-md-2">
                <button className="btn btn-primary w-100" type="submit">
                  Crear
                </button>
              </div>
            </form>

            {isLoadingCourses ? (
              <p className="text-muted">Cargando cursos...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-sm table-hover align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Colegio</th>
                      <th>Nivel</th>
                      <th>Letra</th>
                      <th>Ano</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.school_name}</td>
                        <td>{course.level}</td>
                        <td>{course.letter || '-'}</td>
                        <td>{course.year}</td>
                      </tr>
                    ))}
                    {courses.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-muted">
                          Sin cursos disponibles.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {activeModule === 'students' ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Alumnos</h5>
            <p className="text-muted mb-3">Consume GET/POST de /api/admin/v1/students.</p>

            <form className="row g-2 mb-3" onSubmit={handleCreateStudent}>
              <div className="col-12 col-md-3">
                <select
                  className="form-select"
                  value={studentForm.course_id}
                  onChange={event =>
                    setStudentForm(current => ({ ...current, course_id: event.target.value }))
                  }
                >
                  <option value="">Curso</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {`${course.level} ${course.letter || ''} - ${course.school_name}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="Nombre"
                  value={studentForm.name}
                  onChange={event =>
                    setStudentForm(current => ({ ...current, name: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="Apellido"
                  value={studentForm.surname}
                  onChange={event =>
                    setStudentForm(current => ({ ...current, surname: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="RUT"
                  value={studentForm.rut}
                  onChange={event =>
                    setStudentForm(current => ({ ...current, rut: event.target.value }))
                  }
                />
              </div>
              <div className="col-3 col-md-1">
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  max="120"
                  placeholder="Edad"
                  value={studentForm.age}
                  onChange={event =>
                    setStudentForm(current => ({ ...current, age: event.target.value }))
                  }
                />
              </div>
              <div className="col-3 col-md-1">
                <select
                  className="form-select"
                  value={studentForm.gender}
                  onChange={event =>
                    setStudentForm(current => ({ ...current, gender: event.target.value }))
                  }
                >
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  type="date"
                  value={studentForm.birthday}
                  onChange={event =>
                    setStudentForm(current => ({ ...current, birthday: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-1">
                <button className="btn btn-primary w-100" type="submit">
                  Crear
                </button>
              </div>
            </form>

            <form className="row g-2 mb-3" onSubmit={handleTransferStudent}>
              <div className="col-12 col-md-5">
                <select
                  className="form-select"
                  value={studentTransferForm.student_id}
                  onChange={event =>
                    setStudentTransferForm(current => ({ ...current, student_id: event.target.value }))
                  }
                >
                  <option value="">Alumno a transferir</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {`${student.name} ${student.surname} (${student.rut})`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-5">
                <select
                  className="form-select"
                  value={studentTransferForm.course_id}
                  onChange={event =>
                    setStudentTransferForm(current => ({ ...current, course_id: event.target.value }))
                  }
                >
                  <option value="">Curso destino</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {`${course.level} ${course.letter || ''} - ${course.school_name}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <button className="btn btn-outline-primary w-100" type="submit">
                  Transferir
                </button>
              </div>
            </form>

            {isLoadingStudents ? (
              <p className="text-muted">Cargando alumnos...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-sm table-hover align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>RUT</th>
                      <th>Curso</th>
                      <th>Colegio</th>
                      <th>Edad</th>
                      <th>Genero</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{`${student.name} ${student.surname}`}</td>
                        <td>{student.rut}</td>
                        <td>{`${student.level || ''} ${student.letter || ''}`.trim()}</td>
                        <td>{student.school_name}</td>
                        <td>{student.age}</td>
                        <td>{student.gender}</td>
                      </tr>
                    ))}
                    {students.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-muted">
                          Sin alumnos disponibles.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {activeModule === 'users' ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Usuarios</h5>
            <p className="text-muted mb-3">Consume GET/POST y acciones de /api/admin/v1/users.</p>

            <form className="row g-2 mb-3" onSubmit={handleCreateUser}>
              <div className="col-12 col-md-3">
                <input
                  className="form-control"
                  placeholder="Email"
                  value={userForm.email}
                  onChange={event =>
                    setUserForm(current => ({ ...current, email: event.target.value }))
                  }
                />
              </div>
              <div className="col-12 col-md-2">
                <input
                  className="form-control"
                  placeholder="Contrasena"
                  value={userForm.password}
                  onChange={event =>
                    setUserForm(current => ({ ...current, password: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="Nombre"
                  value={userForm.name}
                  onChange={event =>
                    setUserForm(current => ({ ...current, name: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="Apellido"
                  value={userForm.surname}
                  onChange={event =>
                    setUserForm(current => ({ ...current, surname: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="Rol"
                  value={userForm.role}
                  onChange={event =>
                    setUserForm(current => ({ ...current, role: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-1">
                <select
                  className="form-select"
                  value={userForm.gender}
                  onChange={event =>
                    setUserForm(current => ({ ...current, gender: event.target.value }))
                  }
                >
                  <option value="">-</option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="RUT"
                  value={userForm.rut}
                  onChange={event =>
                    setUserForm(current => ({ ...current, rut: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="Picture URL"
                  value={userForm.picture}
                  onChange={event =>
                    setUserForm(current => ({ ...current, picture: event.target.value }))
                  }
                />
              </div>
              <div className="col-12 col-md-2">
                <button className="btn btn-primary w-100" type="submit">
                  Crear
                </button>
              </div>
            </form>

            {isLoadingUsers ? (
              <p className="text-muted">Cargando usuarios...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-sm table-hover align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Nombre</th>
                      <th>Rol</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{`${user.name || ''} ${user.surname || ''}`.trim()}</td>
                        <td>{user.role || '-'}</td>
                        <td className="d-flex gap-1 flex-wrap">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleResetPassword(user.id)}
                          >
                            Reset password
                          </button>
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => handleUserStatus(user.id, 'inactive')}
                          >
                            Set inactive
                          </button>
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => handleUserStatus(user.id, 'active')}
                          >
                            Set active
                          </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-muted">
                          Sin usuarios disponibles.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {activeModule === 'assignations' ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Asignaciones</h5>
            <p className="text-muted mb-3">Consume GET/POST/DELETE de /api/admin/v1/assignations.</p>

            <form className="row g-2 mb-3" onSubmit={handleCreateAssignation}>
              <div className="col-12 col-md-4">
                <select
                  className="form-select"
                  value={assignationForm.user_id}
                  onChange={event =>
                    setAssignationForm(current => ({ ...current, user_id: event.target.value }))
                  }
                >
                  <option value="">Usuario</option>
                  {assignationUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-3">
                <select
                  className="form-select"
                  value={assignationForm.school_id}
                  onChange={event =>
                    setAssignationForm(current => ({ ...current, school_id: event.target.value }))
                  }
                >
                  <option value="">Colegio (opcional)</option>
                  {assignationSchools.map(school => (
                    <option key={school.id} value={school.id}>
                      {school.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <input
                  className="form-control"
                  placeholder="RUT alumno"
                  value={assignationForm.student_rut}
                  onChange={event =>
                    setAssignationForm(current => ({ ...current, student_rut: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-2">
                <input
                  className="form-control"
                  placeholder="Type ID"
                  value={assignationForm.assignation_type_id}
                  onChange={event =>
                    setAssignationForm(current => ({ ...current, assignation_type_id: event.target.value }))
                  }
                />
              </div>
              <div className="col-6 col-md-1">
                <button className="btn btn-primary w-100" type="submit">
                  Crear
                </button>
              </div>
            </form>

            {isLoadingAssignations ? (
              <p className="text-muted">Cargando asignaciones...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-sm table-hover align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Usuario</th>
                      <th>Colegio</th>
                      <th>Alumno</th>
                      <th>Tipo</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignations.map(assignation => (
                      <tr key={assignation.id}>
                        <td>{assignation.id}</td>
                        <td>{assignation.user_email || assignation.user_id}</td>
                        <td>{assignation.school_name || assignation.school_id || '-'}</td>
                        <td>
                          {assignation.student_rut
                            ? `${assignation.student_rut} (${assignation.student_name || '-'})`
                            : '-'}
                        </td>
                        <td>{assignation.assignation_type_name || assignation.assignation_type_id}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteAssignation(assignation.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                    {assignations.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-muted">
                          Sin asignaciones disponibles.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default AdminV1Panel

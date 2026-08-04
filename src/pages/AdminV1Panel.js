import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'
import {
  createAssignation,
  createCourse,
  createSchool,
  createStudy,
  createStudyMoment,
  createStudent,
  createUser,
  deleteAssignation,
  listAssignations,
  listCourses,
  listSchools,
  listStudies,
  listStudyMoments,
  listStudents,
  listUsers,
  resetUserPassword,
  updateCourse,
  updateMoment,
  updateSchool,
  updateStudent,
  updateStudy,
  updateUser,
} from '../services/adminV1Api'
import { ROLES } from '../components/constants'

const DEFAULT_MOMENT_UNTIL = '2100-01-01'
const DEFAULT_USER_ROLES = [ROLES.ADMIN, ROLES.EVALUATOR, ROLES.TEACHER, ROLES.PARENT]

const initialStudyForm = {
  year: String(new Date().getFullYear()),
  name: '',
  active: '1',
}

const initialMomentForm = {
  begin: '',
  until: DEFAULT_MOMENT_UNTIL,
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

const initialUserForm = {
  email: '',
  password: '',
  name: '',
  surname: '',
  role: ROLES.EVALUATOR,
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

const toDateInputValue = value => {
  if (!value) {
    return ''
  }

  return String(value).slice(0, 10)
}

const shiftDate = (dateString, days) => {
  if (!dateString) {
    return ''
  }

  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

const normalizeExcelHeader = value =>
  String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')

const normalizeGender = value => {
  const normalized = String(value || '').trim().toUpperCase()

  if (normalized === 'M' || normalized === 'MASCULINO' || normalized === 'HOMBRE') {
    return 'M'
  }

  if (normalized === 'F' || normalized === 'FEMENINO' || normalized === 'MUJER') {
    return 'F'
  }

  return ''
}

const mapStudyToForm = study => ({
  year: String(study.year || ''),
  name: study.name || '',
  active: String(study.active == null ? '1' : study.active),
})

const mapSchoolToForm = school => ({
  commune_id: String(school.commune_id || ''),
  name: school.name || '',
  street: school.street || '',
  number: school.number || '',
  phone: school.phone || '',
  active: String(school.active == null ? '1' : school.active),
})

const mapCourseToForm = course => ({
  school_id: String(course.school_id || ''),
  level: course.level || '',
  letter: course.letter || '',
  year: String(course.year || new Date().getFullYear()),
})

const mapStudentToForm = student => ({
  course_id: String(student.course_id || ''),
  name: student.name || '',
  surname: student.surname || '',
  rut: student.rut || '',
  age: String(student.age == null ? '' : student.age),
  gender: student.gender || 'M',
  birthday: toDateInputValue(student.birthday),
})

const mapUserToForm = user => ({
  email: user.email || '',
  password: '',
  name: user.name || '',
  surname: user.surname || '',
  role: user.role || ROLES.EVALUATOR,
  picture: user.picture || '',
  gender: user.gender || '',
  rut: user.rut || '',
})

const parseStudentImportWorkbook = fileBuffer => {
  const workbook = XLSX.read(fileBuffer, { type: 'array' })
  const firstSheetName = workbook.SheetNames[0]

  if (!firstSheetName) {
    return {
      rows: [],
      errors: ['El archivo Excel no contiene hojas para importar.'],
    }
  }

  const sheet = workbook.Sheets[firstSheetName]
  const matrix = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: '',
    raw: false,
  })

  if (!Array.isArray(matrix) || matrix.length < 2) {
    return {
      rows: [],
      errors: ['El archivo Excel debe incluir encabezados y al menos una fila de alumnos.'],
    }
  }

  const headers = matrix[0].map(normalizeExcelHeader)
  const getHeaderIndex = aliases => headers.findIndex(header => aliases.includes(header))

  const columnIndexes = {
    name: getHeaderIndex(['nombre', 'nombres', 'name']),
    surname: getHeaderIndex(['apellido', 'apellidos', 'surname']),
    rut: getHeaderIndex(['rut']),
    gender: getHeaderIndex(['genero', 'sexo', 'gender']),
    age: getHeaderIndex(['edad', 'age']),
    birthday: getHeaderIndex(['fechanacimiento', 'birthday', 'fecha', 'nacimiento']),
  }

  const missingColumns = Object.entries(columnIndexes)
    .filter(([key, index]) => index < 0 && key !== 'birthday')
    .map(([key]) => key)

  if (missingColumns.length > 0) {
    return {
      rows: [],
      errors: [
        `Faltan columnas requeridas en el Excel: ${missingColumns.join(', ')}. Usa Nombre, Apellido, Rut, Genero y Edad.`,
      ],
    }
  }

  const rows = []
  const errors = []

  matrix.slice(1).forEach((row, index) => {
    const rowNumber = index + 2
    const rawName = String(row[columnIndexes.name] || '').trim()
    const rawSurname = String(row[columnIndexes.surname] || '').trim()
    const rawRut = String(row[columnIndexes.rut] || '').trim()
    const rawGender = normalizeGender(row[columnIndexes.gender])
    const rawAge = Number(String(row[columnIndexes.age] || '').trim())
    const rawBirthday =
      columnIndexes.birthday >= 0 ? String(row[columnIndexes.birthday] || '').trim() : ''

    const isEmptyRow = !rawName && !rawSurname && !rawRut && !String(row[columnIndexes.age] || '').trim()
    if (isEmptyRow) {
      return
    }

    if (!rawName || !rawSurname || !rawRut) {
      errors.push(`Fila ${rowNumber}: Nombre, Apellido y Rut son obligatorios.`)
      return
    }

    if (!rawGender) {
      errors.push(`Fila ${rowNumber}: Genero debe ser M/F o Masculino/Femenino.`)
      return
    }

    if (!Number.isInteger(rawAge) || rawAge < 0 || rawAge > 120) {
      errors.push(`Fila ${rowNumber}: Edad debe ser un entero entre 0 y 120.`)
      return
    }

    rows.push({
      rowNumber,
      name: rawName,
      surname: rawSurname,
      rut: rawRut,
      gender: rawGender,
      age: rawAge,
      birthday: rawBirthday,
    })
  })

  return {
    rows,
    errors,
  }
}

const loadAllPages = async (request, params = {}) => {
  const pageSize = 100
  const rows = []
  let page = 1
  let total = null

  do {
    const response = await request({ ...params, page, pageSize })
    const pageRows = Array.isArray(response.data) ? response.data : []
    rows.push(...pageRows)
    total = response.meta && Number.isInteger(response.meta.total) ? response.meta.total : rows.length
    page += 1
  } while (rows.length < total)

  return rows
}

function AdminV1Panel() {
  const [activeModule, setActiveModule] = useState('studies')
  const [studies, setStudies] = useState([])
  const [selectedStudyId, setSelectedStudyId] = useState(null)
  const [moments, setMoments] = useState([])
  const [schools, setSchools] = useState([])
  const [selectedSchoolId, setSelectedSchoolId] = useState(null)
  const [courses, setCourses] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const [students, setStudents] = useState([])
  const [users, setUsers] = useState([])
  const [assignations, setAssignations] = useState([])
  const [instruments, setInstruments] = useState([])
  const [studyForm, setStudyForm] = useState(initialStudyForm)
  const [momentForm, setMomentForm] = useState(initialMomentForm)
  const [schoolForm, setSchoolForm] = useState(initialSchoolForm)
  const [courseForm, setCourseForm] = useState(initialCourseForm)
  const [studentForm, setStudentForm] = useState(initialStudentForm)
  const [userForm, setUserForm] = useState(initialUserForm)
  const [assignationForm, setAssignationForm] = useState(initialAssignationForm)
  const [editingStudyId, setEditingStudyId] = useState(null)
  const [editingMomentId, setEditingMomentId] = useState(null)
  const [editingMomentForm, setEditingMomentForm] = useState(initialMomentForm)
  const [editingSchoolId, setEditingSchoolId] = useState(null)
  const [editingCourseId, setEditingCourseId] = useState(null)
  const [editingStudentId, setEditingStudentId] = useState(null)
  const [editingUserId, setEditingUserId] = useState(null)
  const [studentImportRows, setStudentImportRows] = useState([])
  const [studentImportErrors, setStudentImportErrors] = useState([])
  const [studentImportFileName, setStudentImportFileName] = useState('')
  const [isImportingStudents, setIsImportingStudents] = useState(false)
  const [backupStudyId, setBackupStudyId] = useState('')
  const [backupImportFileName, setBackupImportFileName] = useState('')
  const [backupImportRows, setBackupImportRows] = useState([])
  const [backupImportErrors, setBackupImportErrors] = useState([])
  const [isSubmittingBackup, setIsSubmittingBackup] = useState(false)
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

  const selectedSchool = useMemo(
    () => schools.find(school => school.id === selectedSchoolId) || null,
    [schools, selectedSchoolId]
  )

  const selectedCourse = useMemo(
    () => courses.find(course => course.id === selectedCourseId) || null,
    [courses, selectedCourseId]
  )

  const filteredCourses = useMemo(
    () => courses.filter(course => course.school_id === selectedSchoolId),
    [courses, selectedSchoolId]
  )

  const filteredStudents = useMemo(
    () =>
      students.filter(student => {
        if (selectedCourseId) {
          return student.course_id === selectedCourseId
        }

        if (selectedSchoolId) {
          return student.school_id === selectedSchoolId
        }

        return true
      }),
    [students, selectedCourseId, selectedSchoolId]
  )

  const assignationUsers = useMemo(
    () => users.map(user => ({ id: user.id, label: `${user.email} (#${user.id})` })),
    [users]
  )

  const assignationSchools = useMemo(
    () => schools.map(school => ({ id: school.id, label: `${school.name} (#${school.id})` })),
    [schools]
  )

  const userRoles = useMemo(() => {
    const discoveredRoles = users
      .map(user => user.role)
      .filter(role => typeof role === 'string' && role.trim() !== '')

    return Array.from(new Set([...DEFAULT_USER_ROLES, ...discoveredRoles]))
  }, [users])

  const lastMoment = useMemo(() => {
    if (moments.length === 0) {
      return null
    }

    return [...moments].sort((left, right) => left.begin.localeCompare(right.begin))[moments.length - 1]
  }, [moments])

  const loadSchools = async () => {
    setIsLoadingSchools(true)
    try {
      const rows = await loadAllPages(listSchools)
      setSchools(rows)
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible cargar colegios.'),
      })
    } finally {
      setIsLoadingSchools(false)
    }
  }

  const loadCourses = async schoolId => {
    if (!schoolId) {
      setCourses([])
      return
    }

    setIsLoadingCourses(true)
    try {
      const rows = await loadAllPages(listCourses, { schoolId })
      setCourses(rows)
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible cargar cursos.'),
      })
    } finally {
      setIsLoadingCourses(false)
    }
  }

  const loadStudents = async ({ schoolId, courseId } = {}) => {
    if (!schoolId && !courseId) {
      setStudents([])
      return
    }

    setIsLoadingStudents(true)
    try {
      const rows = await loadAllPages(listStudents, {
        ...(schoolId ? { schoolId } : {}),
        ...(courseId ? { courseId } : {}),
      })
      setStudents(rows)
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
      const rows = await loadAllPages(listUsers)
      setUsers(rows)
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
      setAssignations(await loadAllPages(listAssignations))
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
      const rows = await loadAllPages(listStudies)
      setStudies(rows)
      if (rows.length === 0) {
        setSelectedStudyId(null)
      } else if (!rows.some(study => study.id === selectedStudyId)) {
        setSelectedStudyId(rows[0].id)
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
      const rows = Array.isArray(response.data) ? response.data : []
      setMoments(rows)
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

  const loadInstruments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/instruments`, {
        withCredentials: true,
      })
      setInstruments(Array.isArray(response.data) ? response.data : [])
    } catch (_error) {
      setInstruments([])
    }
  }

  useEffect(() => {
    loadSchools()
    loadUsers()
    loadAssignations()
    loadStudies()
    loadInstruments()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadMoments(selectedStudyId)
  }, [selectedStudyId])

  useEffect(() => {
    setSelectedCourseId(null)
    setStudents([])
    loadCourses(selectedSchoolId)
  }, [selectedSchoolId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadStudents({ schoolId: selectedSchoolId, courseId: selectedCourseId })
  }, [selectedSchoolId, selectedCourseId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (schools.length > 0 && !schools.some(school => school.id === selectedSchoolId)) {
      setSelectedSchoolId(schools[0].id)
    }

    if (schools.length === 0) {
      setSelectedSchoolId(null)
    }
  }, [schools, selectedSchoolId])

  useEffect(() => {
    if (filteredCourses.length > 0 && !filteredCourses.some(course => course.id === selectedCourseId)) {
      setSelectedCourseId(filteredCourses[0].id)
    }

    if (filteredCourses.length === 0) {
      setSelectedCourseId(null)
    }
  }, [filteredCourses, selectedCourseId])

  useEffect(() => {
    if (!editingCourseId && selectedSchoolId) {
      setCourseForm(current => ({ ...current, school_id: String(selectedSchoolId) }))
    }
  }, [editingCourseId, selectedSchoolId])

  useEffect(() => {
    if (!studentForm.course_id && selectedCourseId) {
      setStudentForm(current => ({ ...current, course_id: String(selectedCourseId) }))
    }
  }, [studentForm.course_id, selectedCourseId])

  useEffect(() => {
    if (!assignationForm.user_id && users.length > 0) {
      setAssignationForm(current => ({ ...current, user_id: String(users[0].id) }))
    }
  }, [assignationForm.user_id, users])

  useEffect(() => {
    if (!assignationForm.school_id && schools.length > 0) {
      setAssignationForm(current => ({ ...current, school_id: String(schools[0].id) }))
    }
  }, [assignationForm.school_id, schools])

  useEffect(() => {
    if (!backupStudyId && studies.length > 0) {
      setBackupStudyId(String(studies[0].id))
    }
  }, [backupStudyId, studies])

  const resetStudyEditor = () => {
    setEditingStudyId(null)
    setStudyForm(initialStudyForm)
  }

  const resetSchoolEditor = () => {
    setEditingSchoolId(null)
    setSchoolForm(initialSchoolForm)
  }

  const resetCourseEditor = () => {
    setEditingCourseId(null)
    setCourseForm({
      ...initialCourseForm,
      school_id: selectedSchoolId ? String(selectedSchoolId) : '',
    })
  }

  const resetStudentEditor = () => {
    setEditingStudentId(null)
    setStudentForm({
      ...initialStudentForm,
      course_id: selectedCourseId ? String(selectedCourseId) : '',
    })
  }

  const resetUserEditor = () => {
    setEditingUserId(null)
    setUserForm(initialUserForm)
  }

  const startStudyEdit = study => {
    setEditingStudyId(study.id)
    setStudyForm(mapStudyToForm(study))
  }

  const startMomentEdit = moment => {
    setEditingMomentId(moment.id)
    setEditingMomentForm({
      begin: toDateInputValue(moment.begin),
      until: toDateInputValue(moment.until),
    })
  }

  const startSchoolEdit = school => {
    setEditingSchoolId(school.id)
    setSelectedSchoolId(school.id)
    setSchoolForm(mapSchoolToForm(school))
  }

  const startCourseEdit = course => {
    setEditingCourseId(course.id)
    setSelectedSchoolId(course.school_id)
    setSelectedCourseId(course.id)
    setCourseForm(mapCourseToForm(course))
  }

  const startStudentEdit = student => {
    setEditingStudentId(student.id)
    setSelectedSchoolId(student.school_id)
    setSelectedCourseId(student.course_id)
    setStudentForm(mapStudentToForm(student))
  }

  const startUserEdit = user => {
    setEditingUserId(user.id)
    setUserForm(mapUserToForm(user))
  }

  const handleStudySubmit = async event => {
    event.preventDefault()
    setFeedback({ type: null, message: '' })

    try {
      if (editingStudyId) {
        await updateStudy(editingStudyId, studyForm)
        setFeedback({
          type: 'success',
          message: `Estudio #${editingStudyId} actualizado.`,
        })
      } else {
        const response = await createStudy(studyForm)
        const created = response.data
        setFeedback({
          type: 'success',
          message: 'Estudio creado en admin v1.',
        })
        if (created && created.id) {
          setSelectedStudyId(created.id)
        }
      }

      resetStudyEditor()
      await loadStudies()
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible guardar el estudio.'),
      })
    }
  }

  const handleMomentUpdate = async event => {
    event.preventDefault()
    if (!editingMomentId) {
      return
    }

    setFeedback({ type: null, message: '' })

    try {
      await updateMoment(editingMomentId, editingMomentForm)
      setFeedback({
        type: 'success',
        message: `Momento #${editingMomentId} actualizado.`,
      })
      setEditingMomentId(null)
      setEditingMomentForm(initialMomentForm)
      await loadMoments(selectedStudyId)
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible actualizar el momento.'),
      })
    }
  }

  const handleAppendMoment = async event => {
    event.preventDefault()
    if (!selectedStudyId) {
      setFeedback({
        type: 'warning',
        message: 'Selecciona un estudio antes de agregar un nuevo momento.',
      })
      return
    }

    if (!momentForm.begin) {
      setFeedback({
        type: 'warning',
        message: 'Debes indicar la fecha de inicio del nuevo momento.',
      })
      return
    }

    if (lastMoment && momentForm.begin <= toDateInputValue(lastMoment.begin)) {
      setFeedback({
        type: 'warning',
        message: 'La fecha de inicio del nuevo momento debe ser posterior al ultimo momento actual.',
      })
      return
    }

    setFeedback({ type: null, message: '' })

    try {
      if (lastMoment) {
        await updateMoment(lastMoment.id, {
          begin: toDateInputValue(lastMoment.begin),
          until: shiftDate(momentForm.begin, -1),
        })
      }

      await createStudyMoment(selectedStudyId, {
        begin: momentForm.begin,
        until: DEFAULT_MOMENT_UNTIL,
      })

      setMomentForm(initialMomentForm)
      setFeedback({
        type: 'success',
        message: 'Se cerro el ultimo momento y se abrio el nuevo con fecha 2100-01-01.',
      })
      await loadMoments(selectedStudyId)
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible agregar el nuevo momento.'),
      })
    }
  }

  const handleSchoolSubmit = async event => {
    event.preventDefault()
    setFeedback({ type: null, message: '' })

    try {
      if (editingSchoolId) {
        await updateSchool(editingSchoolId, schoolForm)
        setFeedback({ type: 'success', message: `Colegio #${editingSchoolId} actualizado.` })
      } else {
        const response = await createSchool(schoolForm)
        const created = response.data
        setFeedback({ type: 'success', message: 'Colegio creado.' })
        if (created && created.id) {
          setSelectedSchoolId(created.id)
        }
      }

      resetSchoolEditor()
      await loadSchools()
      await loadCourses(selectedSchoolId)
      await loadStudents({ schoolId: selectedSchoolId, courseId: selectedCourseId })
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible guardar el colegio.'),
      })
    }
  }

  const handleCourseSubmit = async event => {
    event.preventDefault()
    setFeedback({ type: null, message: '' })

    try {
      if (editingCourseId) {
        await updateCourse(editingCourseId, courseForm)
        setFeedback({ type: 'success', message: `Curso #${editingCourseId} actualizado.` })
      } else {
        const response = await createCourse(courseForm)
        const created = response.data
        setFeedback({ type: 'success', message: 'Curso creado.' })
        if (created && created.id) {
          setSelectedCourseId(created.id)
        }
      }

      resetCourseEditor()
      await loadCourses(selectedSchoolId)
      await loadStudents({ schoolId: selectedSchoolId, courseId: selectedCourseId })
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible guardar el curso.'),
      })
    }
  }

  const buildStudentPayload = () => ({
    ...studentForm,
    age: Number(studentForm.age),
  })

  const handleStudentSubmit = async event => {
    event.preventDefault()
    setFeedback({ type: null, message: '' })

    try {
      if (editingStudentId) {
        await updateStudent(editingStudentId, buildStudentPayload())
        setFeedback({ type: 'success', message: `Alumno #${editingStudentId} actualizado.` })
      } else {
        await createStudent(buildStudentPayload())
        setFeedback({ type: 'success', message: 'Alumno creado.' })
      }

      resetStudentEditor()
      await loadStudents({ schoolId: selectedSchoolId, courseId: selectedCourseId })
      await loadAssignations()
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible guardar el alumno.'),
      })
    }
  }

  const handleStudentImportFile = async event => {
    const [file] = event.target.files || []
    if (!file) {
      return
    }

    try {
      const buffer = await file.arrayBuffer()
      const parsed = parseStudentImportWorkbook(buffer)
      setStudentImportFileName(file.name)
      setStudentImportRows(parsed.rows)
      setStudentImportErrors(parsed.errors)

      if (parsed.errors.length === 0) {
        setFeedback({
          type: 'info',
          message: `Excel ${file.name} cargado con ${parsed.rows.length} alumnos listos para importar.`,
        })
      }
    } catch (_error) {
      setStudentImportFileName(file.name)
      setStudentImportRows([])
      setStudentImportErrors(['No fue posible leer el archivo Excel seleccionado.'])
    }
  }

  const handleStudentImport = async () => {
    if (!selectedCourseId) {
      setFeedback({
        type: 'warning',
        message: 'Selecciona un curso antes de importar alumnos desde Excel.',
      })
      return
    }

    if (studentImportRows.length === 0 || studentImportErrors.length > 0) {
      setFeedback({
        type: 'warning',
        message: 'Corrige el archivo Excel antes de iniciar la carga masiva.',
      })
      return
    }

    setIsImportingStudents(true)
    setFeedback({ type: null, message: '' })

    let createdCounter = 0
    const failedRows = []

    try {
      for (const row of studentImportRows) {
        try {
          await createStudent({
            course_id: String(selectedCourseId),
            name: row.name,
            surname: row.surname,
            rut: row.rut,
            gender: row.gender,
            age: row.age,
            birthday: row.birthday,
          })
          createdCounter += 1
        } catch (error) {
          failedRows.push(`Fila ${row.rowNumber}: ${extractErrorMessage(error, 'fallo de validacion')}`)
        }
      }

      await loadStudents({ schoolId: selectedSchoolId, courseId: selectedCourseId })
      await loadAssignations()
      setFeedback({
        type: failedRows.length === 0 ? 'success' : 'warning',
        message:
          failedRows.length === 0
            ? `Importacion completada: ${createdCounter} alumnos creados en el curso seleccionado.`
            : `Importacion parcial: ${createdCounter} alumnos creados. ${failedRows.length} filas fallaron.`,
      })
      setStudentImportErrors(failedRows)
      if (failedRows.length === 0) {
        setStudentImportRows([])
        setStudentImportFileName('')
      }
    } finally {
      setIsImportingStudents(false)
    }
  }

  const handleUserSubmit = async event => {
    event.preventDefault()
    setFeedback({ type: null, message: '' })

    try {
      if (editingUserId) {
        await updateUser(editingUserId, userForm)
        setFeedback({ type: 'success', message: `Usuario #${editingUserId} actualizado.` })
      } else {
        await createUser(userForm)
        setFeedback({ type: 'success', message: 'Usuario creado.' })
      }

      resetUserEditor()
      await loadUsers()
      await loadAssignations()
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible guardar el usuario.'),
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

  const handleBackupFile = async event => {
    const [file] = event.target.files || []
    if (!file) {
      return
    }

    try {
      const rawText = await file.text()
      const parsed = JSON.parse(rawText)

      if (!Array.isArray(parsed)) {
        throw new Error('Formato invalido')
      }

      const studentIds = Array.from(
        new Set(
          parsed
            .filter(test => Array.isArray(test) && test[0])
            .map(test => test[0].student_id)
            .filter(studentId => studentId != null && studentId !== '')
            .map(String)
        )
      )
      const missingStudentIds = studentIds.filter(
        studentId => !students.some(student => String(student.id) === studentId)
      )
      let backupStudents = students

      if (missingStudentIds.length > 0) {
        backupStudents = await loadAllPages(listStudents)
      }

      const parsedRows = parsed
        .map((test, index) => {
          if (!Array.isArray(test) || !test[0] || !test[1]) {
            return {
              index,
              isValid: false,
              error: 'El item no cumple el formato [infoObject, choicesObject].',
            }
          }

          const info = test[0]
          const instrument = instruments.find(item => String(item.id) === String(info.instrument))
          const student = backupStudents.find(item => String(item.id) === String(info.student_id))
          const evaluator = users.find(item => String(item.id) === String(info.user_id))

          return {
            index,
            raw: test,
            isValid: true,
            instrumentId: info.instrument,
            instrumentName: instrument ? instrument.name : `Instrumento #${info.instrument || '?'}`,
            studentId: info.student_id,
            studentName: student
              ? `${student.name} ${student.surname} (${student.rut})`
              : `Alumno #${info.student_id || '?'}`,
            evaluatorName: evaluator
              ? `${evaluator.name || ''} ${evaluator.surname || ''}`.trim() || evaluator.email
              : info.user_id
              ? `Usuario #${info.user_id}`
              : 'Sin evaluador identificado',
            testDate: info.date || '',
          }
        })

      const invalidRows = parsedRows.filter(row => !row.isValid)
      setBackupImportFileName(file.name)
      setBackupImportRows(parsedRows.filter(row => row.isValid))
      setBackupImportErrors(
        invalidRows.map(row => `Registro ${row.index + 1}: ${row.error}`)
      )

      if (invalidRows.length === 0) {
        setFeedback({
          type: 'info',
          message: `Respaldo ${file.name} cargado con ${parsedRows.length} evaluaciones listas para revisar.`,
        })
      }
    } catch (_error) {
      setBackupImportFileName(file.name)
      setBackupImportRows([])
      setBackupImportErrors([
        'No fue posible leer el JSON. Usa el respaldo administrativo exportado por la app.',
      ])
    }
  }

  const handleSubmitBackup = async () => {
    if (!backupStudyId) {
      setFeedback({
        type: 'warning',
        message: 'Selecciona el estudio destino antes de enviar el respaldo administrativo.',
      })
      return
    }

    if (backupImportRows.length === 0 || backupImportErrors.length > 0) {
      setFeedback({
        type: 'warning',
        message: 'Debes cargar un JSON valido antes de enviarlo al endpoint de evaluaciones.',
      })
      return
    }

    setIsSubmittingBackup(true)
    setFeedback({ type: null, message: '' })

    let updatedCounter = 0
    let createdCounter = 0
    let start = 0
    const batchSize = 30

    try {
      while (start < backupImportRows.length) {
        const slice = backupImportRows.slice(start, start + batchSize).map(row => row.raw)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/newevaluation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studyId: backupStudyId,
            instruments: slice,
          }),
        })

        if (!response.ok) {
          throw new Error(`Fallo el envio del lote ${Math.floor(start / batchSize) + 1}.`)
        }

        const batchResult = await response.json()
        updatedCounter += Number(batchResult.updatedCounter || 0)
        createdCounter += Number(batchResult.createdCounter || 0)
        start += batchSize
      }

      setFeedback({
        type: 'success',
        message: `Respaldo importado: ${createdCounter} evaluaciones creadas y ${updatedCounter} actualizadas via /newevaluation.`,
      })
      setBackupImportRows([])
      setBackupImportErrors([])
      setBackupImportFileName('')
    } catch (error) {
      setFeedback({
        type: 'danger',
        message: extractErrorMessage(error, 'No fue posible enviar el respaldo administrativo.'),
      })
    } finally {
      setIsSubmittingBackup(false)
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
        <button className={moduleButtonClass('structure')} onClick={() => setActiveModule('structure')}>
          Colegios, cursos y alumnos
        </button>
        <button className={moduleButtonClass('users')} onClick={() => setActiveModule('users')}>
          Usuarios
        </button>
        <button className={moduleButtonClass('backup')} onClick={() => setActiveModule('backup')}>
          Respaldo administrativo
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

      {activeModule === 'studies' ? (
        <div className="row g-3">
          <div className="col-12 col-xl-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title m-0">Estudios</h5>
                  {editingStudyId ? (
                    <button className="btn btn-sm btn-outline-secondary" onClick={resetStudyEditor}>
                      Cancelar edicion
                    </button>
                  ) : null}
                </div>

                <form className="row g-2 mb-3" onSubmit={handleStudySubmit}>
                  <div className="col-4">
                    <input
                      className="form-control"
                      placeholder="Ano"
                      value={studyForm.year}
                      onChange={event =>
                        setStudyForm(current => ({ ...current, year: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      placeholder="Nombre estudio"
                      value={studyForm.name}
                      onChange={event =>
                        setStudyForm(current => ({ ...current, name: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-6">
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
                  <div className="col-6">
                    <button className="btn btn-primary w-100" type="submit">
                      {editingStudyId ? 'Guardar cambios' : 'Crear estudio'}
                    </button>
                  </div>
                </form>

                {isLoadingStudies ? (
                  <p className="text-muted">Cargando estudios...</p>
                ) : (
                  <div className="list-group overflow-auto" style={{ maxHeight: '24rem' }}>
                    {studies.map(study => (
                      <button
                        key={study.id}
                        type="button"
                        className={`list-group-item list-group-item-action ${
                          study.id === selectedStudyId ? 'active' : ''
                        }`}
                        onClick={() => setSelectedStudyId(study.id)}
                      >
                        <div className="d-flex justify-content-between align-items-start gap-2">
                          <div className="text-start">
                            <strong>{study.name}</strong>
                            <div className="small opacity-75">#{study.id} · {study.year}</div>
                          </div>
                          <span className="badge bg-light text-dark">{study.active === '1' ? 'Activo' : 'Inactivo'}</span>
                        </div>
                      </button>
                    ))}
                    {studies.length === 0 ? (
                      <div className="list-group-item text-muted">No hay estudios registrados.</div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-8">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="card-title m-0">Momentos del estudio</h5>
                    <p className="text-muted mb-0">
                      {selectedStudy
                        ? `${selectedStudy.name} (#${selectedStudy.id})`
                        : 'Selecciona un estudio para administrar sus momentos.'}
                    </p>
                  </div>
                  {selectedStudy ? (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => startStudyEdit(selectedStudy)}
                    >
                      Editar estudio
                    </button>
                  ) : null}
                </div>

                {selectedStudy ? (
                  <>
                    <div className="card border-0 bg-light mb-3">
                      <div className="card-body">
                        <h6 className="mb-2">Abrir nuevo momento</h6>
                        <p className="text-muted small mb-3">
                          Al guardar se cerrara automaticamente el ultimo momento y el nuevo quedara abierto con fecha {DEFAULT_MOMENT_UNTIL}.
                        </p>
                        <form className="row g-2" onSubmit={handleAppendMoment}>
                          <div className="col-12 col-md-5">
                            <input
                              type="date"
                              className="form-control"
                              value={momentForm.begin}
                              onChange={event =>
                                setMomentForm(current => ({ ...current, begin: event.target.value }))
                              }
                            />
                          </div>
                          <div className="col-12 col-md-4">
                            <input
                              type="date"
                              className="form-control"
                              value={momentForm.until}
                              disabled
                            />
                          </div>
                          <div className="col-12 col-md-3">
                            <button className="btn btn-primary w-100" type="submit">
                              Agregar momento
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    {isLoadingMoments ? (
                      <p className="text-muted">Cargando momentos...</p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-sm align-middle">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Inicio</th>
                              <th>Fin</th>
                              <th>Estado</th>
                              <th className="text-end">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {moments.map(moment => {
                              const isLast = lastMoment && lastMoment.id === moment.id
                              const isEditing = editingMomentId === moment.id

                              return (
                                <tr key={moment.id}>
                                  <td>{moment.id}</td>
                                  <td>
                                    {isEditing ? (
                                      <input
                                        type="date"
                                        className="form-control form-control-sm"
                                        value={editingMomentForm.begin}
                                        onChange={event =>
                                          setEditingMomentForm(current => ({
                                            ...current,
                                            begin: event.target.value,
                                          }))
                                        }
                                      />
                                    ) : (
                                      toDateInputValue(moment.begin)
                                    )}
                                  </td>
                                  <td>
                                    {isEditing ? (
                                      <input
                                        type="date"
                                        className="form-control form-control-sm"
                                        value={editingMomentForm.until}
                                        onChange={event =>
                                          setEditingMomentForm(current => ({
                                            ...current,
                                            until: event.target.value,
                                          }))
                                        }
                                      />
                                    ) : (
                                      toDateInputValue(moment.until)
                                    )}
                                  </td>
                                  <td>
                                    {isLast ? <span className="badge bg-success">Ultimo</span> : <span className="badge bg-secondary">Historico</span>}
                                  </td>
                                  <td className="text-end">
                                    {isEditing ? (
                                      <div className="btn-group btn-group-sm">
                                        <button className="btn btn-primary" type="button" onClick={handleMomentUpdate}>
                                          Guardar
                                        </button>
                                        <button
                                          className="btn btn-outline-secondary"
                                          type="button"
                                          onClick={() => {
                                            setEditingMomentId(null)
                                            setEditingMomentForm(initialMomentForm)
                                          }}
                                        >
                                          Cancelar
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        className="btn btn-sm btn-outline-primary"
                                        type="button"
                                        onClick={() => startMomentEdit(moment)}
                                      >
                                        {isLast ? 'Editar cierre' : 'Editar'}
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              )
                            })}
                            {moments.length === 0 ? (
                              <tr>
                                <td colSpan="5" className="text-muted">
                                  Sin momentos para este estudio.
                                </td>
                              </tr>
                            ) : null}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted mb-0">No hay estudio seleccionado.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {activeModule === 'structure' ? (
        <div className="row g-3">
          <div className="col-12 col-xl-4">
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title m-0">Colegios</h5>
                  {editingSchoolId ? (
                    <button className="btn btn-sm btn-outline-secondary" onClick={resetSchoolEditor}>
                      Cancelar
                    </button>
                  ) : null}
                </div>

                <form className="row g-2 mb-3" onSubmit={handleSchoolSubmit}>
                  <div className="col-4">
                    <input
                      className="form-control"
                      placeholder="Commune ID"
                      value={schoolForm.commune_id}
                      onChange={event =>
                        setSchoolForm(current => ({ ...current, commune_id: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-8">
                    <input
                      className="form-control"
                      placeholder="Nombre"
                      value={schoolForm.name}
                      onChange={event =>
                        setSchoolForm(current => ({ ...current, name: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-7">
                    <input
                      className="form-control"
                      placeholder="Calle"
                      value={schoolForm.street}
                      onChange={event =>
                        setSchoolForm(current => ({ ...current, street: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-5">
                    <input
                      className="form-control"
                      placeholder="Numero"
                      value={schoolForm.number}
                      onChange={event =>
                        setSchoolForm(current => ({ ...current, number: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-7">
                    <input
                      className="form-control"
                      placeholder="Telefono"
                      value={schoolForm.phone}
                      onChange={event =>
                        setSchoolForm(current => ({ ...current, phone: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-5">
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
                  <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">
                      {editingSchoolId ? 'Guardar colegio' : 'Crear colegio'}
                    </button>
                  </div>
                </form>

                {isLoadingSchools ? (
                  <p className="text-muted">Cargando colegios...</p>
                ) : (
                  <div className="list-group overflow-auto" style={{ maxHeight: '24rem' }}>
                    {schools.map(school => (
                      <button
                        key={school.id}
                        type="button"
                        className={`list-group-item list-group-item-action ${
                          school.id === selectedSchoolId ? 'active' : ''
                        }`}
                        onClick={() => setSelectedSchoolId(school.id)}
                      >
                        <div className="d-flex justify-content-between gap-2">
                          <div className="text-start">
                            <strong>{school.name}</strong>
                            <div className="small opacity-75">
                              #{school.id} · {school.commune_name || school.commune_id}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={event => {
                              event.stopPropagation()
                              startSchoolEdit(school)
                            }}
                          >
                            Editar
                          </button>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-4">
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="card-title m-0">Cursos</h5>
                    <p className="text-muted mb-0 small">
                      {selectedSchool ? `Dentro de ${selectedSchool.name}` : 'Selecciona un colegio.'}
                    </p>
                  </div>
                  {editingCourseId ? (
                    <button className="btn btn-sm btn-outline-secondary" onClick={resetCourseEditor}>
                      Cancelar
                    </button>
                  ) : null}
                </div>

                <form className="row g-2 mb-3" onSubmit={handleCourseSubmit}>
                  <div className="col-12">
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
                  <div className="col-5">
                    <input
                      className="form-control"
                      placeholder="Nivel"
                      value={courseForm.level}
                      onChange={event =>
                        setCourseForm(current => ({ ...current, level: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-3">
                    <input
                      className="form-control"
                      placeholder="Letra"
                      value={courseForm.letter}
                      onChange={event =>
                        setCourseForm(current => ({ ...current, letter: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-4">
                    <input
                      className="form-control"
                      placeholder="Ano"
                      value={courseForm.year}
                      onChange={event =>
                        setCourseForm(current => ({ ...current, year: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">
                      {editingCourseId ? 'Guardar curso' : 'Crear curso'}
                    </button>
                  </div>
                </form>

                {isLoadingCourses ? (
                  <p className="text-muted">Cargando cursos...</p>
                ) : (
                  <div className="list-group overflow-auto" style={{ maxHeight: '24rem' }}>
                    {filteredCourses.map(course => (
                      <button
                        key={course.id}
                        type="button"
                        className={`list-group-item list-group-item-action ${
                          course.id === selectedCourseId ? 'active' : ''
                        }`}
                        onClick={() => setSelectedCourseId(course.id)}
                      >
                        <div className="d-flex justify-content-between gap-2">
                          <div className="text-start">
                            <strong>{`${course.level} ${course.letter || ''}`.trim()}</strong>
                            <div className="small opacity-75">#{course.id} · {course.year}</div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={event => {
                              event.stopPropagation()
                              startCourseEdit(course)
                            }}
                          >
                            Editar
                          </button>
                        </div>
                      </button>
                    ))}
                    {selectedSchool && filteredCourses.length === 0 ? (
                      <div className="list-group-item text-muted">
                        Este colegio aun no tiene cursos.
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-4">
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="card-title m-0">Alumnos</h5>
                    <p className="text-muted mb-0 small">
                      {selectedCourse
                        ? `${selectedCourse.level} ${selectedCourse.letter || ''} · ${selectedCourse.school_name}`
                        : 'Selecciona un curso para alta o edicion.'}
                    </p>
                  </div>
                  {editingStudentId ? (
                    <button className="btn btn-sm btn-outline-secondary" onClick={resetStudentEditor}>
                      Cancelar
                    </button>
                  ) : null}
                </div>

                <form className="row g-2 mb-3" onSubmit={handleStudentSubmit}>
                  <div className="col-12">
                    <select
                      className="form-select"
                      value={studentForm.course_id}
                      onChange={event =>
                        setStudentForm(current => ({ ...current, course_id: event.target.value }))
                      }
                    >
                      <option value="">Curso</option>
                      {filteredCourses.map(course => (
                        <option key={course.id} value={course.id}>
                          {`${course.level} ${course.letter || ''}`.trim()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <input
                      className="form-control"
                      placeholder="Nombre"
                      value={studentForm.name}
                      onChange={event =>
                        setStudentForm(current => ({ ...current, name: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-6">
                    <input
                      className="form-control"
                      placeholder="Apellido"
                      value={studentForm.surname}
                      onChange={event =>
                        setStudentForm(current => ({ ...current, surname: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-5">
                    <input
                      className="form-control"
                      placeholder="RUT"
                      value={studentForm.rut}
                      onChange={event =>
                        setStudentForm(current => ({ ...current, rut: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-3">
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
                  <div className="col-4">
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
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="date"
                      value={studentForm.birthday}
                      onChange={event =>
                        setStudentForm(current => ({ ...current, birthday: event.target.value }))
                      }
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">
                      {editingStudentId ? 'Guardar alumno' : 'Crear alumno'}
                    </button>
                  </div>
                </form>

                <div className="border rounded p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Carga masiva por Excel</strong>
                    {studentImportFileName ? <span className="small text-muted">{studentImportFileName}</span> : null}
                  </div>
                  <p className="text-muted small mb-2">
                    Columnas esperadas: Nombre, Apellido, Rut, Genero, Edad y opcionalmente FechaNacimiento.
                  </p>
                  <input
                    className="form-control mb-2"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleStudentImportFile}
                  />
                  <button
                    className="btn btn-outline-primary w-100"
                    type="button"
                    onClick={handleStudentImport}
                    disabled={isImportingStudents || studentImportRows.length === 0}
                  >
                    {isImportingStudents ? 'Importando...' : 'Importar alumnos al curso seleccionado'}
                  </button>
                </div>

                {studentImportErrors.length > 0 ? (
                  <div className="alert alert-warning">
                    <strong>Observaciones de importacion</strong>
                    <ul className="mb-0 mt-2 ps-3">
                      {studentImportErrors.slice(0, 8).map(error => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {studentImportRows.length > 0 ? (
                  <div className="table-responsive mb-3">
                    <table className="table table-sm align-middle">
                      <thead>
                        <tr>
                          <th>Fila</th>
                          <th>Nombre</th>
                          <th>RUT</th>
                          <th>Genero</th>
                          <th>Edad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentImportRows.slice(0, 10).map(row => (
                          <tr key={`${row.rowNumber}-${row.rut}`}>
                            <td>{row.rowNumber}</td>
                            <td>{`${row.name} ${row.surname}`}</td>
                            <td>{row.rut}</td>
                            <td>{row.gender}</td>
                            <td>{row.age}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}

                {isLoadingStudents ? (
                  <p className="text-muted">Cargando alumnos...</p>
                ) : (
                  <div className="table-responsive overflow-auto" style={{ maxHeight: '32rem' }}>
                    <table className="table table-sm table-hover align-middle">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>RUT</th>
                          <th>Edad</th>
                          <th>Genero</th>
                          <th className="text-end">Accion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map(student => (
                          <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{`${student.name} ${student.surname}`}</td>
                            <td>{student.rut}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td className="text-end">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                type="button"
                                onClick={() => startStudentEdit(student)}
                              >
                                Editar
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredStudents.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-muted">
                              No hay alumnos para el contexto seleccionado.
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {activeModule === 'users' ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="card-title m-0">Usuarios</h5>
                <p className="text-muted mb-0">Alta y edicion con el mismo hash legacy usado por signin.</p>
              </div>
              {editingUserId ? (
                <button className="btn btn-sm btn-outline-secondary" onClick={resetUserEditor}>
                  Cancelar edicion
                </button>
              ) : null}
            </div>

            <form className="row g-2 mb-3" onSubmit={handleUserSubmit}>
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
                  type="password"
                  placeholder={editingUserId ? 'Nueva contrasena opcional' : 'Contrasena'}
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
                <select
                  className="form-select"
                  value={userForm.role}
                  onChange={event =>
                    setUserForm(current => ({ ...current, role: event.target.value }))
                  }
                >
                  {userRoles.map(role => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
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
              <div className="col-6 col-md-3">
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
                  {editingUserId ? 'Guardar usuario' : 'Crear usuario'}
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
                      <th>RUT</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{`${user.name || ''} ${user.surname || ''}`.trim()}</td>
                        <td>{user.role || '-'}</td>
                        <td>{user.rut || '-'}</td>
                        <td className="text-end">
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary" type="button" onClick={() => startUserEdit(user)}>
                              Editar
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => handleResetPassword(user.id)}
                            >
                              Reset password
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-muted">
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

      {activeModule === 'backup' ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Respaldo administrativo</h5>
            <p className="text-muted">
              Carga un JSON de respaldo administrativo, revisa test, evaluador, alumno y fecha,
              y luego envialo al endpoint actual <code>/newevaluation</code> asociado a un estudio.
            </p>

            <div className="row g-3 mb-3">
              <div className="col-12 col-md-4">
                <label className="form-label">Estudio destino</label>
                <select
                  className="form-select"
                  value={backupStudyId}
                  onChange={event => setBackupStudyId(event.target.value)}
                >
                  <option value="">Selecciona estudio</option>
                  {studies.map(study => (
                    <option key={study.id} value={study.id}>
                      {study.name} ({study.year})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-8">
                <label className="form-label">Archivo JSON</label>
                <input className="form-control" type="file" accept="application/json,.json" onChange={handleBackupFile} />
                {backupImportFileName ? (
                  <div className="form-text">Archivo cargado: {backupImportFileName}</div>
                ) : null}
              </div>
            </div>

            {backupImportErrors.length > 0 ? (
              <div className="alert alert-warning">
                <strong>Problemas detectados en el respaldo</strong>
                <ul className="mb-0 mt-2 ps-3">
                  {backupImportErrors.slice(0, 10).map(error => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {backupImportRows.length > 0 ? (
              <>
                <div className="table-responsive mb-3">
                  <table className="table table-sm table-hover align-middle">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Test</th>
                        <th>Evaluador</th>
                        <th>Alumno</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {backupImportRows.map((row, index) => (
                        <tr key={`${row.instrumentId}-${row.studentId}-${index}`}>
                          <td>{index + 1}</td>
                          <td>{row.instrumentName}</td>
                          <td>{row.evaluatorName}</td>
                          <td>{row.studentName}</td>
                          <td>{row.testDate || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button className="btn btn-primary" type="button" onClick={handleSubmitBackup} disabled={isSubmittingBackup}>
                  {isSubmittingBackup ? 'Enviando respaldo...' : 'Guardar respaldo en estudio seleccionado'}
                </button>
              </>
            ) : null}
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
                            type="button"
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
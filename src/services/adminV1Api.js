import axios from 'axios'

const getBaseUrl = () => `${process.env.REACT_APP_API_URL}/api/admin/v1`

const withParams = params => ({
  params,
  withCredentials: true,
})

export const listStudies = async params => {
  const response = await axios.get(`${getBaseUrl()}/studies`, withParams(params))
  return response.data
}

export const createStudy = async payload => {
  const response = await axios.post(`${getBaseUrl()}/studies`, payload, {
    withCredentials: true,
  })
  return response.data
}

export const listStudyMoments = async (studyId, params) => {
  const response = await axios.get(
    `${getBaseUrl()}/studies/${studyId}/moments`,
    withParams(params)
  )
  return response.data
}

export const createStudyMoment = async (studyId, payload) => {
  const response = await axios.post(
    `${getBaseUrl()}/studies/${studyId}/moments`,
    payload,
    {
      withCredentials: true,
    }
  )
  return response.data
}

export const listSchools = async params => {
  const response = await axios.get(`${getBaseUrl()}/schools`, withParams(params))
  return response.data
}

export const createSchool = async payload => {
  const response = await axios.post(`${getBaseUrl()}/schools`, payload, {
    withCredentials: true,
  })
  return response.data
}

export const listCourses = async params => {
  const response = await axios.get(`${getBaseUrl()}/courses`, withParams(params))
  return response.data
}

export const createCourse = async payload => {
  const response = await axios.post(`${getBaseUrl()}/courses`, payload, {
    withCredentials: true,
  })
  return response.data
}

export const listStudents = async params => {
  const response = await axios.get(`${getBaseUrl()}/students`, withParams(params))
  return response.data
}

export const createStudent = async payload => {
  const response = await axios.post(`${getBaseUrl()}/students`, payload, {
    withCredentials: true,
  })
  return response.data
}

export const transferStudent = async (studentId, payload) => {
  const response = await axios.patch(`${getBaseUrl()}/students/${studentId}/transfer`, payload, {
    withCredentials: true,
  })
  return response.data
}

export const listUsers = async params => {
  const response = await axios.get(`${getBaseUrl()}/users`, withParams(params))
  return response.data
}

export const createUser = async payload => {
  const response = await axios.post(`${getBaseUrl()}/users`, payload, {
    withCredentials: true,
  })
  return response.data
}

export const patchUserStatus = async (userId, payload) => {
  const response = await axios.patch(`${getBaseUrl()}/users/${userId}/status`, payload, {
    withCredentials: true,
  })
  return response.data
}

export const resetUserPassword = async userId => {
  const response = await axios.post(
    `${getBaseUrl()}/users/${userId}/reset-password`,
    {},
    {
      withCredentials: true,
    }
  )
  return response.data
}

export const listAssignations = async params => {
  const response = await axios.get(`${getBaseUrl()}/assignations`, withParams(params))
  return response.data
}

export const createAssignation = async payload => {
  const response = await axios.post(`${getBaseUrl()}/assignations`, payload, {
    withCredentials: true,
  })
  return response.data
}

export const deleteAssignation = async assignationId => {
  const response = await axios.delete(`${getBaseUrl()}/assignations/${assignationId}`, {
    withCredentials: true,
  })
  return response.data
}

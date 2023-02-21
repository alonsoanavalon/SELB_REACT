import React, { Fragment, useEffect, useState } from 'react'
import { get, set, update } from 'idb-keyval'
import { useAlert } from 'react-alert'
import Swal from 'sweetalert2';

export default function HomePage() {

  const alert = useAlert()

  const [username, setUsername] = useState("")
  const [savedFonoTests, setSavedFonoTests] = useState([])
  const [savedHnfTests, setSavedHnfTests] = useState([])
  const [savedTejasTests, setSavedTejasTests] = useState([])
  const [savedCalculoTests, setSavedCalculoTests] = useState([])
  const [savedSdqTests, setSavedSdqTests] = useState([])
  const [savedWallyTests, setSavedWallyTests] = useState([])
  const [savedCorsiTests, setSavedCorsiTests] = useState([])
  const [savedAcesTests, setSavedAcesTests] = useState([])


  const [savedTests, setSavedTests] = useState(false)
  const [tejasLength, setTejasLength] = useState(undefined)
  const [calculoLength, setCalculoLength] = useState(undefined)
  const [sdqLength, setSdqLength] = useState(undefined)
  const [wallyLength, setWallyLength] = useState(undefined)
  const [acesLength, setAcesLength] = useState(undefined)
  const [corsiLength, setCorsiLength] = useState(undefined)
  const [hnfLength, setHnfLength] = useState(undefined)
  const [fonoLength, setFonoLength] = useState(undefined)
  const [completeName, setCompleteName] = useState("")

  // function eliminarTestAntiguos() {
  //   get('completedTests')
  //     .then(res => {
  //       let counterEliminados = 0;
  //       const testNuevos = res.filter((test) => {
  //         const fechaTest = new Date(test[0].date)
  //         const fechaLimite = new Date('2022/10/31')

  //         if (fechaTest > fechaLimite) {
  //           return test;
  //         } else {
  //           counterEliminados++
  //         }
  //       })
  //       return [testNuevos, counterEliminados];
  //     })
  //     .then((data) => {
  //       window.alert('Se eliminaron: ' + data[1] + ' test antiguos')
  //       update('completedTests', val => data[0])

  //       setTimeout(() => {
  //         window.location.pathname = '/'
  //       }, 2000)
  //     })
  // }

  useEffect(() => {
    get('backupTest')
      .then(res => {
        if (res === undefined) {
          get('completedTests')
            .then(res => {
              if (res !== undefined) {
                set('backupTest', res)
              }
            })
        } else if (res.length === 0) {
          {
            get('completedTests')
              .then(res => {
                if (res !== undefined) {
                  set('backupTest', res)
                }
              })
          }
        } else {
          get('completedTests')
            .then(completed => {
              if (completed.length > res.length) {
                set('backupTest', completed)
              }
            })
        }
      })
  }, [])

  useEffect(() => {

    get('userData').then(res => {
      setUsername(res.name)
      setCompleteName(`${res.name} ${res.surname}`)
    })

    // set('completedTests', [

    //   [
    //     {
    //       "instrument": 4,
    //       "user_id": 4,
    //       "student_id": 637,
    //       "date": "2022/11/23"
    //     },
    //     {
    //       180: 1,
    //       181: 2,
    //       182: 3,
    //       183: 3,
    //       184: 4,
    //       185: 1,
    //       186: 1,
    //       187: 2,
    //       188: 1,
    //       189: 3,
    //       190: 1,
    //       191: 1,
    //       192: 3,
    //       193: 3,
    //       194: 2,
    //       195: 1,
    //       196: 2,
    //       197: 1,
    //       198: 1,
    //       199: 1,
    //       200: 1,
    //       201: 1,
    //       202: 1,
    //       203: 4,
    //       204: 2,
    //       205: 1
    //     }
    //   ],
    //   [
    //     {
    //       "instrument": 4,
    //       "user_id": 4,
    //       "student_id": 645,
    //       "date": "2022/11/23"
    //     },
    //     {
    //       180: 3,
    //       181: 2,
    //       182: 2,
    //       183: 3,
    //       184: 4,
    //       185: 3,
    //       186: 3,
    //       187: 2,
    //       188: 3,
    //       189: 2,
    //       190: 1,
    //       191: 1,
    //       192: 3,
    //       193: 3,
    //       194: 3,
    //       195: 3,
    //       196: 2,
    //       197: 1,
    //       198: 1,
    //       199: 4,
    //       200: 3,
    //       201: 1,
    //       202: 3,
    //       203: 4,
    //       204: 2,
    //       205: 1
    //     }
    //   ],
    //   [
    //     {
    //       "instrument": 4,
    //       "user_id": 4,
    //       "student_id": 364,
    //       "date": "2022/11/29"
    //     },
    //     {
    //       180: 1,
    //       181: 2,
    //       182: 1,
    //       183: 3,
    //       184: 4,
    //       185: 1,
    //       186: 1,
    //       187: 2,
    //       188: 3,
    //       189: 4,
    //       190: 1,
    //       191: 3,
    //       192: 1,
    //       193: 3,
    //       194: 1,
    //       195: 3,
    //       196: 2,
    //       197: 1,
    //       198: 1,
    //       199: 4,
    //       200: 1,
    //       201: 1,
    //       202: 3,
    //       203: 4,
    //       204: 2,
    //       205: 1
    //     }
    //   ],
    //   [
    //     {
    //       "instrument": 4,
    //       "user_id": 4,
    //       "student_id": 670,
    //       "date": "2022/11/23"
    //     },
    //     {
    //       180: 1,
    //       181: 4,
    //       182: 3,
    //       183: 3,
    //       184: 4,
    //       185: 1,
    //       186: 1,
    //       187: 2,
    //       188: 3,
    //       189: 2,
    //       190: 1,
    //       191: 1,
    //       192: 3,
    //       193: 3,
    //       194: 3,
    //       195: 3,
    //       196: 2,
    //       197: 1,
    //       198: 1,
    //       199: 4,
    //       200: 1,
    //       201: 1,
    //       202: 1,
    //       203: 4,
    //       204: 2,
    //       205: 1
    //     }
    //   ],
    //   [
    //     {
    //       "instrument": 4,
    //       "user_id": 4,
    //       "student_id": 676,
    //       "date": "2022/11/23"
    //     },
    //     {
    //       180: 1,
    //       181: 2,
    //       182: 1,
    //       183: 4,
    //       184: 4,
    //       185: 1,
    //       186: 1,
    //       187: 2,
    //       188: 3,
    //       189: 2,
    //       190: 1,
    //       191: 1,
    //       192: 1,
    //       193: 3,
    //       194: 1,
    //       195: 1,
    //       196: 2,
    //       197: 1,
    //       198: 1,
    //       199: 3,
    //       200: 1,
    //       201: 1,
    //       202: 1,
    //       203: 1,
    //       204: 2,
    //       205: 1
    //     }
    //   ],
    //   [
    //     {
    //       "instrument": 4,
    //       "user_id": 4,
    //       "student_id": 583,
    //       "date": "2022/11/23"
    //     },
    //     {
    //       180: 1,
    //       181: 2,
    //       182: 3,
    //       183: 3,
    //       184: 1,
    //       185: 1,
    //       186: 1,
    //       187: 2,
    //       188: 3,
    //       189: 2,
    //       190: 1,
    //       191: 1,
    //       192: 3,
    //       193: 3,
    //       194: 3,
    //       195: 3,
    //       196: 2,
    //       197: 1,
    //       198: 1,
    //       199: 4,
    //       200: 3,
    //       201: 1,
    //       202: 4,
    //       203: 4,
    //       204: 2,
    //       205: 3
    //     }
    //   ],
    //   [
    //     {
    //       "instrument": 4,
    //       "user_id": 4,
    //       "student_id": 118,
    //       "date": "2022/11/23"
    //     },
    //     {
    //       180: 1,
    //       181: 4,
    //       182: 3,
    //       183: 4,
    //       184: 4,
    //       185: 4,
    //       186: 3,
    //       187: 1,
    //       188: 3,
    //       189: 3,
    //       190: 2,
    //       191: 2,
    //       192: 3,
    //       193: 3,
    //       194: 2,
    //       195: 2,
    //       196: 2,
    //       197: 2,
    //       198: 2,
    //       199: 4,
    //       200: 2,
    //       201: 2,
    //       202: 3,
    //       203: 4,
    //       204: 2,
    //       205: 3
    //     }
    //   ],
    //   [
    //     {
    //       "instrument": 2,
    //       "user_id": 4,
    //       "student_id": 633,
    //       "date": "2022/11/29"
    //     },
    //     {
    //       73: 1,
    //       74: 1,
    //       75: 2,
    //       76: 2,
    //       77: 1,
    //       78: 3,
    //       79: 1,
    //       80: 1,
    //       81: 2,
    //       82: 2,
    //       83: 2,
    //       84: 2,
    //       85: 2,
    //       86: 2,
    //       87: 2,
    //       88: 2,
    //       89: 2,
    //       90: 3,
    //       91: 3,
    //       92: 3,
    //       93: 5,
    //       94: 4,
    //       95: 4,
    //       96: 6,
    //       97: 6,
    //       98: 6,
    //       99: 8,
    //       100: 8,
    //       101: 8,
    //       102: 10,
    //       103: 10,
    //       104: 10,
    //       105: 10,
    //       106: 10,
    //       107: 10,
    //       108: 16,
    //       109: 11,
    //       110: 11,
    //       111: 11,
    //       112: 1,
    //       113: 1,
    //       114: 1,
    //       115: 1,
    //       116: 1,
    //       117: 1,
    //       118: 1,
    //       119: 1,
    //       120: 1,
    //       121: 1,
    //       122: 2,
    //       123: 2,
    //       124: 2,
    //       125: 2,
    //       126: 2,
    //       127: 2,
    //       128: "",
    //       129: "",
    //       130: "",
    //       131: "",
    //       132: "",
    //       133: "",
    //       134: "",
    //       135: "",
    //       136: "",
    //       137: "",
    //       138: "",
    //       139: "",
    //       140: "",
    //       141: "",
    //       142: "",
    //       143: "",
    //       144: "",
    //       145: ""
    //     }
    //   ],
    //   [
    //     {
    //       "instrument": 2,
    //       "user_id": 4,
    //       "student_id": 645,
    //       "date": "2022/11/23"
    //     },
    //     {
    //       73: 1,
    //       74: 1,
    //       75: 1,
    //       76: 1,
    //       77: 1,
    //       78: 1,
    //       79: 1,
    //       80: 1,
    //       81: 1,
    //       82: 1,
    //       83: 1,
    //       84: 1,
    //       85: 2,
    //       86: 1,
    //       87: 2,
    //       88: 2,
    //       89: 2,
    //       90: 3,
    //       91: 3,
    //       92: 3,
    //       93: 4,
    //       94: 4,
    //       95: 4,
    //       96: 6,
    //       97: 6,
    //       98: 6,
    //       99: 8,
    //       100: 8,
    //       101: 8,
    //       102: 10,
    //       103: 10,
    //       104: 10,
    //       105: 11,
    //       106: 11,
    //       107: 11,
    //       108: 13,
    //       109: 13,
    //       110: 13,
    //       111: 15,
    //       112: 1,
    //       113: 1,
    //       114: 1,
    //       115: 1,
    //       116: 1,
    //       117: 1,
    //       118: 1,
    //       119: 1,
    //       120: 1,
    //       121: 1,
    //       122: 1,
    //       123: 2,
    //       124: 2,
    //       125: 2,
    //       126: 2,
    //       127: 2,
    //       128: 2,
    //       129: "",
    //       130: "",
    //       131: "",
    //       132: "",
    //       133: "",
    //       134: "",
    //       135: "",
    //       136: "",
    //       137: "",
    //       138: "",
    //       139: "",
    //       140: "",
    //       141: "",
    //       142: "",
    //       143: "",
    //       144: "",
    //       145: "",
    //     }
    //   ],
    //   [
    //     {
    //       "instrument": 2,
    //       "user_id": 4,
    //       "student_id": 649,
    //       "date": "2022/11/29"
    //     },
    //     {
    //       73: 1,
    //       74: 1,
    //       75: 3,
    //       76: 1,
    //       77: 1,
    //       78: 1,
    //       79: 1,
    //       80: 1,
    //       81: 1,
    //       82: 1,
    //       83: 2,
    //       84: 2,
    //       85: 2,
    //       86: 2,
    //       87: 2,
    //       88: 2,
    //       89: 2,
    //       90: 3,
    //       91: 3,
    //       92: 3,
    //       93: 4,
    //       94: 4,
    //       95: 4,
    //       96: 5,
    //       97: 6,
    //       98: 6,
    //       99: 6,
    //       100: 5,
    //       101: 8,
    //       102: 6,
    //       103: 6,
    //       104: 6,
    //       105: 6,
    //       106: 5,
    //       107: 11,
    //       108: 10,
    //       109: 9,
    //       110: 9,
    //       111: 8,
    //       112: 1,
    //       113: 1,
    //       114: 1,
    //       115: 1,
    //       116: 1,
    //       117: 1,
    //       118: 1,
    //       119: 1,
    //       120: 1,
    //       121: 1,
    //       122: 1,
    //       123: 1,
    //       124: 2,
    //       125: 2,
    //       126: 2,
    //       127: 1,
    //       128: 2,
    //       129: 2,
    //       130: 2,
    //       131: 2,
    //       132: 2,
    //       133: 2,
    //       134: "",
    //       135: "",
    //       136: "",
    //       137: "",
    //       138: "",
    //       139: "",
    //       140: "",
    //       141: "",
    //       142: "",
    //       143: "",
    //       144: "",
    //       145: ""
    //     }
    //   ],
    //   [
    //     { 'instrument': 2, 'user_id': 4, 'student_id': 583, 'date': '2022/11/23' },{ 73: 1, 74: 1, 75: 1, 76: 1, 77: 1, 78: 2, 79: 1, 80: 2, 81: 1, 82: 3, 83: 3, 84: 3, 85: 3, 86: 3, 87: 3, 88: 3, 89: 3, 90: 3, 91: 3, 92: 3, 93: 4, 94: 4, 95: 4, 96: 6, 97: 5, 98: 5, 99: 8, 100: 7, 101: 8, 102: 10, 103: 7, 104: 7, 105: 16, 106: 8, 107: 8, 108: 16, 109: 14, 110: 16, 111: 23, 112: 1, 113: 1, 114: 1, 115: 1, 116: 1, 117: 1, 118: 1, 119: 1, 120: 1, 121: 1, 122: 1, 123: 2, 124: 1, 125: 2, 126: 1, 127: 1, 128: 2, 129: 1, 130: 3, 131: 2, 132: 2, 133: 3, 134: 2, 135: 2, 136: "", 137: "", 138: "", 139: "", 140: "", 141: "", 142: "", 143: "", 144: "", 145: "" }],
    //   [{ 'instrument': 2, 'user_id': 4, 'student_id': 118, 'date': '2022/11/23' },
    //   { 73: 3, 74: 2, 75: 2, 76: 2, 77: 2, 78: 2, 79: 2, 80: 2, 81: 2, 82: 2, 83: 2, 84: 2, 85: 2, 86: 2, 87: 2, 88: 2, 89: 2, 90: 3, 91: 3, 92: 3, 93: 9, 94: 1, 95: 1, 96: 3, 97: 2, 98: 3, 99: 2, 100: 2, 101: 2, 102: 2, 103: 4, 104: 2, 105: 2, 106: 4, 107: 4, 108: 4, 109: 2, 110: 4, 111: 0, 112: 1, 113: 2, 114: 2, 115: 2, 116: 2, 117: 2, 118: 2, 119: "", 120: "", 121: "", 122: "", 123: "", 124: "", 125: "", 126: "", 127: "", 128: "", 129: "", 130: "", 131: "", 132: "", 133: "", 134: "", 135: "", 136: "", 137: "", 138: "", 139: "", 140: "", 141: "", 142: "", 143: "", 144: "", 145: "" }],
    //   [{ 'instrument': 1, 'user_id': 4, 'student_id': 637, 'date': "2022/11/23" },
    //   {
    //     1: "", 2: 1, 3: 1, 4: 1, 5: 2, 6: 1, 7: 1, 8: 1, 9: 2, 10: 2, 11: 1, 12: 2,
    //     13: 2, 14: 2, 15: 1, 16: 3, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2, 23: 1,
    //     24: 2, 25: 2, 26: 2, 27: 1, 28: 1, 29: 1, 30: 3, 31: 2, 32: 2, 33: 2, 34: 2,
    //     35: 3, 36: 3, 37: 3, 38: 3, 39: 3, 40: 2, 41: 2, 42: 2, 43: 1, 44: 1, 45: 1,
    //     46: 1, 47: 1, 48: 2, 49: 2, 50: 3, 51: 2, 52: 3, 53: 2, 54: 2, 55: 2, 56: 2,
    //     57: 2, 58: 2, 59: 2, 60: 2, 61: 2, 62: 2, 63: 2, 64: 2, 65: 2, 66: 2, 67: 1,
    //     68: 2, 69: 1, 70: 2, 71: 2, 72: 1
    //   }],
    //   [{ "instrument": 1, "user_id": 4, "student_id": 645, "date": "2022/11/23"}, { 1: 2, 2: 1, 3: 1, 4: 1, 5: 2, 6: 1, 7: 1, 8: 1, 9: 2, 10: 1, 11: 1, 12: 2, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 2, 22: 2, 23: 1, 24: 2, 25: 2, 26: 2, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1, 33: 1, 34: 2, 35: 2, 36: 3, 37: 2, 38: 2, 39: 2, 40: 2, 41: 2, 42: 3, 43: 1, 44: 1, 45: 1, 46: 1, 47: 1, 48: 2, 49: 2, 50: 2, 51: 2, 52: 2, 53: 2, 54: 2, 55: 2, 56: 2, 57: 2, 58: 2, 59: 1, 60: 2, 61: 1, 62: 1, 63: 1, 64: 1, 65: 1, 66: 1, 67: 2, 68: 1, 69: 1, 70: 2, 71: 2, 72: 2 }],
    //   [{ 'instrument': 1, 'user_id': 4, 'student_id': 652, 'date': '2022/11/29' },
    //   { '1': 3, '2': 1, '3': 3, '4': 1, '5': 2, '6': 2, '7': 1, '8': 1, '9': 1, '10': 3, '11': 1, '12': 2, '13': 2, '14': 1, '15': 1, '16': 2, '17': 2, '18': 1, '19': 2, '20': 2, '21': 2, '22': 2, '23': 2, '24': 2, '25': 4, '26': 2, '27': 1, '28': 1, '29': 1, '30': 2, '31': 1, '32': 3, '33': 3, '34': 3, '35': 3, '36': 3, '37': 3, '38': 3, '39': 2, '40': 3, '41': 3, '42': 3, '43': 1, '44': 1, '45': 1, '46': 1, '47': 1, '48': 2, '49': 3, '50': 3, '51': 3, '52': 3, '53': 3, '54': 3, '55': 3, '56': 3, '57': 3, '58': '', '59': 1, '60': 3, '61': 2, '62': 2, '63': 2, '64': 2, '65': 3, '66': 2, '67': 1, '68': 2, '69': 1, '70': 2, '71': 2, '72': 1 }],
    //   [{ 'instrument': 1, 'user_id': 4, 'student_id': 583, 'date': '2022/11/23' },
    //   { "1": 1, 2: 1, 3: 1, 4: 1, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 1, 14: 1, 15: 1, 16: 1, 17: 3, 18: 1, 19: 2, 20: 2, 21: 2, 22: 2, 23: 1, 24: 2, 25: 2, 26: 2, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 2, 33: 2, 34: 3, 35: 2, 36: 2, 37: 2, 38: 2, 39: 2, 40: 2, 41: 2, 42: 2, 43: 1, 44: 1, 45: 2, 46: 1, 47: 1, 48: 1, 49: 2, 50: 2, 51: 2, 52: 2, 53: 2, 54: 2, 55: 2, 56: 2, 57: 2, 58: 2, 59: 1, 60: 2, 61: 2, 62: 1, 63: 1, 64: 1, 65: 1, 66: 1, 67: 1, 68: 1, 69: 1, 70: 2, 71: 3, 72: 3 }],
    //   [{ instrument: 1, user_id: 4, student_id: 118, date: "2022/11/23" },
    //   { "1": "3", "2": "2", "3": "2", "4": "2", "5": "2", "6": "", "7": "", "8": "", "9": "", "10": "", "11": "", "12": "", "13": "", "14": "", "15": "", "16": "", "17": "", "18": "", "19": "", "20": "", "21": "", "22": "", "23": "", "24": "", "25": "", "26": "", "27": "", "28": "", "29": "", "30": "", "31": "", "32": "", "33": "", "34": "", "35": "", "36": "", "37": "", "38": "", "39": "", "40": "", "41": "", "42": "", "43": "", "44": "", "45": "", "46": "", "47": "", "48": "", "49": "", "50": "", "51": "", "52": "", "53": "", "54": "", "55": "", "56": "", "57": "", "58": "", "59": "", "60": "", "61": "", "62": "", "63": "", "64": "", "65": "", "66": "", "67": "", "68": "", "69": "", "70": "", "71": "", "72": "" }],
    //   [{ "instrument": 5, "user_id": 4, "student_id": 633, "date": "2022/11/29" }, { "218": "2", "219": "1", "220": "3", "221": "1", "222": "3", "223": "3", "224": "3", "225": "2", "226": "2", "227": "1", "228": "2", "229": "2" }],
    //   [{ "instrument": 5, "user_id": 4, "student_id": 645, "date": "2022/11/23" }, { "218": "2", "219": "4", "220": "3", "221": "2", "222": "3", "223": "4", "224": "3", "225": "4", "226": "3", "227": "2", "228": "3", "229": "2" }],
    //   [{ "instrument": 5, user_id: 4, student_id: 583, date: "2022/11/23" }, { "218": "2", 219: "4", 220: "2", 221: "3", 222: "3", 223: "4", 224: "2", 225: "1", 226: "3", 227: "4", 228: "4", 229: "4" }],
    //   [{ "instrument": "4", "user_id": "44", "student_id": "446", "date": "2022/11/9" }, { "180": "1", "181": "2", "182": "3", "183": "3", "184": "4", "185": "2", "186": "3", "187": "2", "188": "3", "189": "2", "190": "1", "191": "1", "192": "3", "193": "3", "194": "3", "195": "3", "196": "2", "197": "1", "198": "1", "199": "4", "200": "3", "201": "1", "202": "3", "203": "4", "204": "2", "205": "3" }],
    //   [{ instrument: 5, user_id: 44, student_id: 451, date: "2022/11/8" }, { 218: "3", 219: "3", 220: "2", 221: "2", 222: "2", 223: "2", 224: "3", 225: "1", 226: "2", 227: "2", 228: "4", 229: "1" }],
    //   [{ "instrument": 1, "user_id": 44, "student_id": 411, "date": "2022/11/14" }, { "1": 3,
    //     "2": 1,
    //     "3": 2,
    //     "4": 1,
    //     "5": 2,
    //     "6": 1,
    //     "7": 1,
    //     "8": 2,
    //     "9": 2,
    //     "10": 3,
    //     "11": 1,
    //     "12": 3,
    //     "13": 2,
    //     "14": 2,
    //     "15": 1,
    //     "16": 3,
    //     "17": 2,
    //     "18": 1,
    //     "19": 1,
    //     "20": 2,
    //     "21": 2,
    //     "22": 3,
    //     "23": 1,
    //     "24": 2,
    //     "25": 2,
    //     "26": 2,
    //     "27": 3,
    //     "28": 2,
    //     "29": 2,
    //     "30": 2,
    //     "31": 3,
    //     "32": 3,
    //     "33": 3,
    //     "34": 2,
    //     "35": 2,
    //     "36": 2,
    //     "37": 2,
    //     "38": 2,
    //     "39": 2,
    //     "40": 2,
    //     "41": 2,
    //     "42": 2,
    //     "43": 1,
    //     "44": 1,
    //     "45": 2,
    //     "46": 2,
    //     "47": 2,
    //     "48": 2,
    //     "49": 3,
    //     "50": 3,
    //     "51": 3,
    //     "52": 3,
    //     "53": 3,
    //     "54": 3,
    //     "55": 3,
    //     "56": 3,
    //     "57": 3,
    //     "58": 3,
    //     "59": 2,
    //     "60": 3,
    //     "61": 1,
    //     "62": 1,
    //     "63": 1,
    //     "64": 1,
    //     "65": 3,
    //     "66": 3,
    //     "67": 3,
    //     "68": 1,
    //     "69": 1,
    //     "70": 2,
    //     "71": 3,
    //     "72": 3
    //   }
    //   ],
    //   [
    //     {
    //     "instrument": 4,
    //     "user_id": 6,
    //     "student_id": 84,
    //     "date": "2022/11/3"
    //     },
    //     {
    //     "180": 1,
    //     "181": 3,
    //     "182": 1,
    //     "183": 3,
    //     "184": 4,
    //     "185": 1,
    //     "186": 3,
    //     "187": 2,
    //     "188": 3,
    //     "189": 4,
    //     "190": 1,
    //     "191": 1,
    //     "192": 1,
    //     "193": 3,
    //     "194": 2,
    //     "195": 1,
    //     "196": 1,
    //     "197": 1,
    //     "198": 1,
    //     "199": 4,
    //     "200": 1,
    //     "201": 1,
    //     "202": 4,
    //     "203": 1,
    //     "204": 2,
    //     "205": 1
    //     }
    //     ],
    //     [{ "instrument": 1, "user_id":25 , "student_id": 181, "date": "2022/11/23"}, { 1: 2, 2: 1, 3: 1, 4: 1, 5: 2, 6: 1, 7: 1, 8: 1, 9: 2, 10: 1, 11: 1, 12: 2, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 2, 22: 2, 23: 1, 24: 2, 25: 2, 26: 2, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1, 33: 1, 34: 2, 35: 2, 36: 3, 37: 2, 38: 2, 39: 2, 40: 2, 41: 2, 42: 3, 43: 1, 44: 1, 45: 1, 46: 1, 47: 1, 48: 2, 49: 2, 50: 2, 51: 2, 52: 2, 53: 2, 54: 2, 55: 2, 56: 2, 57: 2, 58: 2, 59: 1, 60: 2, 61: 1, 62: 1, 63: 1, 64: 1, 65: 1, 66: 1, 67: 2, 68: 1, 69: 1, 70: 2, 71: 2, 72: 2 }],
    //     [{ "instrument": 5, "user_id": 42, "student_id": 522, "date": "2022/11/29" }, { "218": "2", "219": "1", "220": "3", "221": "1", "222": "3", "223": "3", "224": "3", "225": "2", "226": "2", "227": "1", "228": "2", "229": "2" }],
    //     [{"instrument":5,"user_id":6,"student_id":92,"date":"2022/11/2"},{"218":"2","219":"1","220":"3","221":"1","222":"2","223":"1","224":"2","225":"4","226":"2","227":"1","228":"3","229":"1"}],
    //     [{"instrument":5,"user_id":44,"student_id":446,"date":"2022/11/2"},{"218":"2","219":"2","220":"2","221":"2","222":"2","223":"4","224":"3","225":"3","226":"4","227":"4","228":"2","229":"2"}],
    //     [{ "instrument": 1, "user_id":44 , "student_id": 433, "date": "2022/11/23"}, { 1: 2, 2: 1, 3: 1, 4: 1, 5: 2, 6: 1, 7: 1, 8: 1, 9: 2, 10: 1, 11: 1, 12: 2, 13: 1, 14: 1, 15: 1, 16: 2, 17: 1, 18: 1, 19: 1, 20: 1, 21: 2, 22: 2, 23: 1, 24: 2, 25: 2, 26: 2, 27: 1, 28: 1, 29: 1, 30: 1, 31: 1, 32: 1, 33: 1, 34: 2, 35: 2, 36: 3, 37: 2, 38: 2, 39: 2, 40: 1, 41: 2, 42: 3, 43: 1, 44: 1, 45: 1, 46: 1, 47: 1, 48: 2, 49: 2, 50: 2, 51: 2, 52: 2, 53: 2, 54: 2, 55: 2, 56: 2, 57: 2, 58: 2, 59: 1, 60: 2, 61: 1, 62: 1, 63: 1, 64: 1, 65: 1, 66: 1, 67: 2, 68: 1, 69: 1, 70: 2, 71: 2, 72: 2 }]













    // ])

    get('completedTests')
      .then(res => {
        let tejas = 0;
        let calculo = 0;
        let sdq = 0;
        let wally = 0;
        let aces = 0;
        let corsi = 0;
        let hnf = 0;
        let fono = 0;

        res.forEach(element => {
          if (element[0]['instrument'] === 1) {
            tejas++
            setSavedTests(true)
          }
          if (element[0]['instrument'] === 2) {
            calculo++
            setSavedTests(true)
          }
          if (element[0]['instrument'] === 3) {
            sdq++
            setSavedTests(true)
          }
          if (element[0]['instrument'] === 4) {
            aces++
            setSavedTests(true)
          }
          if (element[0]['instrument'] === 5) {
            wally++
            setSavedTests(true)
          } if (element[0]['instrument'] === 6) {
            corsi++
            setSavedTests(true)
          } 
          if (element[0]['instrument'] === 7) {
            hnf++
          }
          if (element[0]['instrument'] === 8) {
            fono++
          }
        })

        setSavedHnfTests(hnf)
        setSavedFonoTests(fono)
        setSavedTejasTests(tejas)
        setSavedCalculoTests(calculo)
        setSavedWallyTests(wally)
        setSavedAcesTests(aces)
        setSavedSdqTests(sdq)
        setSavedCorsiTests(corsi)

      })

    setTimeout(() => {
      get('tejasLength')
        .then(res => {
          setTejasLength(res)

        })

      get('calculoLength')
        .then(res => {
          setCalculoLength(res)
        })


      get('sdqLength')
        .then(res => {
          setSdqLength(res)
        })

      get('acesLength')
        .then(res => {
          setAcesLength(res)
        })

      get('wallyLength')
        .then(res => {
          setWallyLength(res)
        })


      get('corsiLength')
        .then(res => {
          setCorsiLength(res)
        })

        get('hnfLength')
        .then(res => {
          setHnfLength(res)
        })


        get('fonoLength')
        .then(res => {
          setFonoLength(res)
        })





    }, 1000)











  }, [])





  savedTejasTests === undefined ? console.log("Ta indefinido", savedTejasTests) : console.log("Ta definido", savedTejasTests, savedTejasTests.length)

  function sendNewInstrument() {

    get('completedTests')
      .then(
        res => {
          if (res !== undefined) {
            Swal.fire({
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
              cancelButtonColor: '#cc4846',
              confirmButtonColor: "#1674d8",
              confirmButtonText: '¿Deseas enviar los test?',
              showLoaderOnConfirm: true,
              preConfirm: async () => {
                return fetch( /*'http://localhost:3500/newevaluation'||*/  'https://selb.bond/newevaluation', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(res)
                })
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(response.statusText)
                    }
                    return response.json()
                  })
                  .catch(error => {
                    Swal.showValidationMessage(
                      `Ha ocurrido un error en el envío de datos desde el dispositivo`
                    )
                  })
              },
              allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  showCancelButton: true,
                  cancelButtonText: 'Finalizar',
                  cancelButtonColor: '#E6BB34',
                  confirmButtonColor: "#70C851",
                  confirmButtonText: 'Finalizar y eliminar test por enviar',
                  title: `${result.value.statusText}`,
                  html: `<b>Total enviados</b>: ${result.value.instrumentsLength}
                                   <br>
                                   <b>Ingresados</b>: ${result.value.createdCounter}
                                   <br>
                                   <b>Actualizados</b>: ${result.value.updatedCounter}
                                   <br></br>
                                   ${result.value.htmlText}`
                }).then(result => {
                  if (result.isConfirmed) {
                    update('completedTests', val => [])
                    setTimeout(() => {
                      window.location.pathname = '/'
                    }, 3000)
                  } else {
                    setTimeout(() => {
                      window.location.pathname = '/'
                    }, 3000)
                  }
                })

              }
            })


          }
        }


      )
    /*         .then(
                _ => {
                    update('completedTests', val => [])
                    setTimeout(() => {
    
                        window.location.pathname = '/'
                    }, 1000)
                }
            ) */



  }


  return (
    <Fragment>

      <div className="home-wrapper">
        <h1>¡Hola {username}!</h1>


        <div className="table-wrapper">
          <div className="sendEvaluationTable">
            <h4>Evaluaciones por enviar</h4>
            <p>(Evaluaciones guardadas en la tablet)</p>

            <table className="table table-home">

              <thead className="thead-dark">
                <tr>
                  <th scope="col">Instrumento</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Tejas Lee</th>
                  <td>{savedTejasTests && savedTejasTests >= 0 ? savedTejasTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">Cálculo</th>
                  <td>{savedCalculoTests && savedCalculoTests >= 0 ? savedCalculoTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">SDQ</th>
                  <td>{savedSdqTests && savedSdqTests >= 0 ? savedSdqTests : 0}</td>
                </tr>

                <tr>
                  <th scope="row">Aces</th>
                  <td>{savedAcesTests && savedAcesTests >= 0 ? savedAcesTests : 0}</td>
                </tr>

                <tr>
                  <th scope="row">Wally</th>
                  <td>{savedWallyTests && savedWallyTests >= 0 ? savedWallyTests : 0}</td>
                </tr>

                <tr>
                  <th scope="row">Corsi</th>
                  <td>{savedCorsiTests && savedCorsiTests >= 0 ? savedCorsiTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">HNF</th>
                  <td>{savedHnfTests && savedHnfTests >= 0 ? savedHnfTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">Fonológico</th>
                  <td>{savedFonoTests && savedFonoTests >= 0 ? savedFonoTests : 0}</td>
                </tr>
              </tbody>
            </table>

            {navigator.onLine ? <Fragment>
              {savedTests === true ? <button onClick={sendNewInstrument} className="button btn btn-primary">Enviar</button> : <button className="button btn btn-secondary" disabled>Enviar</button>}
            </Fragment> : <button className="button btn btn-secondary" disabled>Enviar</button>}

              {/* Esta funcion me elimina los test guardados entre X fechas */}
            {/* <button className="btn btn-info" onClick={eliminarTestAntiguos}>Eliminar test antiguos</button> */}



          </div>

          <div className="instrumentInfoTable">
            <h4>Evaluaciones por Instrumento</h4>
            <p>(Evaluaciones ingresadas en la base de datos a tu nombre)</p>
            <table className="table table-home">

              <thead className="thead-dark">
                <tr>
                  <th scope="col">Instrumento</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Tejas Lee</th>
                  <td>{tejasLength && tejasLength >= 0 ? tejasLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">Cálculo</th>
                  <td>{calculoLength && calculoLength >= 0 ? calculoLength : 0}</td>

                </tr>
                <tr>
                  <th scope="row">SDQ</th>
                  <td>{sdqLength && sdqLength >= 0 ? sdqLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">Aces</th>
                  <td>{acesLength && acesLength >= 0 ? acesLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">Wally</th>
                  <td>{wallyLength && wallyLength >= 0 ? wallyLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">Corsi</th>
                  <td>{corsiLength && corsiLength >= 0 ? corsiLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">HNF</th>
                  <td>{hnfLength && hnfLength >= 0 ? hnfLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">Fonológico</th>
                  <td>{fonoLength && fonoLength >= 0 ? fonoLength : 0}</td>

                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* <a href="/corsi">Test Corsi</a> */}

      </div>





    </Fragment>

  )
}

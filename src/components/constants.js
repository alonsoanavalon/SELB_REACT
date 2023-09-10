export const STICKS_ORDER = {
    FIRST_STICK: 0,
    SECOND_STICK: 1,
    THIRD_STICK: 2
}

export const STICKS_INFO = {
    2: {
        id: 0,
        droppables: [
            { id: '2', items: ['R'] },
            { id: '1', items: ['AZ'] },
            { id: '0', items: ['AM'] }
        ],
        instructions: [
            {
                num: 0,
                description: "Indicar la primera pelota y decir: ¿De qué color es esta pelota?. Luego mostrar las siguientes y decir: y esta?, y esta?"
            },
            {
                num: 1,
                description: "Las pelotas se pueden mover de una vara a otra, así. Levantar una pelota y cambiarla de vara. Luego devolverla"
            },
            {
                num: 2,
                description: "Te voy a decir las reglas del juego: En la primera vara cabe una pelota, en la segunda dos y en la tercera tres"
            },
            {
                num: 3,
                description: "Las pelotas solo pueden ser movidas una a la vez, así (mover una pelota de una vara a otra)"
            },
            {
                num: 4,
                description: "Las pelotas tienen siempre colocarse en las varas, no dejarlas afuera"
            }
        ]
    },
    3: {
        id: 1,
        droppables: [
            { id: '2', items: ['R', 'AM'] },
            { id: '1', items: ['AZ'] },
            { id: '0', items: [] }
        ],
        instructions: [
            {
                num: 0,
                description: "En este caso tienes que mover solo 1 pelota"
            }
        ],
        alert: `
        <p>Tienes que copiar el orden en que están las pelotas en la imagen
        Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
        <img style="width:48%"src="/images/flowers-2.png">
      `

    },
    4: {
        id: 2,
        droppables: [
            { id: '2', items: ['R', 'AM'] },
            { id: '1', items: ['AZ'] },
            { id: '0', items: [] }
        ],
        instructions: [
            {
                num: 0,
                description: "En este caso tienes que mover solo 2 pelotas"
            }
        ],
        alert: `
            <p>Tienes que copiar el orden en que están las pelotas en la imagen
            Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
            <img style="width:48%"src="/images/flowers-1.png">
          `
    },
    5: {
        id: 3,
        droppables: [
            { id: '2', items: ['R', 'AM'] },
            { id: '1', items: ['AZ'] },
            { id: '0', items: [] }
        ],
        instructions: [
            {
                num: 0,
                description: "En este caso tienes que mover solo 2 pelotas"
            }
        ],
    }
}

export const TIME_LIMIT_IN_SECONDS = 120;

export const CORRECT_ANSWERS = {
    2: {
        2: [],
        1: ['AM', 'AZ'],
        0: ['R']
    },
    3: {
        2: ['AM'],
        1: ['R'],
        0: ['AZ']
    },
    4: {
        2: ['AZ', 'AM'],
        1: ['R'],
        0: []
    },
    5: {
        2: ['AM'],
        1: ['AZ', 'R'],
        0: []
    },
    6: {
        2: ['AM', 'R'],
        1: ['AZ'],
        0: []
    },
    7: {
        2: ['AZ'],
        1: ['AM', 'R'],
        0: []
    },
    8: {
        2: ['AZ', 'R'],
        1: [],
        0: ['AM']
    },
    9: {
        2: [],
        1: ['AZ', 'R'],
        0: ['AM']
    },
    10: {
        2: ['AZ', 'AM', 'R'],
        1: [],
        0: []
    },
    11: {
        2: ['AM', 'AZ', 'R'],
        1: [],
        0: []
    },
    12: {
        2: ['AM', 'AZ'],
        1: ['R'],
        0: []
    },
    13: {
        2: ['AZ'],
        1: ['R'],
        0: ['AM']
    },
}


export const ROLES = {
    ADMIN:"Admin",
    EVALUATOR:"Evaluator",
    TEACHER:"Teacher",
    PARENT:"Parent"
  }

export const STICKS_ORDER = {
    FIRST_STICK: 0,
    SECOND_STICK: 1,
    THIRD_STICK: 2
}

export const STICKS_INFO = {
    0: {
        id: 0,
        droppables: [
            { id: '0', items: ['R'] },
            { id: '1', items: ['AZ'] },
            { id: '2', items: ['AM'] }
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
    1: {
        id: 1,
        droppables: [
            { id: '0', items: ['R', 'AM'] },
            { id: '1', items: ['AZ'] },
            { id: '2', items: [] }
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
    2: {
        id: 2,
        droppables: [
            { id: '0', items: ['R', 'AM'] },
            { id: '1', items: ['AZ'] },
            { id: '2', items: [] }
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
    3: {
        id: 3,
        droppables: [
            { id: '0', items: ['R', 'AM'] },
            { id: '1', items: ['AZ'] },
            { id: '2', items: [] }
        ],
        instructions: [
            {
                num: 0,
                description: "En este caso tienes que mover solo 2 pelotas"
            }
        ],
    }
}
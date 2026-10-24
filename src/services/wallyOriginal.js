// INSTR-002 — Wally Niños (28) y Wally Niñas (29).
// Textos de asentimiento e instrucción tomados de la aplicación antigua
// (WallyOriginalActivity.java y seed_instrument.rb de selb-antiguo).

const ASSENT_TEXT = 'Hola, mi nombre es _____________ (ayudante de investigación), vendremos varias veces '
  + 'a tu escuela y queremos que participes en un juego que está en una Tablet y que respondas. '
  + 'Si no quieres seguir, me dices y paramos. No hay ningún problema, nadie se enojará '
  + 'contigo. ¿Quieres participar?';

const buildInstruction = (adjective) => `Aquí hay una prueba de detectives para ver qué tan ${adjective} eres como detective `
  + 'para resolver problemas. Aquí tienes tu sombrero de detective, si quieres usarlo '
  + '(usted deberá hacer la acción de entregarle un sombrero imaginario). '
  + 'Te mostraré algunas imágenes de escenas donde aparecen problemas. '
  + 'Ve si puedes resolverlos por tu cuenta. ¡Buena suerte!';

export const WALLY_ORIGINAL_VARIANTS = Object.freeze({
  ninos: Object.freeze({
    instrumentId: 28,
    name: 'Wally Niños',
    folder: 'ninos',
    assent: ASSENT_TEXT,
    instruction: buildInstruction('bueno'),
  }),
  ninas: Object.freeze({
    instrumentId: 29,
    name: 'Wally Niñas',
    folder: 'ninas',
    assent: ASSENT_TEXT,
    instruction: buildInstruction('buena'),
  }),
});

const MAX_ANSWER_LENGTH = 600; // choice.text varchar(600)

// La base usa utf8mb3: se eliminan caracteres fuera del plano básico (emojis).
export function sanitizeAnswerText(value) {
  const characters = Array.from(String(value ?? ''));
  const kept = characters.filter((character) => character.codePointAt(0) <= 0xffff);
  return {
    text: kept.join('').slice(0, MAX_ANSWER_LENGTH),
    removed: kept.length !== characters.length,
  };
}

export function toSeconds(milliseconds) {
  return Math.round(Number(milliseconds) / 1000);
}

// Recolector para Instruction: { [itemId]: { text, time } } desde los formularios
// `.instrument-form` de la página (campos key, answer y time).
export function collectOpenAnswers(forms) {
  const answers = {};
  forms.forEach((form) => {
    const keyInput = form.elements.key;
    if (!keyInput) return;
    const answer = form.elements.answer;
    const time = form.elements.time;
    const seconds = time && time.value !== '' ? Number(time.value) : null;
    answers[keyInput.value] = {
      text: answer ? answer.value : '',
      time: Number.isFinite(seconds) ? seconds : null,
    };
  });
  return answers;
}

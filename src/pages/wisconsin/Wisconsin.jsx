import { useState } from "react";
import WisconsinInstructions from "../../components/wisconsin/WisconsinInstructions";
import WisconsinCards from "../../components/wisconsin/WisconsinCards";

function Wisconsin() {
  const [section, setSection] = useState(1);

  return (
    <div
      style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem 1rem" }}
    >
      {section === 1 && (
        <WisconsinInstructions
          instructions={[
            "Vamos a completar dos tareas de correspondencias. Para ambas tareas, hay que unir dos cartas según su color o forma de la imagen.",
            "Para unir las cartas, se utilizan las teclas 'A', y la tecla 'L'. Si aprietas la tecla 'A' la carta irá a la izquierda, y si aprietas la 'L' irá a la derecha.",
            "Puedes tener sus dedos encima de las teclas para poder responder lo más rápido posible. Se requiere menos de 5 minutos para completar ambas tareas.",
          ]}
          specialMessage="Cuándo el participante esté listo, toca la 'N' para continuar."
          section={section}
          setSection={setSection}
        />
      )}

      {section === 2 && (
        <WisconsinCards
          cardOneSrc="/images/wisconsin_face.png"
          cardTwoSrc="/images/wisconsin_face.png"
          cardThreeSrc="/images/wisconsin_face.png"
          top={-295}
          left={-252}
          right={-248}
          message="Ahora vamos a practicar con las teclas que vamos a usar. ¿Puedes tocar la tecla A?"
          errorMessage="Lo siento, esa no fue la correcta. Recuerda, solo tienes que tocar la tecla indicada. Intentamos denuevo."
          successMessage="Muy bien, tocaste la A."
          correctAnswer="a"
          tutorial={true}
          section={section}
          setSection={setSection}
        />
      )}

      {section === 3 && (
        <WisconsinCards
          cardOneSrc="/images/wisconsin_face.png"
          cardTwoSrc="/images/wisconsin_face.png"
          cardThreeSrc="/images/wisconsin_face.png"
          top={-295}
          left={-252}
          right={-252}
          message="¿Puedes tocar la tecla L?"
          errorMessage="Lo siento, esa no fue la correcta. Recuerda, solo tienes que tocar la tecla indicada. Intentamos de nuevo."
          successMessage="Muy bien, tocaste la L."
          correctAnswer="l"
          tutorial={true}
          section={section}
          setSection={setSection}
        />
      )}

      {section === 4 && (
        <WisconsinCards
          cardOneSrc="/images/wisconsin_tren_rojo.png"
          cardTwoSrc="/images/wisconsin_estrella_azul.png"
          cardThreeSrc="/images/wisconsin_tren_azul.png"
          top={-287.2}
          left={-253}
          right={-248}
          message=""
          errorMessage={null}
          successMessage={null}
          correctAnswer="a"
          tutorial={true}
          section={section}
          setSection={setSection}
        />
      )}

      {section === 5 && (
        <WisconsinCards
          cardOneSrc="/images/wisconsin_tren_rojo.png"
          cardTwoSrc="/images/wisconsin_estrella_azul.png"
          cardThreeSrc="/images/wisconsin_estrella_roja.png"
          top={-287.2}
          left={-252.48}
          right={-248}
          message=""
          errorMessage={null}
          successMessage={null}
          correctAnswer="l"
          tutorial={true}
          section={section}
          setSection={setSection}
        />
      )}
    </div>
  );
}

export default Wisconsin;

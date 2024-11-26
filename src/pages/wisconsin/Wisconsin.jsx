import { useState } from "react";
import WisconsinInstructions from "../../components/wisconsin/WisconsinInstructions";
import WisconsinCards from "../../components/wisconsin/WisconsinCards";
import { wisconsinSections } from "./wisconsin";

function Wisconsin() {
  const [section, setSection] = useState(1);

  return (
    <div
      style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem 1rem" }}
    >
      {wisconsinSections.map(
        (wisconsinSection, index) =>
          index + 1 === section &&
          (wisconsinSection.type === "instruction" ? (
            <WisconsinInstructions
              instructions={wisconsinSection.instructions}
              specialMessage={wisconsinSection.specialMessage}
              section={section}
              setSection={setSection}
            />
          ) : wisconsinSection.type === "cards" ? (
            <WisconsinCards
              cardOneSrc={wisconsinSection.cardOneSrc}
              cardTwoSrc={wisconsinSection.cardTwoSrc}
              cardThreeSrc={wisconsinSection.cardThreeSrc}
              top={wisconsinSection.top}
              left={wisconsinSection.left}
              right={wisconsinSection.right}
              messages={wisconsinSection.messages}
              errorMessages={wisconsinSection.errorMessages}
              successMessages={wisconsinSection.successMessages}
              correctAnswer={wisconsinSection.correctAnswer}
              tutorial={wisconsinSection.tutorial}
              section={section}
              setSection={setSection}
            />
          ) : (
            <div></div>
          ))
      )}
    </div>
  );
}

export default Wisconsin;

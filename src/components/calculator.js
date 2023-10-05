import Wrapper from "./calculatorComponents/Wrapper";
import Screen from "./calculatorComponents/Screen";
import ButtonBox from './calculatorComponents/ButtonBox'
import Button from './calculatorComponents/Button'
import CalcProvider from "./context/CalcContext";
import './calculatorComponents/calculator.css';
import CalculatorBody from "./calculatorComponents/CalculatorBody";


const Calculator = () => {
    
    const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];
  return (
    <CalculatorBody>
    <CalcProvider>
      <Wrapper>
        <Screen />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => (
            <Button
              value={btn}
              key={i}
            />
          ))}
        </ButtonBox>
      </Wrapper>
    </CalcProvider>
    </CalculatorBody>
  );
}

export default Calculator;

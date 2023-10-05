import { useClickAway } from "react-use";
import { CalculatorModalBox } from "../../styles/modal/main";

export default function CalculatorModalForm(props) {
	useClickAway( () => props.close(), ['mouseup']);
	return <CalculatorModalBox bgGrid={props.bgGrid}>{props.children}</CalculatorModalBox>;
}

import React from "react";
import Modal from "../../components/modal/modal";
import ModalPartHeader from "../../components/modal/modalHeader";
import ModalPartBody from "../../components/modal/modalBody";
import ModalPartFooter from "../../components/modal/modalFooter";
import { ModalButton, ModalCardContainer, ModalContainer, ModalRow, ModalShortcut, ModalShortcutKey, ModalShortcutResult } from "../../styles/modal/main";

const Shortcuts = (props) => {

	return (
		<Modal close={props.close}>
			<ModalPartHeader>Keyboard shortcuts</ModalPartHeader>
			<ModalPartBody>
				<ModalContainer>
					<ModalCardContainer>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>F</ModalShortcutKey>
                                <ModalShortcutResult>Focus Search Input</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>g</ModalShortcutKey>
                                <ModalShortcutResult>Google Engine</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>b</ModalShortcutKey>
                                <ModalShortcutResult>Bing Engine</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>1</ModalShortcutKey>
                                <ModalShortcutResult>Yahoo! Engine</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>d</ModalShortcutKey>
                                <ModalShortcutResult>DuckDuckGo Engine</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>a</ModalShortcutKey>
                                <ModalShortcutResult>Amazon Engine</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>r</ModalShortcutKey>
                                <ModalShortcutResult>Reddit Engine</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>t</ModalShortcutKey>
                                <ModalShortcutResult>Twitch Engine</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>y</ModalShortcutKey>
                                <ModalShortcutResult>Youtube Engine</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>w</ModalShortcutKey>
                                <ModalShortcutResult>Wikipedia Engine</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>i</ModalShortcutKey>
                                <ModalShortcutResult>IMDB Engine</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>h</ModalShortcutKey>
                                <ModalShortcutResult>Github Engine</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
                        <ModalRow>
                            <ModalShortcut>
                                <ModalShortcutKey>shift</ModalShortcutKey>
                                <span>+</span>
                                <ModalShortcutKey>e</ModalShortcutKey>
                                <ModalShortcutResult>Ecosia Engine</ModalShortcutResult>
                            </ModalShortcut>
                        </ModalRow>
					</ModalCardContainer>
				</ModalContainer>
			</ModalPartBody>
			<ModalPartFooter>
				<ModalCardContainer footer>
					<ModalButton onClick={props.close} final>
						Got it!
					</ModalButton>
				</ModalCardContainer>
			</ModalPartFooter>
		</Modal>
	);
};
export default Shortcuts;

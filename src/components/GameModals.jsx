// GameModals.jsx
import React, { useContext } from "react";
import { GameContext } from "../context/game-context";
import ModalContainer from "./modals/ModalContainer";
import CountdownModal from "./modals/CountdownModal";
import MultiplierModal from "./modals/MultiplierModal";
import CrashModal from "./modals/CrashModal";

export default function GameModals() {
  const { status, multiplier, timer } = useContext(GameContext);

  return (
    <>
      <ModalContainer visible={status === "betting"}>
        <CountdownModal visible={status === "betting"} timer={timer} />
      </ModalContainer>

      <ModalContainer visible={status === "in_play"}>
        <MultiplierModal visible={status === "in_play"} multiplier={multiplier} />
      </ModalContainer>

      <ModalContainer visible={status === "crash"}>
        <CrashModal visible={status === "crash"} multiplier={multiplier} />
      </ModalContainer>
    </>
  );
}

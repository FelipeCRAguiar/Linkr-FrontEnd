import React, { useState } from "react";
import styled from "styled-components";
import { IoChevronDown } from "react-icons/io5";

import AuthContext from "../contexts/AuthContext";

export default function ArrowButton() {
    const { trigger, setTrigger } = React.useContext(AuthContext);

    const ToggleSwitch = () => {
        trigger ? setTrigger(false) : setTrigger(true);
    }

    return (
        <ButtonBox triggered={trigger} onClick={ToggleSwitch} >
            <IoChevronDown size="1.8em" />
        </ButtonBox>
    );
}

const ButtonBox = styled.div`
  transform: rotate(${props => props.triggered ? "180deg" : "360deg"});
`;

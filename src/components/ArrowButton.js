import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from 'react-icons/io';
import { IconContext } from "react-icons";

import AuthContext from "../contexts/AuthContext";

export default function ArrowButton() {
    const { trigger, setTrigger } = React.useContext(AuthContext);

    const ToggleSwitch = () => {
        trigger ? setTrigger(false) : setTrigger(true);
    }

    return (
        <ButtonBox triggered={trigger} onClick={ToggleSwitch} >
            <IconContext.Provider value={{ color: "white", size: "28px" }}>
                <IoIosArrowDown />
            </IconContext.Provider>
        </ButtonBox>
    );
}

const ButtonBox = styled.div`
  transform: rotate(${props => props.triggered ? "180deg" : "360deg"});
`;

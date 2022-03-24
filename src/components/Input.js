import styled from "styled-components"

const Input = styled.input`

    box-sizing: border-box;

    width: 100%;
    height: 65px;

    background: #FFFFFF;
    border-radius: 6px;
    border: none;

    font-family: 'Oswald';
    font-weight: 700;
    font-size: 27px;
    color: #9F9F9F;

    padding: 0 20px;

    @media (max-width: 375px) {
        height: 55px;
        font-size: 22px;
    }
`

export default Input
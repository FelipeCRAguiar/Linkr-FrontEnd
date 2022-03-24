import styled from "styled-components"

const Button = styled.button`

    width: 100%;
    height: 65px;

    background-color: #1877F2;
    border-radius: 6px;
    border: none;
    
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;

    @media (max-width: 375px) {
        height: 55px;
        font-size: 22px;
    }
`

export default Button
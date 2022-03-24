import styled from "styled-components"

const LinkrMotto = styled.div`

    box-sizing: border-box;

    width: 71%;
    height: 100%;

    left: 0px;
    top: 0px;
    background-color: #151515;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    padding: 0 150px;

    @media (max-width: 375px) {
        padding: 0px;
        width: 100%;
        align-items: center;
        height: 30%;
    }
`

export default LinkrMotto
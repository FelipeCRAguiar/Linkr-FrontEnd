import styled from "styled-components"

const Form = styled.form`

    width: 80%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 13px;

    @media (max-width: 375px) {
        width: 90%;
    }
`

export default Form
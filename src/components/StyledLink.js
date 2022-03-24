import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
    font-family: 'Lato';
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #FFFFFF;
    margin-top: 23px;

    @media (max-width: 375px) {
        font-size: 17px;
        line-height: 20px;
    }
`

export default StyledLink
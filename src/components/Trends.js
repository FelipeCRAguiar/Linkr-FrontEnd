import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import ReactHashtag from "@mdnm/react-hashtag";
import { useNavigate } from "react-router";

export default function Trends(){
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(false);
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();
    const config = {headers: {"Authorization": `Bearer ${token}`}};

    useEffect(() => {
        
        const promise = axios.get('https://back-project-linkr.herokuapp.com/hashtags', config);

        promise.then(response => {
            setTags(response.data.rows);
        })
        promise.catch(
            console.log(error)
            );
    }, []);

    function handleClickHashtag(){
        navigate("/hashtag/:hashtag");
    }

    return (
        <Container>
            <h1>trending</h1>
            <Tags>
                {(tags && tags.map((tag) => (
                    <p>
                        <ReactHashtag
                            renderHashtag={(hashtagValue) => (
                                <StyledHashtag onClick={handleClickHashtag}>
                                    {hashtagValue}
                                </StyledHashtag>)}>
                            {tag.name}
                        </ReactHashtag>
                    </p>
                )
                    ))}
            </Tags>
        </Container>
    )
}

const Container = styled.div`

    width: 301px;
    height: 406px;
    border-radius: 16px;

    background-color: #171717;

    margin-top: 180px;


    font: Oswald;

    h1 {
        font-size: 27px;
        color: #ffffff;
        padding: 10px;
    }
`

const Tags = styled.div `
    width: 100%;
  

    background-color: #171717;

    display: flex;
    flex-direction: column;

    color: #ffffff;
    font-weight: 700;
    font-size: 19px;
    font: Lato;

    border-top: 1px solid #484848;

    p {
        padding: 10px;
    }

`
const StyledHashtag = styled.span`
  font-weight: 700;
  color: #ffffff;
`;
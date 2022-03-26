import styled from "styled-components";
import { HeartOutline } from 'react-ionicons';
import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import { Oval } from "react-loader-spinner";


export default function Posts() {

    const {token} = useContext(AuthContext);
    const [posts, setPosts] = useState(null);

    const config = {headers: {"Authorization": `Bearer ${token}`}};

    useEffect(() => {
        
        const promise = axios.get('http://localhost:4000/posts', config);

        promise.then(response => {
            console.log(response.data)
            setPosts(response.data);
        })
        promise.catch(console.log('erro'));
    }, []);

    while(posts === null) {
        return (
            <Loading>
            <Oval ariaLabel="loading-indicator" height={50} width={50} strokeWidth={0} strokeWidthSecondary={5} color="#1877f2" secondaryColor="white"/>
            </Loading>
        )
    }

    return (

        posts.map(post => (
            <Container key={post.id}>
            <ProfilePicContainer>
                <img alt="pelé" src={post.image}/>
                <HeartOutline color={'#FFFFFF'} height="20px" width="20px"/>
                <p>20 likes</p>
            </ProfilePicContainer>
            <Content>
                <h1>{post.username}</h1>
                <p>{post.text}</p>
                <LinkDiv className="div-link" onClick={() => window.open(post.link)}>
                    <TextsLink>
                        <h2>{post.title}</h2>
                        <h3>{post.description}</h3>
                        <h4>{post.link}</h4>
                    </TextsLink>
                    <div>
                        <img alt="pelé" src={post.linkImage}/>
                    </div>
                </LinkDiv>
            </Content>
        </Container>
        ))
        
    )
}


const Container = styled.div`

    width: 620px;
    border-radius: 16px;

    background-color: #171717;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    margin: 30px 0;

    .div-link:hover{
        cursor: pointer;
    }

`

const ProfilePicContainer = styled.div`

    width: 86px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    img {
        height: 50px;
        width: 50px;

        margin-top: 18px;
        margin-bottom: 20px;

        border-radius: 100px;
    }

    p{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #FFFFFF;

        margin-top: 3px;
    }
`

const Content = styled.div`

    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    gap: 7px;
    padding: 18px 0;

    h1{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 19px;
        line-height: 18px;
        color: #FFFFFF;
    }

    p{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 17px;
        line-height: 18px;
        color: #B7B7B7;

        margin-bottom: 10px;
    }

`

const TextsLink = styled.div`

    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    gap: 7px;
    padding: 18px 19px;

    h2{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
    }

    h3{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
    }

    h4{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;

        margin-top: 12px;
    }

`

const LinkDiv = styled.div`

    box-sizing: border-box;

    width: 503px;
    height: 155px;

    border: solid 1px #4D4D4D;
    border-radius: 12px;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
        height: 155px;
        width: 155px;

        border-radius: 0 12px 12px 0;

        margin-top: 2px;
    }
`

const Loading = styled.div`

    width: 620px;
    height: 376px; 
    border-radius: 16px;

    display: flex;
    justify-content: center;
    align-items: center; 

`
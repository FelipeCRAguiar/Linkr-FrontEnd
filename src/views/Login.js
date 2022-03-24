import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Button, Form, Input, LinkrMotto, StyledLink } from "../components"


export default function Login() {
    const [isDisabled, setIsDisabled] = useState(false)
    const [formData, setFormData] = useState({email: '', password: ''})
    const navigate = useNavigate()

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        // setIsDisabled(true)
        navigate('/')
    }

    return (
        <Container>
            <LinkrMotto>
                <Linkr>linkr</Linkr>
                <Motto>
                    <span>save, share and discover the best links on the web</span>
                </Motto>
            </LinkrMotto>
            <ContainerLogin>
                <Form onSubmit={handleSubmit}>
                    <Input type='email' placeholder="email" name="email" value={formData.email} onChange={handleChange} disabled={isDisabled}/>
                    <Input type='password' placeholder="password" name="password" value={formData.password} onChange={handleChange} disabled={isDisabled}/>
                    <Button type="submit" /*disabled={isDisabled}*/ onClick={() => navigate("/")}>Log In</Button> 
                </Form>
                <StyledLink to='/'>First time? Create an account!</StyledLink>
            </ContainerLogin>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Linkr = styled.p`
    font-family: 'Passion One';
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
`

const Motto = styled.div`
    width: 442px;
    height: 128px;

    font-family: 'Oswald';
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
`

const ContainerLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 1024px;
    margin-right: 55px;
`
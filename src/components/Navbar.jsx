import React from 'react'
import Badge from '@mui/material/Badge'
import styled from 'styled-components';
import {Search, ShoppingCartOutlined} from "@material-ui/icons";
import {mobile} from "../responsive"
import {useSelector, useDispatch} from "react-redux"
import {logoutUser} from "../redux/apiCalls"
import {Link} from "react-router-dom"


const Container = styled.div`
    height: 60px;
    ${mobile ({height: "50px"})}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile ({padding: "10px 0px"})}
`;

const Left = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 12px;
    cursor: pointer;
    ${mobile ({display: "none"})}
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgrey;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;
    ${mobile ({width: "50px"})}
`;

const Center = styled.div`
    flex:1;
    text-align: center;
`;

// const Logo = styled.a`
//     font-weight: bold;
//     font-size: 30px;
//     /* color: black;
//     text-decoration: none; */
//     ${mobile ({fontSize: "24px"})}
//`

const Right = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile ({flex: 2, justifyContent: "center"})}
`;

const MenuItem = styled.a`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile ({fontSize: "12px", marginLeft:"10px"})}
`;

export default function Navbar() {
    const quantity = useSelector(state => state.cart.quantity)
    const userstate = useSelector(state => state.user)
    const {currentUser} = userstate
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault()
        logoutUser(dispatch)
    }
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder="Search"/>
                    <Search style = {{color: "grey", fontSize: "16px"}}/>
                </SearchContainer>
            </Left>
            {/* <Center><Logo><Link to = "/">Shoppy</Link></Logo></Center> */}
            <Center><a 
                href="/" 
                style = {{color:'black', textDecoration:"none", fontWeight:"bold", fontSize: "30px"}}
                >Shoppy</a>
            </Center>
            <Right>

                {/* <MenuItem>Register</MenuItem>
                <MenuItem>Sign In</MenuItem> */}
                {currentUser ? (
                    <div style={{display:"flex"}}>
                        <p>{currentUser.username}</p>
                        <a 
                            href="/"
                            style = {{color:'black', textDecoration:"none", marginLeft:"25px"}}
                            onClick={handleClick}
                        >Logout</a>
                    </div>
                ) : (
                    <div>
                        <a
                        href="/register" 
                        style = {{color:'black', textDecoration:"none"}}
                        >Register</a>
                        <a
                            href="/login"
                        style = {{color:'black', textDecoration:"none", marginLeft:"25px"}}
                        >Login</a>
                    </div>  
                )}

                <Link to="/cart">
                <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlined/>
                    </Badge>
                </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

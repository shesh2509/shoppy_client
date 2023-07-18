import styled from 'styled-components'
import {Facebook, Twitter, Instagram, Pinterest, LocationOn, Phone, Email} from "@material-ui/icons"
import {mobile} from "../responsive"

const Container = styled.div`
    display: flex;
    ${mobile ({flexDirection: "column"})}
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1``;
const Desc = styled.p`
    margin: 20px 0px;

`;
const SocialContainer = styled.div`
    display: flex;
`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile ({display: "none"})}
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile ({backgroundColor: "#fff8f8"})}
`;

const ContactItem = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`;
const Payment = styled.img`
    width: 50%;
`;


export default function Footer() {
  return (
    <Container>
        <Left>
            <Logo>SHOPPY</Logo>
            <Desc>
                There are many variations of passages of lorem Ipsum available, but 
                the majority have suffered alteration in some from, by injected 
                humor, or randomised words which don't look even slightly belivable.
            </Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Twitter/>
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Instagram/>
                </SocialIcon>
                <SocialIcon color="E60023">
                    <Pinterest/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Man Fashion</ListItem>
                <ListItem>Women Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tacking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem><LocationOn style={{marginRight:"10px"}}/>98, Sundar Nagar, MP, India</ContactItem>
            <ContactItem><Phone style={{marginRight:"10px"}}/>+91 9988776655</ContactItem>
            <ContactItem><Email style={{marginRight:"10px"}}/>contact@shoppy.com</ContactItem>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
        </Right>
    </Container>
  )
}

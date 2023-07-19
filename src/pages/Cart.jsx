//import { Add, Remove } from "@material-ui/icons";
//import { Delete } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import {Link} from "react-router-dom";
import { clearCart } from "../redux/apiCalls";
//import {addOrders} from "../redux/apiCalls";
//import {deleteProduct } from "../redux/apiCalls";
//import { publicRequest } from "../requestMethods";
//import { useState,useEffect } from "react";
// import { addProduct } from "../redux/cartRedux";

// import StripeCheckout from "react-stripe-checkout";

// import { userRequest } from "../requestMethods";
//import {useNavigate} from "react-router";
import axios from "axios";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

// const DeleteButton = styled.div`
//   margin-left: 20px;
// `

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer
`;

const Cart = () => {

  const cart = useSelector((state) => state.cart); 
  const quantity = useSelector((state) => state.cart.quantity);
  const total = useSelector((state) => state.cart.total);

    const dispatch = useDispatch();

  /* const dispatch = useDispatch()

  const {currentUser} = useSelector((state) => state.user);
  const userId = currentUser._id;
  const products = cart.products;
  const amount = cart.total;

  console.log(userId);
  console.log(products);
  console.log(amount);

  const orders = {userId, products, amount, address: "India"}

  function Orders() {
    dispatch(addOrders(orders))
  } */



  /* const handleDelete = (id) => {
    deleteProduct(id, dispatch)
  }; */

  /* const [cquantity, setCquantity] = useState(quantity); */

  /* const handleQuantity = (type) => {
        if (type === 'dec') {
          if (cquantity > 1) {
            setCquantity(cquantity - 1);
          }
        } else if (type === 'inc') {
          setCquantity(cquantity + 1);
        }
    }; */


  function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
  }
async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post("https://backendapi-chvp.onrender.com/payment/orders", {total: total});

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_TPGCgE9IVZu4oL", // Enter the Key ID generated from the Dashboard
            amount: total.toString(),
            currency: currency,
            name: "Shoppy",
            description: "Test Transaction",
            /* image: { logo }, */
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                console.log(data)

                const result = await axios.post("https://backendapi-chvp.onrender.com/payment/success", data);
                dispatch(clearCart);
                alert(result.data.msg);
              

            },
            prefill: {
                name: "shoppy",
                email: "shoppy@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "shoppy Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
}

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to = "/products">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          
          <TopTexts>
            <TopText>Shopping Bag({quantity})</TopText>
          </TopTexts>
          <TopButton  onClick={displayRazorpay} type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key = {product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount> Qty: {product.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>
                    Rs. {product.price * product.quantity}
                    
                  </ProductPrice>
                </PriceDetail>
                
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. 200</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs. -200</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={displayRazorpay}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;

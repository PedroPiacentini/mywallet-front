import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"
import { getTransactions } from "../services/apiTransactions"


export default function HomePage() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(UserContext);
  function toReal(float) {
    return float.toString().replace(".", ",");
  }

  function getTransactionsList() {
    getTransactions(user.token)
      .then(res => {
        console.log(res.data);
        setTransactions(res.data);
      })
      .catch(err => {
        alert(err.response.data)
      });
  }

  useEffect(() => {
    if (!user.userName) {
      navigate("/");
      return;
    }
    getTransactionsList();
  }, []);

  let balance = 0;
  transactions.map(transaction => {
    transaction.type === "deposit" ? balance += transaction.value : balance -= transaction.value;
  }
  );

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.userName}</h1>
        <BiExit onClick={() => navigate("/")} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map(transaction => {
            return (
              <ListItemContainer>
                <div>
                  <span>{transaction.date}</span>
                  <strong>{transaction.description}</strong>
                </div>
                <Value color={transaction.type === "cash-out" ? "negativo" : "positivo"}>{toReal(transaction.value.toFixed(2))}</Value>
              </ListItemContainer>
            )
          })}
          <ListItemContainer>
            <div>
              <span>30/11</span>
              <strong>Almoço mãe</strong>
            </div>
            <Value color={"negativo"}>120,00</Value>
          </ListItemContainer>

          <ListItemContainer>
            <div>
              <span>15/11</span>
              <strong>Salário</strong>
            </div>
            <Value color={"positivo"}>3000,00</Value>
          </ListItemContainer>
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance < 0 ? "negativo" : "positivo"}>{balance}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/:deposit")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/:cash-out")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
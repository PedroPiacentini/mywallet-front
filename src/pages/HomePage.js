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



  useEffect(() => {
    function getTransactionsList() {
      getTransactions(user.token)
        .then(res => {
          setTransactions(res.data);
        })
        .catch(err => {
          alert(err.response.data)
        });
    }

    if (!user) {
      navigate("/");
    } else {
      getTransactionsList();
    }
  }, [user, navigate]);

  let balance = 0;
  transactions.forEach(transaction => {
    transaction.type === "deposit" ? balance += parseFloat(transaction.value) : balance -= parseFloat(transaction.value);
  }
  );

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user ? user.userName : "teste"}</h1>
        <BiExit onClick={() => {
          localStorage.removeItem("user");
          navigate("/")
        }} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.reverse().map(transaction => {
            return (
              <ListItemContainer key={transaction._id}>
                <div>
                  <span>{transaction.date}</span>
                  <strong>{transaction.description}</strong>
                </div>
                <Value color={transaction.type === "cash-out" ? "negativo" : "positivo"}>{toReal(parseFloat(transaction.value).toFixed(2))}</Value>
              </ListItemContainer>
            )
          })}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance < 0 ? "negativo" : "positivo"}>{toReal(balance.toFixed(2))}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/deposit")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/cash-out")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer >
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
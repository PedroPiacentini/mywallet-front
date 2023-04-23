import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { createTransaction } from "../services/apiTransactions";

export default function TransactionsPage() {
  const type = useParams().tipo;
  const [form, setForm] = useState({
    value: "",
    description: "",
    type
  });

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user.userName) { navigate("/") }
  })

  function handleTransaction(e) {
    e.preventDefault();
    createTransaction(user.token, form)
      .then(res => {
        navigate("/home");
      })
      .catch(err => {
        alert(err.response.data);
      });
  }

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    < TransactionsContainer >
      <h1>Nova {type === "deposit" ? "entrada" : "saída"}</h1>
      <form onSubmit={handleTransaction}>
        <input
          placeholder="Valor"
          name="value"
          type="number"
          value={form.value}
          required
          onChange={handleForm}
        />
        <input
          placeholder="Descrição"
          name="description"
          type="text"
          value={form.description}
          required
          onChange={handleForm}
        />
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </ TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`

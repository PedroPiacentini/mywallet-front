import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import { signUp } from "../services/apiAuth";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSignUp(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Senha não é compatível com confirmar senha");
      return;
    }
    delete form.confirmPassword;

    signUp(form)
      .then(res => {
        console.log(res)
        navigate("/");
      })
      .catch(err => {
        alert(err.response.data);
      });

  }
  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          name="userName"
          type="text"
          required
          value={form.name}
          onChange={handleForm}
        />
        <input
          name="email"
          placeholder="E-mail"
          type="email"
          required
          value={form.email}
          onChange={handleForm}
        />
        <input
          name="password"
          placeholder="Senha"
          type="password"
          required
          value={form.password}
          onChange={handleForm}
        />
        <input
          name="confirmPassword"
          placeholder="Confirme a senha"
          type="password"
          required
          value={form.confirmPassword}
          onChange={handleForm}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

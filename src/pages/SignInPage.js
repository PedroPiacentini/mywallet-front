import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { signIn } from "../services/apiAuth";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function SignInPage() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleLogin(e) {
    e.preventDefault();

    signIn(form)
      .then(res => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/home");
      })
      .catch(err => {
        alert(err.response.data);
      });


  }
  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleForm}
        />
        <input
          placeholder="Senha"
          name="password"
          type="password"
          required
          value={form.password}
          onChange={handleForm}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

import "./global.css";
import styles from "./App.module.css";

import Container from "./components/Container";
import Header from "./components/Header";
import Tarefa from "./components/Tarefa";

export default function App() {
  return (
    <div>
      <Header />
      <Container>
        <Tarefa />
      </Container>
    </div>
  );
}

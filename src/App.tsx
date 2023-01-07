import "./global.css";
import styles from "./App.module.css";

import Container from "./components/Container";
import Header from "./components/Header";
import CreateNewTask from "./components/CreateNewTask";

export default function App() {
  return (
    <div>
      <Header />
      <Container>
        <CreateNewTask />
      </Container>
    </div>
  );
}

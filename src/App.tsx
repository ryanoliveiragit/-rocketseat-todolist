import "./global.css";
import styles from "./App.module.css";
import Header from "./components/Header";
import CreateNewTask from "./components/CreateNewTask";

export default function App() {
  return (
    <>
      <Header />
        <CreateNewTask />
    </>
  );
}

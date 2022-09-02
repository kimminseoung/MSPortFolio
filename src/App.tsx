import DarkMode from "./components/DarkMode";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Router from "./components/Router";
function App() {
  return (
    <>
      <Header />
      <Router />
      <Footer />
      <Modal />
      <DarkMode />
    </>
  );
}

export default App;

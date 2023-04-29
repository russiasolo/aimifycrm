import Header from './components/Header'
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import './assets/scss/themes.scss';

function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <h1>Welcome</h1>
      </main>
      <Footer />
    </div>
  );
}

export default App;

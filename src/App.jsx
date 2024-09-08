import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="flex flex-col h-[100vh] overflow-y-auto">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>
        <div className='[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#76D7EA_100%)]'>
          <Manager/>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

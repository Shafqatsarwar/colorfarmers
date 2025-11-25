import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatButton from './components/ChatButton';
import Home from './pages/Home';
import About from './pages/About';
import StartToday from './pages/StartToday';
import Rates from './pages/Rates';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/start-today" element={<StartToday />} />
                        <Route path="/rates" element={<Rates />} />
                        <Route path="/reviews" element={<Reviews />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                <Footer />
                <ChatButton />
            </div>
        </Router>
    );
}

export default App;

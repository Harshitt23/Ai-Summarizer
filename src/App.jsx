import Hero from "./components/Hero";
import Demo from "./components/Demo";
import AnimatedBackground from "./components/AnimatedBackground";
import DarkModeToggle from "./components/DarkModeToggle";

import "./App.css";

const App = () => {
  return (
    <main>
      {/* Dark Mode Toggle */}
      <DarkModeToggle />
      
      {/* Animated Background */}
      <AnimatedBackground />

      <div className='app'>
        <Hero />
        <Demo />
      </div>
    </main>
  );
};

export default App;

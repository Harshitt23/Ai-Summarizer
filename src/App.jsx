import Hero from "./components/Hero";
import Demo from "./components/Demo";
import AnimatedBackground from "./components/AnimatedBackground";

import "./App.css";

const App = () => {
  return (
    <main>
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

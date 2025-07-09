import React from "react";

import { logo } from "../assets";

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img 
          src={logo} 
          alt='sumz_logo' 
          className='w-28 object-contain hover:scale-105 transition-transform duration-300 glow_on_hover' 
        />

        <button
          type='button'
          onClick={() =>
            window.open("https://github.com/Harshitt23/Ai-Summarizer", "_blank")
          }
          className='black_btn'
        >
          GitHub
        </button>
      </nav>

      <h1 className='head_text'>
        <span className='hover:scale-105 transition-transform duration-300 glow_on_hover cursor-pointer'>
          Summarize Articles with
        </span> <br className='max-md:hidden' />
        <span className='rgb-text'>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;

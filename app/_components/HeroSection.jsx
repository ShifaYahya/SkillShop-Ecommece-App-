"use client"
import React from 'react'

const HeroSection = () => {

  const handleScrollToProducts = () => {
    document.getElementById('product-section').scrollIntoView({ behavior: 'smooth' });
  }

  const handleScrollToFooter = () => {
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="bg-bgcolor1">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen ">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-extrabold bg-gradient-to-r from-gold-light to-gold-dark bg-clip-text text-transparent sm:text-5xl ">
            All Your Digital Products
            <strong className="font-extrabold bg-gradient-to-r from-gold-light to-gold-dark bg-clip-text text-transparent sm:text-5xl">  One Click Away. </strong>
          </h1>
    
          <p className="mt-4 sm:text-xl/relaxed text-gray-300">
            Start Exploring State Of The Art Assets Now!
          </p>
    
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="block w-full rounded bg-gold-gradient px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary focus:outline-none focus:ring active:bg-secondary sm:w-auto hover:text-primary"
              onClick={handleScrollToProducts}
            >
              Get Started
            </button>
    
            <button
              className="block w-full rounded px-12 py-3 text-sm font-medium text-primary border border-solid border-primary shadow hover:text-secondary focus:outline-none focus:ring active:text-primary sm:w-auto"
              onClick={handleScrollToFooter}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

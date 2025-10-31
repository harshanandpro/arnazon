import React from 'react'
import './Home.css'
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <span className="hero__label">Premium Collection</span>
          <h1 className="hero__title">
            Arnazon
          </h1>
          <p className="hero__tagline">If You Thought It Was Amazon,<br />
            You Might Need New Glasses So Start Shopping</p>
          <button className="hero__cta">
            Explore Collection
            <FiArrowRight className="arrow__icon" />
          </button>
        </div>
      </section>

      {/* Statement Section */}
      <section className="statement">
        <div className="statement__content">
          <h2>Curated Excellence</h2>
          <p>Where sophistication meets simplicity. Every product tells a story of craftsmanship and timeless design.</p>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured">
        <div className="featured__grid">
          <div className="featured__item large">
            <div className="featured__overlay">
              <h3>Premium Electronics</h3>
              <button className="featured__btn">
                Discover <FiArrowRight />
              </button>
            </div>
          </div>
          
          <div className="featured__item">
            <div className="featured__overlay">
              <h3>Fashion</h3>
              <button className="featured__btn">
                Discover <FiArrowRight />
              </button>
            </div>
          </div>
          
          <div className="featured__item">
            <div className="featured__overlay">
              <h3>Lifestyle</h3>
              <button className="featured__btn">
                Discover <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote">
        <blockquote>
          "Elegance is not standing out, but being remembered."
        </blockquote>
      </section>

      {/* Showcase Section */}
      <section className="showcase">
        <div className="showcase__left">
          <span className="showcase__label">New Arrivals</span>
          <h2>Redefining Luxury</h2>
          <p>Experience premium quality with our carefully selected collection. Each piece embodies excellence and attention to detail.</p>
          <button to="/" className="showcase__btn">
            View Collection <FiArrowRight />
          </button>
        </div>
        <div className="showcase__right"></div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats__item">
          <h3>24/7</h3>
          <p>Concierge Service</p>
        </div>
        <div className="stats__divider"></div>
        <div className="stats__item">
          <h3>100%</h3>
          <p>Authentic Products</p>
        </div>
        <div className="stats__divider"></div>
        <div className="stats__item">
          <h3>Global</h3>
          <p>Shipping Available</p>
        </div>
        <div className="stats__divider"></div>
        <div className="stats__item">
          <h3>Premium</h3>
          <p>Quality Guaranteed</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final__cta">
        <h2>Begin Your Journey</h2>
        <button className="final__btn">
          Shop Now <FiArrowRight />
        </button>
      </section>
    </div>
  )
}

export default Home

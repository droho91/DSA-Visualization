import React, { useState } from 'react';
import './Home.css';

const cards = [
  { imgSrc: process.env.PUBLIC_URL + '/images/Sorting.jpg', title: 'Sorting', tab: 1 },
  { imgSrc: process.env.PUBLIC_URL + '/images/Searching.jpg', title: 'Searching', tab: 2 },
{ imgSrc: process.env.PUBLIC_URL + '/images/S&Q.jpg', title: 'Stack and Queue', tab: 3  },
{ imgSrc: process.env.PUBLIC_URL + '/images/BinaryTree.png', title: 'Binary Tree', tab: 4 },
];

export default function Home({ setActiveTab }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((current - 1 + cards.length) % cards.length);
  const next = () => setCurrent((current + 1) % cards.length);

  const handleCardClick = () => {
    if (setActiveTab && cards[current].tab) setActiveTab(cards[current].tab);
  };

  return (
    <div className="home-container">
      <div className="slide-wrapper">
        <button className="slide-btn" onClick={prev}>&lt;</button>
        <div className="slide-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
          <img src={cards[current].imgSrc} alt={cards[current].title} />
          <div className="card-label">{cards[current].title}</div>
        </div>
        <button className="slide-btn" onClick={next}>&gt;</button>
      </div>
      <div className="slide-dots">
        {cards.map((_, idx) => (
          <span
            key={idx}
            className={'dot' + (idx === current ? ' active' : '')}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
      <h1 className="home-title">DSA Visualizer</h1>
      <h2 className="home-subtitle">By Duy Anh & Tran Dao</h2>
    </div>
  );
}
import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home() {
  const [phrase, setPhrase] = useState('')
  const [buttonText, setButtonText] = useState('Speel!')

  // Initialize button text randomly on mount
  useEffect(() => {
    setButtonText(Math.random() < 0.5 ? 'Speel!' : 'Joue !')
  }, [])

  // Group 1 - Fingers
  const group1SetA = ['Duim', 'Wijsvinger', 'Middelvinger', 'Ringvinger', 'Pink']
  const group1SetB = ['Pouce', 'Index', 'Majeur', 'Annulaire', 'Auriculaire']

  // Group 2 - Colors
  const group2SetA = ['blauw', 'geel', 'rood', 'groen']
  const group2SetB = ['blue', 'jaune', 'rouge', 'vert']

  const generatePhrase = () => {
    // Toggle button text between languages
    setButtonText(prev => prev === 'Speel!' ? 'Joue !' : 'Speel!')

    // Randomly decide which combination to use:
    // Option 1: Group 1 Set A + Group 2 Set B
    // Option 2: Group 1 Set B + Group 2 Set A
    const useOption1 = Math.random() < 0.5

    let finger, color

    if (useOption1) {
      // Group 1 Set A (Dutch fingers) + Group 2 Set B (English/French colors)
      finger = group1SetA[Math.floor(Math.random() * group1SetA.length)]
      color = group2SetB[Math.floor(Math.random() * group2SetB.length)]
    } else {
      // Group 1 Set B (French fingers) + Group 2 Set A (Dutch colors)
      finger = group1SetB[Math.floor(Math.random() * group1SetB.length)]
      color = group2SetA[Math.floor(Math.random() * group2SetA.length)]
    }

    setPhrase(`${finger} - ${color}`)
  }

  // Colors from the original background image (green, blue, yellow, red)
  const circleColors = ['#1D9A4E', '#2E5CA8', '#E09E2A', '#C63737']

  return (
    <div className="container">
      <Head>
        <title>Gaston</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet" />
      </Head>

      <div className="background-pattern">
        {Array.from({ length: 400 }).map((_, index) => (
          <div
            key={index}
            className="circle"
            style={{ backgroundColor: circleColors[index % 4] }}
          />
        ))}
      </div>

      <main>
        <h1 className="title">Gaston</h1>

        <button className="action-button" onClick={generatePhrase}>
          {buttonText}
        </button>

        {phrase && (
          <div className="phrase-display">
            {phrase}
          </div>
        )}
      </main>
    </div>
  )
}

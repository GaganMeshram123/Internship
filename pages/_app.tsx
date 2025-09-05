import "@/styles/app.css";
import "../styles/heatmap.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@/lib/ThemeContext";

// Global styles for the space theme
const globalStyles = `
  @keyframes twinkle {
    0% { opacity: 0.2; }
    50% { opacity: 0.8; }
    100% { opacity: 0.2; }
  }
  
  @keyframes slowtwinkle {
    0% { opacity: 0.1; }
    50% { opacity: 0.4; }
    100% { opacity: 0.1; }
  }
  
  @keyframes float {
    0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
    25% { transform: translateY(-8px) translateX(5px) rotate(1deg); }
    50% { transform: translateY(0px) translateX(10px) rotate(0deg); }
    75% { transform: translateY(8px) translateX(5px) rotate(-1deg); }
    100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  }
  
  @keyframes shooting-star {
    0% { transform: translateX(-100px) translateY(-100px) rotate(45deg); opacity: 0; }
    10% { opacity: 1; }
    40% { opacity: 1; width: 150px; }
    100% { transform: translateX(2000px) translateY(2000px) rotate(45deg); opacity: 0; width: 50px; }
  }

  @keyframes nebula-shift {
    0% { transform: translate(0, 0); filter: hue-rotate(0deg); }
    50% { transform: translate(-10px, -5px); filter: hue-rotate(10deg); }
    100% { transform: translate(0, 0); filter: hue-rotate(0deg); }
  }
  
  body, html {
    margin: 0;
    padding: 0;
    min-height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
  }
  
  .dark body, .dark html {
    background: radial-gradient(ellipse at bottom, #0c1523 0%, #060810 100%);
    color: white;
  }
  
  body, html {
    background: radial-gradient(ellipse at bottom, #f0f9ff 0%, #e0f2fe 100%);
    color: #111827;
  }
  
  #__next {
    height: 100%;
    position: relative;
    z-index: 1;
  }
  
  /* Space elements - only visible in dark mode */
  .nebula, .stars-small, .stars-medium, .stars-large, .space-objects {
    display: none;
  }
  
  .dark .nebula, .dark .stars-small, .dark .stars-medium, .dark .stars-large, .dark .space-objects {
    display: block;
  }
  
  /* Nebula effect */
  .nebula {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.15;
    background: 
      radial-gradient(circle at 20% 30%, rgba(62, 32, 223, 0.3) 0%, rgba(62, 32, 223, 0) 25%),
      radial-gradient(circle at 70% 60%, rgba(156, 32, 223, 0.2) 0%, rgba(156, 32, 223, 0) 30%),
      radial-gradient(circle at 50% 20%, rgba(23, 42, 135, 0.3) 0%, rgba(23, 42, 135, 0) 40%),
      radial-gradient(circle at 80% 30%, rgba(32, 128, 223, 0.2) 0%, rgba(32, 128, 223, 0) 35%);
    pointer-events: none;
    z-index: -3;
    filter: blur(40px);
    animation: nebula-shift 30s infinite ease-in-out;
  }
  
  /* Stars background - Small stars */
  .stars-small {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(1px 1px at 20px 30px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 40px 70px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 160px 120px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 230px 190px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 270px 230px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 320px 270px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 420px 40px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 450px 90px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 520px 200px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 570px 300px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 650px 80px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 720px 170px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 750px 250px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 800px 320px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 880px 120px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 950px 280px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 1050px 180px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 1120px 220px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
      radial-gradient(1px 1px at 1200px 300px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0));
    background-size: 1200px 1200px;
    background-repeat: repeat;
    z-index: -2;
  }
  
  /* Medium stars */
  .stars-medium {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 100px 100px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 200px 200px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 300px 300px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 400px 400px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 500px 500px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 600px 600px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 700px 700px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 800px 800px, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 150px 50px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 250px 450px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 350px 250px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 450px 150px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 550px 350px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 650px 550px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 750px 150px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 850px 350px, rgba(255, 255, 255, 1), rgba(0,0,0,0));
    background-size: 1000px 1000px;
    z-index: -2;
    animation: twinkle 4s infinite ease-in-out;
    animation-delay: 2s;
  }
  
  /* Large stars */
  .stars-large {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(3px 3px at 150px 150px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.4) 20%, rgba(0,0,0,0) 30%),
      radial-gradient(3px 3px at 350px 350px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.4) 20%, rgba(0,0,0,0) 30%),
      radial-gradient(3px 3px at 550px 450px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.4) 20%, rgba(0,0,0,0) 30%),
      radial-gradient(3px 3px at 650px 150px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.4) 20%, rgba(0,0,0,0) 30%),
      radial-gradient(3px 3px at 750px 350px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.4) 20%, rgba(0,0,0,0) 30%),
      radial-gradient(3px 3px at 950px 250px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.4) 20%, rgba(0,0,0,0) 30%),
      radial-gradient(3.5px 3.5px at 200px 250px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5) 20%, rgba(0,0,0,0) 30%),
      radial-gradient(3.5px 3.5px at 400px 150px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5) 20%, rgba(0,0,0,0) 30%),
      radial-gradient(3.5px 3.5px at 600px 300px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5) 20%, rgba(0,0,0,0) 30%),
      radial-gradient(3.5px 3.5px at 800px 100px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5) 20%, rgba(0,0,0,0) 30%),
      radial-gradient(4px 4px at 300px 100px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.6) 20%, rgba(0,0,0,0) 30%),
      radial-gradient(4px 4px at 500px 200px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.6) 20%, rgba(0,0,0,0) 30%),
      radial-gradient(4px 4px at 700px 500px, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.6) 20%, rgba(0,0,0,0) 30%);
    background-size: 1000px 1000px;
    z-index: -2;
    animation: slowtwinkle 6s infinite ease-in-out;
  }
  
  /* Space objects */
  .space-objects {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    pointer-events: none;
  }
  
  /* Planets */
  .planet {
    position: absolute;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .planet-1 {
    width: 120px;
    height: 120px;
    top: 15%;
    right: 15%;
    box-shadow: inset -20px -10px 50px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.3);
    animation: float 100s infinite ease-in-out;
    background: conic-gradient(
      from 90deg,
      #312e81, #3730a3, #4338ca, #3730a3, #312e81, #312e81
    );
  }
  
  .planet-1::before {
    content: '';
    position: absolute;
    width: 130%;
    height: 30px;
    background: rgba(99, 102, 241, 0.2);
    left: -15%;
    top: 40%;
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.2);
    transform: rotate(-20deg);
  }
  
  .planet-1::after {
    content: '';
    position: absolute;
    width: 130%;
    height: 15px;
    background: rgba(99, 102, 241, 0.1);
    left: -15%;
    top: 50%;
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.1);
    transform: rotate(-20deg);
  }
  
  .planet-2 {
    width: 70px;
    height: 70px;
    bottom: 20%;
    left: 13%;
    background: linear-gradient(135deg, #831843, #be185d, #ec4899, #f472b6);
    box-shadow: inset -15px -10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(236, 72, 153, 0.3);
    animation: float 80s infinite ease-in-out;
    animation-delay: 10s;
  }
  
  .planet-2::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 30% 30%, rgba(253, 242, 248, 0.2), transparent 15%),
      radial-gradient(circle at 80% 40%, rgba(253, 242, 248, 0.1), transparent 20%);
    left: 0;
    top: 0;
    border-radius: 50%;
  }
  
  .planet-3 {
    width: 95px;
    height: 95px;
    top: 65%;
    right: 25%;
    background: linear-gradient(135deg, #854d0e, #ca8a04, #eab308, #facc15);
    box-shadow: inset -15px -10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(250, 204, 21, 0.3);
    animation: float 120s infinite ease-in-out;
    animation-delay: 15s;
  }
  
  .planet-3::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 40% 40%, rgba(254, 249, 195, 0.3), transparent 25%),
      radial-gradient(ellipse at 70% 30%, rgba(254, 249, 195, 0.2), transparent 30%);
    left: 0;
    top: 0;
    border-radius: 50%;
  }
  
  .planet-4 {
    width: 60px;
    height: 60px;
    top: 30%;
    left: 20%;
    background: linear-gradient(135deg, #065f46, #059669, #10b981, #34d399);
    box-shadow: inset -10px -5px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.3);
    animation: float 90s infinite ease-in-out;
    animation-delay: 5s;
  }
  
  .planet-4::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 25% 35%, rgba(209, 250, 229, 0.3), transparent 15%),
      radial-gradient(circle at 75% 45%, rgba(209, 250, 229, 0.2), transparent 20%);
    left: 0;
    top: 0;
    border-radius: 50%;
  }
  
  .planet-5 {
    width: 40px;
    height: 40px;
    bottom: 35%;
    right: 10%;
    background: linear-gradient(135deg, #7e22ce, #a855f7, #c084fc, #d8b4fe);
    box-shadow: inset -8px -4px 15px rgba(0, 0, 0, 0.5), 0 0 15px rgba(168, 85, 247, 0.4);
    animation: float 70s infinite ease-in-out;
    animation-delay: 20s;
  }
  
  /* Shooting stars */
  .shooting-star {
    position: absolute;
    height: 2px;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
    opacity: 0;
    z-index: 1;
  }
  
  .shooting-star-1 {
    width: 150px;
    top: 20%;
    left: 10%;
    animation: shooting-star 6s infinite linear;
    animation-delay: 2s;
  }
  
  .shooting-star-2 {
    width: 120px;
    top: 40%;
    left: 70%;
    animation: shooting-star 8s infinite linear;
    animation-delay: 5s;
  }
  
  .shooting-star-3 {
    width: 100px;
    top: 70%;
    left: 40%;
    animation: shooting-star 10s infinite linear;
    animation-delay: 9s;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Quazar Module Tester</title>
        <meta name="description" content="Quazar module tester for testing modules" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{globalStyles}</style>
      </Head>
      <ThemeProvider>
        <div className="nebula"></div>
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
        <div className="space-objects">
          <div className="planet planet-1"></div>
          <div className="planet planet-2"></div>
          <div className="planet planet-3"></div>
          <div className="planet planet-4"></div>
          <div className="planet planet-5"></div>
          <div className="shooting-star shooting-star-1"></div>
          <div className="shooting-star shooting-star-2"></div>
          <div className="shooting-star shooting-star-3"></div>
        </div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
}
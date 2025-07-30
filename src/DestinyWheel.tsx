import React, { useState, useRef, useEffect } from 'react';
import img0 from './img/0.png';
import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';
import img6 from './img/6.png';
import img7 from './img/7.png';
import img8 from './img/8.png';
import img9 from './img/9.png';

const DestinyWheel = () => {
  const [question, setQuestion] = useState('Кто сегодня проводит StandUp?');
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [totalRotation, setTotalRotation] = useState(0);
  const wheelRef = useRef(null);
  const containerRef = useRef(null);
  const [wheelSize, setWheelSize] = useState(320);


  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setWheelSize(Math.max(180, Math.min(width, 400)));
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const center = wheelSize / 2;
  const sectorRadius = center * 0.88;
  const imageRadius = center * 0.56;
  const imageSize = center * 0.24;
  const pointerSize = Math.max(20, Math.round(center * 0.1));

  const participants = [
    "Жаннат Васецкая",
    "Юлия Лобачева", 
    "Нурлан Исбулаев",
    "Валерия Антошкина",
    "Виктория Дудина",
    "Константин Дудченко",
    "Наталья Козливцева",
    "Вера Тимченко",
    "Сергей Лебедев",
    "Сергей Сайкин"
  ];

  const images = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9];

  const colors = [
    '#3373dc', '#10b981', '#ef4444', '#f99507', '#8333ea', 
    '#ec4084', '#14b8a6', '#ffcc11', '#22c55e', '#f97316'
  ];

  const askDestiny = () => {
    if (!question.trim()) {
      alert('Пожалуйста, задайте свой вопрос');
      return;
    }
    setIsSpinning(true);
    setResult(null);
    const additionalRotation = 2880 + Math.random() * 1440 + Math.random() * 360;
    const newTotalRotation = totalRotation + additionalRotation;
    const finalRotation = newTotalRotation % 360;
    const sectorAngle = 360 / 10;

    const normalizedAngle = (360 - finalRotation) % 360;
    const selectedSector = Math.floor(normalizedAngle / sectorAngle) % 10;
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${newTotalRotation}deg)`;
    }
    setTotalRotation(newTotalRotation);
    setTimeout(() => {
      setIsSpinning(false);
      setResult(selectedSector);
    }, 12000);
  };

  const resetWheel = () => {
    setQuestion('Кто сегодня проводит StandUp?');
    setResult(null);
    setTotalRotation(0);
    if (wheelRef.current) {
      wheelRef.current.style.transform = 'rotate(0deg)';
    }
  };

  const createSectorPath = (index) => {
    const sectorAngle = 360 / 10;
    const startAngle = index * sectorAngle - 90;
    const endAngle = startAngle + sectorAngle;
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    const largeArcFlag = sectorAngle > 180 ? 1 : 0;
    const x1 = center + sectorRadius * Math.cos(startAngleRad);
    const y1 = center + sectorRadius * Math.sin(startAngleRad);
    const x2 = center + sectorRadius * Math.cos(endAngleRad);
    const y2 = center + sectorRadius * Math.sin(endAngleRad);
    return `M ${center} ${center} L ${x1} ${y1} A ${sectorRadius} ${sectorRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getSectorImagePosition = (index) => {
    const sectorAngle = 360 / 10;
    const angle = index * sectorAngle - 90 + sectorAngle / 2;
    const angleRad = (angle * Math.PI) / 180;
    const x = center + imageRadius * Math.cos(angleRad) - imageSize / 2;
    const y = center + imageRadius * Math.sin(angleRad) - imageSize / 2;
    return { x, y, rotation: angle + 90 };
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-2 sm:p-4 md:p-8 overflow-x-hidden">
      <div ref={containerRef} className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-2 sm:p-4 md:p-8 w-full max-w-[98vw] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4 sm:mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          🔮 Колесо Судьбы
        </h1>
        {/* Поле для ввода вопроса */}
        <div className="mb-4 sm:mb-8 w-full max-w-xl">
          <label className="block text-white text-base sm:text-lg font-medium mb-2 sm:mb-3">
            Задайте свой вопрос:
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Кто сегодня проводит StandUp?"
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none transition-all duration-300 min-h-[60px] sm:min-h-[80px] ${
              isSpinning 
                ? 'bg-white/10 border-white/20 cursor-not-allowed opacity-50' 
                : 'bg-white/20 border-white/30'
            }`}
            rows="3"
            disabled={isSpinning}
          />
        </div>
        {/* Колесо */}
        <div className="flex justify-center mb-4 sm:mb-8 w-full">
          <div className="relative w-full flex justify-center" style={{maxWidth: wheelSize}}>
            {/* Указатель сверху, указывает вниз */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: `-${pointerSize / 2}px`,
                transform: 'translateX(-50%) rotate(180deg)',
                zIndex: 20,
                pointerEvents: 'none',
              }}
            >
              <svg width={pointerSize * 2} height={pointerSize * 2} viewBox={`0 0 ${pointerSize * 2} ${pointerSize * 2}`}>
                <polygon
                  points={`${pointerSize},0 ${pointerSize * 2},${pointerSize} 0,${pointerSize}`}
                  fill="#facc15"
                  stroke="#b45309"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                />
              </svg>
            </div>
            {/* SVG Колесо */}
            <svg
              viewBox={`0 0 ${wheelSize} ${wheelSize}`}
              width="100%"
              height="auto"
              className="drop-shadow-2xl"
              style={{maxWidth: wheelSize, height: 'auto'}}
            >
              <g
                ref={wheelRef}
                style={{
                  transformOrigin: `${center}px ${center}px`,
                  transition: isSpinning ? 'transform 12s cubic-bezier(0.05, 0.7, 0.25, 1)' : 'none'
                }}
              >
                {/* Секторы */}
                {Array.from({ length: 10 }, (_, i) => (
                  <g key={i}>
                    <path
                      d={createSectorPath(i)}
                      fill={colors[i]}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className={result === i ? 'drop-shadow-lg' : ''}
                    />
                    {/* Изображение в секторе */}
                    <g>
                      <image
                        href={images[i]}
                        x={getSectorImagePosition(i).x}
                        y={getSectorImagePosition(i).y}
                        width={imageSize}
                        height={imageSize}
                        transform={`rotate(${getSectorImagePosition(i).rotation} ${getSectorImagePosition(i).x + imageSize / 2} ${getSectorImagePosition(i).y + imageSize / 2})`}
                        className="drop-shadow-md"
                      />
                    </g>
                  </g>
                ))}
                {/* Центральный круг */}
                <circle
                  cx={center}
                  cy={center}
                  r={center * 0.18}
                  fill="#ffffff"
                  stroke="#666"
                  strokeWidth="2"
                  className="drop-shadow-lg"
                />
              </g>
            </svg>
          </div>
        </div>
        {/* Результат */}
        <div className="mb-4 sm:mb-6 min-h-[60px] sm:min-h-[100px] flex items-center justify-center w-full">
          {result !== null && (
            <div className="p-2 sm:p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-center w-full max-w-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">✨ Судьба сделала выбор:</h3>
              <p className="text-white/90 text-base sm:text-lg font-semibold">{participants[result]}</p>
            </div>
          )}
        </div>
        {/* Кнопки */}
        <div className="flex gap-2 sm:gap-4 justify-center min-h-[40px] sm:min-h-[48px] w-full">
          <button
            onClick={askDestiny}
            disabled={isSpinning}
            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 w-full max-w-[220px] ${
              isSpinning
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 hover:scale-105 active:scale-95'
            } text-white shadow-lg`}
          >
            {isSpinning ? '🎯 Судьба формируется...' : '🎯 Сделать выбор'}
          </button>
          {(result !== null || question) && (
            <button
              onClick={resetWheel}
              disabled={isSpinning}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95 w-full max-w-[160px]"
            >
              🔄 Сброс
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinyWheel;
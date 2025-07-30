import React, { useState, useRef } from 'react';

const DestinyWheel = () => {
  const [question, setQuestion] = useState('Кто сегодня проводит StandUp?');
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [totalRotation, setTotalRotation] = useState(0);
  const wheelRef = useRef(null);

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

const images = [
    './img/0.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/7.png',
    './img/8.png', 
    './img/9.png'
  ];

  const colors = [
    '#3373dc', '#10b981', '#ef4444', '#f99507', '#8333ea', 
    '#ec4084', '#14b8a6', '#64748b', '#22c55e', '#f97316'
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
    const adjustedAngle = (finalRotation + 90) % 360;
    const selectedSector = Math.floor(adjustedAngle / sectorAngle) % 10;

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
    
    const x1 = 250 + 220 * Math.cos(startAngleRad);
    const y1 = 250 + 220 * Math.sin(startAngleRad);
    const x2 = 250 + 220 * Math.cos(endAngleRad);
    const y2 = 250 + 220 * Math.sin(endAngleRad);
    
    return `M 250 250 L ${x1} ${y1} A 220 220 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getSectorImagePosition = (index) => {
    const sectorAngle = 360 / 10;
    const angle = index * sectorAngle - 90 + sectorAngle / 2;
    const angleRad = (angle * Math.PI) / 180;
    const radius = 140;
    
    const x = 250 + radius * Math.cos(angleRad) - 30;
    const y = 250 + radius * Math.sin(angleRad) - 30;
    
    return { x, y, rotation: angle + 90 };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 max-w-5xl w-full min-h-[800px]">
        <h1 className="text-4xl font-bold text-white text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          🔮 Колесо Судьбы
        </h1>
        
        {/* Поле для ввода вопроса */}
        <div className="mb-8">
          <label className="block text-white text-lg font-medium mb-3">
            Задайте свой вопрос судьбе:
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Кто сегодня проводит StandUp?"
            className={`w-full px-4 py-3 border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none transition-all duration-300 min-h-[80px] ${
              isSpinning 
                ? 'bg-white/10 border-white/20 cursor-not-allowed opacity-50' 
                : 'bg-white/20 border-white/30'
            }`}
            rows="3"
            disabled={isSpinning}
          />
        </div>

        {/* Колесо */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Указатель */}
            <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
              <div className="w-0 h-0 border-t-[25px] border-b-[25px] border-r-[45px] border-t-transparent border-b-transparent border-r-yellow-400 drop-shadow-lg"></div>
            </div>
            
            {/* SVG Колесо */}
            <svg width="500" height="500" className="drop-shadow-2xl">
                              <g
                  ref={wheelRef}
                  style={{
                    transformOrigin: '250px 250px',
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
                        width="60"
                        height="60"
                        transform={`rotate(${getSectorImagePosition(i).rotation} ${getSectorImagePosition(i).x + 30} ${getSectorImagePosition(i).y + 30})`}
                        className="drop-shadow-md"
                      />
                    </g>
                  </g>
                ))}
                
                {/* Центральный круг */}
                <circle
                  cx="250"
                  cy="250"
                  r="45"
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
        <div className="mb-6 min-h-[120px] flex items-center justify-center">
          {result !== null && (
            <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-center">
              <h3 className="text-xl font-bold text-white mb-2">✨ Судьба сделала выбор:</h3>
              <p className="text-white/90 text-lg font-semibold">{participants[result]}</p>
            </div>
          )}
        </div>

        {/* Кнопки */}
        <div className="flex gap-4 justify-center min-h-[60px]">
          <button
            onClick={askDestiny}
            disabled={isSpinning}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 min-w-[180px] ${
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
              className="px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95 min-w-[120px]"
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
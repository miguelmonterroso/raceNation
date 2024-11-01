'use client';

// import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export default function Ranking() {
//   const { translations } = useThemeLanguage();

  return (
    <div className="w-full">
      <h1>{ "Ranking"}</h1>
      <p>{ "View the current rankings of cars."}</p>
      <div className="mt-2">
        <p>Ranking content goes here...</p>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function RankingPage() {
  return (
    <div>
      <h1>Explora el Ranking</h1>
      <p>Selecciona una categoría para ver los rankings disponibles:</p>
      <ul>
        <li><Link href="/ranking/topSpeed">Top Speed</Link></li>
        <li><Link href="/ranking/lapTime">Best Lap Times</Link></li>
      </ul>
    </div>
  );
}

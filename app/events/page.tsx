import Link from 'next/link';

export default function EventsPage() {
  return (
    <div>
      <h1>Explora Eventos</h1>
      <p>Selecciona una categoría para ver los eventos disponibles:</p>
      <ul>
        <li><Link href="/events/drag">Drag</Link></li>
        <li><Link href="/events/tuning">Tuning</Link></li>
        <li><Link href="/events/drift">Drift</Link></li>
      </ul>
    </div>
  );
}

interface CardProps {
    title: string;
    description: string;
    date: string;
  }
  
  export default function Card({ title, description, date }: CardProps) {
    return (
      <div className="card p-4 border rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500">{date}</p>
        {/* <a href={link} className="text-blue-500 hover:underline">
          Ver más
        </a> */}
      </div>
    );
  }
  
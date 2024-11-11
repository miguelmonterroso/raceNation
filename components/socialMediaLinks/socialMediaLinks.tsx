import { Instagram } from 'lucide-react'; // Usaremos Instagram de lucide-react
import { Button } from '../ui/button';

const SocialMediaLinks = ({ instagramUrl, tiktokUrl }: { instagramUrl: string; tiktokUrl: string }) => {
  return (
    <div className="mt-10 p-6 text-center">
      <h2 className="text-4xl font-bold mb-6">Entérate de todas las novedades del evento en redes</h2>
      <div className="flex justify-center gap-6">
        
        <Button
          onClick={() => window.open(instagramUrl, '_blank')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg"
        >
          <Instagram className="w-6 h-6" />
          Instagram
        </Button>

        <Button
          onClick={() => window.open(tiktokUrl, '_blank')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-black to-gray-700 text-white rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-current">
            <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/>
          </svg>
          TikTok
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaLinks;

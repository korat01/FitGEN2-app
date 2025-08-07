import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-4xl font-bold text-foreground">FITGEN</h1>
        <p className="text-xl text-muted-foreground">
          Générateur de programmes sportifs
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate('/dashboard')}
          className="px-8 py-3"
        >
          Commencer
        </Button>
      </div>
    </div>
  );
};
export default Home;
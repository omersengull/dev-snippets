import { LandingPage } from './Landing/page';

const Home = () => {

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-200">
     
      
      <main className="flex-grow flex flex-col">
        <LandingPage/>
      
      </main>
    </div>
  );
};

export default Home;
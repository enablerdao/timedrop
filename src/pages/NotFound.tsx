
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { HomeIcon } from "lucide-react";
import AnimatedTransition from "@/components/shared/AnimatedTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <AnimatedTransition animation="fade">
        <div className="text-center max-w-md px-6">
          <div className="mb-8">
            <span className="text-9xl font-bold bg-gradient-to-r from-timedrop-blue to-timedrop-light-blue text-transparent bg-clip-text">404</span>
          </div>
          <h1 className="text-2xl font-semibold text-timedrop-dark-gray mb-4">ページが見つかりませんでした</h1>
          <p className="text-timedrop-muted-gray mb-8">
            お探しのページは存在しないか、移動された可能性があります。 
            トップページに戻って、別のページをご覧ください。
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-timedrop-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-timedrop-primary/90 transition-colors"
          >
            <HomeIcon size={18} />
            トップページへ戻る
          </Link>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default NotFound;

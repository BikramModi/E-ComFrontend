import { useParams } from "react-router-dom";
import ReviewCreationCard from "../common/ReviewCreationCard";

const ReviewCreationCardList = () => {
  const { id: productId } = useParams(); // route: /product/:id

  return (
    <div className="bg-indigo-300 
                    border-t border-amber-300 
                    py-6 sm:py-8 lg:py-10">

      <div className="max-w-4xl mx-auto 
                      px-4 sm:px-6 lg:px-8">
        <ReviewCreationCard productId={productId} />
      </div>

    </div>
  );
};

export default ReviewCreationCardList;
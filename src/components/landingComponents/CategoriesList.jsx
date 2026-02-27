import CategoriesCard from "../common/CategoriesCard";
import useApi from "../../hooks/useApi";

const CategoriesList = () => {
  const { data = [], loading, error } = useApi("/categories", {}, []);

  if (loading)
    return (
      <div className="py-16 text-center text-gray-500 text-sm sm:text-base lg:text-lg">
        Loading categories...
      </div>
    );

  if (error)
    return (
      <div className="py-16 text-center text-red-500 text-sm sm:text-base lg:text-lg">
        Error: {error.message}
      </div>
    );

  return (
    <section className="bg-gray-50 py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 
                       font-extrabold text-gray-800 
                       mb-4 sm:mb-6 text-center">
          Shop by Category
        </h2>

        {/* Subtext */}
        <p className="text-center text-gray-600 
                      text-sm sm:text-base lg:text-lg 
                      mb-8 sm:mb-10 max-w-2xl mx-auto">
          Explore products across different categories curated just for you
        </p>

        {/* Responsive Grid */}
        <div
          className="grid 
                     grid-cols-2 
                     sm:grid-cols-3 
                     md:grid-cols-4 
                     lg:grid-cols-5 
                     xl:grid-cols-6 
                     gap-4 sm:gap-6 lg:gap-8"
        >
          {data.map((cat) => (
            <CategoriesCard
              key={cat._id}
              id={cat._id}
              name={cat.name}
              description={cat.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoriesList;
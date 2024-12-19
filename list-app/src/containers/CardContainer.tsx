import Card from "@/components/Card";
import { countries } from "@/utils";

const CardContainer = () => {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 sm:gap-3">
      {countries.map((country) => (
        <Card name={country.name} flag={country.flagImage} key={country.id} />
      ))}
    </div>
  );
};

export default CardContainer;

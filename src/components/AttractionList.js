import AttractionCard from './AttractionCard';

export default function AttractionList({ attractions }) {
  return (
    <div>
      <h2>Top Attractions</h2>
      {attractions.map(attraction => (
        <AttractionCard key={attraction.id} attraction={attraction} />
      ))}
    </div>
  );
}
import { getTown } from '../../../lib/api';

export default async function TownPage({ params }) {
  const townData = await getTown(params.townName);

  return (
    <div className="town-page">
      <h1>{townData.name}</h1>
      <p>{townData.description}</p>
      <h2>Attractions</h2>
      <ul>
        {townData.attractions.map((attraction, index) => (
          <li key={index}>
            <h3>{attraction.name}</h3>
            <p>{attraction.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

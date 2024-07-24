import Image from 'next/image';

export default function TownOverview({ town }) {
  return (
    <div>
      <h1>{town.name}</h1>
      <Image src={town.image} alt={town.name} width={800} height={400} />
      <p>{town.description}</p>
    </div>
  );
}
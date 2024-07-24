export default function AttractionCard({ attraction }) {
    return (
      <div>
        <h3>{attraction.name}</h3>
        <p>{attraction.description}</p>
      </div>
    );
  }
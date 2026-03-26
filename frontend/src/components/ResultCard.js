export default function ResultCard({ data }) {
  if (!data) return null;

  return (
    <div className="result">
      {/* Titles */}
      <div className="card">
        <h3>🔥 Titles</h3>
        <ul>
          {data.titles.map((title, i) => (
            <li key={i}>{title}</li>
          ))}
        </ul>
      </div>

      {/* Thumbnail */}
      <div className="card">
        <h3>🖼️ Thumbnail</h3>

        <img
          src={data.image}
          alt="thumbnail"
          className="thumbnail"
        />

        <br /><br />

        <a href={data.image} download="thumbnail.png">
          <button className="btn">Download</button>
        </a>
      </div>
    </div>
  );
}
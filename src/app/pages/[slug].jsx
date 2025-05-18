export async function getServerSideProps({ params }) {
  const { slug } = params;
  console.log("Fetching slug:", slug);

  const [rows] = await db.query("SELECT * FROM pages WHERE slug = ?", [slug]);
  
  console.log("Database Result:", rows);

  if (rows.length === 0) {
      return { notFound: true };
  }

  return {
      props: { service: rows[0] },
  };
}

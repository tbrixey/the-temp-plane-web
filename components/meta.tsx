//https://gist.github.com/lancejpollard/1978404

const MetaTags = () => {
  return (
    <>
      <meta
        name="description"
        content="Immerse yourself in an ever-changing and ever-growing game space catered and created by you."
      />

      {/*google*/}
      <meta itemProp="name" content="The Temporary Plane" />
      <meta
        itemProp="description"
        content="Immerse yourself in an ever-changing and ever-growing game space catered and created by you."
      />
      <meta itemProp="image" content="https://thetemporaryplane.com/map.jpg" />

      {/*facebook*/}
      <meta property="og:url" content="https://thetemporaryplane.com" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="The Temporary Plane" />
      <meta
        property="og:description"
        content="Immerse yourself in an ever-changing and ever-growing game space catered and created by you."
      />
      <meta
        property="og:image"
        content="https://thetemporaryplane.com/map.jpg"
      />

      {/*twitter*/}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="The Temporary Plane" />
      <meta
        name="twitter:description"
        content="Immerse yourself in an ever-changing and ever-growing game space catered and created by you."
      />
      <meta
        name="twitter:image"
        content="https://thetemporaryplane.com/map.jpg"
      />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="250" />
      <meta property="og:image:alt" content="The map of The Temporary Plane" />
      <meta name="og:locale" content="en_US" />
    </>
  );
};

export default MetaTags;

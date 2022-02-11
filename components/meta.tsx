//https://gist.github.com/lancejpollard/1978404

const MetaTags = () => {
  return (
    <>
      <meta name="og:url" content="https://thetemporaryplane.com" />
      <meta name="og:title" content="The Temporary Plane" />
      <meta
        name="og:description"
        content="Immerse yourself in an ever-changing and ever-growing game space
            catered and created by you."
      />
      <meta
        property="og:image"
        content="http://thetemporaryplane.com/map.jpg"
      />
      <meta
        property="og:image:secure_url"
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

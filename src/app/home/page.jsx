import React from "react";
import HeroSection from "../component/heroSection/heroSection";
import FeaturePostSection from "../component/featurePost/featurePost";

import PopulerTags from "../component/populerTags/populerTags";
import LatestAritcle from "../component/latestArticle/latestAritcle";
import PopulerContibuter from "../component/contibuter/populerContibuter";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturePostSection />

      <PopulerTags />
      <LatestAritcle />
      <PopulerContibuter />
    </div>
  );
};

export default HomePage;

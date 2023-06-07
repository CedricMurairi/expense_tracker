import React, { useEffect, useState } from "react";
import MainLayout from "@components/layout/main_layout";
import UserData from "@mock/user_one.json";
import fetch_recommendations from "@data/recomendation";
import RecommendationCard from "@components/recommendation/card";
import SavingsRecommendationCard from "@components/recommendation/savings_card";
import getFirebaseClientIdToken from "@helpers/get_id_token";

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    async function get_recommendations() {
      const idToken = await getFirebaseClientIdToken();
      fetch_recommendations(UserData, idToken)
        .then((data) => {
          setRecommendations(data);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    get_recommendations();
  }, []);

  return (
    <MainLayout headerContent={"Recommendation"} page={"Recommendation"}>
      {/* To use coin system [Bounty Coin] with an initial 1 coin on registration -- users will use these coins to get recommendations [the app uses ne cin every month fr the mnthy recommendation] -- for user who decide t get custom recommendation on the fly by entering manually the mnthly expenditure by category, income, weights and savings we charge 2 coins [2$] -- this way it is gamified a bit and they do not have to subscribe -- just pay for cins when they need recommendations */}
      <div className="grid grid-cols-3 gap-10">
        {recommendations &&
          Object.keys(recommendations).map((recommendation, index) =>
            recommendation === "possible_savings" ||
            recommendation === "potential_savings" ? (
              <div key={index} className="overflow-auto">
                <h1 className="text-2xl underline">
                  {recommendation.split("_").join(" ").toUpperCase()}
                </h1>
                <SavingsRecommendationCard
                  data={recommendations[recommendation]}
                />
              </div>
            ) : (
              <div key={index}>
                <h1 className="text-2xl underline">
                  {recommendation.toUpperCase()}
                </h1>
                {Object.keys(recommendations[recommendation]).map(
                  (entry, subIndex) => (
                    <RecommendationCard
                      header={entry}
                      key={subIndex}
                      data={recommendations[recommendation][entry]}
                    />
                  )
                )}
              </div>
            )
          )}
      </div>
    </MainLayout>
  );
}

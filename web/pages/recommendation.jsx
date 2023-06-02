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
      <div className="grid grid-cols-3 gap-10">
        {recommendations &&
          Object.keys(recommendations).map((recommendation, index) =>
            recommendation === "possible_savings" ||
            recommendation === "potential_savings" ? (
              <div key={index} className="overflow-auto">
                <h1 className="text-2xl underline">
                  {recommendation.split("_").join(" ").toUpperCase()}
                </h1>
                <SavingsRecommendationCard data={recommendations[recommendation]}/>
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

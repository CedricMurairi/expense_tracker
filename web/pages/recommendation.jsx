import React, { useEffect, useState } from "react";
import MainLayout from "@components/layout/main_layout"; 2
import RecommendationCard from "@components/recommendation/card";
import SavingsRecommendationCard from "@components/recommendation/savings_card";
import { useGetRecommendationsQuery } from "@data/base_api";
import Pulser from "@components/shared/pulser";

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState(null);

  const { data, error, isLoading } = useGetRecommendationsQuery();

  useEffect(() => {
    if (data) {
      setRecommendations(data);
    }
  }, [data]);

  return (
    <MainLayout headerContent={"Recommendation"} page={"Recommendation"}>
      <div className="grid grid-row-3 gap-10">
        {isLoading && <p className="flex justify-center items-center mt-5"><Pulser primary={"bg-gray-400"} secondary={"bg-gray-700"} /></p>}
        {recommendations &&
          Object.keys(recommendations).map((recommendation, index) => {
            return recommendation === "possible_savings" ||
              recommendation === "potential_savings" ? (
              <div key={index} className="overflow-auto flex flex-col">
                <h1 className="text-2xl underline">
                  {recommendation.split("_").join(" ").toUpperCase()}
                </h1>
                <SavingsRecommendationCard
                  data={recommendations[recommendation]}
                />
              </div>
            ) : (
              <div key={index}>
                <h1 className="text-2xl underline flex flex-row">
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
          }
          )}
      </div>
    </MainLayout>
  );
}

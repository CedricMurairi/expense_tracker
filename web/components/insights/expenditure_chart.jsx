import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function ExpenditureChart({ user_data }) {
  const get_expenditures = () => {
    let expenditures = [];
    Object.keys(user_data["expenditures"]).map((expenditure) => {
      expenditures.push({
        label: expenditure,
        value: Math.round(user_data["expenditures"][expenditure]),
      });
    });

    return expenditures;
  };

  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);

    const width = svg.attr("width");
    const height = svg.attr("height");

    const padding = 20;

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - padding);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    const data = get_expenditures();

    const arcs = pie(data);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    g.selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", (d, i) => colorScale(i))
      .attr("d", arc)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr(
            "d",
            d3
              .arc()
              .innerRadius(0)
              .outerRadius(Math.min(width, height) / 2 - padding + 20)
          );
        svg
          .append("text")
          .attr("class", "label")
          .attr("x", width / 2)
          .attr("y", height / 2)
          .text(`${d.data.label}: RWF${d.data.value.toLocaleString()}`)
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("font-size", 15)
          .attr("font-weight", 800)
      })
      .on("mouseout", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", arc);
        svg.select(".label").remove();
      })
      .each(function (d) {
        this._current = d;
      }) // store the initial angles
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          return arc(interpolate(t));
        };
      });

    function animateChart() {
      g.selectAll("path")
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return function (t) {
            return arc(interpolate(t));
          };
        });
    }

    animateChart();
  }, []);

  return (
    <div>
      <svg ref={chartRef} width="400" height="300"></svg>
    </div>
  );
}

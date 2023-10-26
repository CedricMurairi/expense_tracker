import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import formatNumber from "@helpers/format_number";

export default function ExpenditureChart({ dataEntry, currency }) {
  const get_expenditures = () => {
    const cleanData = Object.values(
      dataEntry.reduce((acc, obj) => {
        const { key, value } = obj;
        if (acc.hasOwnProperty(key)) {
          acc[key].value += value;
        } else {
          acc[key] = { ...obj };
        }
        return acc;
      }, {})
    );

    let expenditures = [];
    dataEntry.map((entry) => {
      let existing_index = expenditures.findIndex(item => item.label === entry.data.category);

      if (existing_index !== -1) {
        expenditures[existing_index].value += Math.round(entry.data.amount);
      } else {
        expenditures.push({
          label: entry.data.category,
          value: Math.round(entry.data.amount),
        });
      }
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
              .outerRadius(Math.min(width, height) / 2 - padding + 10)
          );
        svg
          .append("text")
          .attr("class", "label")
          .attr("x", width / 2)
          .attr("y", height)
          .text(
            `${d.data.label
              .split(" ")
              .filter((word) => word != "Expenditure")
              .join(" ")}: ${formatNumber(d.data.value)} ${currency || ""}`
          )
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("font-size", 20)
          .attr("font-weight", "normal")
          .attr("background", "black");
      })
      .on("mouseout", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", arc);
        svg.select(".label").remove();
      })
      .each(function (d) {
        this._current = d;
      })
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
  }, [dataEntry]);

  return (
    <div>
      <svg ref={chartRef} width="425" height="325"></svg>
    </div>
  );
}

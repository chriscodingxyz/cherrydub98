import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export default function TwitterEmbed() {
  return (
    <>
      <div className="flex flex-wrap">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="HsakaTrades"
          options={{ width: 250, height: 400 }}
        />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="Pentosh1"
          options={{ width: 250, height: 400 }}
        />
      </div>
    </>
  );
}

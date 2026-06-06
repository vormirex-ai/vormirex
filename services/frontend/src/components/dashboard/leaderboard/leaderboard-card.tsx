import React, { useState } from "react";
import { LeaderboardPodium } from "./leaderboard-podium";
import { LeaderboardList } from "./leaderboard-list";


const ALL_TIME_DATA = [
  { rank: 1, name: "Kai Nakamura", xp: 14820, streak: 20, isUser: false },
  { rank: 2, name: "Maya Chen", xp: 12340, streak: 18, isUser: false },
  { rank: 3, name: "Raj Patel", xp: 11950, streak: 8, isUser: false },
  { rank: 4, name: "Sofia Reyes", xp: 11200, streak: 6, isUser: false },
  { rank: 5, name: "James O'Brien", xp: 10880, streak: 16, isUser: false },
  { rank: 6, name: "Ananya Singh", xp: 9750, streak: 15, isUser: false },
  { rank: 7, name: "Liam Foster", xp: 8430, streak: 4, isUser: false },
  { rank: 8, name: "Alex Johnson", xp: 2840, streak: 12, isUser: true },
  { rank: 9, name: "Priya Nair", xp: 2110, streak: 13, isUser: false },
  { rank: 10, name: "Tom Weiss", xp: 1890, streak: 11, isUser: false },
];

export function LeaderboardCard() {


  const topThree = ALL_TIME_DATA.slice(0, 3);
  const remainingRows = ALL_TIME_DATA.slice(3);
  const currentUser = ALL_TIME_DATA.find((user) => user.isUser);

  return (
    <div className="w-full max-w-4xl mx-auto min-h-screen  p-4 md:p-8 flex flex-col gap-6 select-none font-sans">
      <LeaderboardPodium topThree={topThree} />
      <LeaderboardList listData={remainingRows} currentUser={currentUser} />
    </div>
  );
}
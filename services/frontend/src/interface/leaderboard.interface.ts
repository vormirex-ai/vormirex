export interface Player {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  profilePhoto?: string;
}

export interface Props {
  topThree: Player[];
  listData: Player[];
  currentUser?: Player;
  userPercentile?: string;
}

export interface RowProps {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  profilePhoto?: string;
  isUser?: boolean;
}

export interface ListProps {
  listData: RowProps[];
  currentUser?: RowProps;
  userPercentile?: string;
}

export interface Participant {
  rank: number;
  name: string;
  xp: number;
  profilePhoto?: string;
}

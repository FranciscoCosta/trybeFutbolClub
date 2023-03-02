import IleaderboardHome from '../api/interface/IleaderboardHome';
import IMatch from '../api/interface/IMatch';

const TeamStats = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const reset = () => {
  TeamStats.totalPoints = 0;
  TeamStats.totalGames = 0;
  TeamStats.totalVictories = 0;
  TeamStats.totalDraws = 0;
  TeamStats.totalLosses = 0;
  TeamStats.goalsFavor = 0;
  TeamStats.goalsOwn = 0;
  TeamStats.goalsBalance = 0;
  TeamStats.efficiency = 0;
};

const victoryHome = (homeTeamGoals: number, awayTeamGoals: number) => {
  TeamStats.totalPoints += 3;
  TeamStats.totalVictories += 1;
  TeamStats.goalsFavor += homeTeamGoals;
  TeamStats.goalsOwn += awayTeamGoals;
};

const victoryAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  TeamStats.totalPoints += 3;
  TeamStats.totalVictories += 1;
  TeamStats.goalsFavor += awayTeamGoals;
  TeamStats.goalsOwn += homeTeamGoals;
};

const drawHome = (homeTeamGoals: number, awayTeamGoals: number) => {
  TeamStats.totalPoints += 1;
  TeamStats.totalDraws += 1;
  TeamStats.goalsFavor += homeTeamGoals;
  TeamStats.goalsOwn += awayTeamGoals;
};

const drawAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  TeamStats.totalPoints += 1;
  TeamStats.totalDraws += 1;
  TeamStats.goalsFavor += awayTeamGoals;
  TeamStats.goalsOwn += homeTeamGoals;
};

const defeatHome = (homeTeamGoals: number, awayTeamGoals: number) => {
  TeamStats.totalPoints += 0;
  TeamStats.totalLosses += 1;
  TeamStats.goalsFavor += homeTeamGoals;
  TeamStats.goalsOwn += awayTeamGoals;
};

const defeatAway = (homeTeamGoals: number, awayTeamGoals: number) => {
  TeamStats.totalPoints += 0;
  TeamStats.totalLosses += 1;
  TeamStats.goalsFavor += awayTeamGoals;
  TeamStats.goalsOwn += homeTeamGoals;
};

const calculatePointsHome = (matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) {
      victoryHome(homeTeamGoals, awayTeamGoals);
    }
    if (homeTeamGoals === awayTeamGoals) drawHome(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) defeatHome(homeTeamGoals, awayTeamGoals);
  });
};

const calculatePointsAway = (matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (awayTeamGoals > homeTeamGoals) {
      victoryAway(homeTeamGoals, awayTeamGoals);
    }
    if (homeTeamGoals === awayTeamGoals) drawAway(homeTeamGoals, awayTeamGoals);
    if (awayTeamGoals < homeTeamGoals) defeatAway(homeTeamGoals, awayTeamGoals);
  });
};

const StatisticTeamHome = (name: string, matches: IMatch[]) => {
  if (name !== TeamStats.name) {
    reset();
  }
  TeamStats.name = name;
  calculatePointsHome(matches);
  TeamStats.totalGames += 1;
  TeamStats.goalsBalance = TeamStats.goalsFavor - TeamStats.goalsOwn;
  TeamStats.efficiency = Number(
    ((TeamStats.totalPoints / (TeamStats.totalGames * 3)) * 100).toFixed(2),
  );
  return TeamStats;
};

const StatisticTeamAway = (name: string, matches: IMatch[]) => {
  if (name !== TeamStats.name) {
    reset();
  }
  TeamStats.name = name;
  calculatePointsAway(matches);
  TeamStats.totalGames += 1;
  TeamStats.goalsBalance = TeamStats.goalsFavor - TeamStats.goalsOwn;
  TeamStats.efficiency = Number(
    ((TeamStats.totalPoints / (TeamStats.totalGames * 3)) * 100).toFixed(2),
  );

  return TeamStats;
};

const SortTeams = (matches: IleaderboardHome[]) => matches.sort((A, B) => (
  B.totalPoints - A.totalPoints
  || B.totalVictories - A.totalVictories
  || B.goalsBalance - A.goalsBalance
  || B.goalsFavor - A.goalsFavor
  || B.goalsOwn - A.goalsFavor
));

export { StatisticTeamHome, StatisticTeamAway, SortTeams };

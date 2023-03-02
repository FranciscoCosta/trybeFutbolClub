import Team from '../../database/models/TeamModels';
import Match from '../../database/models/MatchModels';
import { StatisticTeamHome, SortTeams, StatisticTeamAway } from '../../utils/LeaderBoardsCalculate';
import ITeam from '../interface/ITeam';
import IleaderboardHome from '../interface/IleaderboardHome';

const newTeam = (th: IleaderboardHome, ta: IleaderboardHome) => {
  const TeamTotal = {
    name: ta.name,
    totalPoints: th.totalPoints + ta.totalPoints,
    totalGames: th.totalGames + ta.totalGames,
    totalVictories: th.totalVictories + ta.totalVictories,
    totalDraws: th.totalDraws + ta.totalDraws,
    totalLosses: th.totalLosses + ta.totalLosses,
    goalsFavor: th.goalsFavor + ta.goalsFavor,
    goalsOwn: th.goalsOwn + ta.goalsOwn,
    goalsBalance: (th.goalsFavor + ta.goalsFavor) - (th.goalsOwn + ta.goalsOwn),
    efficiency: Number(
      (((th.totalPoints + ta.totalPoints) / ((th.totalGames + ta.totalGames) * 3)) * 100)
        .toFixed(2),
    ),
  };
  return TeamTotal;
};

export default class LeaderboardService {
  static async getTeamHome() {
    const AllTeams = await Team.findAll() as unknown as ITeam[];

    const StatsHomeTeams = await AllTeams.map(async (team) => {
      const HomeTeamMatches = await Match.findAll(
        { where: { homeTeamId: team.id, inProgress: false } },
      );

      const HomeTeamStats = await HomeTeamMatches.map((match) => (
        StatisticTeamHome(team.teamName, [match])));

      const teamsStats = HomeTeamStats[HomeTeamMatches.length - 1];
      return { ...teamsStats };
    });

    const TeamsResults: IleaderboardHome[] = await Promise.all(StatsHomeTeams);
    const resultsSorted = SortTeams(TeamsResults);
    return resultsSorted;
  }

  static async getTeamAway() {
    const AllTeams = await Team.findAll() as unknown as ITeam[];

    const StatsAwayTeams = await AllTeams.map(async (team) => {
      const AwayTeamMatches = await Match.findAll(
        { where: { awayTeamId: team.id, inProgress: false } },
      );

      const AwayTeamStats = await AwayTeamMatches.map((match) => (
        StatisticTeamAway(team.teamName, [match])));

      const teamsStats = AwayTeamStats[AwayTeamMatches.length - 1];
      return { ...teamsStats };
    });

    const TeamsResults: IleaderboardHome[] = await Promise.all(StatsAwayTeams);
    const resultsSorted = SortTeams(TeamsResults);
    return resultsSorted;
  }

  static async getTeamLeaderboard() {
    const TotalTeams: IleaderboardHome[] = [];
    const home = await this.getTeamHome();
    const away = await this.getTeamAway();
    const [Stats] = await home.map((th) => away.filter((ta) => {
      if (th.name === ta.name) {
        const teamTotalStats = newTeam(th, ta);
        TotalTeams.push(teamTotalStats);
      }
      return true;
    }));
    await Promise.all(Stats);
    return SortTeams(TotalTeams);
  }
}

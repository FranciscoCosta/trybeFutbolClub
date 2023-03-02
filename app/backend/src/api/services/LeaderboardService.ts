import Team from '../../database/models/TeamModels';
import Match from '../../database/models/MatchModels';
import { StatisticTeamHome, SortTeams, StatisticTeamAway } from '../../utils/LeaderBoardsCalculate';
import ITeam from '../interface/ITeam';
import IleaderboardHome from '../interface/IleaderboardHome';

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
}

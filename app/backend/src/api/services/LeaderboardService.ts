import Team from '../../database/models/TeamModels';
import Match from '../../database/models/MatchModels';
import { StatisticTeamHome } from '../../utils/LeaderBoardsCalculate';
import ITeam from '../interface/ITeam';

export default class LeaderboardService {
  static async getTeamHome() {
    const AllTeams = await Team.findAll() as unknown as ITeam[];

    const StatsHomeTeams:Array<unknown> = await AllTeams.map(async (team) => {
      const HomeTeamMatches = await Match.findAll(
        { where: { homeTeamId: team.id, inProgress: false } },
      );

      const HomeTeamStats = await HomeTeamMatches.map((match) => (
        StatisticTeamHome(team.teamName, [match])));

      const teamsStats = HomeTeamStats[HomeTeamMatches.length - 1];
      return { ...teamsStats };
    });

    const TeamsResults = await Promise.all(StatsHomeTeams);
    console.log('result', TeamsResults);
    return TeamsResults;
  }
}

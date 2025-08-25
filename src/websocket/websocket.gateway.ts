import { WebSocketGateway, SubscribeMessage, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketService } from './websocket.service';
import { TeamService } from '../team/team.service';

@WebSocketGateway({ cors: true })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private wsService: WebsocketService,
    private teamService: TeamService
  ) {

    this.teamService.onUserJoinedTeam((teamId, userId) => {
      this.addUserToRoom(teamId, userId);
    });
  }


  addUserToRoom(teamId: number, userId: number) {
    const client = this.wsService.getClientByUserId(userId);
    if (client) {
      client.join(`team-${teamId}`);
    }
  }

  @SubscribeMessage('invite')
  handleInvite(@MessageBody() data: { teamToken: string }) {
    return this.wsService.inviteTeam(data.teamToken);
  }

  @SubscribeMessage('joinTeam')
  async handleJoinTeam(
    @MessageBody() data: { teamToken: string; userId: number },
    @ConnectedSocket() client: Socket
  ) {
    const valid = this.wsService.isTokenValid(data.teamToken);
    if (!valid) return { error: 'Invalid or expired team token' };

    const member = await this.teamService.joinTeam(data.teamToken, data.userId);

    client.join(`team-${member.teamId}`);
    client.data.userId = data.userId;

    return { success: true, member };
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { teamToken: string; message: string },
    @ConnectedSocket() client: Socket
  ) {
    const userId = client.data.userId || 'Unknown';
    this.server.to(`team-${data.teamToken}`).emit('message', { userId, message: data.message });
  }
}

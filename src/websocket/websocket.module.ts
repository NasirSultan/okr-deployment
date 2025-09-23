import { Module } from '@nestjs/common'
import { WebsocketGateway } from './websocket.gateway'
import { WebsocketService } from './websocket.service'
import { TeamModule } from '../team/team.module'

@Module({
  imports: [TeamModule],             // TeamService comes from here
  providers: [WebsocketGateway, WebsocketService],
  exports: [WebsocketService],       // if other modules also need it
})
export class WebsocketModule {}

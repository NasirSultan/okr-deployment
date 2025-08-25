import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [TeamModule],
  providers: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}

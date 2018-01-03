import { NgModule } from '@angular/core';
import { DatePipes } from './../pipes/date-pipes/date-pipes';
import { TeamNamePipe } from './../pipes/team-name/team-name';
@NgModule({
	declarations: [DatePipes,
    TeamNamePipe],
	imports: [],
	exports: [DatePipes,
    TeamNamePipe]
})
export class PipesModule {}

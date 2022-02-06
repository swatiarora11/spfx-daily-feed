import { IGroup } from "../../models";
import { Services } from "../../services";

export class DailyUpdate {
  private services: Services = undefined;

  public description: string;
  public author: string;
  public formattedDate: string;

  public siteId: string;
  public listId: string;

  public group: IGroup;
  public teamsAppId: string;

  constructor(services: Services) {
    this.services = services;
    this.listId = "";
    this.siteId = "";
    this.teamsAppId = "";
  }
   
  public getNextDayTimeAt(hour: number, mins: number) {
    var t = new Date();
    t.setDate(t.getDate()+1);
    t.setHours(hour);
    t.setMinutes(mins);
    t.setSeconds(0);
    t.setMilliseconds(0);
    return t;
  }

  public async _getDailyUpdate(today: Date) {
    const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.formattedDate = today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();

    console.log(this.siteId + "--" + this.listId);

    if(this.siteId != "" && this.listId != "") {
      var Startdate = today.toISOString().substring(0, 10) + "T00:00:00.000Z";
      var Enddate =  today.toISOString().substring(0, 10) + "T23:00:00.000Z";
      var filterQuery = "?top=1&filter=fields/Live ge '" + Startdate + "' and fields/Live le '" + Enddate + "'";

      try {
        const currItem = await this.services.getListItemByQuery(this.siteId, this.listId, filterQuery);
        if(currItem != undefined) {
          const listItem = await this.services.getListItem(this.siteId, this.listId, currItem.id);
          const { Title, Update } = listItem.fields;
          this.description = Update;
          this.author = Title;
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  }

  public async sendTeamsFeed() {
    if(this.group && this.teamsAppId != "") {      
      const upns = await this.services.getGroupMembers(this.group.id);
      console.log("send teams feed (count: "+upns.length+")");
      if (upns && upns.length > 0) {
        for(var index: number=0; index < upns.length; index++) {
          const teamsAppUser = await this.services.getUser(upns[index]);
          if(teamsAppUser) {
            const teamsAppInstance = await this.services.getTeamsAppInstance(teamsAppUser?.id, this.teamsAppId); 
            if(teamsAppInstance) { 
              console.log("sending feed to " + teamsAppUser?.displayName);
              this.services.sendActivityFeedUser(teamsAppUser?.id, teamsAppInstance?.id, "lick here to see the latest");
            }
          }
        }
      }
    }
  }
}
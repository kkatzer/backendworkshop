// Uncomment these imports to begin using these cool features!

import {get, param} from '@loopback/rest';
import {JSONObject} from '@loopback/context';

// import {inject} from '@loopback/context';


export class DifferenceController {
  @get("/difference")
  difference(@param.query.string('date') date: string): JSONObject {
    const now =  new Date();
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    const never = new Date(date.slice(2,4) + "/" + date.slice(0,2) + "/" + date.slice(4,8));
    const diff = (never.getTime() - now.getTime()) / (1000 * 3600 * 24);
    return {
      "dias entre as data": diff
    }
  }
}

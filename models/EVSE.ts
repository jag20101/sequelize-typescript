import {Table} from "../orm/annotations/Table";
import {Column} from "../orm/annotations/Column";
import {BelongsToMany} from "../orm/annotations/BelongsToMany";
import {DataType} from "../orm/models/DataType";
import {Model} from "../orm/models/Model";
import {Plug} from "./Plug";
import {EVSEPlug} from "./EVSEPlug";
import {Accessibility} from "./Accessibility";
import {BelongsTo} from "../orm/annotations/BelongsTo";
import {ForeignKey} from "../orm/annotations/ForeignKey";
import {Status} from "./Status";
import {EVSEStatus} from "./EVSEStatus";

@Table
export class EVSE extends Model<EVSE> {

  @Column({
    primaryKey: true,
    type: DataType.STRING
  })
  id: string;

  // address
  @Column
  country: string;

  @Column
  city: string;

  @Column
  street: string;

  @Column
  postalCode: string;

  @Column
  houseNum: string;

  @Column
  floor: string;

  @Column
  region: string;

  @Column
  timezone: string;


  // geo location
  @Column({
    type: DataType.DECIMAL
  })
  longitude: number;

  @Column({
    type: DataType.DECIMAL
  })
  latitude: number;

  @Column({
    type: DataType.DECIMAL
  })
  entranceLongitude: number;

  @Column({
    type: DataType.DECIMAL
  })
  entranceLatitude: number;

  //
  @Column
  maxCapacity: number;

  @Column
  operatorId: string;

  @Column
  chargingStationId: string;

  @Column
  chargingStationName: string;

  @Column
  lastUpdate: string;

  @Column
  additionalInfo: string;

  @Column
  isOpen24Hours: boolean;

  @Column
  openingTime: string;

  @Column
  hubOperatorId: string;

  @Column
  clearinghouseId: string;

  @Column
  isHubjectCompatible: boolean;

  @Column
  dynamicInfoAvailable: string;

  @Column
  hotlinePhoneNum: string;

  @BelongsToMany(() => Plug, () => EVSEPlug)
  plugs: Plug[];

  // Actually EVSE - Status is a N:1 relation,
  // but for simplicity in updating the
  // status data, the states are persisted
  // in a separate table
  @BelongsToMany(() => Status, () => EVSEStatus)
  states: Status[];
  
  @Column({
    type: DataType.VIRTUAL,
    get: function() { return (this.getDataValue('states') || [])[0] }
  })
  state: Status;

  @Column
  @ForeignKey(() => Accessibility)
  accessibilityId: number;

  @BelongsTo(() => Accessibility)
  accessibility: Accessibility;

}

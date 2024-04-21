export class Hotel {
  _id: string;
  hotelName: string;
  hotelDescription: string;
  hotelSubDescription: string;
  hotelMainImage: string;
  hotelCity: string;
  hotelAddress: string;
  distanceFromCenter: number;
  hotelType: string;
  hotelRating: number;
  // message :string;
  data: Hotel[];
  approved?: boolean;

  constructor() {
    this._id = '';
    this.hotelName = '';
    this.hotelDescription = '';
    this.hotelSubDescription = '';
    this.hotelMainImage = '';
    this.hotelCity = '';
    this.hotelAddress = '';
    this.distanceFromCenter = 1;
    this.hotelType = '';
    this.approved = false;
    this.hotelRating = 0;
    // message :"";
    this.data = [];
  }
}

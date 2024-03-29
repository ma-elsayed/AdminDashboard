export interface Room {
      _id: string;
      hotelId: string;

      hotelName?: string;
      roomType: string;
      bedType: string;
      guestNumber: number;
      price: number;
      data?: Room[];
      _v?: number

}


export interface IRoom {
  hotelId: {
    _id: string;
  };
  hotelName: string;
  roomType: string;
  bedType: string;
  guestNumber: number;
  price: number;


}
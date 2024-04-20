// export interface Room {
//   _id: string;
//   hotelId: string;

//   hotelName?: string;
//   roomType: string;
//   bedType: string;
//   guestNumber: number;
//   price: number;
//   data?: Room[];
//   _v?: number;
// }

// export interface IRoom {
//   hotelId: {
//     _id: string;
//   };
//   hotelName: string;
//   roomType: string;
//   bedType: string;
//   guestNumber: number;
//   price: number;
// }

export interface IRooms {
  _id: string;
  hotelId: {
    _id: string;
    hotelName: string;
  };
  roomType: string;
  bedType: string;
  guestNumber: number;
  price: number;
  __v?: number;
  checkInDates?: string[];
  checkOutDates?: string[];
  approved?: boolean;
}

export interface INewRoom {
  roomType: string;
  bedType: string;
  guestNumber: number;
  price: number;
  approved?: boolean;
}

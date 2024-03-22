export interface IBooking {
  _id: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  room: [
    {
      _id: string;
      hotelId: {
        _id: string;
        hotelName: string;
      };
      roomType: string;
      betType: string;
    }
  ];
  user: {
    _id: string;
    email: string;
    userName?: string;
  };
  totalPrice: number;
}

// ***** extends reference pattern

// chưa áp dụng pattern

export class Post {
  id: string;
  content: string;
  user_id: string;
}

export class User {
  id: string;
  name: string;
  gender: string;
}

// reference bình thường
// giảm hiệu năng
//=> extend pattern
// nhúng những thông tin cần thiết
export class Post {
  id: string;
  content: string;
  user: {
    id: string;
    name: string;
    gender: string;
  };
}

//

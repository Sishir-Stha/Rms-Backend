export interface user {
  userid : number;
  username: string;
  email: string;
  password: string;
  status: string;
  join_date : Date;
  created_date : Date;

}

export type Tlogin = Omit<user, 'userid' | 'username' |'status'|'join_date'|'created_date'>;

export type TinsertUser = Omit<user, 'user_id'|'created_date'> & {department_id : number};

export type TupdateUser = Omit<user,'password'|'created_date'|'join_date'>& {department_id : number}
